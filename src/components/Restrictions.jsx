import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { restrictionOptions } from "../data/constants";

const Restrictions = ({ selectedRestrictions, setSelectedRestrictions }) => {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedRestrictions((prev) =>
      checked ? [...prev, name] : prev.filter((restriction) => restriction !== name)
    );
  };

  return (
    <Box
  sx={{
    width: "100%",
    padding: 1,                // Reduced padding
    fontSize: "0.75rem",       // Smaller font size
    borderRadius: "4px",
    border: 1,
    borderColor: "#303030",
    boxShadow: "0 0 4px rgba(0, 0, 0, 0.1)", // Lighter shadow
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

export default Restrictions;
