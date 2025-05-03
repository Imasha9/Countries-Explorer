import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardActionArea,
  Chip,
  useTheme,
  Avatar,
  Stack,
  Tooltip,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  PeopleAltOutlined,
  PublicOutlined,
  LocationCityOutlined,
  LanguageOutlined,
  Favorite,
  FavoriteBorder
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const CountryCard = ({ country, index }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { isFavorite, toggleFavorite } = useAuth();

  const name = country?.name?.common || 'Unknown';
  const flag = country?.flags?.svg || country?.flags?.png || '';
  const population = country?.population ? country.population.toLocaleString() : 'Unknown';
  const region = country?.region || 'Unknown';
  const capital = country?.capital?.[0] || 'Unknown';
  const cca3 = country?.cca3 || '';
  const languages = country?.languages ? Object.values(country.languages) : [];
  
  const regionColor = {
    'Africa': theme.palette.success.main,
    'Americas': theme.palette.info.main,
    'Asia': theme.palette.warning.main,
    'Europe': theme.palette.primary.main,
    'Oceania': theme.palette.secondary.main
  }[region] || theme.palette.primary.main;

  const handleClick = () => {
    if (cca3) navigate(`/country/${cca3}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(cca3);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: theme.shadows[1],
          border: `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s ease',
          position: 'relative',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.shadows[4],
            borderColor: regionColor,
            '& .favorite-button': {
              opacity: 1
            }
          }
        }}
      >
        {/* Region indicator bar */}
        <Box sx={{
          height: 4,
          width: '100%',
          background: regionColor
        }} />
        
        <CardActionArea 
          onClick={handleClick}
          sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1
          }}
        >
          {/* Flag image with fixed aspect ratio */}
          <Box sx={{
            width: '100%',
            paddingTop: '56.25%', // 16:9 aspect ratio
            position: 'relative',
            overflow: 'hidden'
          }}>
            <CardMedia
              component="img"
              image={flag}
              alt={`Flag of ${name}`}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />
          </Box>

          {/* Card content */}
          <CardContent sx={{ 
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            pb: 4,
            position: 'relative'
          }}>
            {/* Country name - Fixed height */}
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                minHeight: '2.8em', // Fixed height for 2 lines
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: '1.4em'
              }}
            >
              {name}
            </Typography>

            {/* Country details - Fixed height items */}
            <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                minHeight: '40px' // Fixed height for each row
              }}>
                <Avatar sx={{ 
                  bgcolor: `${regionColor}15`, 
                  color: regionColor,
                  width: 32, 
                  height: 32,
                  mr: 1.5,
                  flexShrink: 0
                }}>
                  <PeopleAltOutlined fontSize="small" />
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Population
                  </Typography>
                  <Typography 
                    variant="body2" 
                    fontWeight={500}
                    noWrap
                    sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                  >
                    {population}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                minHeight: '40px' // Fixed height for each row
              }}>
                <Avatar sx={{ 
                  bgcolor: `${regionColor}15`, 
                  color: regionColor,
                  width: 32, 
                  height: 32,
                  mr: 1.5,
                  flexShrink: 0
                }}>
                  <PublicOutlined fontSize="small" />
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Region
                  </Typography>
                  <Typography 
                    variant="body2" 
                    fontWeight={500}
                    noWrap
                    sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                  >
                    {region}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                minHeight: '40px' // Fixed height for each row
              }}>
                <Avatar sx={{ 
                  bgcolor: `${regionColor}15`, 
                  color: regionColor,
                  width: 32, 
                  height: 32,
                  mr: 1.5,
                  flexShrink: 0
                }}>
                  <LocationCityOutlined fontSize="small" />
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Capital
                  </Typography>
                  <Typography 
                    variant="body2" 
                    fontWeight={500}
                    noWrap
                    sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                  >
                    {capital}
                  </Typography>
                </Box>
              </Box>
            </Stack>

            {/* Languages - Fixed height */}
            {languages.length > 0 && (
              <Box sx={{ 
                mt: 'auto',
                pt: 1.5,
                minHeight: '42px', // Fixed height for language section
                borderTop: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <LanguageOutlined 
                  fontSize="small" 
                  sx={{ color: regionColor, flexShrink: 0 }} 
                />
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 0.5,
                  alignItems: 'center'
                }}>
                  {languages.slice(0, 2).map((lang, idx) => (
                    <Tooltip key={idx} title={lang}>
                      <Chip
                        label={lang}
                        size="small"
                        sx={{
                          backgroundColor: `${regionColor}15`,
                          color: regionColor,
                          fontWeight: 500,
                          maxWidth: '100px',
                          '& .MuiChip-label': {
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }
                        }}
                      />
                    </Tooltip>
                  ))}
                  {languages.length > 2 && (
                    <Tooltip title={languages.slice(2).join(', ')}>
                      <Chip
                        label={`+${languages.length - 2}`}
                        size="small"
                        sx={{
                          backgroundColor: theme.palette.grey[100],
                          color: theme.palette.text.secondary
                        }}
                      />
                    </Tooltip>
                  )}
                </Box>
              </Box>
            )}
          </CardContent>
        </CardActionArea>
        
        {/* Favorite button */}
        <Box 
          className="favorite-button"
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            zIndex: 2,
            opacity: isFavorite(cca3) ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out',
            '&:hover': {
              opacity: 1
            }
          }}
        >
          <IconButton
            onClick={handleFavoriteClick}
            size="small"
            sx={{
              color: isFavorite(cca3) ? theme.palette.error.main : theme.palette.text.secondary,
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[2],
              '&:hover': {
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.error.main,
                transform: 'scale(1.1)'
              }
            }}
          >
            {isFavorite(cca3) ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
          </IconButton>
        </Box>
      </Card>
    </motion.div>
  );
};

export default CountryCard;