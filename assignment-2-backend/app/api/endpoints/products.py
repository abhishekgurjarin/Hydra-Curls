from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete

from app.api.deps import get_db, get_current_active_admin
from app.models.product import Product
from app.schemas.product import ProductResponse, ProductCreate, ProductUpdate

router = APIRouter()

@router.get("/", response_model=List[ProductResponse])
async def read_products(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """Retrieve products."""
    result = await db.execute(select(Product).offset(skip).limit(limit))
    return result.scalars().all()

@router.post("/", response_model=ProductResponse, dependencies=[Depends(get_current_active_admin)])
async def create_product(
    *,
    db: AsyncSession = Depends(get_db),
    product_in: ProductCreate,
) -> Any:
    """Create new product (Admin only)."""
    product = Product(**product_in.model_dump())
    db.add(product)
    await db.commit()
    await db.refresh(product)
    return product

@router.get("/{id}", response_model=ProductResponse)
async def read_product(
    *,
    db: AsyncSession = Depends(get_db),
    id: int,
) -> Any:
    """Get product by ID."""
    result = await db.execute(select(Product).where(Product.id == id))
    product = result.scalars().first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{id}", response_model=ProductResponse, dependencies=[Depends(get_current_active_admin)])
async def update_product(
    *,
    db: AsyncSession = Depends(get_db),
    id: int,
    product_in: ProductUpdate,
) -> Any:
    """Update a product (Admin only)."""
    result = await db.execute(select(Product).where(Product.id == id))
    product = result.scalars().first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    update_data = product_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(product, field, value)
        
    await db.commit()
    await db.refresh(product)
    return product

@router.delete("/{id}", response_model=ProductResponse, dependencies=[Depends(get_current_active_admin)])
async def delete_product(
    *,
    db: AsyncSession = Depends(get_db),
    id: int,
) -> Any:
    """Delete a product (Admin only)."""
    result = await db.execute(select(Product).where(Product.id == id))
    product = result.scalars().first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    await db.delete(product)
    await db.commit()
    return product
