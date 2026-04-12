from pydantic import BaseModel
from typing import List

class Book(BaseModel):

    title: str
    description: str
    authors: List[str]
    publisher: str
    year: int
    subject: str