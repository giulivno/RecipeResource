require('dotenv').config();
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const Recipe = require('./models/recipe');

// Connect to MongoDB if not already connected
const connectToMongoDB = async () => {
  if (!mongoose.connection.readyState) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
      process.exit(1); // Exit the process on failure
    }
  }
};

// Utility function to remove HTML tags from the description
const sanitizeHtml = require("sanitize-html");

const stripHtml = (html) => {
  return sanitizeHtml(html, {
    allowedTags: [], // Remove all HTML tags
    allowedAttributes: {}, // Remove all attributes
  });
};

// Seeding logic
const seedRecipes = async (number = 10) => {
  await connectToMongoDB(); // Ensure connection before proceeding
  try {
    console.log(`Fetching ${number} recipes from Spoonacular API...`);
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=${number}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    const data = await response.json();

    if (!data.recipes || data.recipes.length === 0) {
      console.log('No recipes found in the API response.');
      return;
    }

    let addedCount = 0;
    for (const recipe of data.recipes) {
      if (!recipe.title || !recipe.extendedIngredients) {
        console.log('Skipping recipe due to missing required fields:', recipe);
        continue;
      }

      const existingRecipe = await Recipe.findOne({ title: recipe.title });
      if (!existingRecipe) {
        const formattedRecipe = {
          title: recipe.title,
          description: stripHtml(recipe.summary || "No description available"), // Use recipe.summary
          image: recipe.image || '',
          ingredients: recipe.extendedIngredients.map((ing) => ing.original),
          instructions: recipe.analyzedInstructions[0]?.steps.map((step) => step.step) || [],
          dietaryRestrictions: recipe.diets || [],
          cookTime: recipe.readyInMinutes || "N/A", // Include cook time
        };

        await Recipe.create(formattedRecipe);
        addedCount++;
      }
    }

    console.log(`${addedCount} new recipes added to the database.`);
  } catch (err) {
    console.error('Error fetching or storing recipes:', err);
  } finally {
    console.log('Closing MongoDB connection...');
    console.log('Recipes seeded successfully. MongoDB connection remains open.');
  }
};

// Self-invocation for direct execution
(async () => {
  console.log('Starting recipe seeding...');
  await seedRecipes(30); // Adjust the number as needed
  console.log('Recipe seeding completed.');
})();

module.exports = seedRecipes;
