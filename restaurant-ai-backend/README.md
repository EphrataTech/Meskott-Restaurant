
# 🍽️ Meskott Restaurant AI Chatbot

An AI-powered chatbot for the fictional Meskott Restaurant. The system answers customer queries about hours, menu, booking, dietary needs, and more — all while staying on brand.

---

## ✨ Features

- 🤖 FastAPI-based AI chatbot API
- 🧠 RAG pipeline using LangChain, Mistral (via Hugging Face Inference API), and ChromaDB
- 🗃️ Vector-based document search from restaurant knowledge base
- 🧾 Session logging for all chat interactions

---

## 📁 Project Structure

```
restaurant-ai-backend/
├── app/
│   ├── main.py              # FastAPI app entrypoint
│   ├── chatbot.py           # Chat logic and chain setup
│   ├── prompt_template.py   # Custom system prompt
│   ├── memory.py            # Conversational memory management
│   ├── vector_store.py      # ChromaDB vector search setup
│   └── data_loader.py       # Loads restaurant docs into vector DB
├── admin_tool/
│   └── app.py               # Streamlit admin panel
├── chat_logs/               # Stored chat logs as JSON
├── requirements.txt         # Python dependencies
└── Dockerfile               # (optional) Docker config
```

---

## 🚀 Running Locally

### 1. Clone the repo
```bash
git clone https://github.com/EphrataTech/Meskott-Restaurant.git
cd restaurant-ai-backend
```

### 2. Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

---

## 🧪 Testing the API with Postman

1. **Start the backend**:

   ```bash
   uvicorn app.main:app --reload
   ```

2. **Access Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)

3. **Test Endpoint Example**:

   - `POST /chat`
   - Body:
     ```json
     {
       "message": "What are your vegetarian options?",
       "session_id": "session_123"
     }
     ```

---

## 🧠 Using the Chatbot

### Start FastAPI Backend
```bash
uvicorn app.main:app --reload
```

- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🧑‍💼 Using the Admin Tool

### Navigate to admin_tool directory and run:
```bash
cd admin_tool
streamlit run app.py
```

- Admin Dashboard: [http://localhost:8501](http://localhost:8501)

---

## 🐳 Dockerized Setup

### 1. Build and run with Docker Compose

```bash
docker-compose up --build
```

### 2. Access the apps

- FastAPI: [http://localhost:8000](http://localhost:8000)
- Admin Panel: [http://localhost:8501](http://localhost:8501)

### 3. Stopping containers

```bash
docker-compose down
```

---

## 🗂️ Flagging & Feedback

- All chat sessions are logged as JSON files under `chat_logs/`
- The admin tool lets reviewers flag responses or suggest improvements
- Feedback is saved in `admin_tool/flagged_feedback.json`

---

## 🌐 Deployment

You can deploy this project on **Render** (or any cloud provider). The backend and admin tool can be deployed as separate web services.

Want to auto-deploy? Ask us for a `render.yaml` file!

---

## ⚙️ Tech Stack

- FastAPI
- Streamlit
- LangChain
- Hugging Face Inference API (LLaMA 2)
- ChromaDB
- Docker (optional)

---

## 🧪 Example Queries

> "Do you offer vegan options?"  
> "What are your opening hours on weekends?"  
> "Can I book a table for 4 on Friday night?"

---

## 🛠️ Authors

- Raymond Odhiambo — [GitHub](https://github.com/rayymaxx)

---

> Meskott Restaurant AI Assistant – empowering digital hospitality 🍽️🤖