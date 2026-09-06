from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.api.deps import get_db, get_current_user
from app.models.cart import CartItem
from app.models.product import Product
from app.models.user import User
from app.schemas.cart import CartItemResponse, CartItemCreate, CartItemUpdate

router = APIRouter()

@router.get("/", response_model=List[CartItemResponse])
async def get_cart(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Any:
    """Retrieve current user's cart items."""
    result = await db.execute(
        select(CartItem)
        .where(CartItem.user_id == current_user.id)
        .options(selectinload(CartItem.product))
    )
    return result.scalars().all()

@router.post("/", response_model=CartItemResponse)
async def add_to_cart(
    *,
    db: AsyncSession = Depends(get_db),
    item_in: CartItemCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """Add a product to cart."""
    # Check if product exists
    product_result = await db.execute(select(Product).where(Product.id == item_in.product_id))
    product = product_result.scalars().first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    # Check if already in cart, update quantity if so
    result = await db.execute(
        select(CartItem)
        .where(CartItem.user_id == current_user.id)
        .where(CartItem.product_id == item_in.product_id)
    )
    cart_item = result.scalars().first()
    
    if cart_item:
        cart_item.quantity += item_in.quantity
    else:
        cart_item = CartItem(
            user_id=current_user.id,
            product_id=item_in.product_id,
            quantity=item_in.quantity
        )
        db.add(cart_item)
        
    await db.commit()
    await db.refresh(cart_item)
    
    # Reload with product relationship
    result = await db.execute(
        select(CartItem)
        .where(CartItem.id == cart_item.id)
        .options(selectinload(CartItem.product))
    )
    return result.scalars().first()

@router.put("/{id}", response_model=CartItemResponse)
async def update_cart_item(
    *,
    db: AsyncSession = Depends(get_db),
    id: int,
    item_in: CartItemUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """Update cart item quantity."""
    result = await db.execute(select(CartItem).where(CartItem.id == id, CartItem.user_id == current_user.id))
    cart_item = result.scalars().first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
        
    if item_in.quantity <= 0:
        await db.delete(cart_item)
        await db.commit()
        raise HTTPException(status_code=204, detail="Item removed from cart")
        
    cart_item.quantity = item_in.quantity
    await db.commit()
    await db.refresh(cart_item)
    
    # Reload with product relationship
    result = await db.execute(
        select(CartItem)
        .where(CartItem.id == cart_item.id)
        .options(selectinload(CartItem.product))
    )
    return result.scalars().first()

@router.delete("/{id}")
async def remove_from_cart(
    *,
    db: AsyncSession = Depends(get_db),
    id: int,
    current_user: User = Depends(get_current_user),
) -> Any:
    """Remove item from cart."""
    result = await db.execute(select(CartItem).where(CartItem.id == id, CartItem.user_id == current_user.id))
    cart_item = result.scalars().first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
        
    await db.delete(cart_item)
    await db.commit()
    return {"message": "Item removed from cart"}
