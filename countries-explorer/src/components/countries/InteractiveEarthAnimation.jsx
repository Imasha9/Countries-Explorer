import React, { useState } from 'react';
import { 
  Box, 
  useTheme, 
  Tooltip, 
  Zoom, 
  Typography, 
  Popper, 
  Paper, 
  Fade,
  Chip,
  IconButton
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const continentData = [
  {
    name: 'North America',
    position: { top: '30%', left: '25%' },
    size: { width: '25px', height: '20px' },
    shape: 'continent',
    countries: ['USA', 'Canada', 'Mexico'],
    facts: ['Home to the Grand Canyon', 'Third largest continent', '23 countries total'],
    color: '#3f51b5'
  },
  {
    name: 'South America',
    position: { top: '60%', left: '30%' },
    size: { width: '20px', height: '25px' },
    shape: 'continent',
    countries: ['Brazil', 'Argentina', 'Peru'],
    facts: ['Amazon Rainforest', 'Andes mountain range', '12 countries total'],
    color: '#4caf50'
  },
  {
    name: 'Europe',
    position: { top: '30%', right: '35%' },
    size: { width: '18px', height: '15px' },
    shape: 'continent',
    countries: ['France', 'Germany', 'Italy'],
    facts: ['Over 200 languages', '44 countries', 'Home to the EU'],
    color: '#f44336'
  },
  {
    name: 'Africa',
    position: { top: '45%', left: '45%' },
    size: { width: '22px', height: '28px' },
    shape: 'continent',
    countries: ['Egypt', 'Nigeria', 'Kenya'],
    facts: ['Sahara Desert', '54 countries', 'World\'s longest river (Nile)'],
    color: '#ff9800'
  },
  {
    name: 'Asia',
    position: { top: '35%', right: '25%' },
    size: { width: '30px', height: '25px' },
    shape: 'continent',
    countries: ['China', 'India', 'Japan'],
    facts: ['Largest continent', 'Highest point (Mt. Everest)', '48 countries'],
    color: '#2196f3'
  },
  {
    name: 'Oceania',
    position: { bottom: '30%', right: '15%' },
    size: { width: '15px', height: '15px' },
    shape: 'continent',
    countries: ['Australia', 'New Zealand', 'Fiji'],
    facts: ['Great Barrier Reef', '14 countries', 'Smallest continent'],
    color: '#9c27b0'
  },
  {
    name: 'Antarctica',
    position: { bottom: '15%', left: '40%' },
    size: { width: '20px', height: '12px' },
    shape: 'continent',
    countries: [],
    facts: ['98% ice covered', 'No permanent residents', 'Coldest place on Earth'],
    color: '#78909c'
  }
];

const InteractiveEarthAnimation = () => {
  const theme = useTheme();
  const [hoveredContinent, setHoveredContinent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeContinent, setActiveContinent] = useState(null);

  const handleContinentClick = (event, continent) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setActiveContinent(continent);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveContinent(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        width: '160px',
        height: '160px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        m: 2,
      }}
    >
      {/* Outer rotating circle */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: `3px dashed ${theme.palette.primary.light}`,
          opacity: 0.3,
        }}
      />
      
      {/* Middle rotating circle */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          width: '85%',
          height: '85%',
          borderRadius: '50%',
          border: `2px dashed ${theme.palette.secondary.main}`,
          opacity: 0.5,
        }}
      />

      {/* The earth globe */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{
          scale: [0.95, 1, 0.95],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut"
        }}
        style={{
          position: 'relative',
          width: '70%',
          height: '70%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          boxShadow: `0 0 30px ${theme.palette.primary.main}30`,
          overflow: 'visible',
        }}
      >
        {/* Continents */}
        {continentData.map((continent, index) => (
          <Tooltip
            key={index}
            title={continent.name}
            placement="top"
            TransitionComponent={Zoom}
            arrow
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{
                scale: hoveredContinent === continent.name ? 1.2 : 1,
                opacity: hoveredContinent === continent.name ? 1 : 0.8,
                backgroundColor: hoveredContinent === continent.name
                  ? continent.color
                  : theme.palette.primary.light,
                boxShadow: hoveredContinent === continent.name
                  ? `0 0 8px ${continent.color}`
                  : 'none'
              }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => handleContinentClick(e, continent)}
              onMouseEnter={() => setHoveredContinent(continent.name)}
              onMouseLeave={() => setHoveredContinent(null)}
              style={{
                position: 'absolute',
                width: continent.size.width,
                height: continent.size.height,
                backgroundColor: theme.palette.primary.light,
                borderRadius: continent.shape === 'continent' ? '5px' : '50%',
                ...continent.position,
                cursor: 'pointer',
                zIndex: 10,
              }}
            />
          </Tooltip>
        ))}

        {/* Shimmer effect */}
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.primary.light}30 0%, transparent 70%)`,
            zIndex: 5,
          }}
        />
      </motion.div>

      {/* Additional orbit particles */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          opacity: 0.8,
        }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + i,
              ease: "easeInOut",
              delay: i * 0.2
            }}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: theme.palette.secondary.main,
              top: `${10 + (i * 15)}%`,
              left: `${15 + (i * 12)}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Popper for detailed continent information */}
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="top"
        transition
        style={{ zIndex: 1200 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={4}
              sx={{
                p: 2,
                width: 250,
                overflow: 'hidden',
                borderRadius: 2,
                background: `linear-gradient(to right bottom, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              {activeContinent && (
                <>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography 
                      variant="h6" 
                      fontWeight="bold"
                      sx={{
                        backgroundImage: `linear-gradient(45deg, ${activeContinent.color}, ${theme.palette.primary.main})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {activeContinent.name}
                    </Typography>
                    <IconButton size="small" onClick={handleClose}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  
                  <Box mb={1.5}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      <InfoOutlinedIcon fontSize="inherit" sx={{ verticalAlign: 'text-bottom', mr: 0.5 }} />
                      Key Facts
                    </Typography>
                    {activeContinent.facts.map((fact, idx) => (
                      <Typography key={idx} variant="body2" sx={{ ml: 2, fontSize: '0.85rem' }}>
                        • {fact}
                      </Typography>
                    ))}
                  </Box>
                  
                  {activeContinent.countries.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        <FlagIcon fontSize="inherit" sx={{ verticalAlign: 'text-bottom', mr: 0.5 }} />
                        Major Countries
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                        {activeContinent.countries.map((country, idx) => (
                          <Chip
                            key={idx}
                            label={country}
                            size="small"
                            sx={{
                              backgroundColor: `${activeContinent.color}15`,
                              color: activeContinent.color,
                              fontWeight: 500,
                              fontSize: '0.7rem',
                              '&:hover': {
                                backgroundColor: `${activeContinent.color}25`,
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  <Box mt={1.5} textAlign="center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Chip
                        label="Explore Countries"
                        sx={{
                          backgroundColor: activeContinent.color,
                          color: '#fff',
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: activeContinent.color,
                            opacity: 0.9
                          }
                        }}
                      />
                    </motion.div>
                  </Box>
                </>
              )}
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default InteractiveEarthAnimation;