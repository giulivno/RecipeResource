import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Paper,
} from '@mui/material';
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Key as KeyIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Settings as GearIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Header from "./components/Header";

const AccountSettings = ({ onSignOut }) => {
  const [name, setName] = useState('Your Name');
  const [email, setEmail] = useState('example@ufl.edu');
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    setName(storedUser.emailPrefix || 'Your Name');
    setEmail(storedUser.email || 'example@ufl.edu');
  }, []);

  const handleSignOut = () => {
    localStorage.setItem('isSignedIn', 'false');
    onSignOut();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const toggleNameEdit = () => {
    setIsNameEditable((prev) => !prev);
    if (isNameEditable) {
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      storedUser.emailPrefix = name;
      localStorage.setItem('user', JSON.stringify(storedUser));
    }
  };

  const toggleEmailEdit = () => {
    setIsEmailEditable((prev) => !prev);
    if (isEmailEditable) {
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      storedUser.email = email;
      localStorage.setItem('user', JSON.stringify(storedUser));
    }
  };

  return (
    <Box sx={{ pt: 15 }}>
      <Header
        handleMenuOpen={handleMenuOpen}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        handleMenuClick={handleMenuClick}
      />

      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
        <Typography
          variant="h3"
          sx={{ fontFamily: 'Nunito-Medium, Helvetica', fontWeight: 'bold', color: '#EC8D58', mr: 2 }}
        >
          Account Settings
        </Typography>
        <GearIcon sx={{ color: 'black', fontSize: 40 }} />
      </Box>

      {/* Name Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1, gap: 2 }}>
        <Paper elevation={2} sx={{ boxSizing: 'border-box', width: '37%', bgcolor: '#E3E3E3', padding: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0, gap: 2 }}>
            <Avatar sx={{ bgcolor: 'black', mr: 1.8 }}>
              <PersonIcon />
            </Avatar>
            {!isNameEditable ? (
              <Typography variant="h4" sx={{ fontFamily: 'Nunito, Helvetica', marginRight: 1 }}>
                {name}
              </Typography>
            ) : (
              <TextField
                value={name}
                onChange={handleNameChange}
                variant="outlined"
                sx={{
                  width: '300px',
                  flex: 0.84,
                  '.MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    borderRadius: 2,
                  },
                }}
                InputProps={{ readOnly: !isNameEditable }}
              />
            )}
            <IconButton onClick={toggleNameEdit}>
              {isNameEditable ? <CheckIcon /> : <EditIcon />}
            </IconButton>
          </Box>
        </Paper>
      </Box>

      {/* Email Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3, gap: 2 }}>
        <Paper elevation={2} sx={{ width: '37%', padding: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
            <EmailIcon sx={{ fontSize: 40, marginRight: 2 }} />
            <Typography variant="h5" sx={{ fontFamily: 'Nunito, Helvetica', marginRight: 1 }}>
              Email:
            </Typography>
            <TextField
              value={email}
              onChange={handleEmailChange}
              variant="outlined"
              sx={{
                width: '300px',
                flex: 0.8,
                '.MuiOutlinedInput-root': {
                  bgcolor: '#f0f0f0',
                  borderRadius: 2,
                },
              }}
              InputProps={{ readOnly: !isEmailEditable }}
            />
            <IconButton onClick={toggleEmailEdit}>
              {isEmailEditable ? <CheckIcon /> : <EditIcon />}
            </IconButton>
          </Box>

          {/* Change Password Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
            <KeyIcon sx={{ fontSize: 40, marginRight: 2 }} />
            <Button variant="outlined">Change Password</Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AccountSettings;
