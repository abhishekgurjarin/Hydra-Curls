from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, List, Any

from app.schemas.product import ProductResponse
from app.schemas.user import UserResponse

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int
    price_at_purchase: float

class OrderItemCreate(OrderItemBase):
    pass

class OrderItemResponse(OrderItemBase):
    id: int
    order_id: int
    product: ProductResponse
    model_config = ConfigDict(from_attributes=True)

class OrderBase(BaseModel):
    total_amount: float
    shipping_address: Optional[dict[str, Any]] = None

class OrderCreate(OrderBase):
    pass

class OrderResponse(OrderBase):
    id: int
    user_id: int
    status: str
    stripe_session_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    items: List[OrderItemResponse]
    model_config = ConfigDict(from_attributes=True)
