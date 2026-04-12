from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import admin, search
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# include routers
app.include_router(admin.router)
app.include_router(search.router)