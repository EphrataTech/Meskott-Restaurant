from langchain.memory import ConversationBufferMemory
from langchain.schema import messages_from_dict, messages_to_dict

def get_memory():
    try:
        return ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True,
            input_key="question"
        )
    except Exception as e:
        print(f"Error setting up memory: {e}")
        raise
