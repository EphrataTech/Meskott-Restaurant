import streamlit as st
import os
import json
from datetime import datetime

# Paths (robust absolute-based)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CHAT_LOGS_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "chat_logs"))
FLAGGED_LOGS_FILE = os.path.join(BASE_DIR, "flagged_feedback.json")

# Page config
st.set_page_config(page_title="Meskott Admin Tool", layout="wide")
st.title("📋 Meskott Chatbot Admin Panel")

# Ensure log directory exists
if not os.path.exists(CHAT_LOGS_DIR):
    st.error(f"Chat logs directory not found: {CHAT_LOGS_DIR}")
    st.stop()

# Load session logs
sessions = [f for f in os.listdir(CHAT_LOGS_DIR) if f.endswith(".json")]

if not sessions:
    st.warning("No session logs found.")
    st.stop()

# Select a session
selected_session = st.selectbox("🧾 Select a session", sessions)

# Display chat history
if selected_session:
    session_path = os.path.join(CHAT_LOGS_DIR, selected_session)

    try:
        with open(session_path, "r", encoding="utf-8") as f:
            chat_data = json.load(f)
    except json.JSONDecodeError:
        st.error("❌ Failed to load chat log. File may be corrupted.")
        st.stop()

    st.markdown("---")
    st.subheader(f"🗂️ Session: {selected_session}")

    for i, entry in enumerate(chat_data):
        st.markdown(f"**Q{i+1}:** {entry['question']}")
        st.markdown(f"**A{i+1}:** {entry['response']}")

        col1, col2 = st.columns([1, 3])
        with col1:
            if st.button("❌ Flag", key=f"flag_{i}"):
                # Save flagged entry
                flagged_entry = {
                    "session_id": entry["session_id"],
                    "timestamp": entry["timestamp"],
                    "question": entry["question"],
                    "response": entry["response"],
                    "source_file": selected_session,
                    "status": "flagged"
                }

                flagged_data = []
                if os.path.exists(FLAGGED_LOGS_FILE):
                    with open(FLAGGED_LOGS_FILE, "r", encoding="utf-8") as log_f:
                        try:
                            flagged_data = json.load(log_f)
                        except json.JSONDecodeError:
                            flagged_data = []

                flagged_data.append(flagged_entry)
                with open(FLAGGED_LOGS_FILE, "w", encoding="utf-8") as log_f:
                    json.dump(flagged_data, log_f, indent=4)

                st.success("✅ Response flagged!")

        with col2:
            with st.expander("📝 Suggest improved answer", expanded=False):
                improved = st.text_area(f"Improved Answer for Q{i+1}", key=f"improve_{i}")
                if st.button("💾 Save Suggestion", key=f"save_{i}"):
                    flagged_entry = {
                        "session_id": entry["session_id"],
                        "timestamp": entry["timestamp"],
                        "question": entry["question"],
                        "response": entry["response"],
                        "suggested_fix": improved.strip(),
                        "source_file": selected_session,
                        "status": "fixed"
                    }

                    flagged_data = []
                    if os.path.exists(FLAGGED_LOGS_FILE):
                        with open(FLAGGED_LOGS_FILE, "r", encoding="utf-8") as log_f:
                            try:
                                flagged_data = json.load(log_f)
                            except json.JSONDecodeError:
                                flagged_data = []

                    flagged_data.append(flagged_entry)
                    with open(FLAGGED_LOGS_FILE, "w", encoding="utf-8") as log_f:
                        json.dump(flagged_data, log_f, indent=4)

                    st.success("✅ Suggestion saved.")
