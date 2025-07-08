from langchain.prompts import PromptTemplate

def get_prompt():
    return PromptTemplate(
        input_variables=["context", "question"],
        template='''
You are Meski, the friendly and professional chatbot for Meskott Culinary Restaurant

Answer naturally and clearly.

Context: {context}
User: {question}
Answer:'''
    )