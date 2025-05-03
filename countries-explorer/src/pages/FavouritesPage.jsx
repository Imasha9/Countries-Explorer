import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  useTheme,
  Button,
  Stack,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CountryList from '../components/countries/CountryList';
import { useAuth } from '../hooks/useAuth';
import { useCountries } from '../hooks/useCountries';
import ThemeToggle from '../theme/ThemeToggle';
import {
  AccountCircle as ProfileIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';

const FavoritesPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { countries } = useCountries();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const favoriteCountries = countries.filter(country => 
    user?.favorites?.includes(country.cca3)
  );

  // Profile menu handlers
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    try {
      logout();
      handleClose();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigate = (path) => {
    try {
      navigate(path);
      handleClose();
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Top Navigation Bar */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          alignItems: 'center',
          mb: 3,
          gap: 2
        }}
      >
        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* Profile Icon and Logout Button */}
        <IconButton
          onClick={handleMenu}
          color="primary"
          aria-label="account menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          sx={{
            p: 1,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            }
          }}
        >
          <Avatar 
            sx={{ 
              width: 32, 
              height: 32, 
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText
            }}
            alt={user?.username || user?.email || 'User'}
          >
            {user?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
          </Avatar>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1,
              minWidth: 200,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              '& .MuiMenuItem-root': {
                py: 1.5,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }
            }
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => handleNavigate('/profile')}>
            <ProfileIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
            <Typography variant="body2">Profile</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1.5, color: theme.palette.error.main }} />
            <Typography variant="body2" color="error">
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Box>

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4 }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 800,
            mb: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}
        >
          Your Favorite Countries
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', mb: 3 }}
        >
          {favoriteCountries.length} saved {favoriteCountries.length === 1 ? 'country' : 'countries'}
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 4
          }}
        >
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={navigateToHome}
            sx={{
              borderRadius: '50px',
              px: 3,
              py: 1,
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: `0 4px 10px rgba(${theme.palette.primary.main}, 0.3)`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 12px rgba(${theme.palette.primary.main}, 0.4)`,
              }
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>

      {favoriteCountries.length > 0 ? (
        <CountryList 
          countries={favoriteCountries}
          loading={false}
          error={null}
          showFavorites={false} // Since we're on the favorites page
        />
      ) : (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
            textAlign: 'center',
            p: 4,
            borderRadius: 4,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          }}
        >
          <FavoriteIcon 
            sx={{ 
              fontSize: 64, 
              color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
              mb: 2 
            }} 
          />
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            No favorites yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Click the heart icon on country cards to add them to your favorites
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                borderRadius: '50px',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            >
              Explore Countries
            </Button>
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default FavoritesPage;