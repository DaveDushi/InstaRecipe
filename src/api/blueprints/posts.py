from flask import Blueprint, jsonify, session as flask_session
from services import InstagramManager
from dotenv import load_dotenv
import os
import pymongo
from bson.json_util import dumps

load_dotenv()

database_url = os.getenv('DATABASE_URL')

client = pymongo.MongoClient(database_url)
db = client.InstaSearch
recipe_collection = db.recipes

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/saved_posts', methods=['GET'])
def get_saved_posts():
    if 'username' not in flask_session:
        return jsonify({"error": "User not logged in"}), 401


    username = flask_session['username'] 
    posts_cursor = recipe_collection.find({'username': username}, {'caption_embedding': 0})

    posts_list = list(posts_cursor)
    posts_json = dumps(posts_list)  # Convert BSON to JSON
        
    return jsonify(posts_json), 200

@posts_bp.route('/update_posts', methods=['PUT'])
def update_saved_posts():
    if 'username' not in flask_session:
        return jsonify({"error": "User not logged in"}), 401

    username = flask_session['username'] 
    user = InstagramManager(username)
    
    try:
        user.add_saved_posts()
        return jsonify({"message": "Posts updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400