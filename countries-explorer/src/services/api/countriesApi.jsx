import api from './axios';

// API service for REST Countries API
const countriesApi = {
  // Get all countries
  getAllCountries: async () => {
    try {
      const response = await api.get('/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching all countries:', error);
      throw error;
    }
  },

  // Search countries by name
  searchCountriesByName: async (name) => {
    try {
      const response = await api.get(`/name/${name}`);
      return response.data;
    } catch (error) {
      console.error(`Error searching countries by name '${name}':`, error);
      throw error;
    }
  },

  // Get countries by region
  getCountriesByRegion: async (region) => {
    try {
      const response = await api.get(`/region/${region}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching countries by region '${region}':`, error);
      throw error;
    }
  },

  // Get country by code (alpha)
  getCountryByCode: async (code) => {
    try {
      const response = await api.get(`/alpha/${code}`);
      return response.data[0]; // Returns an array with one country
    } catch (error) {
      console.error(`Error fetching country by code '${code}':`, error);
      throw error;
    }
  },

  // Get countries by language (filter from all)
  getCountriesByLanguage: async (language) => {
    try {
      const allCountries = await countriesApi.getAllCountries();
      return allCountries.filter(country => {
        const languages = country.languages || {};
        return Object.values(languages).some(lang => 
          lang.toLowerCase().includes(language.toLowerCase())
        );
      });
    } catch (error) {
      console.error(`Error filtering countries by language '${language}':`, error);
      throw error;
    }
  }
};

export default countriesApi;