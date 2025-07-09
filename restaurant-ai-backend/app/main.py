# # from fastapi import FastAPI, Request, HTTPException
# # from fastapi.middleware.cors import CORSMiddleware
# # from app.chatbot import build_chain
# # import traceback
# # import logging
# # import os

# # # Set up logging
# # logging.basicConfig(level=logging.INFO)
# # logger = logging.getLogger(__name__)

# # app = FastAPI()

# # # Initialize chain with error handling
# # try:
# #     qa_chain = build_chain()
# #     logger.info("Chatbot chain initialized successfully")
# # except Exception as e:
# #     logger.error(f"Failed to initialize chatbot chain: {e}")
# #     logger.info("Server will start but chatbot functionality will be unavailable")

# # # CORS 
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],  # Specify frontend URLs
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # @app.get("/")
# # async def root():
# #     return {
# #         "message": "Meskott Chatbot backend is running!",
# #         "chatbot_status": "available" if qa_chain else "unavailable"
# #     }

# # @app.get("/health")
# # async def health():
# #     return {
# #         "status": "healthy",
# #         "chatbot_initialized": qa_chain is not None
# #     }

# # @app.post("/chat")
# # async def chat(request: Request):
# #     if not qa_chain:
# #         raise HTTPException(
# #             status_code=503,
# #             detail="Chatbot not initialized. Check server logs for details."
# #         )
    
# #     try:
# #         data = await request.json()
# #         user_input = data.get("message")
        
# #         if not user_input or not user_input.strip():
# #             raise HTTPException(status_code=400, detail="No message provided")
        
# #         response = qa_chain.invoke({"question": user_input})

# #         logger.info(f"Chain response: {response}")
        
# #         answer = response.get("answer", "I'm sorry, I couldn't process your request.")
        
# #         return {"response": answer}
    
# #     except Exception as e:
# #         logger.error(f"Error in chat endpoint: {e}")
# #         logger.error(traceback.format_exc())
# #         raise HTTPException(status_code=500, detail="Internal server error")









# # app/main.py

# from fastapi import FastAPI, Request, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from app.chatbot import build_chatbot_chain
# import uuid
# import logging

# app = FastAPI()

# # Enable CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # For production, restrict this to your frontend domain
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Pydantic model for chat input
# class ChatRequest(BaseModel):
#     session_id: str
#     message: str

# # In-memory storage for session-based chains
# chat_sessions = {}

# @app.on_event("startup")
# async def startup_event():
#     try:
#         logging.info("Application startup successful.")
#     except Exception as e:
#         logging.error(f"Startup error: {e}")

# @app.post("/chat")
# async def chat(req: ChatRequest):
#     try:
#         session_id = req.session_id or str(uuid.uuid4())
#         message = req.message

#         # Create new chatbot chain if session is new
#         if session_id not in chat_sessions:
#             chat_sessions[session_id] = build_chatbot_chain()

#         qa_chain = chat_sessions[session_id]
#         response = qa_chain.invoke({"question": message})

#         return {
#             "session_id": session_id,
#             "response": response["answer"]
#         }

#     except ValueError as ve:
#         logging.error(f"Value error: {ve}")
#         raise HTTPException(status_code=400, detail=str(ve))
#     except Exception as e:
#         logging.error(f"Unexpected error: {e}")
#         raise HTTPException(status_code=500, detail="Internal Server Error")

# @app.get("/health")
# async def health_check():
#     return {"status": "OK"}









# app/main.py

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.chatbot import build_chatbot_chain
import uuid
import logging

# Initialize app
app = FastAPI()

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# CORS setup (customize for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend domain in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class ChatRequest(BaseModel):
    session_id: str | None = None
    message: str

# In-memory store for chatbot chains
chat_sessions = {}

@app.on_event("startup")
async def startup_event():
    logger.info("🚀 FastAPI app started")

@app.get("/")
async def root():
    return {
        "message": "Meskott Chatbot backend is running!",
        "docs": "/docs",
        "status": "healthy"
    }

@app.get("/health")
async def health_check():
    return {"status": "OK"}

@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        if not req.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty.")

        session_id = req.session_id or str(uuid.uuid4())

        # Create a new chain for a new session
        if session_id not in chat_sessions:
            chat_sessions[session_id] = build_chatbot_chain()
            logger.info(f"🔗 New chatbot session created: {session_id}")

        chain = chat_sessions[session_id]

        response = chain.invoke({"question": req.message})
        answer = response.get("answer", "Sorry, I couldn't find an answer.")

        return {
            "session_id": session_id,
            "response": answer
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"💥 Chatbot error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
