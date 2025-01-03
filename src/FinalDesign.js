import React, { useState, useEffect } from "react";
import { Box, Grid, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

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
  const [cookingHistory, setCookingHistory] = useLocalStorageState(
    "cookingHistory",
    []
  );
  const [selectedPantryItems, setSelectedPantryItems] = useState({
    Essentials: [],
    "Fruits & Veggies": [],
    Meats: [],
    Carbohydrates: [],
    Seasonings: [],
  });
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const recipesPerPage = 12; // Recipes to load per page
  const [loading, setLoading] = useState(false);

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
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
  }

  const handlePageChange = async (newPage) => {
    setLoading(true);
    try {
      const response = await fetch(`/recipes?page=${newPage}&limit=${recipesPerPage}`);
      const data = await response.json();
  
      if (data.recipes && data.recipes.length > 0) {
        setFilteredRecipes(data.recipes);
        setTotalRecipes(data.total); // Update total recipes
        setCurrentPage(newPage);
      } else {
        // Trigger recipe seeding
        console.log("Seeding new recipes...");
        const seedResponse = await fetch("/seed-recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ number: recipesPerPage }),
        });
        if (seedResponse.ok) {
          console.log("New recipes seeded!");
          const seededData = await fetch(`/recipes?page=${newPage}&limit=${recipesPerPage}`);
          const seededRecipes = await seededData.json();
          setFilteredRecipes(seededRecipes.recipes);
          setTotalRecipes(seededRecipes.total || totalRecipes + recipesPerPage); // Update total
          setCurrentPage(newPage);
        } else {
          console.error("Failed to seed recipes.");
        }
      }
    } catch (error) {
      console.error("Error fetching recipes or seeding:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  const uniqueRecipes = Array.from(
    new Map(filteredRecipes.map((recipe) => [recipe._id, recipe])).values()
  );

  const fetchRecipes = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/recipes?page=${page}&limit=${recipesPerPage}`);
      const data = await response.json();
  
      console.log(`API Response for Page ${page}:`, JSON.stringify(data, null, 2));
  
      if (data.recipes && Array.isArray(data.recipes)) {
        setFilteredRecipes(data.recipes); // Set recipes for the current page
        setTotalRecipes(data.total || data.recipes.length); // Set total number of recipes
        setMessage("");
      } else {
        console.error("Unexpected format or missing recipes array in response:", data);
        setFilteredRecipes([]);
        setMessage("No recipes found.");
      }
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      setFilteredRecipes([]);
      setMessage("Failed to load recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage > 0) {
      fetchRecipes(currentPage);
    }
  }, [currentPage]);

  // ======= Handlers =======
  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleFilter = () => {
    const noSearchTerm = searchTerm.trim() === "";
    const noPantryItems = Object.values(selectedPantryItems).every(
      (items) => items.length === 0
    );
    const noRestrictions = selectedRestrictions.length === 0;

    if (noSearchTerm && noPantryItems && noRestrictions) {
      setMessage("Please enter a search term or select at least one filter.");
      return;
    }

    setMessage("");

    const selectedItems = Object.values(selectedPantryItems)
      .flat()
      .map((item) => item.trim().toLowerCase());
    const search = searchTerm.trim().toLowerCase();

    const filtered = filteredRecipes.filter((recipe) => {
      const { title, description, ingredients, dietaryRestrictions } = recipe;

      const searchMatch =
        noSearchTerm ||
        [title, description, ...ingredients].some((field) =>
          field.toLowerCase().includes(search)
        );

      const restrictionsMatch =
        noRestrictions ||
        selectedRestrictions.every((restriction) =>
          dietaryRestrictions.includes(restriction)
        );

      const missingIngredients = ingredients.filter(
        (ingredient) =>
          !selectedItems.includes(ingredient.trim().toLowerCase())
      );
      const ingredientsMatch =
        noPantryItems || missingIngredients.length <= 4;

      return searchMatch && restrictionsMatch && ingredientsMatch;
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
    setMessage("");
    setCurrentPage(1); // Reset page count to Page 1
    fetchRecipes(1); // Fetch recipes for Page 1
  };

  const handleOpen = (recipe) => {
    const selectedItems = Object.values(selectedPantryItems)
      .flat()
      .map((item) => item.toLowerCase());
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
      prev.some((i) => i?.id === item.id)
        ? prev.filter((i) => i?.id !== item.id)
        : [...prev, item]
    );
  };

  const toggleFavorite = (recipe) =>
    toggleItemInList(favorites, setFavorites, recipe);
  const toggleCookingHistory = (recipe) =>
    toggleItemInList(cookingHistory, setCookingHistory, recipe);
  const isFavorite = (recipe) =>
    recipe && favorites.some((fav) => fav?.id === recipe?.id);
  const isCooked = (recipe) =>
    recipe && cookingHistory.some((item) => item?.id === recipe?.id);

  // ======= Render Component =======
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: "100px",
      }}
    >
      <Header
        handleMenuOpen={handleMenuOpen}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        handleMenuClick={handleMenuClick}
      />

      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0",
            padding: "0 20px",
            marginLeft: "-40px",
          }}
        >
          <SearchBar
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            handleFilter={handleFilter}
            handleReset={handleReset}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 4,
            marginTop: 2,
          }}
        >
          <Box
  sx={{
    flex: 1,
    maxWidth: "100%",
    maxHeight: "600px",
    overflowY: "auto",
    marginLeft: "-30px",
  }}
>
  {loading ? (
    <Typography sx={{ textAlign: "center", mt: 4 }} variant="h6">
      Loading recipes...
    </Typography>
  ) : message ? (
    <Typography
      color="error"
      variant="h6"
      sx={{ textAlign: "center", mt: 4 }}
    >
      {message}
    </Typography>
  ) : (
    <Grid
      container
      spacing={2}
      sx={{ paddingLeft: "10px", paddingRight: "30px" }}
    > 
    
    {Array.isArray(filteredRecipes) && uniqueRecipes.length > 0 ? (
    filteredRecipes.map((recipe, index) => (
       <Grid item xs={12} sm={6} md={4} key={recipe._id || `${recipe.title}-${index}`}>
          <RecipeCard
             recipe={recipe}
             handleOpen={handleOpen}
             isFavorite={isFavorite}
             toggleFavorite={toggleFavorite}
          />
       </Grid>
    ))
 ) : (
    <Typography sx={{ textAlign: "center", mt: 4 }} variant="h6">
       No recipes available.
    </Typography>
 )}

    </Grid>
  )}
</Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              maxWidth: "28%",
              marginRight: "140px",
              alignItems: "flex-start",
              height: "auto",
            }}
          >
            <Pantry
              selectedPantryItems={selectedPantryItems}
              setSelectedPantryItems={setSelectedPantryItems}
            />
            <Restrictions
              selectedRestrictions={selectedRestrictions}
              setSelectedRestrictions={setSelectedRestrictions}
            />
          </Box>
        </Box>
      </Box>
      
      {/* Pagination Controls */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="outlined"
          disabled={currentPage === 1 || loading}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Typography sx={{ mx: 2 }}>
          Page {currentPage} of {Math.ceil(totalRecipes / recipesPerPage)}
        </Typography>
        <Button
          variant="outlined"
          disabled={loading}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </Box>




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

// Ensure export is at the top level
export default Recipes;
