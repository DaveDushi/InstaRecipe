import instaloader
import pymongo
from dotenv import load_dotenv
import os
from .openai_service import create_embedding

load_dotenv()

database_url = os.getenv('DATABASE_URL')

client = pymongo.MongoClient(database_url)
db = client.InstaSearch
recipe_collection = db.recipes
user_collection = db.users

class InstagramManager:

    def __init__(self, username, password=None):
        self.username = username
        self.password = password
        self.instaloader = instaloader.Instaloader()

    def login(self):
        if self.password:
            self.instaloader.login(self.username, self.password)
        else:
            self.instaloader.interactive_login(self.username)
        
        # Save session to the in-memory dictionary
        session_data = self.instaloader.save_session()
        self.save_session(session_data)

    def save_session(self, session_data):
        """
        Save session data to the in-memory dictionary.
        """
        result = user_collection.update_one(
                {'username': self.username},  # Query to find the document
                {'$set': {'session': session_data}},  # Update operation
                upsert=True  # If the document does not exist, insert a new one
            )

    def load_session(self):
        """
        Load session data from the in-memory dictionary.
        """
        user_data = user_collection.find_one({
            'username': self.username
        })

        if user_data and 'session' in user_data:
            session_data = user_data['session']
        else:
            session_data = None

        if session_data:
            try: 
                self.instaloader.load_session(self.username, session_data)
            except Exception as e:
                 raise ValueError("Session expired.", e)
        else:
            raise ValueError("No session data found for this user.")

    def delete_session(self):
        """
        Delete session data from the database.
        """
        result = user_collection.delete_one({
            'username': self.username
        })
        
        if result.deleted_count == 1:
            print(f"Session data for user '{self.username}' deleted successfully.")
        else:
            raise ValueError(f"No session data found for user '{self.username}'.")

    def add_saved_posts(self):
        """
        Retrieve saved posts from the logged-in user.
        """
        self.load_session()
        profile = instaloader.Profile.from_username(self.instaloader.context, self.username)
        saved_posts = profile.get_saved_posts()

        result = add_posts_to_db(saved_posts, self.username)
        
        return result


def add_posts_to_db(posts, username): 
    new_posts_count = 0
    for post in posts:
        existing_post = recipe_collection.find_one({'username': username, 'post_id': post.mediaid})
        
        if post.caption:
            post_caption_lower = post.caption.lower()
        else:
            continue
        keywords = ['ingredients', 'directions']

        if not existing_post and any(keyword in post_caption_lower for keyword in keywords):
            post_link = post.video_url if post.is_video else post.url
            caption_embedding = create_embedding(post.caption)

            post_data = {
                'username': username,
                'post_id': post.mediaid,
                'shortcode': post.shortcode,
                'caption': post.caption,
                'post_url': post_link,
                'caption_embedding': caption_embedding,
                'post_owner': post.owner_username
            }
            recipe_collection.insert_one(post_data)
            new_posts_count += 1
    
    return f'Fetched and saved {new_posts_count} new posts for {username}'