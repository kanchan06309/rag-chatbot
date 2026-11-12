import fitz


def load_pdf(file_path):

    document = fitz.open(file_path)

    extracted_pages = []

    for page_number, page in enumerate(document):

        text = page.get_text("text")

        if text.strip():

            extracted_pages.append({

                "text": text,

                "metadata": {

                    "source": document.name,

                    "page": page_number + 1

                }

            })

    document.close()

    return extracted_pages