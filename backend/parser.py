import fitz
import re

def extract_text_from_pdf(pdf_bytes):
    """Extracts and cleans text from a given PDF file."""
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    text = '\n'.join([page.get_text("text") for page in doc])

    # Clean the extracted text
    text = text.replace("", "-")  # Replace bullet points with dashes
    text = re.sub(r"\n\s*\n", "\n", text)  # Remove excessive empty lines
    text = re.sub(r"\s{2,}", " ", text)  # Replace multiple spaces with a single space
    print(text)
    return text.strip()

