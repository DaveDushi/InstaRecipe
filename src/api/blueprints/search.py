from flask import Blueprint, jsonify, session as flask_session, request
from services import search_posts, create_embedding

search_bp = Blueprint('search', __name__)

@search_bp.route('/hi', methods=['GET'])
def search():
    if 'username' not in flask_session:
        return jsonify({"error": "User not logged in"}), 401

    username = flask_session['username'] 

    query = request.args.get('query', '')
    if not query:
        return jsonify({"error": "No search query provided"}), 400

    query_vector = create_embedding(query)

    results = search_posts(query_vector, username)

    return jsonify(results)


@search_bp.route('/hello', methods=['GET'])
def test():


    return jsonify({'message:': 'hello', 'session': flask_session})