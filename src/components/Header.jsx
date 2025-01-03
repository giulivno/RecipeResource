// src/components/Header.jsx

import React from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";

const HeaderBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  width: "100%",          // Ensure full width
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
  height: "100px",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Logo = styled("img")({
  width: "100%",       
  maxWidth: "300px",   
  height: "auto",      
});

const Header = ({ handleMenuOpen, anchorEl, handleMenuClose, handleMenuClick }) => (
  <HeaderBox>
    <IconButton
      sx={{
        position: "absolute",
        top: "50%",
        right: "16px",
        transform: "translateY(-50%)",
      }}
      onClick={handleMenuOpen}
    >
      <MenuIcon />
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem onClick={() => handleMenuClick("/FinalDesign")}>Final Design</MenuItem>
      <MenuItem onClick={() => handleMenuClick("/DesignA")}>Design A</MenuItem>
      <MenuItem onClick={() => handleMenuClick("/DesignB")}>Design B</MenuItem>
      <MenuItem onClick={() => handleMenuClick("/favorites")}>Favorite Recipes</MenuItem>
      <MenuItem onClick={() => handleMenuClick("/cooking-history")}>Cooking History</MenuItem>
      <MenuItem onClick={() => handleMenuClick("/account-settings")}>Account Settings</MenuItem>
    </Menu>
    <Logo src={`${process.env.PUBLIC_URL}/assets/Logo.png`} alt="Logo" />
  </HeaderBox>
);

export default Header;
