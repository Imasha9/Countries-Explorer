import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMemo } from 'react';

const LightThemeProvider = ({ children }) => {
  const lightTheme = useMemo(() => createTheme({
    palette: {
      mode: 'light',
    },
  }), []);

  return (
    <ThemeProvider theme={lightTheme}>
      {children}
    </ThemeProvider>
  );
};

export default LightThemeProvider;