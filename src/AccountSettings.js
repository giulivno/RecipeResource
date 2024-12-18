import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, IconButton, Menu, MenuItem, Avatar, Paper } from '@mui/material';
import { Edit as EditIcon, Check as CheckIcon, Key as KeyIcon, Email as EmailIcon, Person as PersonIcon, Settings as GearIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";


const Header = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    boxSizing: 'border-box',
    height: '100px',
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

// Logo image styling
const Logo = styled("img")({
    width: '504px',
    height: '72px',
    objectFit: 'cover',
});

const AccountSettings = ({onSignOut }) => {
    const [name, setName] = useState('Your Name');
    const [email, setEmail] = useState('example@ufl.edu');

    const [isNameEditable, setIsNameEditable] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false);


    const navigate = useNavigate();


    const handleSignOut = () => {
        localStorage.setItem('isSignedIn', 'false');
        onSignOut();
        setIsSignedIn(false);
    };

    // Open the menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close the menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Navigate to different pages
    const handleMenuClick = (path) => {
        navigate(path);
        handleMenuClose();
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setName(storedUser.emailPrefix);
            setEmail(storedUser.email);
        }
        const signedInStatus = localStorage.getItem('isSignedIn') === 'true';
        setIsSignedIn(signedInStatus);
    }, []);

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
        <Box sx={{ pl: 6, pt: 15}}>
            <Header>
                <Typography
                    variant="body1"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '60px',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                    }}
                    onClick={() => handleSignOut()}
                >
                    Sign Out
                </Typography>
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '16px',
                        transform: 'translateY(-50%)',
                    }}
                    onClick={handleMenuOpen}

                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    {/* Menu Items */}
                    <MenuItem onClick={() => handleMenuClick('/DesignA')}>Design A</MenuItem>
                    <MenuItem onClick={() => handleMenuClick('/DesignB')}>Design B</MenuItem>
                    <MenuItem onClick={() => handleMenuClick('/favorite-recipes')}>Favorite Recipes</MenuItem>
                    <MenuItem onClick={() => handleMenuClick('/cooking-history')}>Cooking History</MenuItem>
                    <MenuItem onClick={() => handleMenuClick('/account-settings')}>Account Settings</MenuItem>
                </Menu>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 7 }}>
                    <Logo src={`${process.env.PUBLIC_URL}/assets/Logo.png`} alt="Logo" />
                </Box>
            </Header>
            <Box sx={{ justifyContent: 'left', display: 'flex', alignItems: 'center', mb: 2, pl: 76.5 }}>
                
                
                <Typography variant="h3" sx={{
                    fontFamily: "Nunito-Medium, Helvetica",
                    fontWeight: "bold",
                    color: '#EC8D58' }}>
                    Account Settings
                </Typography>
                <GearIcon sx={{ color: 'black', fontSize: 40, ml: 1.5 }} />
            </Box>
            {/* Name Section */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1, gap: 2 }}>
                <Paper elevation={2} sx={{ boxSizing: 'border-box', width: '37%', bgcolor:'#E3E3E3', padding: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0, gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'black', mr: 1.8 }}>
                            <PersonIcon />
                        </Avatar>
                        {!isNameEditable ? (
                            <Typography variant="h4" sx={{ fontFamily: "Nunito, Helvetica", marginRight: 1 }}>
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
                                        bgcolor: isNameEditable ? 'white' : '#f0f0f0',
                                        borderRadius: 2,
                                    },
                                }}
                                InputProps={{
                                    readOnly: !isNameEditable,
                                }}
                            />)}
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
                        <Typography variant="h5" sx={{ fontFamily: "Nunito, Helvetica", marginRight: 1 }}>
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
                            bgcolor: isEmailEditable ? 'transparent' : '#f0f0f0', 
                            borderRadius: 2,
                        },
                    }}
                    InputProps={{
                        readOnly: !isEmailEditable,
                    }}
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
