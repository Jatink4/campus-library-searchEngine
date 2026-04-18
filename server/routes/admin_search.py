from fastapi import APIRouter, Query
from controllers.search_controller import search_controller

router = APIRouter()


@router.get("/search")
async def search_books(
    query: str = "",
    author: str | None = None,
    publisher: str | None = None,
    category: str | None = None,
    tag: str | None = None,
    language: str | None = None,
    year_gte: int | None = None,
    year_lte: int | None = None,
):

    filters = {
        "author": author,
        "publisher": publisher,
        "category": category,
        "tag": tag,
        "language": language,
        "year_gte": year_gte,
        "year_lte": year_lte
    }

    return await search_controller.search(query.strip(), filters)