import React from 'react'
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize with proper favorites structure
  const initializeUser = (userData) => {
    return {
      ...userData,
      favorites: Array.isArray(userData.favorites) ? userData.favorites : []
    };
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const userWithFavorites = initializeUser(parsedUser);
        setUser(userWithFavorites);
        setIsAuthenticated(true);
        
        // Update storage if structure was corrected
        if (!Array.isArray(parsedUser.favorites)) {
          localStorage.setItem('userInfo', JSON.stringify(userWithFavorites));
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('userInfo');
      }
    }
    setLoading(false);
  }, []);

  const updateUserInStorage = (updatedUser) => {
    const userWithFavorites = initializeUser(updatedUser);
    localStorage.setItem('userInfo', JSON.stringify(userWithFavorites));
    setUser(userWithFavorites);
  };

  const login = async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.email === userData.email && u.password === userData.password);
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }
      
      // Merge with existing favorites if available in current session
      const currentFavorites = user?.favorites || [];
      const userWithFavorites = initializeUser({
        ...foundUser,
        favorites: [...currentFavorites, ...(foundUser.favorites || [])]
      });
      
      localStorage.setItem('userInfo', JSON.stringify(userWithFavorites));
      setUser(userWithFavorites);
      setIsAuthenticated(true);
      navigate('/');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.some(u => u.email === userData.email)) {
        throw new Error('Email already in use');
      }
      
      const newUser = initializeUser({
        id: Date.now(),
        name: userData.username,
        email: userData.email,
        password: userData.password,
        favorites: []
      });
      
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      localStorage.setItem('userInfo', JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);
      navigate('/');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    // Preserve favorites before logging out
    if (user) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(u => 
        u.email === user.email ? { ...u, favorites: user.favorites } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
    
    localStorage.removeItem('userInfo');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleFavorite = (countryCode) => {
    if (!user) return;
    
    const updatedUser = { ...user };
    updatedUser.favorites = updatedUser.favorites || [];
    
    const index = updatedUser.favorites.indexOf(countryCode);
    
    if (index === -1) {
      updatedUser.favorites.push(countryCode);
    } else {
      updatedUser.favorites.splice(index, 1);
    }
    
    updateUserInStorage(updatedUser);
  };

  const isFavorite = (countryCode) => {
    return user?.favorites?.includes(countryCode) || false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </AuthContext.Provider>
  );
};