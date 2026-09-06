import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import AsyncSessionLocal
from app.models.product import Product

async def update_images():
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(Product))
        products = result.scalars().all()
        
        for p in products:
            if "Shampoo" in p.name:
                p.image_url = "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop"
            elif "Conditioner" in p.name:
                p.image_url = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop"
            elif "Gel" in p.name:
                p.image_url = "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop"
            else:
                p.image_url = "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop"
        
        await db.commit()
        print("Product images updated successfully in database!")

if __name__ == "__main__":
    asyncio.run(update_images())
