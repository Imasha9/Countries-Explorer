import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const NotFoundPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight={isMobile ? '50vh' : '70vh'}
        textAlign="center"
        pt={isMobile ? 4 : 0}
        pb={isMobile ? 4 : 0}
      >
        <SentimentDissatisfiedIcon sx={{ 
          fontSize: isMobile ? 60 : 100, 
          color: 'text.secondary', 
          mb: isMobile ? 1 : 2 
        }} />
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Page Not Found
        </Typography>
        <Typography 
          variant={isMobile ? "body2" : "body1"} 
          color="text.secondary" 
          paragraph
          sx={{ mb: isMobile ? 2 : 3 }}
        >
          The page you are looking for does not exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/"
          sx={{ 
            mt: isMobile ? 1 : 2,
            px: isMobile ? 2 : 3,
            py: isMobile ? 1 : 1.5
          }}
          size={isMobile ? "small" : "medium"}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;