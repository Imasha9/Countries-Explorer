import React from 'react'
import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  useTheme,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip
} from '@mui/material';
import {
  
  Public as RegionIcon,
  Language as LanguageIcon,
  Search as SearchIcon,
  AccountCircle as ProfileIcon,
  ExitToApp as LogoutIcon,
  Brightness4 as ThemeIcon,
  
  Place as PlaceIcon,
  Translate as TranslateIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountryList from '../components/countries/CountryList';
import FavouritesPage from './FavouritesPage';
import SearchBar from '../components/common/SearchBar';
import ThemeToggle from '../theme/ThemeToggle';

import { useCountries } from '../hooks/useCountries';
import { useAuth } from '../hooks/useAuth';
import { Favorite } from '@mui/icons-material';


const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const { 
    countries, 
    loading, 
    error, 
    filters, 
    updateFilters 
  } = useCountries();

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

  // Country filtering handlers
  const handleSearch = (searchTerm) => {
    updateFilters({ searchTerm });
  };

  const handleRegionChange = (region) => {
    updateFilters({ region });
  };

  const handleLanguageChange = (language) => {
    updateFilters({ language });
  };

  const getUniqueLanguages = () => {
    const languagesSet = new Set();
    
    countries.forEach(country => {
      if (country.languages) {
        Object.values(country.languages).forEach(lang => {
          languagesSet.add(lang);
        });
      }
    });
    
    return Array.from(languagesSet).sort();
  };

  // Regions with corresponding icons
  const regions = [
    { value: 'Africa', icon: <PlaceIcon sx={{ color: '#FF5722' }} /> },
    { value: 'Americas', icon: <PlaceIcon sx={{ color: '#4CAF50' }} /> },
    { value: 'Asia', icon: <PlaceIcon sx={{ color: '#2196F3' }} /> },
    { value: 'Europe', icon: <PlaceIcon sx={{ color: '#9C27B0' }} /> },
    { value: 'Oceania', icon: <PlaceIcon sx={{ color: '#FF9800' }} /> }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
          
          <MenuItem onClick={() => handleNavigate('/favorites')}>
    <Favorite sx={{ mr: 1.5, color: theme.palette.error.main }} />
    <Typography variant="body2">Favorites</Typography>
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

      {/* Main Content */}
      <Box 
        sx={{ 
          mb: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Enhanced Animated Main Title */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 15,
            delay: 0.1
          }}
          sx={{
            position: 'relative',
            textAlign: 'center',
            mb: 5,
            overflow: 'hidden'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography 
              variant="h1" 
              component="h1" 
              align="center" 
              sx={{ 
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.6rem', lg: '3rem' },
                fontWeight: 900,
                letterSpacing: '0.02em',
                lineHeight: 1.1,
                mb: 2,
                textTransform: 'uppercase',
                background: `linear-gradient(45deg, 
                  ${theme.palette.primary.dark}, 
                  ${theme.palette.primary.main}, 
                  ${theme.palette.secondary.main}, 
                  ${theme.palette.primary.light})`,
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 5px 15px rgba(0,0,0,0.1)',
                animation: 'gradient 8s ease infinite',
                '@keyframes gradient': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' }
                }
              }}
            >
              Explore Our World
            </Typography>
          </motion.div>

          {/* Animated Subtitle */}
          {!loading && countries?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <Typography 
                variant="h4" 
                component="p"
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: '800px',
                  mx: 'auto',
                  fontWeight: 400,
                  mb: 4,
                  textAlign: 'center',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-15px',
                    left: '50%',
                    width: '80px',
                    height: '3px',
                    background: theme.palette.primary.main,
                    transform: 'translateX(-50%)'
                  }
                }}
              >
                Discover <Box component="span" sx={{ 
                  color: theme.palette.primary.main, 
                  fontWeight: 600 
                }}>
                  {countries.length}
                </Box> amazing destinations across the globe
              </Typography>
            </motion.div>
          )}
        </Box>
        
        {/* Enhanced Search and Filter Section */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 3,
            width: '100%',
            maxWidth: '1400px',
            border: `2px solid ${theme.palette.primary.light}`,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(25, 29, 35, 0.7)' : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            boxShadow: theme.shadows[4]
          }}
        >
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            {/* Search Bar with Icon */}
            <Grid item xs={12} md={5}>
              <SearchBar 
                onSearch={handleSearch} 
                startAdornment={
                  <SearchIcon sx={{ 
                    color: theme.palette.primary.main,
                    mr: 1
                  }} />
                }
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '50px',
                    '& fieldset': {
                      borderColor: theme.palette.primary.light,
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.dark,
                    }
                  }
                }}
              />
            </Grid>
            
            {/* Region Filter with Icon */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel 
                  id="region-filter-label"
                  sx={{
                    color: theme.palette.primary.main,
                    '&.Mui-focused': {
                      color: theme.palette.primary.dark
                    }
                  }}
                >
                  Filter by Region
                </InputLabel>
                <Select
                  labelId="region-filter-label"
                  id="region-filter"
                  value={filters.region}
                  label="Filter by Region"
                  onChange={(e) => handleRegionChange(e.target.value)}
                  startAdornment={<RegionIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />}
                  input={
                    <OutlinedInput 
                      label="Filter by Region"
                      startAdornment={<RegionIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />}
                      sx={{
                        borderRadius: '50px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.light,
                          borderWidth: 2
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.dark,
                        }
                      }}
                    />
                  }
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 300,
                        borderRadius: '12px',
                        mt: 1,
                        border: `1px solid ${theme.palette.primary.light}`,
                        boxShadow: theme.shadows[6]
                      }
                    }
                  }}
                >
                  <MenuItem value="">
                    <em>All Regions</em>
                  </MenuItem>
                  {regions.map((region) => (
                    <MenuItem key={region.value} value={region.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {region.icon}
                        <Box sx={{ ml: 1 }}>{region.value}</Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Language Filter with Icon */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel 
                  id="language-select-label"
                  sx={{
                    color: theme.palette.primary.main,
                    '&.Mui-focused': {
                      color: theme.palette.primary.dark
                    }
                  }}
                >
                  Filter by Language
                </InputLabel>
                <Select
                  labelId="language-select-label"
                  id="language-select"
                  value={filters.language}
                  label="Filter by Language"
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  startAdornment={<LanguageIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />}
                  input={
                    <OutlinedInput 
                      label="Filter by Language"
                      startAdornment={<LanguageIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />}
                      sx={{
                        borderRadius: '50px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.light,
                          borderWidth: 2
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.dark,
                        }
                      }}
                    />
                  }
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 300,
                        borderRadius: '12px',
                        mt: 1,
                        border: `1px solid ${theme.palette.primary.light}`,
                        boxShadow: theme.shadows[6]
                      }
                    }
                  }}
                >
                  <MenuItem value="">
                    <em>All Languages</em>
                  </MenuItem>
                  {getUniqueLanguages().map((language) => (
                    <MenuItem key={language} value={language}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TranslateIcon sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                        <Box sx={{ ml: 1 }}>{language}</Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Quick Filter Chips */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mt: 1 }}>
                <Chip
                  icon={<PlaceIcon />}
                  label="All Countries"
                  onClick={() => {
                    handleRegionChange('');
                    handleLanguageChange('');
                  }}
                  color={!filters.region && !filters.language ? 'primary' : 'default'}
                  variant={!filters.region && !filters.language ? 'filled' : 'outlined'}
                  sx={{ borderRadius: '50px', px: 1 }}
                />
                {regions.map((region) => (
                  <Chip
                    key={region.value}
                    icon={region.icon}
                    label={region.value}
                    onClick={() => handleRegionChange(region.value)}
                    color={filters.region === region.value ? 'primary' : 'default'}
                    variant={filters.region === region.value ? 'filled' : 'outlined'}
                    sx={{ borderRadius: '50px', px: 1 }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        {/* Country List - Centered */}
        <Box sx={{ width: '100%', maxWidth: '1400px' }}>
          <CountryList 
            countries={countries}
            loading={loading}
            error={error}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;