from langchain.chains import ConversationalRetrievalChain
from langchain.llms import HuggingFacePipeline 
from transformers import pipeline
from app.prompt_template import get_prompt
from app.memory import get_memory
from app.vector_store import create_vector_db
from app.data_loader import load_documents

def build_chain():
    # Load restaurant data and vector store
    docs = load_documents()
    vectorstore = create_vector_db(docs)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})


    # Load LLaMA model from Hugging Face
    hf_pipeline = pipeline(
        "text-generation",
        model="meta-llama/Llama-2-7b-chat-hf"
        tokenizer="meta-llama/Llama-2-7b-chat-hf"
        max_new_tokens=256,
        temperature=0.7,
        repetition_penalty=1.1
    )

    llm = HuggingFacePipeline(pipeline=hf_pipeline)
    prompt = get_prompt()
    memory = get_memory()

    # Build RAG chain
    chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        memory=memory,
        combine_docs_chain_kwargs={"prompt": prompt}
    )

    return chain