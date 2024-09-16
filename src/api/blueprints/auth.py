from flask import Blueprint, request, jsonify, session as flask_session
from services import InstagramManager

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = InstagramManager(username, password)
    try:
        # user.login()
        flask_session['username'] = username
        return jsonify({"message": "Login successful"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@auth_bp.route('/logout', methods=['POST'])
def logout():
    if 'username' not in flask_session:
        return jsonify({"error": "User not logged in"}), 401

    username = flask_session['username']
    # user = InstagramManager(username)

    try: 
        # user.delete_session()
        flask_session.clear()
        return jsonify({"message": "Logout successful"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@auth_bp.route('/status', methods=['GET'])
def auth_status():
    if 'username' in flask_session:
        return jsonify({"isAuthenticated": True}), 200
    else:
        return jsonify({"isAuthenticated": False}), 200