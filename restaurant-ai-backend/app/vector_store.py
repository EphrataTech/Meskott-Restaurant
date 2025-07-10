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
            separator="\n\n",  # Keeps Q&A blocks intact
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

        print(f"✅ Vector DB created with {len(chunks)} chunks.")
        return vectordb
    except Exception as e:
        print(f"❌ Error creating vector DB: {e}")
        raise


def load_vector_db():
    try:
        if os.path.exists(CHROMA_PATH) and os.listdir(CHROMA_PATH):
            embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
            vectordb = Chroma(
                persist_directory=CHROMA_PATH,
                embedding_function=embedding_model
            )
            print("✅ Loaded existing Chroma vector DB.")
            return vectordb
        else:
            print("⚠️ No existing Chroma DB found.")
            return None
    except Exception as e:
        print(f"🚧 Error loading vector DB: {e}")
        raise
