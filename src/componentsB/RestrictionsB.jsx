import React from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import Search from "@mui/icons-material/Search";

// Custom TextField styling
const CustomTextField = styled("input")({
  width: "100%",
  height: "36px",
  padding: "0 10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "14px",
  "&:focus": {
    outline: "none",
    borderColor: "#f5a623",
  },
});

const Restrictions = ({
  selectedRestrictions,
  setSelectedRestrictions,
  searchRestrictions,      // string state passed in
  setSearchRestrictions,   // setter function passed in
  handleFilter,
}) => {
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
        ? [...prev, name]
        : prev.filter((restriction) => restriction !== name)
    );
  };

  return (
    <Box
      sx={{
        width: "300px",
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

      {/* Search input + icon */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2 }}>
        <CustomTextField
          value={searchRestrictions}
          onChange={(e) => setSearchRestrictions(e.target.value)}
          placeholder="Search Restrictions"
        />
        <IconButton onClick={handleFilter}>
          <Search />
        </IconButton>
      </Box>

      {/* Checkbox options */}
      <Grid container spacing={2}>
        {restrictionOptions
          .filter((option) =>
            option.toLowerCase().includes((searchRestrictions || "").toLowerCase())
          )
          .map((option, index) => (
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

export default Restrictions;
