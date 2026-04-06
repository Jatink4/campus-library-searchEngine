from pydantic import BaseModel
from fastapi import HTTPException

class Publisher(BaseModel):
    id: int | None = None
    name: str

class PublisherController:
    
    def __init__(self, db):
        self.db = db
    

    async def create_publisher(self, publisher: Publisher):
        try:
            query = "INSERT INTO publishers (name) VALUES ($1) RETURNING id, name"
            result = await self.db.query(query, publisher.name)
            return {"id": result[0]["id"], "name": result[0]["name"]} if result else None
        except Exception as e:
            print(f"Error creating publisher: {e}")
            raise HTTPException(status_code=500, detail="Error creating publisher")

    async def get_publisher(self, publisher_id: int):
        try:
            query = "SELECT * FROM publishers WHERE id = $1"
            result = await self.db.query(query, publisher_id)
            return result[0] if result else {}
        except Exception as e:
            print(f"Error fetching publisher: {e}")
            raise HTTPException(status_code=500, detail="Error fetching publisher")
        

