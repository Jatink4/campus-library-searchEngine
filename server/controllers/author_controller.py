from pydantic import BaseModel
from fastapi import HTTPException

class Author(BaseModel):
    id: int | None = None
    name: str


class AuthorController:

    def __init__(self, db):
        self.db = db
    

    async def create_author(self, author: Author):
        try:
            query = "INSERT INTO authors (name) VALUES ($1) RETURNING id, name"
            result = await self.db.query(query, author.name)
            return {"id": result[0]["id"], "name": result[0]["name"]} if result else None
        except Exception as e:
            print(f"Error creating author: {e}")
            raise HTTPException(status_code=500, detail="Error creating author")

    async def get_author(self, author_id: int):
        try:
            query = "SELECT * FROM authors WHERE id = $1"
            result = await self.db.query(query, author_id)
            return result[0] if result else {}
        except Exception as e:
            print(f"Error fetching author: {e}")
            raise HTTPException(status_code=500, detail="Error fetching author")