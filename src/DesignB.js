import React, { useState, useEffect } from "react";
import { Box, Divider, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { recipesData } from "./data/recipesData";

// Modular components
import RecipeCardB from "./componentsB/RecipeCardB";
import RecipeDialogB from "./componentsB/RecipeDialogB";
import HeaderB from "./componentsB/HeaderB";
import PantryB from "./componentsB/PantryB";
import RestrictionsB from "./componentsB/RestrictionsB";

// ======= Utility: Local Storage State Management =======
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

// ======= DesignB (Recipes) Component =======
const DesignB = () => {
  // Pantry and Restrictions search states
  const [searchPantry, setSearchPantry] = useState("");
  const [searchRestrictions, setSearchRestrictions] = useState("");

  // Selected pantry items and restrictions
  const [selectedPantryItems, setSelectedPantryItems] = useState({
    essentials: [],
    fruitsVeggies: [],
    meats: [],
    carbohydrates: [],
    seasonings: [],
  });
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);

  // Recipe states
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(recipesData[0]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipesData);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);

  // Local storage states
  const [favorites, setFavorites] = useLocalStorageState("favorites", []);
  const [cookingHistory, setCookingHistory] = useLocalStorageState("cookingHistory", []);

  // Other
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // ======= Handlers =======
  const handleFilter = () => {
    const selectedItems = Object.values(selectedPantryItems).flat();

    const filtered = recipesData.filter((recipe) => {
      const ingredientsMatch =
        selectedItems.length === 0 ||
        recipe.ingredients.every((ingredient) => selectedItems.includes(ingredient));

      const restrictionsMatch =
        selectedRestrictions.length === 0 ||
        selectedRestrictions.every((r) => recipe.dietaryRestrictions.includes(r));

      const pantrySearchMatch =
        searchPantry.trim() === "" ||
        [recipe.title, ...recipe.ingredients].some((field) =>
          field.toLowerCase().includes(searchPantry.toLowerCase())
        );


      return ingredientsMatch && restrictionsMatch && pantrySearchMatch;
    });

    setFilteredRecipes(filtered);
    setSelectedRecipe(filtered[0] || null);
    setSelectedRecipeIndex(0);
  };

  const toggleFavorite = (recipe) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === recipe.id)
        ? prev.filter((fav) => fav.id !== recipe.id)
        : [...prev, recipe]
    );
  };

  const toggleCookingHistory = (recipe) => {
    setCookingHistory((prev) =>
      prev.some((item) => item.id === recipe.id)
        ? prev.filter((item) => item.id !== recipe.id)
        : [...prev, recipe]
    );
  };

  const isFavorite = (recipe) => favorites.some((fav) => fav.id === recipe.id);
  const isCooked = (recipe) => cookingHistory.some((item) => item.id === recipe.id);

  const handleOpenDialog = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  const handlePrevRecipe = () => {
    const newIndex = (selectedRecipeIndex - 1 + filteredRecipes.length) % filteredRecipes.length;
    setSelectedRecipeIndex(newIndex);
    setSelectedRecipe(filteredRecipes[newIndex]);
  };

  const handleNextRecipe = () => {
    const newIndex = (selectedRecipeIndex + 1) % filteredRecipes.length;
    setSelectedRecipeIndex(newIndex);
    setSelectedRecipe(filteredRecipes[newIndex]);
  };

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
            {/* Pantry (Left Column) */}
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
                handleFilter={handleFilter}
              />
            </Box>

            {/* Recipe (Center Column) */}
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
              </Box>
            </Box>

            {/* Restrictions (Right Column) */}
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

      <RecipeDialogB
        open={openDialog}
        handleClose={handleCloseDialog}
        recipe={selectedRecipe}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        toggleCookingHistory={toggleCookingHistory}
        isCooked={isCooked}
      />

      <Divider sx={{ position: "fixed", bottom: 0, width: "100%" }} />
    </>
  );
};

export default DesignB;
