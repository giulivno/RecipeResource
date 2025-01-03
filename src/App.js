// App.js
import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // Optional: Reset CSS styles
import SignIn from "./SignIn";
import FinalDesign from "./FinalDesign";
import DesignA from './DesignA';
import DesignB from './DesignB';
import Favorites from "./Favorites";
import CookingHistory from "./CookingHistory";
import AccountSettings from "./AccountSettings";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#f29057", // Your custom primary color
    },
    success: {
      main: "#4caf50", // Your custom success color
    },
    divider: "#e0e0e0", // Your divider color
    grey: {
      100: "#f5f5f5", // Light grey background color
    },
  },
  shape: {
    borderRadius: 8, // Consistent border radius
  },
  spacing: 8, // 8px spacing unit
});

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        const signedInStatus = localStorage.getItem('isSignedIn') === 'true';
        setIsSignedIn(signedInStatus);
    }, []);

    const handleSignIn = () => {
        setIsSignedIn(true);
        localStorage.setItem('isSignedIn', 'true'); 
    };

    const handleSignOut = () => {
        setIsSignedIn(false);
        localStorage.setItem('isSignedIn', 'false');
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
                          <Route path="/DesignA" element={<DesignA />} />
                          {<Route path="/DesignB" element={<DesignB />} />}
                          {<Route path="/FinalDesign" element={<FinalDesign />} />}
                          {<Route path="/favorites" element={<Favorites />} />}
                          {<Route path="/cooking-history" element={<CookingHistory />} />}
                              <Route path="/account-settings" element={<AccountSettings onSignOut={handleSignOut} />} />
                          <Route path="*" element={<Navigate to="/DesignA" />} />
                      </>
                  )}
              </Routes>
          </Router>
    </ThemeProvider>
  );
}

export default App;