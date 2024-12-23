import React, { useState, useEffect } from "react";
import { Box, Divider, IconButton, Typography, Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { recipesData } from "./data/recipesData";

// Import components
import RecipeCardB from "./componentsB/RecipeCardB";
import RecipeDialogB from "./componentsB/RecipeDialogB";
import HeaderB from "./componentsB/HeaderB";
import PantryB from "./componentsB/PantryB";
import RestrictionsB from "./componentsB/RestrictionsB";

const useLocalStorageState = (key, defaultValue) => {
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
};

const DesignB = () => {
  // ======= Pantry & Restrictions State =======
  const [searchPantry, setSearchPantry] = useState("");
  const [searchRestrictions, setSearchRestrictions] = useState("");

  const [selectedPantryItems, setSelectedPantryItems] = useState({
    essentials: [],
    fruitsVeggies: [],
    meats: [],
    carbohydrates: [],
    seasonings: [],
  });
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);

  // ======= Recipe States =======
  const [filteredRecipes, setFilteredRecipes] = useState(recipesData);
  const [selectedRecipe, setSelectedRecipe] = useState(recipesData[0] || null);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  // ======= Local Storage =======
  const [favorites, setFavorites] = useLocalStorageState("favorites", []);
  const [cookingHistory, setCookingHistory] = useLocalStorageState("cookingHistory", []);

  // ======= Other =======
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ======= isFavorite / isCooked with Null Safety =======
  const isFavorite = (recipe) => {
    if (!recipe) return false;
    return favorites.some((fav) => fav.id === recipe.id);
  };

  const isCooked = (recipe) => {
    if (!recipe) return false;
    return cookingHistory.some((item) => item.id === recipe.id);
  };

  // ======= Handle Filter (Only on Button Click) =======
  const handleFilter = () => {
    setMessage("");
  
    // Flatten selected pantry items (convert to lowercase for comparison)
    const selectedItems = Object.values(selectedPantryItems).flat().map((item) => item.toLowerCase());
  
    // 1) Map recipes to attach missing ingredients and counts
    let filteredRecipes = recipesData.map((recipe) => {
      const lowerIngredients = recipe.ingredients.map((ingredient) => ingredient.toLowerCase());
      const missingIngredients = lowerIngredients.filter((ingredient) => !selectedItems.includes(ingredient));
  
      return {
        ...recipe,
        missingIngredients: missingIngredients,
        missingCount: missingIngredients.length,
      };
    });
  
    // 2) Filter recipes with up to 4 missing ingredients
    if (selectedItems.length > 0) {
      filteredRecipes = filteredRecipes.filter((recipe) => recipe.missingCount <= 4);
    }
  
    // 3) Apply restrictions filter
    if (selectedRestrictions.length > 0) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        selectedRestrictions.every((restriction) =>
          recipe.dietaryRestrictions.map((r) => r.toLowerCase()).includes(restriction.toLowerCase())
        )
      );
    }
  
    // 4) Apply pantry search filter
    if (searchPantry.trim() !== "") {
      const searchLower = searchPantry.toLowerCase();
      filteredRecipes = filteredRecipes.filter((recipe) =>
        [recipe.title, ...recipe.ingredients].some((field) => field.toLowerCase().includes(searchLower))
      );
    }
  
    // Set message if no recipes match
    if (filteredRecipes.length === 0) {
      setMessage("No recipes found with up to 4 missing ingredients for your selection.");
    }
  
    // Update filtered recipes and reset selected recipe
    setFilteredRecipes(filteredRecipes);
    setSelectedRecipe(filteredRecipes[0] || null);
    setSelectedRecipeIndex(0);
  };

  // ======= Reset =======
  const handleReset = () => {
    setSearchPantry("");
    setSearchRestrictions("");
    setSelectedPantryItems({
      essentials: [],
      fruitsVeggies: [],
      meats: [],
      carbohydrates: [],
      seasonings: [],
    });
    setSelectedRestrictions([]);

    // Reset recipes
    setFilteredRecipes(recipesData);
    setSelectedRecipe(recipesData[0] || null);
    setSelectedRecipeIndex(0);
    setMessage("");
  };

  // ======= Dialog / Nav Handlers =======
  const handleOpenDialog = (recipe) => {
    if (!recipe) return;
    setSelectedRecipe(recipe);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handlePrevRecipe = () => {
    if (filteredRecipes.length === 0) return;
    const newIndex = (selectedRecipeIndex - 1 + filteredRecipes.length) % filteredRecipes.length;
    setSelectedRecipeIndex(newIndex);
    setSelectedRecipe(filteredRecipes[newIndex]);
  };

  const handleNextRecipe = () => {
    if (filteredRecipes.length === 0) return;
    const newIndex = (selectedRecipeIndex + 1) % filteredRecipes.length;
    setSelectedRecipeIndex(newIndex);
    setSelectedRecipe(filteredRecipes[newIndex]);
  };

  // ======= Favorites / History Toggles =======
  const toggleFavorite = (recipe) => {
    if (!recipe) return;
    setFavorites((prev) =>
      prev.some((fav) => fav.id === recipe.id)
        ? prev.filter((fav) => fav.id !== recipe.id)
        : [...prev, recipe]
    );
  };

  const toggleCookingHistory = (recipe) => {
    if (!recipe) return;
    setCookingHistory((prev) =>
      prev.some((item) => item.id === recipe.id)
        ? prev.filter((item) => item.id !== recipe.id)
        : [...prev, recipe]
    );
  };

  // ======= Menu =======
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleMenuClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  // ======= Render =======
  return (
    <>
      <HeaderB
        handleMenuOpen={handleMenuOpen}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        handleMenuClick={handleMenuClick}
      />

      <Box sx={{ mt: 14 }}>
        <Box
          sx={{
            transform: "scale(0.67)",
            transformOrigin: "top center",
            overflow: "visible",
            mt: 2,
          }}
        >
          {/* Filter & Reset Buttons + Message */}
  <Box sx={{ textAlign: "center", mb: 2 }}>
    {message && (
      <Typography color="error" variant="h6" sx={{ mb: 1 }}>
        {message}
      </Typography>
    )}
    <Box sx={{ display: "inline-flex", gap: 2 }}>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#f5a623", 
          color: "white",
          "&:hover": { bgcolor: "#e6951c" },
          height: "44px",
          borderRadius: "4px",
        }}
        onClick={handleFilter}
      >
        Filter
      </Button>
      <Button
        variant="contained" 
        sx={{
          bgcolor: "#4caf50", 
          color: "white",
          "&:hover": { bgcolor: "#388e3c" },
          height: "44px",
          borderRadius: "4px",
        }}
        onClick={handleReset}
      >
        Reset
      </Button>
  </Box>
