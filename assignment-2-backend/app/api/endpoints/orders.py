from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
import stripe

from app.api.deps import get_db, get_current_user, get_current_active_admin
from app.models.order import Order, OrderItem
from app.models.cart import CartItem
from app.models.user import User
from app.schemas.order import OrderResponse
from app.services.stripe_service import StripeService
from app.core.config import settings

router = APIRouter()

@router.get("/", response_model=List[OrderResponse])
async def get_orders(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Any:
    """Retrieve current user's orders."""
    query = select(Order).options(selectinload(Order.items).selectinload(OrderItem.product))
    
    if not current_user.is_admin:
        query = query.where(Order.user_id == current_user.id)
        
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/checkout")
async def checkout(
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """Checkout cart items and create an order, returning Stripe checkout URL."""
    # Get cart items
    result = await db.execute(
        select(CartItem)
        .where(CartItem.user_id == current_user.id)
        .options(selectinload(CartItem.product))
    )
    cart_items = result.scalars().all()
    
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
        
    # Calculate total and create order
    total_amount = sum(item.product.price * item.quantity for item in cart_items)
    
    order = Order(
        user_id=current_user.id,
        total_amount=total_amount,
        status="pending"
    )
    db.add(order)
    await db.commit()
    await db.refresh(order)
    
    # Create order items
    for cart_item in cart_items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=cart_item.product_id,
            quantity=cart_item.quantity,
            price_at_purchase=cart_item.product.price
        )
        db.add(order_item)
        
    # Clear cart
    await db.execute(CartItem.__table__.delete().where(CartItem.user_id == current_user.id))
    await db.commit()
    
    # Load order with items
    result = await db.execute(
        select(Order)
        .where(Order.id == order.id)
        .options(selectinload(Order.items).selectinload(OrderItem.product))
    )
    loaded_order = result.scalars().first()
    
    # Create Stripe Checkout Session
    origin = request.headers.get("origin", "http://localhost:5173")
    try:
        session_id, checkout_url = StripeService.create_checkout_session(
            order=loaded_order,
            user=current_user,
            success_url=f"{origin}/checkout/success",
            cancel_url=f"{origin}/checkout/cancel"
        )
        
        # Update order with session id
        loaded_order.stripe_session_id = session_id
        await db.commit()
        
        return {"checkout_url": checkout_url, "order_id": order.id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/webhook", include_in_schema=False)
async def stripe_webhook(request: Request, db: AsyncSession = Depends(get_db)):
    """Stripe webhook to handle payment success/failure."""
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    
    if settings.STRIPE_WEBHOOK_SECRET == "whsec_mock":
        return {"status": "mock_success"}

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        raise HTTPException(status_code=400, detail="Invalid signature")

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        order_id = int(session.get("metadata", {}).get("order_id"))
        
        if order_id:
            result = await db.execute(select(Order).where(Order.id == order_id))
            order = result.scalars().first()
            if order:
                order.status = "paid"
                order.stripe_payment_intent = session.get("payment_intent")
                await db.commit()

    return {"status": "success"}
