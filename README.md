# InstaRecipe

InstaRecipe is a web application designed to help users search through and manage their saved Instagram recipes. Built with a modern tech stack, it provides an intuitive interface for discovering and organizing recipes using advanced search functionality.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
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
Clone the repository:
   ```bash
   git clone https://github.com/DaveDushi/InstaRecipe.git
   cd InstaRecipe
   ```
## Running the Project
To run the entire project with both frontend and backend, use the following command:
  ```bash
  npm run dev
  ```
  This command will:
  
  - Start the Flask server with debugging enabled.
  - Start the Next.js development server.
  - Install any missing dependencies if needed.

## Usage

1. Open your browser and go to `http://localhost:3000` to access the frontend.
2. Authenticate with your Instagram account
3. click refresh to sync saved recipes with the app.
4. Use the search bar to find and manage your saved Instagram recipes.


## Contributing

We welcome contributions to improve InstaRecipe! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure they are well-tested.
4. Submit a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

