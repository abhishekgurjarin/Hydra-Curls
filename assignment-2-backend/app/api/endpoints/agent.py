from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.api.deps import get_db
from app.models.product import Product
from app.schemas.product import ProductResponse
from app.core.config import settings

router = APIRouter()

class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    response: str
    suggested_products: list[ProductResponse] = []

@router.post("/suggest", response_model=ChatResponse)
async def suggest_products(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    AI Agent endpoint to suggest products based on user descriptions.
    Uses LangChain and OpenAI to understand user needs and match with available products.
    """
    # Fetch all products to give context to the AI (in a real app, use vector search)
    result = await db.execute(select(Product))
    products = result.scalars().all()
    
    if not products:
        return ChatResponse(
            response="I'm sorry, but we currently don't have any products in our catalog to suggest.",
            suggested_products=[]
        )
    
    product_descriptions = "\n".join([
        f"ID: {p.id}, Name: {p.name}, Category: {p.category}, Desc: {p.description}"
        for p in products
    ])
    
    try:
        # Check if we have either an OpenAI key or OpenRouter key
        has_real_openai = settings.OPENAI_API_KEY and settings.OPENAI_API_KEY != "sk-mock"
        has_real_openrouter = settings.OPENROUTER_API_KEY and settings.OPENROUTER_API_KEY != "sk-or-mock"
        
        if not (has_real_openai or has_real_openrouter):
            # Fallback mock logic if no API key is provided
            keyword = request.query.lower()
            # Simple keyword matching on name and features
            matched_products = []
            for p in products:
                if keyword in p.name.lower() or keyword in p.description.lower():
                    matched_products.append(p)
                elif p.features and any(keyword in f.lower() for f in p.features):
                    if p not in matched_products:
                        matched_products.append(p)
                        
            # If no matches, return all for the sake of the mock
            if not matched_products:
                matched_products = products[:3]
                
            return ChatResponse(
                response=f"This is a mock response (No OpenAI API key provided). Based on your query, I found these great products for your curly hair needs:",
                suggested_products=matched_products[:3]
            )

        # Only import LangChain if a real API key is provided
        from langchain_openai import ChatOpenAI
        from langchain.prompts import PromptTemplate
        from langchain.schema.runnable import RunnableSequence

        if settings.OPENROUTER_API_KEY and settings.OPENROUTER_API_KEY != "sk-or-mock":
            llm = ChatOpenAI(
                temperature=0.7, 
                model_name="openai/gpt-3.5-turbo", 
                api_key=settings.OPENROUTER_API_KEY,
                base_url="https://openrouter.ai/api/v1"
            )
        else:
            llm = ChatOpenAI(temperature=0.7, model_name="gpt-3.5-turbo", api_key=settings.OPENAI_API_KEY)
        
        prompt = PromptTemplate(
            input_variables=["query", "catalog"],
            template="""
            You are a helpful AI assistant for Hydra Curls, a premium hair care brand for curly, coily, and wavy hair.
            A customer is asking for product recommendations.
            
            Customer query: "{query}"
            
            Available Product Catalog:
            {catalog}
            
            Based on the catalog, recommend the best products for the customer.
            Reply with a friendly message explaining why these products fit their needs.
            Also, output the IDs of the recommended products in a comma-separated list at the very end of your response, enclosed in brackets like this: [ID1, ID2].
            """
        )
        
        chain = prompt | llm
        ai_response = await chain.ainvoke({"query": request.query, "catalog": product_descriptions})
        response_text = ai_response.content
        
        # Extract product IDs from the response (simple parser)
        suggested_products = []
        try:
            if "[" in response_text and "]" in response_text:
                id_str = response_text[response_text.rfind("[")+1 : response_text.rfind("]")]
                ids = [int(id.strip()) for id in id_str.split(",") if id.strip().isdigit()]
                suggested_products = [p for p in products if p.id in ids]
                # Remove the bracketed IDs from the user-facing text
                response_text = response_text[:response_text.rfind("[")].strip()
        except Exception as e:
            print(f"Error parsing product IDs: {e}")
            
        return ChatResponse(
            response=response_text,
            suggested_products=suggested_products
        )
        
    except ImportError:
        raise HTTPException(status_code=500, detail="LangChain is not installed properly")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
