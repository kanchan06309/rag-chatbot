import os
import uuid

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends

from app.models.user import User

from app.services.document_loader import load_pdf

from app.services.text_splitter import split_documents

from app.services.embedding import generate_embeddings

from app.services.vector_store import add_documents

from app.services.authentication import get_current_user


router = APIRouter()

DOCUMENT_DIR = "data/documents"

os.makedirs(DOCUMENT_DIR, exist_ok=True)


@router.post("/documents/ingest")
async def ingest_document(

    file: UploadFile = File(...),

    current_user: User = Depends(get_current_user)

):

    if not file.filename or not file.filename.lower().endswith(".pdf"):

        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported"
        )

    if not file.content_type == "application/pdf":

        raise HTTPException(
            status_code=400,
            detail="Invalid PDF content type"
        )

    document_id = str(uuid.uuid4())

    file_path = os.path.join(
        DOCUMENT_DIR,
        f"{document_id}.pdf"
    )

    try:

        contents = await file.read()

        if not contents or len(contents) > 20 * 1024 * 1024:

            raise HTTPException(
                status_code=400,
                detail="File is empty or exceeds the 20 MB limit"
            )

        with open(file_path, "wb") as f:
            f.write(contents)

        pages = load_pdf(file_path)

        if not pages:

            raise HTTPException(
                status_code=400,
                detail="No readable text found in PDF"
            )

        chunks = split_documents(pages)

        for index, chunk in enumerate(chunks):

            chunk["id"] = f"{document_id}_{index}"

            chunk["metadata"]["document_id"] = document_id

            chunk["metadata"]["uploaded_by"] = current_user.id

            chunk["metadata"]["source"] = file.filename

        embeddings = generate_embeddings([
            chunk["text"] for chunk in chunks
        ])

        add_documents(chunks, embeddings)

        return {

            "message": "Document processed successfully",

            "document_id": document_id,

            "filename": file.filename,

            "total_chunks": len(chunks)

        }

    except HTTPException:
        if os.path.exists(file_path):
            os.remove(file_path)
        raise

    except Exception as e:

        if os.path.exists(file_path):
            os.remove(file_path)

        raise HTTPException(
            status_code=500,
            detail=f"Document processing failed: {str(e)}"
        )

    finally:

        await file.close()