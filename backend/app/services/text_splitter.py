from langchain_text_splitters import RecursiveCharacterTextSplitter


def split_documents(pages):

    splitter = RecursiveCharacterTextSplitter(

        chunk_size=1000,

        chunk_overlap=150

    )

    chunks = []

    for page in pages:

        page_chunks = splitter.split_text(page["text"])

        for chunk in page_chunks:

            chunks.append({

                "text": chunk,

                "metadata": page["metadata"]

            })

    return chunks