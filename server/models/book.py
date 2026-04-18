from pydantic import BaseModel
from typing import List, Optional

class Book(BaseModel):
    id: Optional[int] = None
    title: str
    authors: List[str]
    publisher: str
    publication_year: int
    isbn: str
    description: str
    tags: List[str]
    categories: List[str]
    edition: str
    pages: int
    language: str