import axios from 'axios';

// Create an axios instance with base URL for the REST Countries API
const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;