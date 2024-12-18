import React, { useState, useEffect } from "react";
import { Box, Grid, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { recipesData } from "./data/recipesData";
import { Typography } from "@mui/material";

// Import modular components
import RecipeCard from "./components/RecipeCard";
import SearchBar from "./components/SearchBar";
import RecipeDialog from "./components/RecipeDialog";
import Header from "./components/Header";
import Pantry from "./components/Pantry";
import Restrictions from "./components/Restrictions";

// ======= Recipes Component =======
const Recipes = () => {
  // ======= State Initialization =======

  // State to manage the search term entered in the SearchBar
  const [searchTerm, setSearchTerm] = useState("");

  // State to control whether the RecipeDialog is open or closed
  const [open, setOpen] = useState(false);

  // State to store the currently selected recipe for viewing in the RecipeDialog
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // State to store favorite recipes, initialized from local storage
  const [favorites, setFavorites] = useLocalStorageState("favorites", []);

  // State to store cooking history, initialized from local storage
  const [cookingHistory, setCookingHistory] = useLocalStorageState("cookingHistory", []);

  // State to track selected pantry items, categorized into different groups
  const [selectedPantryItems, setSelectedPantryItems] = useState({
    Essentials: [],
    "Fruits & Veggies": [],
    Meats: [],
    Carbohydrates: [],
    Seasonings: [],
  });

  // State to track selected dietary restrictions for filtering recipes
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);

  // State to store the filtered list of recipes based on search, pantry, and restrictions
  const [filteredRecipes, setFilteredRecipes] = useState(recipesData);

  // State to control the anchor element for the dropdown menu in the Header
  const [anchorEl, setAnchorEl] = useState(null);

  // State to show a message when no filters are applied and search is clicked
  const [message, setMessage] = useState("");

  // Hook for programmatically navigating to different routes
  const navigate = useNavigate();

  // ======= Utility Hook for Local Storage =======

  /**
   * Custom hook to sync state with local storage.
   * @param {string} key - The key used to store the data in local storage.
   * @param {any} defaultValue - The default value if nothing is found in local storage.
   */
  function useLocalStorageState(key, defaultValue) {
    const [state, setState] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem(key)) || defaultValue;
      } catch {
        return defaultValue;
      }
    });

    useEffect(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error(`Failed to save ${key} to localStorage`, error);
      }
    }, [key, state]);

    return [state, setState];
  }

  // ======= Handlers =======

  /**
   * Updates the search term state when the user types in the SearchBar.
   */
  const handleSearch = (event) => setSearchTerm(event.target.value);

  /**
   * Filters recipes based on search term, selected pantry items, and dietary restrictions.
   */
  const handleFilter = () => {
    const noSearchTerm = searchTerm.trim() === "";
    const noPantryItems = Object.values(selectedPantryItems).every((items) => items.length === 0);
    const noRestrictions = selectedRestrictions.length === 0;

    if (noSearchTerm && noPantryItems && noRestrictions) {
      setMessage("Please enter a search term or select at least one filter.");
      setFilteredRecipes([]);
      return;
    }

    setMessage(""); // Clear message when valid input is provided

    const selectedItems = Object.values(selectedPantryItems).flat().map((item) => item.toLowerCase());
    const search = searchTerm.toLowerCase();

    const filtered = recipesData.filter(({ title, description, ingredients, dietaryRestrictions }) => {
      const ingredientsMatch = selectedItems.length === 0 || ingredients.some((item) => selectedItems.includes(item.toLowerCase()));
      const restrictionsMatch = selectedRestrictions.length === 0 || dietaryRestrictions.every((res) => selectedRestrictions.includes(res));
      const searchMatch = !searchTerm || [title, description, ...ingredients].some((field) => field.toLowerCase().includes(search));

      return ingredientsMatch && restrictionsMatch && searchMatch;
    });

    if (filtered.length === 0) {
      setMessage("No recipes found matching your search criteria.");
    }

    setFilteredRecipes(filtered);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedPantryItems({
      Essentials: [],
      "Fruits & Veggies": [],
      Meats: [],
      Carbohydrates: [],
      Seasonings: [],
    });
    setSelectedRestrictions([]);
    setFilteredRecipes(recipesData);
    setMessage(""); // Clear message on reset
  };

  /**
   * Opens the RecipeDialog with the selected recipe.
   */
  const handleOpen = (recipe) => {
    // Get selected pantry items as a flat array of lowercase strings
    const selectedItems = Object.values(selectedPantryItems).flat().map((item) => item.toLowerCase());
  
    // Calculate missing ingredients
    const missingIngredients = recipe.ingredients.filter(
      (ingredient) => !selectedItems.includes(ingredient.toLowerCase())
    );
  
    // Add missing ingredients to the recipe object
    const recipeWithMissing = { ...recipe, missingIngredients };
  
    setSelectedRecipe(recipeWithMissing);
    setOpen(true);
  };

  /**
   * Closes the RecipeDialog.
   */
  const handleClose = () => {
    setOpen(false);
    setSelectedRecipe(null);
  };

  /**
   * Opens the menu in the Header.
   */
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);

  /**
   * Closes the menu in the Header.
   */
  const handleMenuClose = () => setAnchorEl(null);

  /**
   * Navigates to the selected path and closes the menu.
   */
  const handleMenuClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  /**
   * Toggles an item in a given list (favorites or cooking history).
   */
  const toggleItemInList = (list, setList, item) => {
    if (!item || !item.id) return;
    setList((prev) =>
      prev.some((i) => i?.id === item.id) ? prev.filter((i) => i?.id !== item.id) : [...prev, item]
    );
  };

  // Toggle favorite status of a recipe
  const toggleFavorite = (recipe) => toggleItemInList(favorites, setFavorites, recipe);

  // Toggle cooking history status of a recipe
  const toggleCookingHistory = (recipe) => toggleItemInList(cookingHistory, setCookingHistory, recipe);

  // Check if a recipe is in favorites
  const isFavorite = (recipe) => recipe && favorites.some((fav) => fav?.id === recipe?.id);

  // Check if a recipe is in the cooking history
  const isCooked = (recipe) => recipe && cookingHistory.some((item) => item?.id === recipe?.id);

  // ======= Render Component =======
  return (
    <Box sx={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", paddingTop: "100px" }}>
      {/* Header Section */}
      <Header handleMenuOpen={handleMenuOpen} anchorEl={anchorEl} handleMenuClose={handleMenuClose} handleMenuClick={handleMenuClick} />

      {/* Search Section */}
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} handleFilter={handleFilter} handleReset={handleReset} />

      {/* Main Content Section */}
      <Box sx={{ display: "flex", gap: 5, marginLeft: "90px", marginTop: 4, flexWrap: "wrap" }}>
        <Box sx={{ maxHeight: "600px", overflowY: "auto", paddingRight: 1, width: "60%" }}>
          {/* Display Message if No Recipes Found */}
          {message ? (
            <Typography color="error" variant="h6" sx={{ textAlign: "center", marginTop: 4 }}>
              {message}
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {filteredRecipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <RecipeCard
                  recipe={recipe}
                  handleOpen={handleOpen}
                  isFavorite={isFavorite}
                  toggleFavorite={toggleFavorite}
                />
              </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Pantry and Restrictions Section */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "300px", ml: 10 }}>
          <Pantry selectedPantryItems={selectedPantryItems} setSelectedPantryItems={setSelectedPantryItems} />
          <Restrictions selectedRestrictions={selectedRestrictions} setSelectedRestrictions={setSelectedRestrictions} />
        </Box>
      </Box>

      {/* Dialog for Recipe Details */}
      <RecipeDialog
        open={open}
        handleClose={handleClose}
        recipe={selectedRecipe || {}}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
        toggleCookingHistory={toggleCookingHistory}
        isCooked={isCooked}
      />

      <Divider />
    </Box>
  );
};

export default Recipes;
