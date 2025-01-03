const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  time: { type: Number },
  ingredients: [String], // Array of strings
  instructions: [String], // Array of steps
  rating: Number,
  dietaryRestrictions: [String], // Array of restrictions like 'No nuts', 'No gluten'
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
