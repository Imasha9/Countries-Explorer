import { createContext, useState, useContext, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocation } from 'react-router-dom';

// Create the theme context
const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

// Hook to use the theme context
export const useColorMode = () => useContext(ThemeContext);

// Theme context provider component
export const ThemeContextProvider = ({ children }) => {
  // Read initial theme preference from localStorage if available
  const [mode, setMode] = useState(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );

  // Get current location to check for auth pages
  const location = useLocation();
  
  // Check if we're on login or register page
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  
  // Force light theme on auth pages
  const currentMode = isAuthPage ? 'light' : mode;

  // Toggle theme function
  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    // Save preference to localStorage
    localStorage.setItem('theme', newMode);
  };

  // Create the theme object based on current mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: currentMode,
          ...(currentMode === 'light'
            ? {
                // Light theme
                primary: {
                  main: '#1976d2',
                  light: '#42a5f5',
                  dark: '#1565c0',
                },
                secondary: {
                  main: '#e91e63',
                  light: '#f48fb1',
                  dark: '#c2185b',
                },
                background: {
                  default: '#f5f5f5',
                  paper: '#ffffff',
                },
                text: {
                  primary: '#212121',
                  secondary: '#757575',
                },
              }
            : {
                // Dark theme
                primary: {
                  main: '#90caf9',
                  light: '#e3f2fd',
                  dark: '#42a5f5',
                },
                secondary: {
                  main: '#f48fb1',
                  light: '#f8bbd0',
                  dark: '#ec407a',
                },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
                text: {
                  primary: '#f0f0f0',
                  secondary: '#aaaaaa',
                },
                divider: 'rgba(255, 255, 255, 0.12)',
              }),
        },
        typography: {
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 800,
            fontSize: '3.5rem',
            letterSpacing: '-0.01562em',
          },
          h2: {
            fontWeight: 700,
            fontSize: '2.5rem',
          },
          h3: {
            fontWeight: 600,
            fontSize: '2rem',
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                letterSpacing: '0.5px',
                padding: '8px 22px',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: currentMode === 'dark' 
                    ? '0 10px 20px rgba(0,0,0,0.7)' 
                    : '0 10px 20px rgba(0,0,0,0.1)',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [currentMode]
  );

  // Context value
  const contextValue = useMemo(
    () => ({
      toggleColorMode,
      mode,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};