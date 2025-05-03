import React from 'react';  
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import CountryDetail from '../components/countries/CountryDetail';
import { useCountries } from '../hooks/useCountries';
import { motion } from 'framer-motion';

const CountryDetailPage = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getCountryByCode } = useCountries();

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCountryByCode(code);
        setCountry(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch country details');
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchCountryDetails();
    }
  }, [code, getCountryByCode]);

  return (
    <Container 
      maxWidth="lg" 
      sx={{ py: 4 }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CountryDetail 
        country={country}
        loading={loading}
        error={error}
      />
    </Container>
  );
};

export default CountryDetailPage;