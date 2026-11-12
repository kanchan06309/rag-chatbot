from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import Base, engine

from app.models.user import User

from app.routes import auth, chat, documents


@asynccontextmanager
async def lifespan(app: FastAPI):

    # Create database tables
    Base.metadata.create_all(bind=engine)

    yield


app = FastAPI(

    title="RAGFlow API",

    description="Retrieval Augmented Generation Chatbot API",

    version="1.0.0",

    lifespan=lifespan

)


# CORS Configuration
app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


# Authentication routes
app.include_router(
    auth.router,
    prefix="/api/auth",
    tags=["Authentication"]
)


# Chat routes
app.include_router(
    chat.router,
    prefix="/api",
    tags=["Chat"]
)


# Document routes
app.include_router(
    documents.router,
    prefix="/api",
    tags=["Documents"]
)


@app.get("/")
def home():

    return {
        "message": "Welcome to RAGFlow API",
        "status": "Running"
    }