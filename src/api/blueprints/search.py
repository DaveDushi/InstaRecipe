from flask import Blueprint, jsonify, request, session as flask_session
from services import search_posts, create_embedding

search_bp = Blueprint('search', __name__)

@search_bp.route('/', methods=['GET'])
def search():
    query = request.args.get('query', '')
    if not query:
        return jsonify({"error": "No search query provided"}), 400
    
    if 'username' not in flask_session:
        return jsonify({"error": "User not logged in"}), 401

    username = flask_session['username'] 

    query_vector = create_embedding(query)

    results = search_posts(query_vector, username)

    return jsonify(results)
