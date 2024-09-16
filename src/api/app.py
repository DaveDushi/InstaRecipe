from flask import Flask, jsonify
from flask_cors import CORS
from blueprints import auth_bp, posts_bp, search_bp


app = Flask(__name__)
CORS(app, supports_credentials=True)  # Optional: To handle Cross-Origin Resource Sharing (CORS)

# Load configurations
app.config.from_object('config.Config')

#route example
@app.route('/', methods=['GET'])
def hello_world(): 
    return jsonify({"message": "hello world"}), 200

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(posts_bp, url_prefix='/posts')
app.register_blueprint(search_bp, url_prefix='/search')



