import { useState, useEffect, createContext, useContext } from 'react';
import { useAuth } from './useAuth';

// Create Favorites Context
const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  // Load favorites from localStorage on mount or when user changes
  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      
      if (isAuthenticated && user) {
        try {
          // Try to load from localStorage first
          const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
          
          if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
          } else {
            // If not in localStorage, try to fetch from API
            // This is where you'd add an API call if you have a backend
            // const response = await fetchFavoritesFromAPI(user.id);
            // setFavorites(response.data.favorites);
            
            // For now, just set empty array if nothing in localStorage
            setFavorites([]);
          }
        } catch (error) {
          console.error('Error loading favorites:', error);
          setFavorites([]);
        }
      } else {
        // Not authenticated, no favorites
        setFavorites([]);
      }
      
      setLoading(false);
    };

    loadFavorites();
  }, [user, isAuthenticated]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user, isAuthenticated]);

  // Check if a country is a favorite
  const isFavorite = (countryCode) => {
    return favorites.includes(countryCode);
  };

  // Toggle a country's favorite status
  const toggleFavorite = (countryCode) => {
    if (isFavorite(countryCode)) {
      setFavorites(favorites.filter(code => code !== countryCode));
    } else {
      setFavorites([...favorites, countryCode]);
    }
  };

  // Add a country to favorites
  const addFavorite = (countryCode) => {
    if (!isFavorite(countryCode)) {
      setFavorites([...favorites, countryCode]);
    }
  };

  // Remove a country from favorites
  const removeFavorite = (countryCode) => {
    setFavorites(favorites.filter(code => code !== countryCode));
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  // Function to save favorites to a server if needed
  const saveFavoritesToServer = async (userId, favoritesData) => {
    try {
      // This is where you'd add an API call to save to backend
      // await api.post('/users/favorites', { userId, favorites: favoritesData });
      console.log('Would save favorites to server:', userId, favoritesData);
    } catch (error) {
      console.error('Error saving favorites to server:', error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
        loading,
        isFavorite,
        toggleFavorite,
        addFavorite,
        removeFavorite,
        clearFavorites,
        saveFavoritesToServer
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the favorites context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  
  return context;
};