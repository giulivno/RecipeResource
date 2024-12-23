import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  CardMedia,
  Divider,
} from "@mui/material";
import { FavoriteBorder, Timer } from "@mui/icons-material";


function capitalizeFirst(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const RecipeDialogB = ({
  open,
  handleClose,
  recipe,
  toggleFavorite,
  isFavorite,
  toggleCookingHistory,
  isCooked,
  pantryItems = {}, 
}) => {
  if (!recipe) return null; 

  // Flatten pantry items into a single array 
  const selectedPantryItems = Object.values(pantryItems)
    .flat()
    .map((item) => item.toLowerCase());

  const missingIngredients = recipe.missingIngredients || [];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          padding: "16px",
          maxHeight: "90vh",
        },
      }}
    >
      {/* ===== Dialog Title ===== */}
      <DialogTitle>{recipe?.title}</DialogTitle>

      <DialogContent>
        {/* ===== Top Section: Image + Basic Details ===== */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {/* Image */}
          {recipe?.image && (
            <CardMedia
              component="img"
              src={recipe.image}
              alt={recipe.title}
              sx={{
                width: "100%",
                maxWidth: "300px",
                height: "200px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          )}

          {/* Recipe Info */}
          <Box sx={{ flex: 1, minWidth: "250px" }}>
            <Typography variant="h6" gutterBottom>
              {recipe?.title}
            </Typography>

            {/* Timer and Duration */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Timer fontSize="small" />
              <Typography variant="body2" color="textSecondary">
                {recipe?.time}
              </Typography>
            </Box>

            {/* Save for Later and Already Cooked Buttons */}
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FavoriteBorder />}
                onClick={() => toggleFavorite(recipe)}
                sx={{
                  bgcolor: isFavorite(recipe) ? "#e6951c" : "transparent",
                  color: isFavorite(recipe) ? "white" : "black",
                  "&:hover": { bgcolor: "#e6951c", color: "white" },
                  borderColor: isFavorite(recipe) ? "#e6951c" : "black",
                }}
              >
                {isFavorite(recipe) ? "Remove from Favorites" : "Save for Later"}
              </Button>

              <Button
                variant="outlined"
                startIcon={<Timer />}
                onClick={() => toggleCookingHistory(recipe)}
                sx={{
                  bgcolor: isCooked(recipe) ? "#4caf50" : "transparent",
                  color: isCooked(recipe) ? "white" : "black",
                  "&:hover": { bgcolor: "#4caf50", color: "white" },
                  borderColor: isCooked(recipe) ? "#4caf50" : "black",
                }}
              >
                {isCooked(recipe) ? "Remove from History" : "Already Cooked?"}
              </Button>
            </Box>
          </Box>
        </Box>

        {/* ===== Ingredients and Missing Ingredients Side-by-Side ===== */}
        <Box sx={{ display: "flex", gap: 4, mt: 3 }}>
          {/* Left Column: Ingredients */}
          <Box sx={{ flex: 1, minWidth: "200px" }}>
            <Typography variant="h6">Ingredients:</Typography>
            <List dense>
              {recipe?.ingredients?.map((ingredient, index) => {
                const isInPantry = selectedPantryItems.includes(
                  ingredient.toLowerCase()
                ); // Case-insensitive check
                return (
                  <ListItem key={index} sx={{ paddingLeft: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: isInPantry ? "green" : "gray" }}
                    >
                      {capitalizeFirst(ingredient)}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* Right Column: Missing Ingredients */}
          {missingIngredients.length > 0 && (
            <Box sx={{ flex: 1, minWidth: "200px" }}>
              <Typography variant="h6" color="error">
                Missing Ingredients:
              </Typography>
              <List dense>
                {missingIngredients.map((missing, index) => (
                  <ListItem key={index} sx={{ paddingLeft: 0 }}>
                    <Typography variant="body2" color="error">
                      {capitalizeFirst(missing)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>

        {/* ===== Cooking Instructions ===== */}
        {recipe?.instructions && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="h6" gutterBottom>
                Cooking Instructions:
              </Typography>
              {recipe.instructions.map((step, index) => (
                <Typography variant="body2" key={index} gutterBottom>
                  {step}
                </Typography>
              ))}
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeDialogB;
