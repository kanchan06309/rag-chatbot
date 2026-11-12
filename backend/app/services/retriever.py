from app.services.embedding import generate_query_embedding

from app.services.vector_store import search_documents


def retrieve_context(question, top_k=3):

    query_embedding = generate_query_embedding(question)

    results = search_documents(
        query_embedding,
        top_k
    )

    if not results["documents"] or not results["documents"][0]:

        return []

    retrieved_chunks = []

    for i, document in enumerate(results["documents"][0]):

        metadata = results["metadatas"][0][i]

        retrieved_chunks.append({

            "text": document,

            "source": metadata.get("source", "Unknown"),

            "page": metadata.get("page", 0)

        })

    return retrieved_chunks