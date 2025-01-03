import React, { useState, useEffect } from "react";
import { Box, Grid, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { recipesData } from "./data/recipesData";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useLocalStorageState("favorites", []);
  const [cookingHistory, setCookingHistory] = useLocalStorageState("cookingHistory", []);
  const [selectedPantryItems, setSelectedPantryItems] = useState({
    Essentials: [],
    "Fruits & Veggies": [],
    Meats: [],
    Carbohydrates: [],
    Seasonings: [],
  });
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipesData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // ======= Utility Hook for Local Storage =======
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
  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleFilter = () => {
    const noSearchTerm = searchTerm.trim() === "";
    const noPantryItems = Object.values(selectedPantryItems).every((items) => items.length === 0);
    const noRestrictions = selectedRestrictions.length === 0;
  
    // If no filters are applied, show a message and exit
    if (noSearchTerm && noPantryItems && noRestrictions) {
      setMessage("Please enter a search term or select at least one filter.");
      setFilteredRecipes([]);
      return;
    }
  
    // Clear any previous messages
    setMessage("");
  
    const selectedItems = Object.values(selectedPantryItems)
      .flat()
      .map((item) => item.trim().toLowerCase());
    const search = searchTerm.trim().toLowerCase();
  
    // Filter recipes based on search term, pantry items, and restrictions
    const filtered = recipesData.filter((recipe) => {
      const { title, description, ingredients, dietaryRestrictions } = recipe;
  
      // Search matches
      const searchMatch =
        noSearchTerm ||
        [title, description, ...ingredients].some((field) =>
          field.toLowerCase().includes(search)
        );
  
      // Restrictions match
      const restrictionsMatch =
        noRestrictions ||
        selectedRestrictions.every((restriction) =>
          dietaryRestrictions.includes(restriction)
        );
  
      // Pantry items match (allow recipes with up to 4 missing ingredients)
      const missingIngredients = ingredients.filter(
        (ingredient) => !selectedItems.includes(ingredient.trim().toLowerCase())
      );
      const ingredientsMatch = noPantryItems || missingIngredients.length <= 4;
  
      // Return true if all criteria match
      return searchMatch && restrictionsMatch && ingredientsMatch;
    });
  
    // Set the filtered recipes or show a message if none are found
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
    setMessage("");
  };

  const handleOpen = (recipe) => {
    const selectedItems = Object.values(selectedPantryItems).flat().map((item) => item.toLowerCase());
    const missingIngredients = recipe.ingredients.filter(
      (ingredient) => !selectedItems.includes(ingredient.toLowerCase())
    );
    setSelectedRecipe({ ...recipe, missingIngredients });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRecipe(null);
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleMenuClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const toggleItemInList = (list, setList, item) => {
    if (!item || !item.id) return;
    setList((prev) =>
      prev.some((i) => i?.id === item.id) ? prev.filter((i) => i?.id !== item.id) : [...prev, item]
    );
  };

  const toggleFavorite = (recipe) => toggleItemInList(favorites, setFavorites, recipe);
  const toggleCookingHistory = (recipe) => toggleItemInList(cookingHistory, setCookingHistory, recipe);
  const isFavorite = (recipe) => recipe && favorites.some((fav) => fav?.id === recipe?.id);
  const isCooked = (recipe) => recipe && cookingHistory.some((item) => item?.id === recipe?.id);

  // ======= Render Component =======
  return (
    <Box sx={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", paddingTop: "100px" }}>
      <Header handleMenuOpen={handleMenuOpen} anchorEl={anchorEl} handleMenuClose={handleMenuClose} handleMenuClick={handleMenuClick} />

      <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0", padding: "0 20px", marginLeft: "-40px" }}>
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} handleFilter={handleFilter} handleReset={handleReset} />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4, marginTop: 2 }}>
          <Box sx={{ flex: 1, maxWidth: "100%", maxHeight: "600px", overflowY: "auto", marginLeft: "-30px" }}>
            {message ? (
              <Typography color="error" variant="h6" sx={{ textAlign: "center", marginTop: 4 }}>
                {message}
              </Typography>
            ) : (
              <Grid container spacing={2} sx={{ paddingLeft: "10px", paddingRight: "30px" }}>
                {filteredRecipes.map((recipe) => (
                  <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                    <RecipeCard recipe={recipe} handleOpen={handleOpen} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, maxWidth: "28%", marginRight: "140px", alignItems: "flex-start", height: "auto" }}>
            <Pantry selectedPantryItems={selectedPantryItems} setSelectedPantryItems={setSelectedPantryItems} />
            <Restrictions selectedRestrictions={selectedRestrictions} setSelectedRestrictions={setSelectedRestrictions} />
          </Box>
        </Box>
      </Box>

      <RecipeDialog open={open} handleClose={handleClose} recipe={selectedRecipe || {}} toggleFavorite={toggleFavorite} isFavorite={isFavorite} toggleCookingHistory={toggleCookingHistory} isCooked={isCooked} />

      <Divider />
    </Box>
  );
};

export default Recipes;