// contexts/CountriesContext.jsx
import { createContext, useState, useEffect, useCallback } from 'react';

export const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    region: '',
    language: '',
  });

  // Fetch all countries data
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://restcountries.com/v3.1/all');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch countries: ${response.status}`);
        }
        
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch countries');
        console.error('Error fetching countries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  }, []);

  // Get country by code (cca2, cca3, or name)
  const getCountryByCode = useCallback((code) => {
    if (!code || !countries.length) return null;
    
    return countries.find(country => 
      country.cca3 === code || 
      country.cca2 === code ||
      country.name.common.toLowerCase() === code.toLowerCase()
    );
  }, [countries]);

  // Apply filters to countries
  const filteredCountries = useCallback(() => {
    return countries.filter(country => {
      // Filter by search term
      const matchesSearch = filters.searchTerm === '' || 
        (country.name.common.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
         country.name.official.toLowerCase().includes(filters.searchTerm.toLowerCase()));
      
      // Filter by region
      const matchesRegion = filters.region === '' || 
        country.region.toLowerCase() === filters.region.toLowerCase();
      
      // Filter by language
      const matchesLanguage = filters.language === '' || 
        (country.languages && 
         Object.values(country.languages).some(lang => 
           lang.toLowerCase() === filters.language.toLowerCase()
         ));
      
      return matchesSearch && matchesRegion && matchesLanguage;
    });
  }, [countries, filters]);

  // Context value
  const contextValue = {
    countries: filteredCountries(),
    allCountries: countries,
    loading,
    error,
    filters,
    updateFilters,
    getCountryByCode
  };

  return (
    <CountriesContext.Provider value={contextValue}>
      {children}
    </CountriesContext.Provider>
  );
};