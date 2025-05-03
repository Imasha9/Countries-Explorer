import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryDetail from '../../src/components/countries/CountryDetail';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';

// Configure Jest to ignore MUI Grid deprecation warnings
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((message) => {
    if (!message.includes('MUI Grid:')) {
      console.warn(message);
    }
  });
});

afterAll(() => {
  console.warn.mockRestore();
});

const theme = createTheme();

const mockCountry = {
  name: {
    common: 'Japan',
    official: 'Japan',
    nativeName: {
      jpn: {
        official: '日本国',
        common: '日本'
      }
    }
  },
  capital: ['Tokyo'],
  population: 126000000,
  flags: { svg: 'japan-flag.svg', png: 'japan-flag.png', alt: 'Flag of Japan' },
  region: 'Asia',
  subregion: 'Eastern Asia',
  languages: { jpn: 'Japanese' },
  currencies: { JPY: { name: 'Japanese yen', symbol: '¥' } },
  borders: ['CHN', 'KOR', 'RUS'],
  tld: ['.jp']
};

describe('CountryDetail Component', () => {
  test('renders country name and native name', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CountryDetail country={mockCountry} loading={false} error={null} />
        </MemoryRouter>
      </ThemeProvider>
    );
    
    // Look for the country name in a heading
    expect(screen.getByRole('heading', { name: /Japan/i })).toBeInTheDocument();
    
    // Look for the native name
    expect(screen.getByText('日本')).toBeInTheDocument();
  });

  test('shows loading spinner when loading', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CountryDetail country={null} loading={true} error={null} />
        </MemoryRouter>
      </ThemeProvider>
    );
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('shows error message when there is an error', () => {
    const errorMessage = 'Failed to fetch country data';
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CountryDetail country={null} loading={false} error={errorMessage} />
        </MemoryRouter>
      </ThemeProvider>
    );
    
    expect(screen.getByText(/Failed to fetch country data/i)).toBeInTheDocument();
    
    const errorDisplay = screen.getByText(/Error:/i);
    expect(errorDisplay).toHaveTextContent(errorMessage);
  });
});