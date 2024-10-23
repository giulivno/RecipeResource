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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


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

  const handleToggle = (index) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));
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
        {pantryItems.map((text, index) => (
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
                primary={text}
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
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary={`Sub-item for ${text}`} />
                </ListItem>
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
    const [favoriteRecipes, setFavoriteRecipes] = useState({});

    // Favorite toggle function
    const toggleFavorite = (index) => {
        setFavoriteRecipes((prevFavorites) => ({
            ...prevFavorites,
            [index]: !prevFavorites[index], // Toggle the favorite status for the specific recipe
        }));
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
  
    const recipes = Array(9).fill({
      title: "Recipe Title",
      description: "This is a sample recipe description.",
      image: `${process.env.PUBLIC_URL}/assets/Image.png`,
    });

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
                    <MenuItem onClick={() => handleMenuClick('/Cooking-History')}>Cooking History</MenuItem>
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
                  <FavoriteBorder
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering card click
                        toggleFavorite(index); // Pass the index to toggle favorite
                      }}
                      style={{ color: favoriteRecipes[index] ? 'red' : 'gray', cursor: 'pointer' }} // Change color based on favorite status
                  />
                  <Timer fontSize="small" />
                  <Typography variant="caption" color="#f20597">
                    20 min
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
      maxHeight: "80vh", // Control max height of the dialog
    },
  }}
>
  <DialogContent>
    <Box sx={{ display: "flex", gap: 2 }}>
      {/* Image Section */}
      <img
        src={selectedRecipe?.image}
        alt="Recipe Image"
        style={{
          width: "40%",
          height: "auto",
          borderRadius: "8px",
        }}
      />

      {/* Recipe Details Section */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" gutterBottom>
          {selectedRecipe?.title}
        </Typography>

        {/* Dots representing rating */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {[...Array(5)].map((_, index) => (
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
            20 min
          </Typography>
        </Box>

        {/* Save for Later Button */}
        <Button
          variant="outlined"
          startIcon={<FavoriteBorder />}
          sx={{ marginTop: 1 }}
          onClick = {toggleFavorite}
        >
          Save for later
        </Button>

        {/* Recipe Description */}
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {selectedRecipe?.description}
        </Typography>

        {/* Ingredient List */}
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Ingredient List:
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {/* Example ingredient list - replace with dynamic content */}
          - 1 cup flour <br />
          - 2 eggs <br />
          - 1/2 cup sugar
        </Typography>
      </Box>
    </Box>

    {/* Divider Line */}
    <Divider sx={{ marginY: 2 }} />

    {/* Scrollable Cooking Instructions */}
    <Box
      sx={{
        maxHeight: "30vh", // Limit the height of this section
        overflowY: "auto", // Enable vertical scrolling
        paddingRight: 1, // Add padding for scrollbar clearance
      }}
    >
      <Typography variant="h5" gutterBottom>
        Cooking Instructions
      </Typography>
      <Typography variant="body2">
        Step 1: Preheat the oven to 350°F (175°C). <br />
        Step 2: Mix the flour, sugar, and eggs in a bowl. <br />
        Step 3: Pour the mixture into a baking pan and smooth the top. <br />
        Step 4: Bake for 20 minutes or until golden brown. <br />
        Step 5: Let cool before serving. Enjoy! <br />
        {/* Add more steps to test scrolling behavior */}
        Step 6: Optional - add frosting or toppings of choice. <br />
        Step 7: Store any leftovers in the refrigerator for up to 5 days. <br />
        Step 8: Reheat in the oven at 300°F for 5-10 minutes if desired.
      </Typography>
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