import React from 'react'
import { 
  Grid, 
  Box, 
  Typography, 
  Container,
  useTheme,
  Paper,
  Fade
} from '@mui/material';
import CountryCard from './CountryCard';
import { motion } from 'framer-motion';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InteractiveEarthAnimation from './InteractiveEarthAnimation';

const CountryList = ({ countries, loading, error }) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box 
          display="flex" 
          flexDirection="column" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="70vh"
          textAlign="center"
        >
          <InteractiveEarthAnimation />
          <Typography 
            variant="h3" 
            component="h1"
            sx={{ 
              mt: 4, 
              fontWeight: 800,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '1px'
            }}
          >
            Discovering Countries...
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            Exploring the world for you
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          elevation={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
            p: 4,
            borderRadius: '16px',
            background: `linear-gradient(135deg, ${theme.palette.error.light}, ${theme.palette.error.dark})`,
            color: 'white',
            textAlign: 'center'
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1">
            Error: {error}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
            Please try again later or contact support if the issue persists.
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (!countries || countries.length === 0) {
    return (
      <Container maxWidth="lg">
        <Paper
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
            p: 4,
            borderRadius: '16px',
            background: `linear-gradient(135deg, ${theme.palette.grey[100]}, ${theme.palette.grey[300]})`,
            textAlign: 'center'
          }}
        >
          <SearchOffIcon sx={{ 
            fontSize: 60, 
            mb: 2, 
            color: theme.palette.text.secondary,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1) rotate(10deg)'
            }
          }} />
          <Typography variant="h4" color="text.primary" fontWeight="bold" gutterBottom>
            No countries found
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Try adjusting your search criteria or filters to see more results.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Fade in timeout={800}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid
          container
          spacing={3}
          component={motion.div}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {countries.map((country, index) => (
            <Grid
              item
              key={country.cca3 || country.name.common}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                display: 'flex',
                minHeight: '100%',
                '& > div': {
                  width: '100%'
                }
              }}
            >
              <CountryCard country={country} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Fade>
  );
};

export default CountryList;