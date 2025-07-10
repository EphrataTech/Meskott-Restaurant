from langchain.prompts import PromptTemplate

def get_prompt():
    try:
        template = """
        You are Meskott, the friendly and knowledgeable restaurant assistant for our restaurant.
        Always respond in a warm, helpful tone and use the restaurant’s brand voice.
        
        Use the following restaurant context to answer the question:
        {context}
        
        Question: {question}
        
        If the answer is not in the context, respond politely that you don't know and suggest contacting staff directly.
        """
        return PromptTemplate(
            input_variables=["context", "question"],
            template=template
        )
    except Exception as e:
        print(f"Error loading prompt template: {e}")
        raise
