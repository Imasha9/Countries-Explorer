import { useState, useEffect, useCallback } from 'react';
import countriesApi from '../services/api/countriesApi';

// Custom hook for fetching and managing countries data
export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    region: '',
    searchTerm: '',
    language: '',
  });

  // Fetch all countries on initial load
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await countriesApi.getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    const applyFilters = async () => {
      try {
        setLoading(true);
        let result = countries;

        // Apply region filter if selected
        if (filters.region) {
          result = await countriesApi.getCountriesByRegion(filters.region);
        }

        // Apply search term if provided
        if (filters.searchTerm) {
          try {
            const searchResults = await countriesApi.searchCountriesByName(filters.searchTerm);
            // If we already filtered by region, we need to intersect the results
            if (filters.region) {
              const regionCountryCodes = new Set(result.map(c => c.cca3));
              result = searchResults.filter(c => regionCountryCodes.has(c.cca3));
            } else {
              result = searchResults;
            }
          } catch (searchError) {
            // If search returns no results, show empty array
            result = [];
          }
        }

        // Apply language filter if provided
        if (filters.language) {
          // Language filtering is done client-side after fetching data
          result = result.filter(country => {
            const languages = country.languages || {};
            return Object.values(languages).some(lang => 
              lang.toLowerCase().includes(filters.language.toLowerCase())
            );
          });
        }

        setFilteredCountries(result);
      } catch (err) {
        setError(err.message || 'Error applying filters');
      } finally {
        setLoading(false);
      }
    };

    // Only apply filters if we have countries data
    if (countries.length > 0) {
      applyFilters();
    }
  }, [filters, countries]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters({
      region: '',
      searchTerm: '',
      language: '',
    });
    setFilteredCountries(countries);
  }, [countries]);

  // Get a single country by code
  const getCountryByCode = useCallback(async (code) => {
    try {
      setLoading(true);
      return await countriesApi.getCountryByCode(code);
    } catch (err) {
      setError(err.message || `Failed to fetch country with code ${code}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    countries: filteredCountries,
    allCountries: countries,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    getCountryByCode,
  };
};