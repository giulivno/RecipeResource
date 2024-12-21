import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import Timer from "@mui/icons-material/Timer";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

const RecipeCardB = ({ recipe, isFavorite, toggleFavorite, handleOpen }) => (
  <Card
    onClick={() => handleOpen(recipe)}
    sx={{
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
    }}
  >
    <CardMedia
      component="img"
      sx={{ height: "350px", width: "100%", objectFit: "cover" }}
      image={recipe.image}
      alt="Recipe Image"
    />
    <CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
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
      <Typography variant="body2" sx={{ marginTop: 2, textAlign: "left" }}>
        {recipe.description}
      </Typography>
    </CardContent>
    <CardActions sx={{ pt: 0 }}>
      <IconButton
        onClick={(e) => {
          e.stopPropagation(); // Prevent event from propagating to parent
          toggleFavorite(recipe);
        }}
        sx={{
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
          margin: "0 auto",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <FavoriteBorder sx={{ fontSize: 48 }} />
      </IconButton>
    </CardActions>
  </Card>
);

export default RecipeCardB;
