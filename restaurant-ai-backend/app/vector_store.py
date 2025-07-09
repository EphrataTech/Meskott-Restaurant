# def create_vector_db(docs):
#     from langchain_chroma import Chroma
#     from langchain_huggingface import HuggingFaceEmbeddings
#     import os

#     try:
#         embedding = HuggingFaceEmbeddings(
#             model_name="sentence-transformers/all-MiniLM-L6-v2",
#             model_kwargs={'device': 'cpu'}, 
#             encode_kwargs={'normalize_embeddings': True}
#         )
        
#         # Create db directory if it doesn't exist
#         os.makedirs("db", exist_ok=True)
        
#         return Chroma.from_documents(
#             documents=docs, 
#             embedding=embedding, 
#             persist_directory="db/"
#         )
    
#     except Exception as e:
#         print(f"Error creating vector database: {e}")
#         raise






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

        text_splitter = CharacterTextSplitter(chunk_size=800, chunk_overlap=100)
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
