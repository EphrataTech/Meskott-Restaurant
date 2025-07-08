def create_vector_db(docs):
    from langchain.vectorstores import Chroma
    from langchain.embeddings import HuggingFaceBgeEmbeddings

    embedding = HuggingFaceBgeEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    return Chroma.from_documents(documents=docs, embedding=embedding, persist_directory="db/")