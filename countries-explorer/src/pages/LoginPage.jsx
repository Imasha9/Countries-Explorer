// LoginPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, useTheme, useMediaQuery } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <Container maxWidth="xl" disableGutters>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
          padding: isMobile ? '16px' : '24px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'all 0.3s ease'
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: {
              xs: '100%',  // Full width on extra-small screens
              sm: '450px', // 450px on small screens and above
              md: '500px'  // 500px on medium screens and above
            },
            borderRadius: { xs: isMobile ? '8px' : '12px' },
            boxShadow: { 
              xs: '0 4px 6px rgba(0,0,0,0.1)',
              md: '0 10px 25px rgba(0,0,0,0.1)'
            },
            overflow: 'hidden',
            backgroundColor: 'background.paper',
            transition: 'all 0.3s ease'
          }}
        >
          <LoginForm />
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;