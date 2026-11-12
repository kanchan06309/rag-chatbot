import chromadb

from app.config import settings


client = chromadb.PersistentClient(
    path=settings.CHROMA_PATH
)


collection = client.get_or_create_collection(
    name=settings.COLLECTION_NAME
)


def add_documents(chunks, embeddings):

    ids = [
        chunk["id"]
        for chunk in chunks
    ]

    documents = [
        chunk["text"]
        for chunk in chunks
    ]

    metadatas = [
        chunk["metadata"]
        for chunk in chunks
    ]

    collection.upsert(

        ids=ids,

        documents=documents,

        embeddings=embeddings,

        metadatas=metadatas

    )


def search_documents(query_embedding, top_k=3):

    results = collection.query(

        query_embeddings=[query_embedding],

        n_results=top_k

    )

    return results