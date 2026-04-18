from fastapi import APIRouter, HTTPException, Body
from models.book import Book
from controllers.search_controller import search_controller
from configs.db_config import search_db
import os
import json

router = APIRouter()

JSON_FILE = "books.json"


# 🔐 LOGIN (same)
@router.post("/admin/login")
def login(password: str = Body(...)):
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

    if password == ADMIN_PASSWORD:
        return {"status": "success"}

    raise HTTPException(status_code=401, detail="Wrong password")


# ➕ ADD BOOK (ELASTIC + JSON)
@router.post("/admin/add-book")
async def add_book(book: Book):

    # 1️⃣ add to Elasticsearch
    result = await search_controller.index_book(book.dict())

    # 2️⃣ update JSON file
    try:
        with open(JSON_FILE, "r") as f:
            data = json.load(f)
    except:
        data = []

    new_book = book.dict()
    new_book["id"] = len(data)

    data.append(new_book)

    with open(JSON_FILE, "w") as f:
        json.dump(data, f, indent=2)

    return {
        "message": "Book added",
        "elastic": result,
        "json_updated": True
    }


# 📚 GET ALL BOOKS (FROM ELASTIC)
@router.post("/admin/books")
async def get_books():
    return await search_controller.search("", {})


# ❌ DELETE BOOK (ELASTIC + JSON)
@router.delete("/admin/delete-book/{book_id}")
async def delete_book(book_id: int):

    # 1️⃣ delete from elastic
    try:
        await search_db.delete(index="books", doc_id=book_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # 2️⃣ delete from JSON
    try:
        with open(JSON_FILE, "r") as f:
            data = json.load(f)

        if book_id >= len(data):
            raise HTTPException(status_code=404, detail="Book not found")

        data.pop(book_id)

        with open(JSON_FILE, "w") as f:
            json.dump(data, f, indent=2)

    except:
        pass

    return {"message": "Deleted from elastic + json"}