import countriesApi from '../../src/services/api/countriesApi';
import api from '../../src/services/api/axios';

// Mock the axios instance
jest.mock('../../src/services/api/axios');

describe('Countries API Service', () => {
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
    }
  ];

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCountries', () => {
    test('should fetch all countries successfully', async () => {
      // Set up the mock response
      api.get.mockResolvedValueOnce({ data: mockCountries });

      // Call the function
      const result = await countriesApi.getAllCountries();

      // Check if API was called with correct endpoint
      expect(api.get).toHaveBeenCalledWith('/all');
      expect(api.get).toHaveBeenCalledTimes(1);

      // Check if the result matches expected data
      expect(result).toEqual(mockCountries);
      expect(result.length).toBe(3);
    });

    test('should throw error when API call fails', async () => {
      // Mock API error
      const error = new Error('Network error');
      api.get.mockRejectedValueOnce(error);

      // Check if function throws the error
      await expect(countriesApi.getAllCountries()).rejects.toThrow('Network error');
      expect(api.get).toHaveBeenCalledWith('/all');
    });
  });

  describe('searchCountriesByName', () => {
    test('should search countries by name successfully', async () => {
      // Filter for Germany
      const germanData = [mockCountries[0]];
      api.get.mockResolvedValueOnce({ data: germanData });

      // Call the function
      const result = await countriesApi.searchCountriesByName('germany');

      // Check if API was called with correct endpoint
      expect(api.get).toHaveBeenCalledWith('/name/germany');
      expect(api.get).toHaveBeenCalledTimes(1);

      // Check if the result matches expected data
      expect(result).toEqual(germanData);
      expect(result[0].name.common).toBe('Germany');
    });

    test('should throw error when API call fails', async () => {
      // Mock API error
      const error = new Error('Country not found');
      api.get.mockRejectedValueOnce(error);

      // Check if function throws the error
      await expect(countriesApi.searchCountriesByName('nonexistent')).rejects.toThrow('Country not found');
      expect(api.get).toHaveBeenCalledWith('/name/nonexistent');
    });
  });

  describe('getCountriesByRegion', () => {
    test('should get countries by region successfully', async () => {
      // Filter for Europe
      const europeData = [mockCountries[0], mockCountries[1]];
      api.get.mockResolvedValueOnce({ data: europeData });

      // Call the function
      const result = await countriesApi.getCountriesByRegion('europe');

      // Check if API was called with correct endpoint
      expect(api.get).toHaveBeenCalledWith('/region/europe');
      expect(api.get).toHaveBeenCalledTimes(1);

      // Check if the result matches expected data
      expect(result).toEqual(europeData);
      expect(result.length).toBe(2);
      expect(result[0].region).toBe('Europe');
      expect(result[1].region).toBe('Europe');
    });

    test('should throw error when API call fails', async () => {
      // Mock API error
      const error = new Error('Region not found');
      api.get.mockRejectedValueOnce(error);

      // Check if function throws the error
      await expect(countriesApi.getCountriesByRegion('unknown')).rejects.toThrow('Region not found');
      expect(api.get).toHaveBeenCalledWith('/region/unknown');
    });
  });

  describe('getCountryByCode', () => {
    test('should get country by code successfully', async () => {
      // Data for Germany
      const germanyData = [mockCountries[0]];
      api.get.mockResolvedValueOnce({ data: germanyData });

      // Call the function
      const result = await countriesApi.getCountryByCode('DEU');

      // Check if API was called with correct endpoint
      expect(api.get).toHaveBeenCalledWith('/alpha/DEU');
      expect(api.get).toHaveBeenCalledTimes(1);

      // Check if the result matches expected data
      expect(result).toEqual(mockCountries[0]);
      expect(result.cca3).toBe('DEU');
    });

    test('should throw error when API call fails', async () => {
      // Mock API error
      const error = new Error('Country code not found');
      api.get.mockRejectedValueOnce(error);

      // Check if function throws the error
      await expect(countriesApi.getCountryByCode('XYZ')).rejects.toThrow('Country code not found');
      expect(api.get).toHaveBeenCalledWith('/alpha/XYZ');
    });
  });

  describe('getCountriesByLanguage', () => {
    test('should filter countries by language successfully', async () => {
      // Mock the getAllCountries function for language filtering
      api.get.mockResolvedValueOnce({ data: mockCountries });

      // Call the function
      const result = await countriesApi.getCountriesByLanguage('german');

      // Check if API was called correctly (should get all countries first)
      expect(api.get).toHaveBeenCalledWith('/all');
      expect(api.get).toHaveBeenCalledTimes(1);

      // Check if the result matches expected data
      expect(result.length).toBe(1);
      expect(result[0].name.common).toBe('Germany');
      expect(Object.values(result[0].languages)[0]).toBe('German');
    });

    test('should handle case insensitive language search', async () => {
      // Mock the getAllCountries function for language filtering
      api.get.mockResolvedValueOnce({ data: mockCountries });

      // Call the function with lowercase 'portuguese'
      const result = await countriesApi.getCountriesByLanguage('portuguese');

      // Check if API was called correctly
      expect(api.get).toHaveBeenCalledWith('/all');
      expect(api.get).toHaveBeenCalledTimes(1);

      // Check if the result matches expected data
      expect(result.length).toBe(1);
      expect(result[0].name.common).toBe('Brazil');
    });

    test('should return empty array when no countries match language', async () => {
      // Mock the getAllCountries function
      api.get.mockResolvedValueOnce({ data: mockCountries });

      // Call the function with a non-existent language
      const result = await countriesApi.getCountriesByLanguage('klingon');

      // Check if API was called correctly
      expect(api.get).toHaveBeenCalledWith('/all');
      expect(api.get).toHaveBeenCalledTimes(1);

      // Check if the result is an empty array
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });

    test('should handle countries with no languages property', async () => {
      // Create a mock country without languages property
      const mockCountriesWithMissingData = [
        ...mockCountries,
        {
          name: { common: 'TestCountry' },
          cca3: 'TST',
          region: 'Test',
          // No languages property
          capital: ['TestCity'],
          population: 1000
        }
      ];
      
      // Mock the getAllCountries function
      api.get.mockResolvedValueOnce({ data: mockCountriesWithMissingData });

      // Call the function
      const result = await countriesApi.getCountriesByLanguage('german');

      // Check results are filtered correctly despite the missing data
      expect(result.length).toBe(1);
      expect(result[0].name.common).toBe('Germany');
    });

    test('should throw error when getAllCountries fails', async () => {
      // Mock API error for getAllCountries
      const error = new Error('Network error');
      api.get.mockRejectedValueOnce(error);

      // Check if function throws the error
      await expect(countriesApi.getCountriesByLanguage('english')).rejects.toThrow('Network error');
      expect(api.get).toHaveBeenCalledWith('/all');
    });
  });
});