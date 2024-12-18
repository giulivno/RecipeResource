import MenuIcon from "@mui/icons-material/Menu"; 
import {
  FavoriteBorder,
  Search,
  Timer,
  ExpandMore as ExpandMoreIcon,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
    DialogContent,
    DialogActions,
    Menu,
  MenuItem
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { recipesData } from "./data/recipesData";
import { pantryData } from "./data/pantryData";


// Restrictions Component
const Restrictions = ({ selectedRestrictions, setSelectedRestrictions, searchRestrictions, setSearchRestrictions, handleFilter }) => {
    const restrictionOptions = [
      "No meat",
      "No nuts",
      "No eggs",
      "No gluten",
      "No shellfish",
      "No lactose",
    ];
  
    const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      setSelectedRestrictions((prev) =>
        checked
          ? [...prev, name] // Add to the array if checked
          : prev.filter((restriction) => restriction !== name) // Remove if unchecked
      );
    };
  
    return (
      <Box
        sx={{
          width: "300px",
          marginTop: 0, 
          padding: 2,
          bgcolor: "white",
          borderRadius: "8px",
          border: 1,
          borderColor: "#303030",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Nunito-Bold, Helvetica",
            fontWeight: "bold",
            color: "#f5a623",
            textAlign: "center",
            marginBottom: 2,
          }}
        >
          Restrictions
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
          <CustomTextField
            value={searchRestrictions}
            onChange={(e) => setSearchRestrictions(e.target.value)}
            variant="standard"
            placeholder="Search Restrictions"
            fullWidth
            InputProps={{ disableUnderline: true, style: { paddingLeft: "10px" } }}
          />
          <IconButton onClick={handleFilter}>
            <Search />
          </IconButton>
        </Box>
  
        <Grid container spacing={2}>
          {restrictionOptions.filter((option) => option.toLowerCase().includes(searchRestrictions.toLowerCase())).map((option, index) => (
            <Grid item xs={6} key={index}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <input
                  type="checkbox"
                  name={option}
                  id={`restriction-${index}`}
                  onChange={handleCheckboxChange}
                  checked={selectedRestrictions.includes(option)}
                  style={{ transform: "scale(1.2)" }}
                />
                <label
                  htmlFor={`restriction-${index}`}
                  style={{
                    fontFamily: "Nunito-Medium, Helvetica",
                    color: "#313043",
                  }}
                >
                  {option}
                </label>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

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

// Logo styling
const Logo = styled("img")({
  width: "504px",
  height: "72px",
  objectFit: "cover",
});

// Custom styled card without hover effect
const StyledCard = styled(Card)(({ theme }) => ({
  width: 575,
  height: 650,
  bgcolor: "neutral.100",
  border: "1px solid #000000",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "8px",
  margin: "0 auto",
  cursor: "pointer", 
}));

// Divider styling
const StyledDivider = styled(Divider)({
  marginTop: "auto",
  width: "100%",
});

// Custom TextField styling for Search
const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "#e2e2e2",
    borderRadius: "4px",
    "&:hover": {
      borderColor: "#f5a623",
    },
    "&.Mui-focused": {
      borderColor: "#f5a623",
      borderWidth: "2px",
    },
  },
});

// Updated Pantry Component with Global Ingredient Search Functionality
const Pantry = ({ selectedPantryItems, setSelectedPantryItems, searchPantry, setSearchPantry, handleFilter }) => {
  const [openItems, setOpenItems] = useState({});

  const handleToggle = (index) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Handle item selection
  const handleItemClick = (category, item) => {
    setSelectedPantryItems((prev) => {
      const isSelected = prev[category]?.includes(item);
      const updatedCategory = isSelected
        ? prev[category].filter((i) => i !== item)
        : [...(prev[category] || []), item];

      return {
        ...prev,
        [category]: updatedCategory,
      };
    });
  };

  // Gather all ingredients into a flat list to search globally
  const allIngredients = Object.entries(pantryData).reduce((acc, [category, items]) => {
    return [
      ...acc,
      ...items.map((item) => ({ category, item })),
    ];
  }, []);

  const filteredIngredients = allIngredients.filter(({ item }) =>
    item.toLowerCase().includes(searchPantry.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: "300px",
        marginTop: 0,
        padding: 2,
        bgcolor: "white",
        border: 1,
        borderColor: "#303030",
        borderRadius: "4px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Nunito-Bold, Helvetica",
          fontWeight: "bold",
          color: "#f5a623",
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        Pantry
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
        <CustomTextField
          value={searchPantry}
          onChange={(e) => setSearchPantry(e.target.value)}
          variant="standard"
          placeholder="Search Pantry Items"
          fullWidth
          InputProps={{ disableUnderline: true, style: { paddingLeft: "10px" } }}
        />
              <IconButton onClick={handleFilter }>
          <Search />
        </IconButton>
      </Box>

      <List>
        {searchPantry ? (
          // Display filtered ingredients without categories
          filteredIngredients.map(({ category, item }) => (
            <ListItem
              key={item}
              button
              onClick={() => handleItemClick(category, item)}
              sx={{
                pl: 4,
                bgcolor: selectedPantryItems[category]?.includes(item)
                  ? "#f5a623"
                  : "transparent",
                color: selectedPantryItems[category]?.includes(item)
                  ? "white"
                  : "inherit",
              }}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))
        ) : (
          // Display original structure with categories and items
          Object.keys(pantryData).map((category, index) => (
            <Box key={index}>
              <ListItemButton
                onClick={() => handleToggle(index)}
                sx={{
                  bgcolor: "#b6d7a8",
                  borderRadius: "4px",
                  marginBottom: 1,
                }}
              >
                <ListItemText
                  primary={category.charAt(0).toUpperCase() + category.slice(1)}
                  primaryTypographyProps={{
                    fontFamily: "Nunito-Medium, Helvetica",
                    fontWeight: "medium",
                    color: "#313043",
                  }}
                />
                <ListItemIcon>
                  <ExpandMoreIcon
                    sx={{ color: openItems[index] ? "#f20597" : "#313043" }}
                  />
                </ListItemIcon>
              </ListItemButton>
              <Collapse in={openItems[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {pantryData[category].map((item) => (
                    <ListItem
                      key={item}
                      button
                      onClick={() => handleItemClick(category, item)}
                      sx={{
                        pl: 4,
                        bgcolor: selectedPantryItems[category]?.includes(item)
                          ? "#f5a623"
                          : "transparent",
                        color: selectedPantryItems[category]?.includes(item)
                          ? "white"
                          : "inherit",
                      }}
                    >
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))
        )}
      </List>
    </Box>
  );
};

const Recipes = () => {
  const [searchPantry, setSearchPantry] = useState("");
  const [searchRestrictions, setSearchRestrictions] = useState("");
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(recipesData[0]); 

  const [selectedPantryItems, setSelectedPantryItems] = useState({
    essentials: [],
    fruitsVeggies: [],
    meats: [],
    carbohydrates: [],
    seasonings: []
  });

  const [selectedRestrictions, setSelectedRestrictions] = useState([]);

  const [filteredRecipes, setFilteredRecipes] = useState(recipesData);

  // State to control the dialog visibility
  const [open, setOpen] = useState(false);

  // Update favorite state to track favorites for each recipe
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
      return storedFavorites || [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      return [];
    }
  });

  // State to track cooking history
  const [cookingHistory, setCookingHistory] = useState(() => {
    try {
      const storedHistory = JSON.parse(localStorage.getItem("cookingHistory"));
      return storedHistory || [];
    } catch (error) {
      console.error("Failed to parse cooking history from localStorage", error);
      return [];
    }
  });

  // Sync cooking history with localStorage
  useEffect(() => {
    localStorage.setItem("cookingHistory", JSON.stringify(cookingHistory));
  }, [cookingHistory]);

  // Sync favorites with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle the favorite status of a recipe
  const toggleFavorite = (recipe) => {
    if (!recipe) return;

    const isAlreadyFavorite = favorites.some((fav) => fav.id === recipe.id);

    const updatedFavorites = isAlreadyFavorite
      ? favorites.filter((fav) => fav.id !== recipe.id)
      : [...favorites, recipe];

    setFavorites(updatedFavorites);
  };

  // Safely toggle cooking history
  const toggleCookingHistory = (recipe) => {
    if (!recipe) return;

    const updatedHistory = isCooked(recipe)
      ? cookingHistory.filter((item) => item.id !== recipe.id)
      : [...cookingHistory, recipe];

    setCookingHistory(updatedHistory);
  };

  // Check if the recipe is already in cooking history
  const isCooked = (recipe) => {
    return cookingHistory.some((item) => item.id === recipe.id);
  };

  // Check if the recipe exists before trying to access its properties
const isFavorite = (recipe) => {
  return recipe && favorites.some((fav) => fav.id === recipe.id);
};

  // Function to go to the previous recipe
  const prevRecipe = () => {
    const newIndex =
      (selectedRecipeIndex - 1 + filteredRecipes.length) % filteredRecipes.length;
    setSelectedRecipeIndex(newIndex);
    setSelectedRecipe(filteredRecipes[newIndex]);
  };

  // Function to go to the next recipe
  const nextRecipe = () => {
    const newIndex = (selectedRecipeIndex + 1) % filteredRecipes.length;
    setSelectedRecipeIndex(newIndex);
    setSelectedRecipe(filteredRecipes[newIndex]);
  };

  const handleOpen = (recipe) => {
    setSelectedRecipe(recipe);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Filtering recipes based on selected pantry items and restrictions
  const handleFilter = () => {
    const selectedItems = Object.values(selectedPantryItems).flat();
    const filtered = recipesData.filter((recipe) => {
      const ingredientsMatch =
        selectedItems.length === 0 ||
        recipe.ingredients.every((ingredient) => selectedItems.includes(ingredient));
      const restrictionsMatch =
        selectedRestrictions.length === 0 ||
        selectedRestrictions.every((restriction) =>
          recipe.dietaryRestrictions.includes(restriction)
        );

      return ingredientsMatch && restrictionsMatch;
    });
    setFilteredRecipes(filtered);
    setSelectedRecipeIndex(0);
    setSelectedRecipe(filtered[0] || null);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Open the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Navigate to different pages
  const handleMenuClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

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
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {/* Menu Items */}
          <MenuItem onClick={() => handleMenuClick('/DesignA')}>Design A</MenuItem>
          <MenuItem onClick={() => handleMenuClick('/DesignB')}>Design B</MenuItem>
          <MenuItem onClick={() => handleMenuClick('/favorites')}>Favorite Recipes</MenuItem>
          <MenuItem onClick={() => handleMenuClick('/cooking-history')}>Cooking History</MenuItem>
          <MenuItem onClick={() => handleMenuClick('/account-settings')}>Account Settings</MenuItem>
        </Menu>
        <Logo src={`${process.env.PUBLIC_URL}/assets/Logo.png`} alt="Logo" />
      </Header>

      {/* Main Content Section */}
      <Box
        sx={{
          display: "flex",
          gap: 5,
          marginLeft: "90px",
          marginTop: 4,
          flexWrap: "wrap",
        }}
      >
        {/* Pantry and Restrictions Section */}
<Box
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 1, 
    width: "300px",
    marginRight: -50, 
    marginLeft: 40,
  }}
>
  <Pantry
    selectedPantryItems={selectedPantryItems}
    setSelectedPantryItems={setSelectedPantryItems}
    searchPantry={searchPantry}
    setSearchPantry={setSearchPantry}
    handleFilter={handleFilter}
  />
  <Restrictions
    selectedRestrictions={selectedRestrictions}
    setSelectedRestrictions={setSelectedRestrictions}
    searchRestrictions={searchRestrictions}
    setSearchRestrictions={setSearchRestrictions}
    handleFilter={handleFilter}
  />
</Box>

        {/* Recipe Display Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "%",
            height: "100%",
            margin: "0 auto",
          }}
        > 
            
          {/* Arrow Back Button */}
<IconButton
  onClick={prevRecipe}
  sx={{
    width: 64, 
    height: 64, 
    border: '2px solid gray', 
    borderRadius: '50%', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    marginRight: 2, 
    '&:hover': {
      transform: 'scale(1.1)', 
      borderColor: '#f20597', 
    },
  }}
>
  <ArrowBack fontSize="large" />
</IconButton>

          {/* Recipe Card */}
          {selectedRecipe && (
            <StyledCard onClick={() => handleOpen(selectedRecipe)}>
              <CardMedia
                component="img"
                sx={{ height: "350px", width: "100%", objectFit: "cover" }}
                image={selectedRecipe.image}
                alt="Recipe Image"
              />
              <CardContent sx={{ marginTop: '-120px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Typography variant="h5" color="#1d1b20" sx={{ fontWeight: 'bold', textAlign: 'left' }}>  
                    {selectedRecipe.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Timer fontSize="small" />
                    <Typography variant="caption" color="#f20597">
                      {selectedRecipe.time}
                    </Typography>
                    {[...Array(selectedRecipe?.rating)].map((_, index) => (
                      <img
                        key={index}
                        src={`${process.env.PUBLIC_URL}/assets/image%20${index + 11}.png`}
                        alt={`Dot ${index + 11}`}
                        width={22}
                        height={22}
                        style={{ transform: "scale(0.9)" }}
                      />
                    ))}
                  </Box>
                </Box>
                <Typography variant="body2" color="#49454F" sx={{ marginTop: 2, textAlign: 'left' }}>
                  {selectedRecipe.description}
                </Typography>
          
                
              </CardContent>
              <CardActions sx={{ pt: 0 }}>
              <IconButton
  onClick={(e) => {
    e.stopPropagation();
    toggleFavorite(selectedRecipe);
  }}
  sx={{
    width: 64, 
    height: 64, 
    border: '2px solid', 
    borderColor: isFavorite(selectedRecipe) ? 'red' : 'gray', 
    borderRadius: '50%', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: isFavorite(selectedRecipe) ? 'red' : 'gray', 
    transition: 'all 0.3s ease', 
    margin: '0 auto', 
    '&:hover': {
      transform: 'scale(1.1)', 
    },
  }}
>
  <FavoriteBorder sx={{ fontSize: 48 }} /> {/* Increase the icon size */}
</IconButton>
          
              </CardActions>
            </StyledCard>
          )}

          {/* Arrow Forward Button */}
<IconButton
  onClick={nextRecipe}
  sx={{
    width: 64, 
    height: 64, 
    border: '2px solid gray', 
    borderRadius: '50%', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    marginLeft: 2, 
    '&:hover': {
      transform: 'scale(1.1)', 
      borderColor: '#f20597', 
    },
  }}
>
  <ArrowForward fontSize="large" />
</IconButton>
        </Box>
      </Box>

      {/* Dialog for Recipe Details */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "12px",
            padding: "16px",
            maxHeight: "80vh",
          },
        }}
      >
        <DialogContent>
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Image Section */}
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

            {/* Recipe Details Section */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                {selectedRecipe?.title}
              </Typography>

              {/* Dots representing rating */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {[...Array(selectedRecipe?.rating)].map((_, index) => (
                  <img
                    key={index}
                    src={`${process.env.PUBLIC_URL}/assets/image%20${index + 11}.png`}
                    alt={`Dot ${index + 11}`}
                    width={22}
                    height={22}
                    style={{ transform: "scale(0.9)" }}
                  />
                ))}
              </Box>

              {/* Timer and Duration */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 1 }}
              >
                <Timer fontSize="small" />
                <Typography variant="body2" color="textSecondary">
                  {selectedRecipe?.time}
                </Typography>
              </Box>

              {/* Save for Later and Already Cooked Buttons */}
              <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
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
                  onClick={() => toggleCookingHistory(selectedRecipe)}
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

              {/* Recipe Description */}
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                {selectedRecipe?.description}
              </Typography>

              {/* Ingredient List */}
              <Typography variant="subtitle1" sx={{ marginTop: 2, marginBottom: 0 }}>
                Ingredient List:
              </Typography>
              <ul style={{ marginTop: 0, paddingLeft: "20px" }}>
                {selectedRecipe?.ingredients?.map((ingredient, index) => (
                  <li key={index}>
                    <Typography variant="body2" color="textSecondary" component="span">
                      {ingredient}
                    </Typography>
                  </li>
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
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Recipes;
