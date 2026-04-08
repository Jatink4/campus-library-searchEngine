from fastapi import APIRouter, HTTPException
from controllers.book_controller import book_controller

router = APIRouter()

@router.get("/{book_id}")
async def get_book(book_id: int):
    return await book_controller.get_book_temp(book_id)