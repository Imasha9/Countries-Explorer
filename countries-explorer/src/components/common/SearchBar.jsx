import React from 'react';
import { useState } from 'react';
import { 
  TextField, 
  InputAdornment,
  Paper,
  useTheme,
  Fade
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <Fade in timeout={500}>
      <Paper 
        component={motion.div}
        whileHover={{ boxShadow: theme.shadows[4] }}
        elevation={0} 
        sx={{ 
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '8px',
              backgroundColor: theme.palette.background.paper,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.divider,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            }
          }}
        />
      </Paper>
    </Fade>
  );
};

export default SearchBar;