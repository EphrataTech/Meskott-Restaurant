import json
import os
from datetime import datetime

LOG_DIR = "chat_logs"

os.makedirs(LOG_DIR, exist_ok=True)


def log_query(session_id: str, question: str, answer: str):
    entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "question": question.strip(),
        "response": answer.strip()
    }

    # Create a session-specific log file
    session_log_file = os.path.join(LOG_DIR, f"{session_id}.json")

    # Load existing log session if it exists
    if os.path.exists(session_log_file):
        with open(session_log_file, "r", encoding="utf-8") as f:
            try:
                session_logs = json.load(f)
            except json.JSONDecodeError:
                session_logs = []
    else:
        session_logs = []


    session_logs.append(entry)

    with open(session_log_file, "w", encoding="utf-8") as f:
        f.write(json.dumps(session_logs, indent=4))