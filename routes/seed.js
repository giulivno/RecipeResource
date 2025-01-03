// routes/seed.js
const express = require('express');
const router = express.Router();
const seedRecipes = require('../seedRecipes');

// Seed recipes endpoint
router.post('/seed-recipes', async (req, res) => {
  try {
    const numberToSeed = req.body.number || 30; // Default to 30 recipes
    await seedRecipes(numberToSeed);
    res.status(200).json({ message: `${numberToSeed} recipes seeded successfully.` });
  } catch (error) {
    console.error("Error seeding recipes:", error);
    res.status(500).json({ message: "Error seeding recipes", error });
  }
});

module.exports = router;
