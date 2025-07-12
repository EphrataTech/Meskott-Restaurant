from langchain_community.vectorstores import Chroma
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.base import Embeddings
from huggingface_hub import InferenceClient
import os
import shutil

CHROMA_PATH = "chroma_db"
HF_EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")


class HuggingFaceAPIEmbedding(Embeddings):
    def __init__(self, model_name: str, token: str):
        self.client = InferenceClient(model=model_name, token=token)

    def embed_documents(self, texts):
        return [self.client.feature_extraction(text) for text in texts]

    def embed_query(self, text):
        return self.client.feature_extraction(text)


def create_vector_db(documents):
    try:
        if os.path.exists(CHROMA_PATH):
            shutil.rmtree(CHROMA_PATH)

        text_splitter = CharacterTextSplitter(
            separator="\n\n",
            chunk_size=1000,
            chunk_overlap=0
        )
        chunks = text_splitter.split_documents(documents)

        embedding_model = HuggingFaceAPIEmbedding(
            model_name=HF_EMBEDDING_MODEL,
            token=HUGGINGFACE_API_KEY
        )

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
            embedding_model = HuggingFaceAPIEmbedding(
                model_name=HF_EMBEDDING_MODEL,
                token=HUGGINGFACE_API_KEY
            )
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
