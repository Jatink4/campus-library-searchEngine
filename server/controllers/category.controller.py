from pydantic import BaseModel
from fastapi import HTTPException

class Category(BaseModel):
    id: int | None = None
    name: str

class CategoryController:

    def __init__(self, db):
        self.db = db
    

    async def create_category(self, category: Category):
        try:
            query = "INSERT INTO categories (name) VALUES ($1) RETURNING id, name"
            result = await self.db.query(query, category.name)
            return {"id": result[0]["id"], "name": result[0]["name"]} if result else None
        except Exception as e:
            print(f"Error creating category: {e}")
            raise HTTPException(status_code=500, detail="Error creating category")

    async def get_category(self, category_id: int):
        try:
            query = "SELECT * FROM categories WHERE id = $1"
            result = await self.db.query(query, category_id)
            return result[0] if result else {}
        except Exception as e:
            print(f"Error fetching category: {e}")
            raise HTTPException(status_code=500, detail="Error fetching category")