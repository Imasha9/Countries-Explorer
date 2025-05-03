import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, useTheme, useMediaQuery } from '@mui/material';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import ExploreIcon from '@mui/icons-material/Explore';
import FlightIcon from '@mui/icons-material/Flight';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// Stylish animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate('/login'), 500);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        animation: `${gradientShift} 12s ease infinite`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.1) 20%)',
          backgroundSize: '20px 20px',
          opacity: 0.3,
        },
      }}
    >
      {/* Floating decorative stars */}
      {[...Array(isMobile ? 4 : 8)].map((_, i) => (
        <StarBorderIcon
          key={i}
          sx={{
            position: 'absolute',
            fontSize: isMobile ? 12 : 16,
            color: 'rgba(255,255,255,0.7)',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `${float} ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Main content */}
      <Box
        sx={{
          textAlign: 'center',
          zIndex: 1,
          px: isMobile ? 2 : 3,
          animation: `${pulse} 3s ease-in-out infinite`,
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            position: 'relative',
            mb: isMobile ? 2 : 4,
          }}
        >
          <PublicIcon
            sx={{
              fontSize: isMobile ? 80 : 120,
              color: 'white',
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))',
              animation: `${float} 6s ease-in-out infinite`,
            }}
          />
          <ExploreIcon
            sx={{
              position: 'absolute',
              fontSize: isMobile ? 32 : 48,
              color: theme.palette.warning.light,
              top: isMobile ? -5 : -10,
              right: isMobile ? -15 : -20,
              animation: `${float} 4s ease-in-out infinite`,
              animationDelay: '0.5s',
            }}
          />
        </Box>

        <Typography
          variant={isMobile ? "h3" : "h2"}
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 800,
            letterSpacing: 1.5,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            mb: isMobile ? 1 : 2,
            fontSize: isMobile ? '2rem' : 'inherit',
          }}
        >
          EXPLORE COUNTRIES
        </Typography>

        <Typography
          variant={isMobile ? "subtitle1" : "h6"}
          sx={{
            fontWeight: 300,
            letterSpacing: 1,
            maxWidth: 500,
            mx: 'auto',
            mb: isMobile ? 2 : 4,
            textShadow: '0 1px 3px rgba(0,0,0,0.2)',
            px: isMobile ? 1 : 0,
            fontSize: isMobile ? '0.9rem' : 'inherit',
          }}
        >
          Journey across borders with a single click
        </Typography>

        {/* Glassmorphism progress bar */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            mx: 'auto',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            borderRadius: 3,
            p: isMobile ? 1.5 : 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: isMobile ? 6 : 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.3)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #ffffff, #e0f7fa)',
                borderRadius: 4,
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              fontWeight: 500,
              letterSpacing: 0.5,
              fontSize: isMobile ? '0.75rem' : 'inherit',
            }}
          >
            PREPARING YOUR JOURNEY... {Math.round(progress)}%
          </Typography>
        </Box>
      </Box>

      {/* Animated plane */}
      <FlightIcon
        sx={{
          position: 'absolute',
          fontSize: isMobile ? 32 : 48,
          color: 'rgba(255,255,255,0.9)',
          bottom: isMobile ? 20 : 40,
          left: isMobile ? '5%' : '10%',
          animation: `${float} 5s ease-in-out infinite`,
          transform: 'rotate(45deg)',
        }}
      />
    </Box>
  );
};

export default SplashScreen;