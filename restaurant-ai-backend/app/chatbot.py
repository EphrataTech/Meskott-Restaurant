import os
import logging
from dotenv import load_dotenv

from langchain.chains import ConversationalRetrievalChain
from langchain_core.runnables import RunnableLambda

from app.custom_llm import CustomHuggingFaceLLM
from app.prompt_template import get_prompt
from app.memory import get_memory
from app.vector_store import load_vector_db, create_vector_db
from app.data_loader import load_documents

load_dotenv()
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# Cache the chain globally to avoid reload
_cached_chain = None


def build_chatbot_chain():
    global _cached_chain
    if _cached_chain:
        logger.info("📦 Returning cached chatbot chain.")
        return _cached_chain

    try:
        # Use existing Chroma DB or create one if missing
        vectorstore = load_vector_db()
        if not vectorstore:
            logger.info("📁 No existing vector DB found. Creating a new one...")
            docs = load_documents()
            vectorstore = create_vector_db(docs)

        retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

        # Load Hugging Face token
        hf_token = os.getenv("HF_TOKEN")
        if not hf_token:
            raise EnvironmentError("❌ Missing or invalid HF_TOKEN in environment variables.")

        # Initialize custom LLM
        custom_llm = CustomHuggingFaceLLM(
            hf_token=hf_token,
            repo_id="mistralai/Mistral-7B-Instruct-v0.2",
            temperature=0.7,
            max_new_tokens=512,
            repetition_penalty=1.1
        )

        # LangChain expects Runnable
        llm = RunnableLambda(lambda input, **kwargs: custom_llm.invoke(input, **kwargs))

        # Load prompt template & memory
        prompt = get_prompt()
        memory = get_memory()

        # Build the chain
        chatbot_chain = ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=retriever,
            memory=memory,
            combine_docs_chain_kwargs={"prompt": prompt}
        )

        logger.info("✅ Chatbot chain successfully initialized.")
        _cached_chain = chatbot_chain
        return chatbot_chain

    except Exception as e:
        logger.error(f"❌ Failed to build chatbot chain: {e}")
        raise RuntimeError("Chatbot chain could not be initialized.")
