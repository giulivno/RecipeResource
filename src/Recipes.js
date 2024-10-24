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
const Restrictions = ({ selectedRestrictions, setSelectedRestrictions }) => {
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
const Pantry = ({ selectedPantryItems, setSelectedPantryItems }) => {
  const [openItems, setOpenItems] = useState({});
  

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

    const [selectedPantryItems, setSelectedPantryItems] = useState({
        essentials: [],
        fruitsVeggies: [],
        meats: [],
        carbohydrates: [],
        seasonings: []
    });

    const [selectedRestrictions, setSelectedRestrictions] = useState([]);

    const [filteredRecipes, setFilteredRecipes] = useState(recipesData);

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

    // Safely toggle cooking history
    const toggleCooked = (recipe) => {
        if (!recipe) return; // Ensure recipe is defined

        const updatedHistory = isCooked(recipe)
            ? cookingHistory.filter((item) => item.id !== recipe.id)
            : [...cookingHistory, recipe];

        setCookingHistory(updatedHistory);
        localStorage.setItem("cookingHistory", JSON.stringify(updatedHistory));
    };

    // Toggle the cooking history status of a recipe
    const toggleCookingHistory = (recipe) => {
      const isAlreadyCooked = cookingHistory.some((item) => item.id === recipe.id);

      const updatedHistory = isAlreadyCooked
        ? cookingHistory.filter((item) => item.id !== recipe.id) // Remove if already cooked
        : [...cookingHistory, recipe]; // Add if not cooked yet

      setCookingHistory(updatedHistory);
    };

    // Check if the recipe exists before accessing its properties
    const isFavorite = (recipe) => {
      if (!recipe) return false; // Handle null or undefined recipe
      return favorites.some((fav) => fav.id === recipe.id);
    };

    // Check if the recipe is already in cooking history
    const isCooked = (recipe) => {
      if (!recipe || !recipe.id) return false; // Safeguard to ensure recipe and id exist
      return cookingHistory.some((item) => item.id === recipe.id);
    };


    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };

    // filtering
    const handleFilter = () => {
        const selectedItems = Object.values(selectedPantryItems).flat();
        const filtered = recipesData.filter((recipe) => {
            const ingredientsMatch = recipe.ingredients.every(ingredient =>
                selectedItems.includes(ingredient)
            );
            const restrictionsMatch = selectedRestrictions.every(restriction =>
                recipe.dietaryRestrictions.includes(restriction)
            );

            if (searchTerm === '') {
                return ingredientsMatch && restrictionsMatch;
            }
            else if (searchTerm !== '' && selectedItems.length === 0 && selectedRestrictions.length === 0){
                const searchMatch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) || recipe.ingredients.map(ingredient => ingredient.toLowerCase()).some(ingredient => ingredient.includes(searchTerm.toLowerCase()));

                console.log(searchTerm);
                console.log("search");
                console.log(searchMatch);
                return searchMatch;
            }
            else {
                const searchMatch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) || recipe.ingredients.map(ingredient => ingredient.toLowerCase()).some(ingredient => ingredient.includes(searchTerm.toLowerCase()));
                
                return ingredientsMatch && restrictionsMatch && searchMatch;
            }
        });
        setFilteredRecipes(filtered);
    };




    const handleOpen = (recipe) => {
      setSelectedRecipe(recipe); // Set the selected recipe
      setOpen(true); // Open the dialog
    };
  
    const handleClose = () => {
      setOpen(false); // Close the dialog
      setSelectedRecipe(null); // Clear selected recipe
    };


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
            onClick={handleFilter}
            >
                    Search
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
            {(filteredRecipes || []).map((recipe, index) => (
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
                <CardActions sx={{pt: 0}}>
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
            <Pantry
                selectedPantryItems={selectedPantryItems}
                setSelectedPantryItems={setSelectedPantryItems}/>
            <Restrictions
                selectedRestrictions={selectedRestrictions}
                setSelectedRestrictions={setSelectedRestrictions}/>
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 1 }}>
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

  
        <Divider />
      </Box>
    );
  };
  
  export default Recipes;