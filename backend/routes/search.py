from fastapi import APIRouter
from database.db import books

router = APIRouter()

@router.get("/search")
def search_books(query: str):

    results = []

    for book in books:

        if (
            query.lower() in book["title"].lower()
            or query.lower() in book["subject"].lower()
            or any(query.lower() in a.lower() for a in book["authors"])
        ):
            results.append(book)

    return results