from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

from app.schemas.product import ProductResponse

class CartItemBase(BaseModel):
    product_id: int
    quantity: int = 1

class CartItemCreate(CartItemBase):
    pass

class CartItemUpdate(BaseModel):
    quantity: int

class CartItemResponse(CartItemBase):
    id: int
    user_id: int
    created_at: datetime
    product: ProductResponse
    
    model_config = ConfigDict(from_attributes=True)
