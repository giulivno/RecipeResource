// App.js
import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import Recipes from "./Recipes";
import Favorites from "./Favorites";
import AccountSettings from "./AccountSettings";
import CookingHistory from "./CookingHistory";

const theme = createTheme({
  palette: {
    primary: { main: "#f29057" },
    success: { main: "#4caf50" },
    divider: "#e0e0e0",
    grey: { 100: "#f5f5f5" },
  },
  shape: { borderRadius: 8 },
  spacing: 8,
});

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const signedInStatus = localStorage.getItem("isSignedIn") === "true";
    setIsSignedIn(signedInStatus);
  }, []);

  const handleSignIn = () => {
    setIsSignedIn(true);
    localStorage.setItem("isSignedIn", "true");
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    localStorage.setItem("isSignedIn", "false");
  };

  return (
    <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Resets browser styles */}
          <Router>
              <Routes>
                  {!isSignedIn ? (
                      <Route path="*" element={<SignIn onSignIn={handleSignIn} />} />
                  ) : (
                      <>
                          <Route path="/recipes" element={<Recipes />} />
                          <Route path="/favorites" element={<Favorites />} />
                          <Route path="/account-settings" element={<AccountSettings />} />
                          <Route path="/cooking-history" element={<CookingHistory />} />
                          <Route path="*" element={<Navigate to="/recipes" />} />
                      </>
                  )}
              </Routes>
          </Router>
    </ThemeProvider>
  );
}

export default App;
