import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchBar from '../../src/components/common/SearchBar';

describe('SearchBar Component', () => {
  const theme = createTheme();
  const mockOnSearch = jest.fn();

  test('renders search input with icon', () => {
    render(
      <ThemeProvider theme={theme}>
        <SearchBar onSearch={mockOnSearch} />
      </ThemeProvider>
    );

    expect(screen.getByPlaceholderText('Search for a country...')).toBeInTheDocument();
    expect(screen.getByTestId('SearchIcon')).toBeInTheDocument();
  });

  test('calls onSearch when input changes', () => {
    render(
      <ThemeProvider theme={theme}>
        <SearchBar onSearch={mockOnSearch} />
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(input, { target: { value: 'Germany' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('Germany');
  });
});