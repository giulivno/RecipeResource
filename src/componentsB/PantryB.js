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
  TextField,
  IconButton,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon, Search } from "@mui/icons-material";
import { pantryData } from "../data/pantryData"; // Import pantryData

const Pantry = ({
  selectedPantryItems,
  setSelectedPantryItems,
  searchPantry = "",
  setSearchPantry,
  handleFilter,
}) => {
  const [openItems, setOpenItems] = useState({});

  const handleToggle = (index) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleItemClick = (category, item) => {
    setSelectedPantryItems((prev) => {
      const isSelected = prev[category]?.includes(item);
      const updatedCategory = isSelected
        ? prev[category].filter((i) => i !== item)
        : [...(prev[category] || []), item];

      return { ...prev, [category]: updatedCategory };
    });
  };

  // Gather all ingredients into a flat array
  const allIngredients = Object.entries(pantryData).reduce((acc, [category, items]) => {
    return [
      ...acc,
      ...items.map((item) => ({
        category,
        item,
      })),
    ];
  }, []);

  // Safely filter ingredients based on searchPantry
  const filteredIngredients = allIngredients.filter(({ item }) =>
    item?.toLowerCase().includes(searchPantry?.toLowerCase() || "")
  );

  return (
    <Box
      sx={{
        marginTop: 15,
        width: "300px",
        padding: 2,
        bgcolor: "white",
        border: 1,
        borderColor: "#303030",
        borderRadius: "4px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
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

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2 }}>
        <TextField
          value={searchPantry}
          onChange={(e) => setSearchPantry(e.target.value)}
          variant="standard"
          placeholder="Search Pantry Items"
          fullWidth
          InputProps={{
            disableUnderline: true,
            style: { backgroundColor: "#e2e2e2", paddingLeft: "10px", borderRadius: "4px" },
          }}
        />
        <IconButton onClick={handleFilter}>
          <Search />
        </IconButton>
      </Box>

      <List>
        {searchPantry ? (
          // If user is searching, show only filtered ingredients
          filteredIngredients.map(({ category, item }) => (
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
          ))
        ) : (
          // Otherwise, display categories, collapsed/expanded
          Object.entries(pantryData).map(([category, items], index) => (
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
                  primary={category.charAt(0).toUpperCase() + category.slice(1)}
                  primaryTypographyProps={{
                    fontFamily: "Nunito-Medium, Helvetica",
                    fontWeight: "medium",
                    color: "#313043",
                  }}
                />
                <ListItemIcon>
                  <ExpandMoreIcon
                    sx={{ color: openItems[index] ? "#f20597" : "#313043" }}
                  />
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
                        bgcolor: selectedPantryItems[category]?.includes(item)
                          ? "#f5a623"
                          : "transparent",
                        color: selectedPantryItems[category]?.includes(item) ? "white" : "inherit",
                      }}
                    >
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))
        )}
      </List>
    </Box>
  );
};

export default Pantry;
