import React from "react";
import { Box, Button } from "@mui/material";
import { CustomTextField } from "../styles"; 

const SearchBar = ({ searchTerm, handleSearch, handleFilter, handleReset, hideResetButton }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleFilter();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2,
        marginTop: 4,
      }}
    >
      {/* Custom Text Field for Search Input */}
      <CustomTextField
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        variant="standard"
        placeholder="Search Recipes"
        fullWidth
        InputProps={{
          disableUnderline: true,
          style: { paddingLeft: "10px" },
        }}
      />

      {/* Search Button */}
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

      {/* Conditionally Render Reset Button */}
      {!hideResetButton && (
        <Button
          variant="contained"
          sx={{
            bgcolor: "#4caf50", 
            color: "white",
            "&:hover": { bgcolor: "#388e3c" }, 
            height: "44px",
            borderRadius: "4px",
          }}
          onClick={handleReset}
        >
          Reset
        </Button>
      )}
    </Box>
  );
};

export default SearchBar;
