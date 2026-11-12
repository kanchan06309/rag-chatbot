from sentence_transformers import SentenceTransformer

from app.config import settings


model = SentenceTransformer(
    settings.EMBEDDING_MODEL
)


def generate_embeddings(texts):

    embeddings = model.encode(
        texts,
        normalize_embeddings=True
    )

    return embeddings.tolist()


def generate_query_embedding(question):

    embedding = model.encode(
        question,
        normalize_embeddings=True
    )

    return embedding.tolist()