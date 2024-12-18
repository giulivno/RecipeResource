import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { FavoriteBorder, Timer } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Card,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState, useEffect } from "react";

// Header styling
const Header = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  width: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
  height: "100px",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Logo = styled("img")({
  width: "504px",
  height: "72px",
  objectFit: "cover",
});

const StyledCard = styled(Card)({
  width: "100%",
  height: 320,
  display: "flex",
    border: "1px solid #000000",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "8px",
  cursor: "pointer",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
});

const StyledDivider = styled(Divider)({
  marginTop: "auto",
  width: "100%",
});

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "#e2e2e2",
    borderRadius: "4px",
    "&:hover": { borderColor: "#f5a623" },
    "&.Mui-focused": { borderColor: "#f5a623", borderWidth: "2px" },
  },
});

const Favorites = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [open, setOpen] = useState(false); // Dialog state
    const [selectedRecipe, setSelectedRecipe] = useState(null); // Selected recipe

    const [cookingHistory, setCookingHistory] = useState([]);



  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
      const savedHistory = JSON.parse(localStorage.getItem("cookingHistory")) || [];
      setCookingHistory(savedHistory);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipes = favorites.filter(
    (recipe) => recipe?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
    const isCooked = (recipe) => {
        return recipe && cookingHistory.some((item) => item.id === recipe.id);
    };

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

  const isFavorite = (recipe) => {
    if (!recipe) return false; // Ensure recipe is defined
    return favorites.some((fav) => fav.id === recipe.id);
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
      <Header>
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            right: "16px",
            transform: "translateY(-50%)",
          }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={() => handleMenuClick("/DesignA")}>
            Design A
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("/DesignB")}>
            Design B
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("/favorites")}>
            Favorite Recipes
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("/Cooking-History")}>
            Cooking History
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("/account-settings")}>
            Account Settings
          </MenuItem>
        </Menu>

        <Logo src={`${process.env.PUBLIC_URL}/assets/Logo.png`} alt="Logo" />
      </Header>

      {/* Title Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: "100%",
          paddingLeft: "200px",
          marginTop: 8,
            pl: 27.5,
        }}
      >
        <FavoriteIcon sx={{ color: "#f29057", fontSize: "40px" }} />
        <Typography variant="h3" sx={{ fontFamily: "Nunito-Medium, Helvetica",
            fontWeight: "bold",
            color: '#EC8D58' }}>
          Favorites
        </Typography>
      </Box>

      {/* Search Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginTop: 2,
          justifyContent: "center",
          width: "74%",
        }}
      >
        <CustomTextField
          value={searchTerm}
          onChange={handleSearch}
          variant="standard"
          placeholder="Search"
          fullWidth
          InputProps={{ disableUnderline: true, style: { paddingLeft: "10px" } }}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: "#f5a623",
            color: "white",
            "&:hover": { bgcolor: "#e6951c" },
            height: "44px",
            borderRadius: "4px",
          }}
        >
          Search
        </Button>
      </Box>

      {/* Favorite Recipes Section */}
      <Box sx={{ marginTop: 4, width: "100%", display: "flex", justifyContent: "center", pr: 13 }}>
        <Grid container spacing={5} sx={{ maxWidth: "1200px" }}>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={3} key={recipe.id}>
                <StyledCard onClick={() => handleOpen(recipe)}>
                  <CardMedia component="img" height="150" image={recipe.image} alt={recipe.title} />
                  <CardContent>
                    <Typography fontSize={18}>{recipe.title}</Typography>
                    <Typography fontSize={14} color="textSecondary">
                      {recipe.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{pt: 0}}>
                    <IconButton onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe); }}>
                      <FavoriteBorder sx={{ color: isFavorite(recipe) ? "red" : "gray" }} />
                    </IconButton>
                    <Timer fontSize="small" />
                    <Typography variant="caption">{recipe.time}</Typography>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{
                fontFamily: "Nunito-Medium, Helvetica",
                pl: 5, pt: 2.5
            }}>No favorite recipes yet. Start adding some!</Typography>
          )}
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Box sx={{ display: "flex", gap: 2 }}>
              <img
                  src={selectedRecipe?.image}
                  alt={selectedRecipe?.title}
                  style={{
                      width: "40%",
                      height: "auto",
                      borderRadius: "8px",
                      objectFit: "cover",
                      maxWidth: "100%",
                  }}
              />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4">{selectedRecipe?.title}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 1 }}>
                    <Timer fontSize="small" />
                    <Typography variant="body2" color="textSecondary">
                        {selectedRecipe?.time}
                    </Typography>
                </Box>

                {/* Save for Later and Already Cooked Buttons */}
                <Box sx={{ display: "flex", gap: 2, marginTop: 2, pb: 2 }}>
                    {/* Save for Later Button */}
                    <Button
                        variant="outlined"
                        startIcon={<FavoriteBorder />}
                        onClick={() => toggleFavorite(selectedRecipe)}
                        sx={{
                            bgcolor: isFavorite(selectedRecipe) ? "#e6951c" : "transparent",
                            color: isFavorite(selectedRecipe) ? "white" : "black",
                            "&:hover": { bgcolor: "#e6951c", color: "white" },
                            borderColor: isFavorite(selectedRecipe) ? "#e6951c" : "black",

                        }}
                    >
                        {isFavorite(selectedRecipe) ? "Remove from Favorites" : "Save for Later"}
                    </Button>

                    {/* Already Cooked Button */}
                    <Button
                        variant="outlined"
                        startIcon={<Timer />}
                        onClick={() => toggleCooked(selectedRecipe)}
                        sx={{
                            bgcolor: isCooked(selectedRecipe) ? "#4caf50" : "transparent",
                            color: isCooked(selectedRecipe) ? "white" : "black",
                            "&:hover": { bgcolor: "#4caf50", color: "white" },
                            borderColor: isCooked(selectedRecipe) ? "#4caf50" : "black",
                        }}
                    >
                        {isCooked(selectedRecipe) ? "Remove from History" : "Already Cooked?"}
                    </Button>
                </Box>
              <Typography>{selectedRecipe?.description}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography>Ingredients:</Typography>
              <ul>
                {selectedRecipe?.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>

            </Box>
          </Box>
          {/* Divider Line */}
    <Divider sx={{ marginY: 2 }} />

{/* Scrollable Cooking Instructions */}
<Box
  sx={{
    maxHeight: "30vh",
    overflowY: "auto",
    paddingRight: 1,
  }}
>
  <Typography variant="h5" gutterBottom>
    Cooking Instructions
  </Typography>
  <Box>
    {selectedRecipe?.instructions?.map((step, index) => (
      <Typography variant="body2" key={index} gutterBottom>
        {step}
      </Typography>
    ))}
  </Box>
</Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Favorites;