</Box>


          <Box
            sx={{
              minHeight: "100vh",
              maxWidth: "1400px",
              mx: "auto",
              px: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 6,
            }}
          >
            {/* Pantry (Left) */}
            <Box
              sx={{
                minWidth: 200,
                maxWidth: 250,
                transform: "translate(-80px, -110px)",
                zIndex: 1,
              }}
            >
              <PantryB
                selectedPantryItems={selectedPantryItems}
                setSelectedPantryItems={setSelectedPantryItems}
                searchPantry={searchPantry}
                setSearchPantry={setSearchPantry}
                
              />
            </Box>

            {/* Recipe (Center) */}
            <Box sx={{ position: "relative", flex: 1, display: "flex", justifyContent: "center" }}>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                {selectedRecipe && (
                  <RecipeCardB
                    recipe={selectedRecipe}
                    isFavorite={isFavorite}
                    toggleFavorite={toggleFavorite}
                    handleOpen={handleOpenDialog}
                    highlight
                  />
                )}

                {filteredRecipes.length > 1 && (
                  <>
                    <IconButton
                      onClick={handlePrevRecipe}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        left: "-80px",
                        width: 56,
                        height: 56,
                        border: "2px solid gray",
                        borderRadius: "50%",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-50%) scale(1.1)",
                          borderColor: "#f20597",
                        },
                      }}
                    >
                      <ArrowBack fontSize="large" />
                    </IconButton>

                    <IconButton
                      onClick={handleNextRecipe}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        right: "-80px",
                        width: 56,
                        height: 56,
                        border: "2px solid gray",
                        borderRadius: "50%",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-50%) scale(1.1)",
                          borderColor: "#f20597",
                        },
                      }}
                    >
                      <ArrowForward fontSize="large" />
                    </IconButton>
                  </>
                )}
              </Box>
            </Box>

            {/* Restrictions (Right) */}
            <Box sx={{ minWidth: 200, maxWidth: 250 }}>
              <RestrictionsB
                selectedRestrictions={selectedRestrictions}
                setSelectedRestrictions={setSelectedRestrictions}
                searchRestrictions={searchRestrictions}
                setSearchRestrictions={setSearchRestrictions}
                handleFilter={handleFilter}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Dialog */}
      <RecipeDialogB
        open={openDialog}
        handleClose={handleCloseDialog}
        recipe={selectedRecipe}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        toggleCookingHistory={toggleCookingHistory}
        isCooked={isCooked}
        pantryItems={selectedPantryItems} 
      />

      <Divider sx={{ position: "fixed", bottom: 0, width: "100%" }} />
    </>
  );
};

export default DesignB;
