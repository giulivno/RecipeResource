import React from "react";
import {
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { FavoriteBorder, Timer } from "@mui/icons-material";
import { StyledCard } from "../styles";
import { Box } from "@mui/material";

const RecipeCard = ({ recipe, handleOpen, toggleFavorite, isFavorite }) => {
  const favoriteStatus = isFavorite ? isFavorite(recipe) : false;

  return (
    <StyledCard onClick={() => handleOpen(recipe)}>
      {/* Recipe Image */}
      <CardMedia
        component="img"
        height="150"
        image={recipe.image}
        alt="Recipe Image"
        sx={{ objectFit: "cover" }} 
      />

      {/* Recipe Content */}
      <CardContent sx={{ padding: "8px", flexGrow: 1 }}> 
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

      {/* Recipe Actions */}
      <CardActions sx={{ pt: 0 }}>
        {/* Favorite Button */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(recipe);
          }}
        >
          <FavoriteBorder
            style={{
              color: favoriteStatus ? "red" : "gray",
              cursor: "pointer",
            }}
          />
        </IconButton>

        {/* Timer */}
        <Timer fontSize="small" />
        <Typography variant="caption" color="#f20597">
          {recipe.time}
        </Typography>
      </CardActions>
    </StyledCard>
  );
};

export default RecipeCard;
