import React from 'react';
import { Box, Container, Typography, Link, IconButton, Divider, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Language as LanguageIcon, 
  Public as PublicIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  // Gradient animation for the footer border
  const gradientBorder = {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: `linear-gradient(90deg, 
        ${theme.palette.primary.main}, 
        ${theme.palette.secondary.main}, 
        ${theme.palette.primary.light})`,
      backgroundSize: '200% 100%',
      animation: 'gradientMove 6s ease infinite',
    },
    '@keyframes gradientMove': {
      '0%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      '100%': { backgroundPosition: '0% 50%' },
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 20, 30, 0.9)' : 'rgba(250, 252, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 -5px 20px rgba(0,0,0,0.05)',
        ...gradientBorder,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}>
          {/* Logo & Title Section */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: { xs: 2, md: 0 }
          }}>
            <PublicIcon 
              sx={{ 
                fontSize: 32, 
                color: theme.palette.primary.main,
                mr: 1,
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px',
              }}
            >
              Countries Explorer
            </Typography>
          </Box>

          {/* Nav Links */}
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 2, md: 4 },
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <Link
              component={RouterLink}
              to="/"
              underline="none"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Home
            </Link>
            <Link
              component={RouterLink}
              to="/favorites"
              underline="none"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Favorites
            </Link>
            <Link
              href="https://restcountries.com/"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <LanguageIcon fontSize="small" />
              API
            </Link>
          </Box>

          {/* Social Icons */}
          <Box sx={{ 
            display: 'flex',
            gap: 1,
            mt: { xs: 2, md: 0 }
          }}>
            <IconButton 
              aria-label="GitHub"
              size="small"
              sx={{
                color: theme.palette.text.secondary,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor: `${theme.palette.primary.main}10`,
                  transform: 'translateY(-3px)',
                }
              }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton 
              aria-label="Twitter"
              size="small"
              sx={{
                color: theme.palette.text.secondary,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor: `${theme.palette.primary.main}10`,
                  transform: 'translateY(-3px)',
                }
              }}
            >
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton 
              aria-label="LinkedIn"
              size="small"
              sx={{
                color: theme.palette.text.secondary,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor: `${theme.palette.primary.main}10`,
                  transform: 'translateY(-3px)',
                }
              }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        
        <Divider sx={{ 
          my: 2, 
          opacity: 0.6,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' 
            : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
        }} />
        
        {/* Copyright Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              flexWrap: 'wrap',
              fontSize: '0.85rem',
              opacity: 0.8,
            }}
          >
            {'© '}
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                }
              }}
            >
              Countries Explorer
            </Link>
            {` ${currentYear} `}
            <Box 
              component="span" 
              sx={{ 
                display: 'inline-flex', 
                alignItems: 'center',
                mx: 0.5
              }}
            >
              •
            </Box>
            <Link
              href="https://restcountries.com/"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                }
              }}
            >
              Powered by REST Countries API
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;