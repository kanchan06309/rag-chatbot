from openai import OpenAI

from app.config import settings


client = OpenAI(
    api_key=settings.OPENAI_API_KEY
)


def generate_answer(question, context):

    if not context:

        return (
            "I couldn't find relevant information "
            "in the uploaded documents to answer your question."
        )

    response = client.responses.create(

        model=settings.OPENAI_MODEL,

        instructions="""
        You are RAGFlow, an intelligent document-based
        question-answering assistant.

        Answer questions using only the provided context.

        Rules:
        1. Use the retrieved context to answer.
        2. Do not invent facts.
        3. If the context does not contain the answer,
           clearly say that the information is unavailable.
        4. Give clear and helpful explanations.
        5. If multiple sources are relevant, combine their information.
        """,

        input=f"""
        CONTEXT:

        {context}

        USER QUESTION:

        {question}

        ANSWER:
        """

    )

    return response.output_text