from langchain_community.document_loaders import TextLoader, DirectoryLoader
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "restaurant_data")

def load_documents():
    try:
        if not os.path.exists(DATA_PATH):
            raise FileNotFoundError(f"❌ Restaurant data folder not found at: {DATA_PATH}")
        
        loader = DirectoryLoader(DATA_PATH, glob="*.txt", loader_cls=TextLoader)
        docs = loader.load()

        if not docs:
            raise ValueError("⚠️ No documents found in the restaurant data folder. Please add .txt files.")

        print(f"✅ Successfully loaded {len(docs)} documents from '{DATA_PATH}'")
        return docs

    except Exception as e:
        print(f"🚨 Error loading restaurant documents: {e}")
        raise
