import React from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";

const RecipeNavigation = ({ prevRecipe, nextRecipe, children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "800px", 
        margin: "0 auto",
      }}
    >
      {/* Previous Recipe Button */}
      <IconButton
        onClick={prevRecipe}
        sx={{
          width: 64,
          height: 64,
          border: "2px solid gray",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
            borderColor: "#f20597",
          },
        }}
      >
        <ArrowBack fontSize="large" />
      </IconButton>

      {/* Recipe Card in the Center */}
      <Box
        sx={{
          flex: 1, 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>

      {/* Next Recipe Button */}
      <IconButton
        onClick={nextRecipe}
        sx={{
          width: 64,
          height: 64,
          border: "2px solid gray",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
            borderColor: "#f20597",
          },
        }}
      >
        <ArrowForward fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default RecipeNavigation;
