import os

from dotenv import load_dotenv

load_dotenv()


class Settings:

    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "sqlite:///./ragflow.db"
    )

    SECRET_KEY = os.getenv("SECRET_KEY")

    ALGORITHM = os.getenv("ALGORITHM", "HS256")

    ACCESS_TOKEN_EXPIRE_MINUTES = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60)
    )

    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

    OPENAI_MODEL = os.getenv(
        "OPENAI_MODEL",
        "gpt-4.1-mini"
    )

    EMBEDDING_MODEL = os.getenv(
        "EMBEDDING_MODEL",
        "sentence-transformers/all-MiniLM-L6-v2"
    )

    CHROMA_PATH = os.getenv("CHROMA_PATH", "./chroma_db")

    COLLECTION_NAME = os.getenv(
        "COLLECTION_NAME",
        "rag_documents"
    )


settings = Settings()