
import MenuIcon from "@mui/icons-material/Menu"; 
import {
  FavoriteBorder,
  Search,
  Timer,
  ExpandMore as ExpandMoreIcon,
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
import { recipesData } from "./recipesData";
import { pantryData } from "./pantryData";


// Restrictions Component
const Restrictions = () => {
    const restrictionOptions = [
      "No meat",
      "No nuts",
      "No eggs",
      "No gluten",
      "No shellfish",
      "No lactose",
    ];
  
    const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  
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
          marginTop: 2,
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
  
        <Grid container spacing={2}>
          {restrictionOptions.map((option, index) => (
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

// Custom styled card with hover effect
const StyledCard = styled(Card)(({ theme }) => ({
    width: "100%",
    height: 320,
    bgcolor: "neutral.100",
    border: "1px solid #000000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "8px",
    cursor: "pointer", // Make it look clickable
    transition: "transform 0.3s, box-shadow 0.3s", // Smooth transition effect
    "&:hover": {
      transform: "scale(1.05)", // Slightly raise the card on hover
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Add shadow effect
    },
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

// Pantry Component with original size restored
const Pantry = () => {
  const [openItems, setOpenItems] = useState({});

  const [selectedPantryItems, setSelectedPantryItems] = useState({
    essentials: [],
    fruitsVeggies: [],
    meats: [],
    carbohydrates: [],
    seasonings: []
  });

  

  const handleToggle = (index) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Handle item selection
  const handleItemClick = (category, item) => {
    setSelectedPantryItems((prev) => {
      const isSelected = prev[category].includes(item);
      const updatedCategory = isSelected
        ? prev[category].filter((i) => i !== item)
        : [...prev[category], item];

      return {
        ...prev,
        [category]: updatedCategory
      };
    });
  };


  const pantryItems = [
    "Essentials",
    "Fruits & Veggies",
    "Meats",
    "Carbohydrates",
    "Seasonings",
  ];

  return (
    <Box
      sx={{
        width: "300px", // Restored width
        marginTop: -10,
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

      <List>
        {Object.keys(pantryData).map((category, index) => (
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
                      bgcolor: selectedPantryItems[category].includes(item)
                        ? "#f5a623"
                        : "transparent",
                      color: selectedPantryItems[category].includes(item)
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
        ))}
      </List>
    </Box>
  );
};

// Recipes Component
const Recipes = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const contentWidth = { xs: "100%", sm: "600px", md: "900px" };
  
    // State to control the dialog visibility
    const [open, setOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null); // Store selected recipe info

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

    // Sync favorites with localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Toggle the favorite status of a recipe
    const toggleFavorite = (recipe) => {
        const isAlreadyFavorite = favorites.some((fav) => fav.id === recipe.id);
      
        // Create a sanitized version of the recipe with only necessary properties
        const sanitizedRecipe = {
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          image: recipe.image,
          time: recipe.time,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        };
      
        const updatedFavorites = isAlreadyFavorite
          ? favorites.filter((fav) => fav.id !== recipe.id) // Remove if already a favorite
          : [...favorites, sanitizedRecipe]; // Add sanitized recipe
      
        setFavorites(updatedFavorites);
      };

    // Check if a recipe is a favorite
    const isFavorite = (recipe) => {
        if (!recipe) return false; // Return false if recipe is null or undefined
        return favorites.some((fav) => fav.id === recipe.id);
      };
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleOpen = (recipe) => {
      setSelectedRecipe(recipe); // Set the selected recipe
      setOpen(true); // Open the dialog
    };
  
    const handleClose = () => {
      setOpen(false); // Close the dialog
      setSelectedRecipe(null); // Clear selected recipe
    };
  
    const recipes = recipesData || [];

    {/*Menu Code*/ }

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
                    <MenuItem onClick={() => handleMenuClick('/recipes')}>Home Page</MenuItem>
                    <MenuItem onClick={() => handleMenuClick('/favorites')}>Favorite Recipes</MenuItem>
                    <MenuItem onClick={() => handleMenuClick('/cooking-history')}>Cooking History</MenuItem>
                    <MenuItem onClick={() => handleMenuClick('/account-settings')}>Account Settings</MenuItem>
                </Menu>
          <Logo src={`${process.env.PUBLIC_URL}/assets/Logo.png`} alt="Logo" />
        </Header>
  
        {/* Search Section */}
            <Box
            sx={{
            width: contentWidth,
            marginTop: 4,
            marginLeft: "90px",
            display: "flex",
            alignItems: "center",
            gap: 2,
            }}
        >
            <CustomTextField
            value={searchTerm}
            onChange={handleSearch}
            variant="standard"
            placeholder="Search"
            fullWidth
            InputProps={{ disableUnderline: true,
            style : {paddingLeft: "10px"}}}
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
            Filter
            </Button>
        </Box>
  
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

        {/* Box for Recipe Card Grid - needed to add scroll functionality */}
        <Box
            sx={{
                maxHeight: "600px", // Set a maximum height for the scrollable area
                overflowY: "auto", // Enable vertical scrolling when content exceeds max height
                paddingRight: 1, // Optional: Add padding to account for scroll bar width
                width: "60%", // Make the Box take the full width of the parent container
            }}
        >

          {/* Recipe Cards with Clickable Pop-Up */}
          <Grid
            container
            spacing={4}
            sx={{
              width: contentWidth,
              maxWidth: "900px",
            }}
          >
            {recipes.map((recipe, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard onClick={() => handleOpen(recipe)}>
                <CardMedia
                  component="img"
                  height="150"
                  image={recipe.image}
                  alt="Recipe Image"
                />
                <CardContent>
                  <Typography variant="h6" color="#1d1b20">
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" color="#49454F">
                    {recipe.description}
                  </Typography>
                </CardContent>
                <CardActions>
                    <IconButton
                        onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering card click
                        toggleFavorite(recipe); // Use the correct recipe object
                        }}
                    >
                        <FavoriteBorder
                        style={{
                            color: isFavorite(recipe) ? "red" : "gray",
                            cursor: "pointer",
                        }}
                        />
                    </IconButton>
                    <Timer fontSize="small" />
                    <Typography variant="caption" color="#f20597">
                        {recipe.time}
                    </Typography>
                    </CardActions>
              </StyledCard>
            </Grid>
            ))}
          </Grid>
        </Box>

          {/* Pantry and Restrictions Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "300px",
              ml: 10, // Move to the right
            }}
          >
            <Pantry />
            <Restrictions />
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

        {/* Timer and Duration */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 1 }}>
          <Timer fontSize="small" />
          <Typography variant="body2" color="textSecondary">
            {selectedRecipe?.time}
          </Typography>
        </Box>

        {/* Save for Later Button */}
        <Button
          variant="outlined"
          startIcon={<FavoriteBorder />}
          sx={{
            marginTop: 1,
            bgcolor: isFavorite(selectedRecipe) ? "#e6951c" : "transparent",
            color: isFavorite(selectedRecipe) ? "white" : "black",
            "&:hover": { bgcolor: "#e6951c", color: "white" },
            borderColor: isFavorite(selectedRecipe) ? "#e6951c" : "black",
          }}
          onClick={() => toggleFavorite(selectedRecipe)}
        >
          {isFavorite(selectedRecipe) ? "Remove from Favorites" : "Save for Later"}
        </Button>

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


  
        <Divider />
      </Box>
    );
  };
  
  export default Recipes;