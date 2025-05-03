import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton, useTheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useColorMode } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const theme = useTheme();
  const { toggleColorMode, mode } = useColorMode();
  const isDark = mode === 'dark';

  // Animation variants
  const iconVariants = {
    initial: { opacity: 0, rotate: -30, scale: 0.7 },
    animate: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    },
    exit: {
      opacity: 0,
      rotate: 30,
      scale: 0.7,
      transition: { duration: 0.3 }
    }
  };

  return (
    <IconButton
      onClick={toggleColorMode}
      color="primary"
      aria-label="toggle theme"
      sx={{
        background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        borderRadius: '50%',
        p: 1.2,
        '&:hover': {
          background: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={iconVariants}
        >
          {isDark ? (
            <LightModeIcon sx={{ color: '#FDB813' }} />
          ) : (
            <DarkModeIcon sx={{ color: '#212B36' }} />
          )}
        </motion.div>
      </AnimatePresence>
    </IconButton>
  );
};

export default ThemeToggle;