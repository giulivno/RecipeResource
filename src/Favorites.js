import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Header from "./components/Header"; 
import RecipeCard from "./components/RecipeCard"; 
import RecipeDialog from "./components/RecipeDialog"; 
import SearchBar from "./components/SearchBar"; 

const Favorites = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [cookingHistory, setCookingHistory] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);

    const savedHistory = JSON.parse(localStorage.getItem("cookingHistory")) || [];
    setCookingHistory(savedHistory);
  }, []);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleFilter = () => {
  };

  const handleReset = () => setSearchTerm("");

  const filteredRecipes = favorites.filter((recipe) =>
    recipe?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleMenuClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleOpen = (recipe) => {
    setSelectedRecipe(recipe);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRecipe(null);
  };

  const isCooked = (recipe) =>
    recipe && cookingHistory.some((item) => item.id === recipe.id);

  const toggleCooked = (recipe) => {
    if (!recipe) return;

    const updatedHistory = isCooked(recipe)
      ? cookingHistory.filter((item) => item.id !== recipe.id)
      : [...cookingHistory, recipe];

    setCookingHistory(updatedHistory);
    localStorage.setItem("cookingHistory", JSON.stringify(updatedHistory));
  };

  const toggleFavorite = (recipe) => {
    const updatedFavorites = favorites.some((fav) => fav.id === recipe.id)
      ? favorites.filter((fav) => fav.id !== recipe.id)
      : [...favorites, recipe];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (recipe) =>
    recipe && favorites.some((fav) => fav.id === recipe.id);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: "100px",
        alignItems: "center",
      }}
    >
      {/* Header Section */}
      <Header
        handleMenuOpen={handleMenuOpen}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        handleMenuClick={handleMenuClick}
      />

      {/* Main Container */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px", 
          padding: "0 16px", 
        }}
      >
        {/* Title Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginTop: 1,
          }}
        >
          <FavoriteIcon sx={{ color: "#f29057", fontSize: "30px" }} />
          <Typography
            sx={{
              fontFamily: "Nunito-Medium, Helvetica",
              fontWeight: "bold",
              color: "#EC8D58",
              fontSize: "30px",
            }}
          >
            Favorites
          </Typography>
        </Box>

        {/* Search Section */}
        <Box
          sx={{
            marginTop: -4,
          }}
        >
          <SearchBar
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            handleFilter={handleFilter}
            handleReset={handleReset}
            hideResetButton={true}
          />
        </Box>

        {/* Favorite Recipes Section */}
        <Box
          sx={{
            marginTop: "3vh",
          }}
        >
          <Grid container spacing={4}>
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={3} key={recipe.id}>
                  <RecipeCard
                    recipe={recipe}
                    handleOpen={handleOpen}
                    toggleFavorite={toggleFavorite}
                    isFavorite={isFavorite}
                  />
                </Grid>
              ))
            ) : (
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Nunito-Medium, Helvetica",
                  marginTop: "2vh",
                }}
              >
                No favorite recipes yet. Start adding some!
              </Typography>
            )}
          </Grid>
        </Box>
      </Box>

      {/* Recipe Dialog */}
      <RecipeDialog
        open={open}
        handleClose={handleClose}
        recipe={selectedRecipe}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
        toggleCookingHistory={toggleCooked}
        isCooked={isCooked}
      />
    </Box>
  );
};

export default Favorites;
