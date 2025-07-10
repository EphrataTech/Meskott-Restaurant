import os
import logging
from dotenv import load_dotenv

from langchain.chains import ConversationalRetrievalChain
from huggingface_hub import InferenceClient
from app.custom_llm import CustomHuggingFaceLLM
from langchain_core.runnables import RunnableLambda

from app.prompt_template import get_prompt
from app.memory import get_memory
from app.vector_store import create_vector_db
from app.data_loader import load_documents

load_dotenv()
logger = logging.getLogger(__name__)

def build_chatbot_chain():
    try:
        # Load and embed restaurant documents
        docs = load_documents()
        vectorstore = create_vector_db(docs)
        retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

        # Set up Hugging Face model client
        hf_token = os.getenv("HF_TOKEN")
        if not hf_token:
            raise EnvironmentError("Missing HF_TOKEN in environment variables.")

        custom_llm = CustomHuggingFaceLLM(
            hf_token=hf_token,
            repo_id="mistralai/Mistral-7B-Instruct-v0.2",
            temperature=0.7,
            max_new_tokens=512,
            repetition_penalty=1.1
        )

        # Wrap it in a Runnable so LangChain can call it properly
        llm = RunnableLambda(lambda input, **kwargs: custom_llm.invoke(input, **kwargs))


        # Prompt and memory
        prompt = get_prompt()
        memory = get_memory()

        # Build the Conversational Retrieval Chain
        chatbot_chain = ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=retriever,
            memory=memory,
            combine_docs_chain_kwargs={"prompt": prompt}
        )

        logger.info("✅ Chatbot chain successfully initialized.")
        return chatbot_chain

    except Exception as e:
        logger.error(f"[Error] Failed to build chatbot chain: {e}")
        raise RuntimeError("Chatbot chain could not be initialized.")
