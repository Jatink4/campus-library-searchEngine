from fastapi import APIRouter, HTTPException
from models.book import Book
from database.db import books
import os

router = APIRouter()

@router.post("/admin/login")
def login(password: str):

    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

    if password == ADMIN_PASSWORD:
        return {"status": "success"}

    raise HTTPException(status_code=401, detail="Wrong password")


@router.post("/admin/add-book")
def add_book(book: Book):

    books.append(book.dict())

    return {"message": "Book added"}


@router.get("/admin/books")
def get_books():

    return books


@router.delete("/admin/delete-book/{book_id}")
def delete_book(book_id: int):

    books.pop(book_id)

    return {"message": "Book removed"}