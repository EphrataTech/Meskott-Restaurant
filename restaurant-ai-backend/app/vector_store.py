from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import CharacterTextSplitter
import os
import shutil

CHROMA_PATH = "chroma_db"

def create_vector_db(documents):
    try:
        # Clear old DB if exists
        if os.path.exists(CHROMA_PATH):
            shutil.rmtree(CHROMA_PATH)

        text_splitter = CharacterTextSplitter(
            separator="\n\n",  # Ensures Q&A pairs remain intact
            chunk_size=1000,
            chunk_overlap=0
        )
        chunks = text_splitter.split_documents(documents)

        embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        vectordb = Chroma.from_documents(
            documents=chunks,
            embedding=embedding_model,
            persist_directory=CHROMA_PATH
        )

        return vectordb
    except Exception as e:
        print(f"Error creating vector DB: {e}")
        raise
