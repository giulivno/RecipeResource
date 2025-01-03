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

  // Utility function to remove HTML tags
  const stripHtmlTags = (text) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = text;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  

  // Utility function to truncate text
  const truncateText = (text, limit) => {
    const cleanedText = stripHtmlTags(text);
    return cleanedText.length > limit ? `${cleanedText.slice(0, limit)}...` : cleanedText;
  };

  return (
    <StyledCard onClick={() => handleOpen(recipe)}>
      {/* Recipe Image */}
      <CardMedia
        component="img"
        height="150"
        image={recipe.image || "/placeholder.jpg"} // Fallback to placeholder image
        alt="Recipe Image"
        sx={{ objectFit: "cover" }}
      />

      {/* Recipe Content */}
      <CardContent sx={{ padding: "8px", flexGrow: 1 }}>
        {/* Truncated Title */}
        <Typography variant="h6" color="#1d1b20">
          {truncateText(recipe.title, 50)} {/* Limit to 50 characters */}
        </Typography>

        {/* Truncated Description */}
        <Typography variant="body2" color="#49454F">
        {truncateText(recipe.description || "No description available", 100)}
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

      </CardActions>
    </StyledCard>
  );
};

export default RecipeCard;
