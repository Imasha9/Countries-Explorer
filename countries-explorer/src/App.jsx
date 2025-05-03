import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CssBaseline, Box, Container } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import SplashScreen from './pages/SplashScreen';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CountryDetailPage from './pages/CountryDetailPage';
import FavoritesPage from './pages/FavouritesPage';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const [showSplash, setShowSplash] = useState(
    localStorage.getItem('splashShown') !== 'true'
  );
  const location = useLocation();

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        localStorage.setItem('splashShown', 'true');
        setShowSplash(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Check if current route should show footer
  const showFooter = !['/login', '/register'].includes(location.pathname);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <AuthProvider>
      <ThemeContextProvider>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              flexGrow: 1,
              py: 4,
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/country/:code"
                element={
                  <ProtectedRoute>
                    <CountryDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <FavoritesPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
          {showFooter && <Footer />}
        </Box>
      </ThemeContextProvider>
    </AuthProvider>
  );
}

export default App;