import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal
from app.models.user import User
from app.models.product import Product
from app.core.security import get_password_hash

async def seed_data():
    async with AsyncSessionLocal() as db:
        # Seed Admin User
        admin_email = "admin@hydracurls.com"
        # Check if exists
        from sqlalchemy.future import select
        result = await db.execute(select(User).where(User.email == admin_email))
        admin = result.scalars().first()
        
        if not admin:
            admin = User(
                email=admin_email,
                hashed_password=get_password_hash("admin123"),
                full_name="Admin User",
                is_admin=True
            )
            db.add(admin)
            print("Admin user created: admin@hydracurls.com / admin123")
        
        # Seed Products
        products_data = [
            {
                "name": "Hydra Curls Hydrating Shampoo",
                "description": "Purple Toning Shampoo with Coconut Oil & Avocado Extract. Sulfate-free.",
                "price": 24.99,
                "category": "Shampoo",
                "stock": 100,
                "image_url": "/assets/products/shampoo.jpg",
                "features": ["No SLS", "48-Hour Hydration", "Type 2, 3, 4 Hair"]
            },
            {
                "name": "Hydra Curls Premium Conditioner",
                "description": "Deep hydration nourishing formula for curly and wavy hair.",
                "price": 26.99,
                "category": "Conditioner",
                "stock": 150,
                "image_url": "/assets/products/conditioner.jpg",
                "features": ["Silicone-free", "Reduces Breakage", "Type 2, 3, 4 Hair"]
            },
            {
                "name": "Hydra Curls Styling Gel",
                "description": "Medium hold gel for defining curls without crunch.",
                "price": 19.99,
                "category": "Styling",
                "stock": 200,
                "image_url": "/assets/products/shampoo.jpg",
                "features": ["No Parabens", "48-Hour Hold", "Type 3, 4 Hair"]
            }
        ]
        
        for p_data in products_data:
            result = await db.execute(select(Product).where(Product.name == p_data["name"]))
            existing = result.scalars().first()
            if not existing:
                product = Product(**p_data)
                db.add(product)
                print(f"Product created: {p_data['name']}")
                
        await db.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_data())
