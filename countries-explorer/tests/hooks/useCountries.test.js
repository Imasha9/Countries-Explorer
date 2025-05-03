import { renderHook, act } from '@testing-library/react-hooks';
import { useCountries } from '../../src/hooks/useCountries';
import countriesApi from '../../src/services/api/countriesApi';

// Mock the countriesApi module
jest.mock('../../src/services/api/countriesApi');

describe('useCountries Hook', () => {
  // Sample mock data
  const mockCountries = [
    {
      name: { common: 'Germany' },
      cca3: 'DEU',
      region: 'Europe',
      languages: { deu: 'German' },
      capital: ['Berlin'],
      population: 83000000
    },
    {
      name: { common: 'France' },
      cca3: 'FRA',
      region: 'Europe',
      languages: { fra: 'French' },
      capital: ['Paris'],
      population: 67000000
    },
    {
      name: { common: 'Brazil' },
      cca3: 'BRA',
      region: 'Americas',
      languages: { por: 'Portuguese' },
      capital: ['Brasília'],
      population: 211000000
    },
    {
      name: { common: 'Japan' },
      cca3: 'JPN',
      region: 'Asia',
      languages: { jpn: 'Japanese' },
      capital: ['Tokyo'],
      population: 126000000
    }
  ];

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementation for getAllCountries
    countriesApi.getAllCountries.mockResolvedValue(mockCountries);
  });

  test('should load countries on initial render', async () => {
    const { result } = renderHook(() => useCountries());
    
    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.countries).toEqual([]);
    
    // Wait for loading to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0)); // Let the event loop process
    });
    
    // Final state
    expect(result.current.loading).toBe(false);
    expect(result.current.countries).toEqual(mockCountries);
  });

  test('should handle API error', async () => {
    const errorMessage = 'Network error';
    countriesApi.getAllCountries.mockRejectedValueOnce(new Error(errorMessage));
    
    const { result } = renderHook(() => useCountries());
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  
});