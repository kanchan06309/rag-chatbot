from fastapi import APIRouter, Depends, HTTPException

from pydantic import BaseModel, Field

from app.models.user import User

from app.services.retriever import retrieve_context

from app.services.llm import generate_answer

from app.services.authentication import get_current_user


router = APIRouter()


class ChatRequest(BaseModel):

    question: str = Field(min_length=1, max_length=4000)


@router.post("/chat")
def chat(

    data: ChatRequest,

    current_user: User = Depends(get_current_user)

):

    try:

        question = data.question.strip()

        if not question:

            raise HTTPException(
                status_code=400,
                detail="Question cannot be empty"
            )

        # Retrieve relevant chunks
        retrieved_chunks = retrieve_context(
            question,
            top_k=3
        )

        # Prepare context
        context = "\n\n".join(
            chunk["text"]
            for chunk in retrieved_chunks
        )

        # Generate answer
        answer = generate_answer(
            question,
            context
        )

        # Prepare sources
        sources = []

        seen_sources = set()

        for chunk in retrieved_chunks:

            source_key = (
                chunk["source"],
                chunk["page"]
            )

            if source_key not in seen_sources:

                sources.append({

                    "document": chunk["source"],

                    "page": chunk["page"]

                })

                seen_sources.add(source_key)

        return {

            "answer": answer,

            "sources": sources

        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate answer: {str(e)}"
        )