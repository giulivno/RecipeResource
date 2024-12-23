import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import Timer from "@mui/icons-material/Timer";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

const RecipeCardB = ({ recipe, isFavorite, toggleFavorite, handleOpen }) => {
  if (!recipe) return null;

  const missingCount = recipe.missingCount ?? 0;

  return (
    <Card
      onClick={() => handleOpen(recipe)}
      sx={{
        width: 575,
        height: 600,
        bgcolor: "neutral.100",
        border: "1px solid #000000",
        display: "flex",
        flexDirection: "column",
        position: "relative", 
        padding: "0",
        margin: "0 auto",
        cursor: "pointer",
      }}
    >
      {/* Recipe image */}
      <CardMedia
        component="img"
        sx={{
          height: "350px",
          width: "100%",
          objectFit: "cover",
          margin: "0",
        }}
        image={recipe.image}
        alt="Recipe Image"
      />

      {/* Recipe content */}
      <CardContent
        sx={{
          padding: "40px",
          flex: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "left" }}>
            {recipe.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Timer fontSize="small" />
            <Typography variant="caption" color="#f20597">
              {recipe.time}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            marginTop: "16px", 
            textAlign: "left",
          }}
        >
          {recipe.description}
        </Typography>

        {missingCount > 0 && missingCount <= 4 && (
          <Typography variant="subtitle1" color="error" sx={{ marginTop: "8px" }}>
            Missing {missingCount} ingredient
            {missingCount === 1 ? "" : "s"}
          </Typography>
        )}
      </CardContent>

      {/* Favorite button */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(recipe);
        }}
        sx={{
          position: "absolute", 
          bottom: "16px", 
          left: "50%", 
          transform: "translateX(-50%)", 
          width: 64,
          height: 64,
          border: "2px solid",
          borderColor: isFavorite(recipe) ? "red" : "gray",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: isFavorite(recipe) ? "red" : "gray",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateX(-50%) scale(1.1)",
          },
          marginBottom: "20px",
        }}
      >
        <FavoriteBorder sx={{ fontSize: 48 }} />
      </IconButton>
    </Card>
  );
};

export default RecipeCardB;
