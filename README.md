# Interactive Recipe App

## Description
The **Interactive Recipe App** is a full-stack web application designed to simplify meal planning and enhance the cooking experience. Users can search, filter, and save recipes while accessing personalized recommendations. The app ensures seamless interaction, real-time recipe seeding, and an intuitive interface, making it easy for users to discover and manage their favorite recipes.

## Features
- **Advanced Search and Filter**: Users can search and filter recipes based on ingredients, dietary restrictions, and preferences.
- **Recipe Saving**: Save and manage favorite recipes for quick future access.
- **Dynamic Recipe Seeding**: Automatically seeds recipes using the Spoonacular API and supports pagination for smooth browsing.
- **Personalized Recommendations**: Filters recipes based on user-selected pantry items and dietary restrictions.
- **User-Friendly Design**: Intuitive interface optimized through iterative design and A/B testing.

## Technology Stack
- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **APIs**: Spoonacular API
- **Additional Libraries**: Material-UI, Axios, dotenv, cors

## Getting Started

### Prerequisites
- Node.js installed on your system.
- MongoDB set up locally or on a cloud provider.
- Spoonacular API key for recipe data.

### Installation Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
2. Navigate to the project directory
   ```bash
   cd interactive-recipe-app
3. Install dependencies:
   ```bash
   npm install
4. Create a .env file with the following:
    ```bash
    MONGODB_URI=your-mongodb-connection-string
    SPOONACULAR_API_KEY=your-spoonacular-api-key
5. Start the server:
   ```bash
   npm start
6. Access the application: Open your browser and navigate to http://localhost:3000.

## Usage

- **Launch the app** as described in the installation section.
- **Use the search bar** to find recipes based on keywords or ingredients.
- **Save your favorite recipes** and access them easily under the "Favorites" section.
- **Add pantry items and dietary restrictions** to get personalized recommendations.
- **Enjoy an enhanced cooking experience** with curated recipe suggestions!
