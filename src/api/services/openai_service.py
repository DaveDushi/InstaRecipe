from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()

def create_embedding(input_text):
    """
    Create an embedding for the given input text using OpenAI's Embeddings API.
    """
    response = client.embeddings.create(
        input=input_text,
        model="text-embedding-3-small"  
    )

    embeddings = response.data[0].embedding
    return embeddings
