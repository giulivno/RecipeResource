import React from "react";
import {
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { FavoriteBorder, Timer } from "@mui/icons-material";
import { StyledCard } from "../styles"; // Ensure the path to StyledCard is correct
import { Box } from "@mui/material";

const RecipeCard = ({ recipe, handleOpen, toggleFavorite, isFavorite }) => (
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
      {/* Display missing ingredients count */}
      {recipe.missingCount > 0 && (
          <Box mt={1}>
            <Typography variant="body2" color="error">
              Missing {recipe.missingCount} Ingredient{recipe.missingCount > 1 ? "s" : ""}
            </Typography>
          </Box>
        )}
    </CardContent>
    <CardActions sx={{ pt: 0 }}>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(recipe);
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
);

export default RecipeCard;
