import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
  Chip,
  useTheme,
  Stack,
  Avatar,
  Container,
  Paper,
  Divider,
  Fade
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LanguageIcon from '@mui/icons-material/Language';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import FlagIcon from '@mui/icons-material/Flag';
import MapIcon from '@mui/icons-material/Map';
import TranslateIcon from '@mui/icons-material/Translate';
import { motion } from 'framer-motion';

const CountryDetail = ({ country, loading, error }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    if (country?.borders?.length > 0) {
      setBorderCountries(country.borders);
    }
  }, [country]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={80} thickness={4} color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error" variant="h5">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  if (!country) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography variant="h5" color="text.secondary">
          Country not found
        </Typography>
      </Box>
    );
  }

  const name = country?.name?.common || 'Unknown';
  const nativeName = country?.name?.nativeName ? 
    Object.values(country.name.nativeName)[0]?.common : 'Unknown';
  const flag = country?.flags?.svg || country?.flags?.png || '';
  const population = country?.population ? country.population.toLocaleString() : 'Unknown';
  const region = country?.region || 'Unknown';
  const subregion = country?.subregion || 'Unknown';
  const capital = country?.capital?.[0] || 'Unknown';
  const tld = country?.tld?.[0] || 'Unknown';
  const currencies = country?.currencies ? 
    Object.values(country.currencies).map(c => c.name).join(', ') : 'Unknown';
  const languages = country?.languages ? 
    Object.values(country.languages).join(', ') : 'Unknown';

  // Enhanced color palette based on country's region - more vibrant
  const getRegionColor = () => {
    switch(region.toLowerCase()) {
      case 'africa': return '#FF6D00'; // Vibrant Orange
      case 'americas': return '#2979FF'; // Brighter Blue
      case 'asia': return '#F50057'; // Hot Pink
      case 'europe': return '#00C853'; // Vibrant Green
      case 'oceania': return '#AA00FF'; // Vibrant Purple
      default: return '#FF5722'; // Default Vibrant
    }
  };
  
  const regionColor = getRegionColor();
  
  // Generate complementary accent colors for icons
  const getIconColors = () => {
    switch(region.toLowerCase()) {
      case 'africa': return ['#6200EA', '#FF9100', '#00BFA5', '#C51162']; // Purple, Orange, Teal, Pink
      case 'americas': return ['#FF4081', '#00C853', '#AA00FF', '#FF6D00']; // Pink, Green, Purple, Orange
      case 'asia': return ['#00B0FF', '#FFAB00', '#64DD17', '#6200EA']; // Blue, Amber, Lime, Purple
      case 'europe': return ['#AA00FF', '#FF6D00', '#00B0FF', '#FF4081']; // Purple, Orange, Blue, Pink
      case 'oceania': return ['#00C853', '#FF4081', '#FFAB00', '#304FFE']; // Green, Pink, Amber, Indigo
      default: return ['#FF4081', '#00C853', '#304FFE', '#FF6D00']; // Default set
    }
  };
  
  const iconColors = getIconColors();

  // Function to assign different colors to icons
  const getColorForIndex = (index) => {
    return iconColors[index % iconColors.length];
  };

  // Animation variants for interactive elements
  const boxHoverVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  // Name animation variants
  const nameTextVariants = {
    animate: {
      y: [0, -5, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }
      }
    }
  };

  // Letter animation for country name
  const nameLetterVariants = {
    initial: { y: 0 },
    animate: i => ({
      y: [0, -5, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
          delay: i * 0.05
        }
      }
    })
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5, overflow: 'hidden' }}>
      <Fade in={true} timeout={800}>
        <div>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.98 }}
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ 
              mb: 4,
              px: 3,
              py: 1.5,
              borderRadius: '30px',
              backgroundColor: regionColor,
              color: '#fff',
              boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: `${regionColor}dd`,
                boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
              }
            }}
          >
            Back to Countries
          </Button>

          {/* Country Name Banner with Animated Letters */}
          <Paper
            component={motion.div}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
            elevation={4}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: '16px',
              background: `linear-gradient(135deg, ${regionColor} 0%, ${theme.palette.mode === 'dark' ? '#121212' : '#ffffff'} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#fff',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FlagIcon sx={{ fontSize: 40, mr: 2, color: '#fff' }} />
              </motion.div>
              <Box>
                <Box sx={{ display: 'flex' }}>
                  {name.split('').map((letter, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={nameLetterVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <Typography 
                        component="span" 
                        variant="h2" 
                        sx={{ 
                          fontWeight: 800,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                          letterSpacing: '0.5px',
                          color: '#fff',
                          display: 'inline-block'
                        }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </Typography>
                    </motion.div>
                  ))}
                </Box>
                {nativeName !== name && (
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        mt: 1,
                        color: '#f8f8f8',
                        fontStyle: 'italic'
                      }}
                    >
                      {nativeName}
                    </Typography>
                  </motion.div>
                )}
              </Box>
            </Box>
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
              <Chip 
                icon={<PublicIcon sx={{ color: '#fff !important' }} />}
                label={region}
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  color: '#fff',
                  borderRadius: '20px',
                  p: 2,
                  '& .MuiChip-label': {
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }
                }} 
              />
            </motion.div>
          </Paper>

          <Grid container spacing={4}>
            {/* Flag - Now without box, floating elegantly */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                whileHover={{ 
                  scale: 1.05,
                  filter: "drop-shadow(0px 15px 30px rgba(0,0,0,0.3))"
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    filter: "drop-shadow(0px 10px 25px rgba(0,0,0,0.25))",
                    height: '100%'
                  }}
                >
                  <CardMedia
                    component="img"
                    image={flag}
                    alt={`Flag of ${name}`}
                    sx={{
                      width: '100%',
                      maxHeight: '250px',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>

            {/* Details Info - Now as flexible clickable cards */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                {/* Core Info - Split into two cards for better interaction */}
                <Grid item xs={12} sm={6}>
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover="hover"
                    variants={boxHoverVariants}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        borderRadius: '16px',
                        background: theme.palette.mode === 'dark' 
                          ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)' 
                          : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                        borderLeft: `5px solid ${getColorForIndex(0)}`,
                        height: '100%',
                        cursor: 'pointer'
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: getColorForIndex(0) }}>
                        Population & Region
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                        <motion.div
                          whileHover={{ 
                            scale: 1.2,
                            rotate: 360,
                            transition: { duration: 0.5 }
                          }}
                        >
                          <Avatar sx={{ 
                            bgcolor: `${getColorForIndex(0)}22`, 
                            mr: 2,
                            color: getColorForIndex(0)
                          }}>
                            <PeopleIcon />
                          </Avatar>
                        </motion.div>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Population</Typography>
                          <Typography variant="h6" fontWeight="500">{population}</Typography>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <motion.div
                          whileHover={{ 
                            scale: 1.2,
                            rotate: 360,
                            transition: { duration: 0.5 }
                          }}
                        >
                          <Avatar sx={{ 
                            bgcolor: `${getColorForIndex(0)}22`, 
                            mr: 2,
                            color: getColorForIndex(0)
                          }}>
                            <MapIcon />
                          </Avatar>
                        </motion.div>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Region</Typography>
                          <Typography variant="h6" fontWeight="500">{region}</Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover="hover"
                    variants={boxHoverVariants}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        borderRadius: '16px',
                        background: theme.palette.mode === 'dark' 
                          ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)' 
                          : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                        borderLeft: `5px solid ${getColorForIndex(1)}`,
                        height: '100%',
                        cursor: 'pointer'
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: getColorForIndex(1) }}>
                        Location
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                        <motion.div
                          whileHover={{ 
                            scale: 1.2,
                            rotate: 360,
                            transition: { duration: 0.5 }
                          }}
                        >
                          <Avatar sx={{ 
                            bgcolor: `${getColorForIndex(1)}22`, 
                            mr: 2,
                            color: getColorForIndex(1)
                          }}>
                            <PublicIcon />
                          </Avatar>
                        </motion.div>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Subregion</Typography>
                          <Typography variant="h6" fontWeight="500">{subregion}</Typography>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <motion.div
                          whileHover={{ 
                            scale: 1.2,
                            rotate: 360,
                            transition: { duration: 0.5 }
                          }}
                        >
                          <Avatar sx={{ 
                            bgcolor: `${getColorForIndex(1)}22`, 
                            mr: 2,
                            color: getColorForIndex(1)
                          }}>
                            <LocationCityIcon />
                          </Avatar>
                        </motion.div>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Capital</Typography>
                          <Typography variant="h6" fontWeight="500">{capital}</Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>

                {/* Domain */}
                <Grid item xs={12} sm={6}>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover="hover"
                    variants={boxHoverVariants}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        height: '100%',
                        borderRadius: '16px',
                        background: theme.palette.mode === 'dark' 
                          ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)' 
                          : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                        borderTop: `5px solid ${getColorForIndex(2)}`,
                        cursor: 'pointer'
                      }}
                    >
                      <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                        <motion.div
                          whileHover={{ 
                            scale: 1.2,
                            rotate: 360,
                            transition: { duration: 0.5 }
                          }}
                        >
                          <Avatar sx={{ 
                            bgcolor: `${getColorForIndex(2)}22`, 
                            mr: 2,
                            color: getColorForIndex(2)
                          }}>
                            <LanguageIcon />
                          </Avatar>
                        </motion.div>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Top Level Domain</Typography>
                          <Typography variant="h6" fontWeight="500">{tld}</Typography>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <motion.div
                          whileHover={{ 
                            scale: 1.2,
                            rotate: 360,
                            transition: { duration: 0.5 }
                          }}
                        >
                          <Avatar sx={{ 
                            bgcolor: `${getColorForIndex(2)}22`, 
                            mr: 2,
                            color: getColorForIndex(2)
                          }}>
                            <CurrencyExchangeIcon />
                          </Avatar>
                        </motion.div>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Currencies</Typography>
                          <Typography variant="h6" fontWeight="500">{currencies}</Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>

                {/* Languages */}
                <Grid item xs={12} sm={6}>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    whileHover="hover"
                    variants={boxHoverVariants}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        height: '100%',
                        borderRadius: '16px',
                        background: theme.palette.mode === 'dark' 
                          ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)' 
                          : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                        borderTop: `5px solid ${getColorForIndex(3)}`,
                        cursor: 'pointer'
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <motion.div
                          whileHover={{ 
                            scale: 1.2,
                            rotate: 360,
                            transition: { duration: 0.5 }
                          }}
                        >
                          <Avatar sx={{ 
                            bgcolor: `${getColorForIndex(3)}22`, 
                            mr: 2,
                            color: getColorForIndex(3)
                          }}>
                            <TranslateIcon />
                          </Avatar>
                        </motion.div>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Languages</Typography>
                          <Box sx={{ mt: 1 }}>
                            {languages.split(', ').map((lang, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + (index * 0.1) }}
                                whileHover={{ 
                                  scale: 1.1, 
                                  backgroundColor: getColorForIndex(3),
                                  color: '#fff',
                                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                                }}
                                style={{ display: 'inline-block', margin: '0.25rem' }}
                              >
                                <Chip 
                                  label={lang}
                                  size="medium"
                                  sx={{ 
                                    bgcolor: `${getColorForIndex(3)}22`,
                                    color: theme.palette.mode === 'dark' ? '#fff' : '#333',
                                    borderRadius: '12px',
                                    fontWeight: 500,
                                    transition: 'all 0.3s ease'
                                  }} 
                                />
                              </motion.div>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>

                {/* Border Countries */}
                {borderCountries.length > 0 && (
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      whileHover="hover"
                      variants={boxHoverVariants}
                    >
                      <Paper
                        elevation={3}
                        sx={{
                          p: 3,
                          borderRadius: '16px',
                          background: theme.palette.mode === 'dark' 
                            ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)' 
                            : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                          borderBottom: `5px solid ${regionColor}`,
                          cursor: 'pointer'
                        }}
                      >
                        <Typography 
                          variant="h5" 
                          fontWeight="bold" 
                          sx={{ mb: 3, color: regionColor }}
                        >
                          Border Countries
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={2}>
                          {borderCountries.map((border, index) => (
                            <motion.div
                              key={border}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 + (index * 0.05) }}
                            >
                              <Chip
                                component={motion.div}
                                whileHover={{ 
                                  scale: 1.1, 
                                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                                  backgroundColor: regionColor,
                                  color: '#fff'
                                }}
                                whileTap={{ scale: 0.95 }}
                                icon={<FlagIcon sx={{ color: 'inherit !important' }} />}
                                label={border}
                                onClick={() => navigate(`/country/${border}`)}
                                sx={{ 
                                  px: 1,
                                  py: 2.5,
                                  cursor: 'pointer',
                                  fontWeight: 'bold',
                                  borderRadius: '12px',
                                  fontSize: '0.9rem',
                                  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f0f0f0',
                                  color: theme.palette.text.primary,
                                  border: `1px solid ${regionColor}40`,
                                  transition: 'all 0.3s ease'
                                }}
                              />
                            </motion.div>
                          ))}
                        </Box>
                      </Paper>
                    </motion.div>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Container>
  );
};

export default CountryDetail;