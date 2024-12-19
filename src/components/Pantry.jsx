import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { pantryData } from "../data/pantryData"; // Import pantryData

const Pantry = ({ selectedPantryItems, setSelectedPantryItems }) => {
  const [openItems, setOpenItems] = useState({});

  // Toggle collapse for each category
  const handleToggle = (index) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Handle item selection
  const handleItemClick = (category, item) => {
    setSelectedPantryItems((prev) => {
      const isSelected = prev[category]?.includes(item);
      const updatedCategory = isSelected
        ? prev[category].filter((i) => i !== item)
        : [...(prev[category] || []), item];

      return { ...prev, [category]: updatedCategory };
    });
  };

  // Map pantryData to render categories and items
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
        Pantry
      </Typography>

      <List>
        {Object.entries(pantryData).map(([category, items], index) => (
          <Box key={index}>
            <ListItemButton
              onClick={() => handleToggle(index)}
              sx={{
                bgcolor: "#b6d7a8",
                borderRadius: "4px",
                marginBottom: 1,
              }}
            >
              <ListItemText
                primary={category.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                primaryTypographyProps={{
                  fontFamily: "Nunito-Medium, Helvetica",
                  fontWeight: "medium",
                  color: "#313043",
                }}
              />
              <ListItemIcon>
                <ExpandMoreIcon sx={{ color: openItems[index] ? "#f20597" : "#313043" }} />
              </ListItemIcon>
            </ListItemButton>

            <Collapse in={openItems[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {items.map((item) => (
                  <ListItem
                    key={item}
                    button
                    onClick={() => handleItemClick(category, item)}
                    sx={{
                      pl: 4,
                      bgcolor: selectedPantryItems[category]?.includes(item) ? "#f5a623" : "transparent",
                      color: selectedPantryItems[category]?.includes(item) ? "white" : "inherit",
                    }}
                  >
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Pantry;
