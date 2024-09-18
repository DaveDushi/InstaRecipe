Got it! Here’s an updated README incorporating `instaloader`:

---

# InstaRecipe

InstaRecipe is a web application designed to help users search through and manage their saved Instagram recipes. Built with a modern tech stack, it provides an intuitive interface for discovering and organizing recipes using advanced search functionality.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Search Saved Recipes**: Find recipes saved on Instagram with powerful search capabilities.
- **User Authentication**: Secure login and session management for a personalized experience.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) - A React framework for building server-rendered applications.
- **Backend**: [Flask](https://flask.palletsprojects.com/) - A lightweight Python web framework for API development.
- **Database**: [MongoDB](https://www.mongodb.com/) - NoSQL database for storing recipe data and user information.
- **API**: [OpenAI](https://openai.com/) - Used for creating embeddings for semantic search.
- **Instagram Data**: [Instaloader](https://instaloader.github.io/) - A Python library for accessing and downloading Instagram data.

## Setup

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/instarecipe.git
   cd instarecipe
   ```

2. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the `frontend` directory with the following content:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

### Backend

1. Navigate to the backend directory and create a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory with the necessary configuration, including Instagram login credentials and API keys.

4. Install `instaloader`:
   ```bash
   pip install instaloader
   ```

5. Run the Flask application:
   ```bash
   flask run
   ```

## Usage

1. Open your browser and go to `http://localhost:3000` to access the frontend.
2. Use the search bar to find and manage your saved Instagram recipes.
3. Authenticate with your Instagram account to sync saved recipes with the app.

## Contributing

We welcome contributions to improve InstaRecipe! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure they are well-tested.
4. Submit a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to adjust as needed!
