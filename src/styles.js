// src/styles.js
import { styled } from "@mui/system";
import { Card, Divider, TextField } from "@mui/material";

// Styled Card with hover effect
export const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  height: "100%",          // Ensure card takes full height within the grid
  bgcolor: "neutral.100",
  border: "1px solid #000000",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "0px",
  boxSizing: "border-box", // Ensure padding is included in height calculation
  margin: "10px",            // Add margin to prevent cutting off on hover
  cursor: "pointer",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
}));

// Styled Divider
export const StyledDivider = styled(Divider)({
  marginTop: "auto",
  width: "100%",
});

// Custom TextField for Search
export const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "#e2e2e2",
    borderRadius: "4px",
    "&:hover": {
      borderColor: "#f5a623",
    },
    "&.Mui-focused": {
      borderColor: "#f5a623",
      borderWidth: "2px",
    },
  },
});
