from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

# ✅ ROUTES
from routes.search_routes import router as search_router
from routes.book_routes import router as book_router
from routes.admin_route import router as admin_router

# ✅ DB + CONTROLLERS
from configs.db_config import postgres_db, search_db
from controllers.search_controller import search_controller


# ✅ LOGGING
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


# ✅ LIFESPAN (startup/shutdown)
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Server starting...")

    # connect DBs
    # await postgres_db.connect()   # enable if using postgres
    await search_db.connect()

    # init Elasticsearch index
    await search_controller.init_index()

    yield

    print("🛑 Server shutting down...")

    # close DBs
    await postgres_db.close()
    await search_db.close()


# ✅ APP INIT
app = FastAPI(lifespan=lifespan)


# ✅ CORS (for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# ✅ VERSION PREFIX
API_PREFIX = "/api"


# ✅ ROOT
@app.get("/")
async def root():
    return {"message": "Server is running 🚀"}


# ✅ ROUTES
app.include_router(search_router, prefix=f"{API_PREFIX}/search", tags=["Search"])
app.include_router(book_router, prefix=f"{API_PREFIX}/book", tags=["Book"])
app.include_router(admin_router, prefix=f"{API_PREFIX}/admin", tags=["Admin"])


# ✅ RUN
if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )