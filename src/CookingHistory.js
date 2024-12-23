import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import Header from "./components/Header"; 
import RecipeCard from "./components/RecipeCard"; 
import RecipeDialog from "./components/RecipeDialog"; 
import SearchBar from "./components/SearchBar"; 

const CookingHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [cookingHistory, setCookingHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("cookingHistory")) || [];
    setCookingHistory(savedHistory);
  }, []);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleFilter = () => {
    
  };

  const handleReset = () => setSearchTerm("");

  const filteredRecipes = cookingHistory.filter((recipe) =>
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
          <TimerIcon sx={{ color: "#f29057", fontSize: "30px" }} />
          <Typography
            sx={{
              fontFamily: "Nunito-Medium, Helvetica",
              fontWeight: "bold",
              color: "#EC8D58",
              fontSize: "30px",
            }}
          >
            Cooking History
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

        {/* Cooking History Section */}
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
                    toggleCookingHistory={toggleCooked}
                    isCooked={isCooked}
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
                No recipes in cooking history yet. Start adding some!
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
        toggleCookingHistory={toggleCooked}
        isCooked={isCooked} 
      />
    </Box>
  );
};

export default CookingHistory;
