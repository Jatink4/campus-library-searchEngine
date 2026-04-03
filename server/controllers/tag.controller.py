from pydantic import BaseModel
from fastapi import HTTPException

class Tag(BaseModel):
    id: int | None = None
    name: str

class TagController:

    def __init__(self, db):
        self.db = db
    

    async def create_tag(self, tag: Tag):
        try:
            query = "INSERT INTO tags (name) VALUES ($1) RETURNING id, name"
            result = await self.db.query(query, tag.name)
            return {"id": result[0]["id"], "name": result[0]["name"]} if result else None
        except Exception as e:
            print(f"Error creating tag: {e}")
            raise HTTPException(status_code=500, detail="Error creating tag")

    async def get_tag(self, tag_id: int):
        try:
            query = "SELECT * FROM tags WHERE id = $1"
            result = await self.db.query(query, tag_id)
            return result[0] if result else {}
        except Exception as e:
            print(f"Error fetching tag: {e}")
            raise HTTPException(status_code=500, detail="Error fetching tag")