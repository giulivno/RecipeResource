const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const seedRecipes = require('../seedRecipes');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12; // Recipes per page
    const offset = (page - 1) * limit;

    // Check if there are enough recipes in the database
    const recipesInDB = await Recipe.countDocuments();
    if (recipesInDB < offset + limit) {
      // Seed more recipes dynamically if required
      console.log('Seeding additional recipes...');
      await seedRecipes(offset + limit - recipesInDB); // Seed only the necessary number of recipes
    }

    // Fetch recipes from MongoDB
    const recipes = await Recipe.find()
      .skip(offset)
      .limit(limit);

    const totalRecipes = await Recipe.countDocuments(); // Update total recipes count
    res.json({
      recipes,
      total: totalRecipes,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
});

module.exports = router;
