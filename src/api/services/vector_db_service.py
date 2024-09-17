import pymongo
from dotenv import load_dotenv
import os

load_dotenv()
database_url = os.getenv('DATABASE_URL')

client = pymongo.MongoClient(database_url)
db = client.InstaSearch
recipe_collection = db.recipes

def search_posts(query_vector, username):
    # Logic to search posts in the vector database
    try:
        search_result_cursor = recipe_collection.aggregate([
            {
                "$vectorSearch": {
                    "index": "vector_index",
                    'filter': {
                        'username': {
                              '$eq': username
                            }, 
                      }, 
                    "path": "caption_embedding",
                    "queryVector": query_vector,
                    "numCandidates": 100,
                    "limit": 5
                }
            },
            {
                '$project': {
                    '_id': 0,
                    'post_id': 1,
                    'shortcode': 1,
                    'caption': 1,
                    'post_url': 1,
                    'post_owner': 1,
                    'post_img': 1,
                    "score": {
                        '$meta': 'vectorSearchScore'
                    }
                    # add owner profile after updating database
                }
            },
        ])
        
        # Convert cursor to list
        search_result = list(search_result_cursor)
        
        return search_result
    
    except Exception as e:
        return {"error": str(e)}

