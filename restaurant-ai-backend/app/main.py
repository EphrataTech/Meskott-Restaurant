from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from app.chatbot import build_chatbot_chain
from app.chat_logger import log_query

import uuid
import logging

# Initialize app
app = FastAPI()

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to frontend domain in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema(pydantic)
class ChatRequest(BaseModel):
    session_id: str | None = None
    message: str

# Global chatbot chain instance (loaded once on startup)
chatbot_chain = None

# In-memory store for chatbot chains
chat_sessions = {}

@app.on_event("startup")
async def startup_event():
    global chatbot_chain
    logger.info("🚀Starting Meskott Chatbot backend...")
    chatbot_chain = build_chatbot_chain
    logger.info("✅ Chatbot chain is ready")

@app.get("/")
async def root():
    return {
        "message": "✅ Meskott Chatbot backend is running!",
        "docs": "/docs",
        "status": "healthy"
    }

# Health check
@app.get("/health")
async def health_check():
    return {"status": " ✅ OK"}

@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        if not req.message.strip():
            raise HTTPException(status_code=400, detail="🚨 Message cannot be empty.")

        # Use existing or generate new session_id
        session_id = req.session_id or str(uuid.uuid4())

        # Create a new chain for a new session
        if session_id not in chat_sessions:
            chat_sessions[session_id] = build_chatbot_chain()
            logger.info(f"🔗 New chatbot session created: {session_id}")

        chain = chat_sessions[session_id]

        # Send message to chatbot
        response = chain.invoke({"question": req.message})
        answer = response.get("answer", "Sorry, I couldn't find an answer.")

        # log query and response
        log_query(session_id=session_id, question=req.message, answer=answer)
        

        return {
            "session_id": session_id,
            "response": answer
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Chatbot error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
