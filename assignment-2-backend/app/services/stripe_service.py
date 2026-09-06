import stripe
from app.core.config import settings
from app.models.order import Order
from app.models.user import User
from app.schemas.order import OrderResponse

stripe.api_key = settings.STRIPE_SECRET_KEY

class StripeService:
    @staticmethod
    def create_checkout_session(order: Order, user: User, success_url: str, cancel_url: str):
        if settings.STRIPE_SECRET_KEY == "sk_test_mock":
            # Mock behavior if no key is provided
            return "mock_session_id", "http://localhost:5173/checkout/success"
            
        try:
            line_items = []
            for item in order.items:
                line_items.append({
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": item.product.name,
                        },
                        "unit_amount": int(item.price_at_purchase * 100),
                    },
                    "quantity": item.quantity,
                })

            checkout_session = stripe.checkout.Session.create(
                customer_email=user.email,
                payment_method_types=["card"],
                line_items=line_items,
                mode="payment",
                success_url=f"{success_url}?session_id={{CHECKOUT_SESSION_ID}}",
                cancel_url=cancel_url,
                metadata={
                    "order_id": order.id,
                    "user_id": user.id
                }
            )
            
            return checkout_session.id, checkout_session.url
        except Exception as e:
            raise e
