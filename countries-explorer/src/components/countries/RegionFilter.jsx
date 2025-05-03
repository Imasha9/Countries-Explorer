import React from 'react'
import { 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Box,
    Fade
  } from '@mui/material';
  import { motion } from 'framer-motion';
  
  const RegionFilter = ({ value, onChange }) => {
    const regions = [
      { value: '', label: 'All Regions' },
      { value: 'africa', label: 'Africa' },
      { value: 'americas', label: 'Americas' },
      { value: 'asia', label: 'Asia' },
      { value: 'europe', label: 'Europe' },
      { value: 'oceania', label: 'Oceania' },
    ];
  
    return (
      <Fade in timeout={600}>
        <Box 
          component={motion.div}
          whileHover={{ scale: 1.01 }}
          sx={{ minWidth: 200 }}
        >
          <FormControl fullWidth>
            <InputLabel id="region-select-label">Filter by Region</InputLabel>
            <Select
              labelId="region-select-label"
              id="region-select"
              value={value}
              label="Filter by Region"
              onChange={(e) => onChange(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 300,
                    borderRadius: '8px',
                    mt: 1
                  }
                }
              }}
            >
              {regions.map((region) => (
                <MenuItem 
                  key={region.value} 
                  value={region.value}
                  sx={{ py: 1.5 }}
                >
                  {region.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Fade>
    );
  };
  
  export default RegionFilter;