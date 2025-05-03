import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegionFilter from '../../src/components/countries/RegionFilter';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

describe('RegionFilter Component', () => {
  const mockOnRegionChange = jest.fn();

  beforeEach(() => {
    mockOnRegionChange.mockClear();
  });

  test('renders with default "Filter by Region" label', () => {
    render(
      <ThemeProvider theme={theme}>
        <RegionFilter value="" onChange={mockOnRegionChange} />
      </ThemeProvider>
    );
    
    expect(screen.getByLabelText('Filter by Region')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('calls onChange when a region is selected', async () => {
    render(
      <ThemeProvider theme={theme}>
        <RegionFilter value="" onChange={mockOnRegionChange} />
      </ThemeProvider>
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    
    const option = await screen.findByRole('option', { name: /europe/i });
    fireEvent.click(option);
    
    expect(mockOnRegionChange).toHaveBeenCalledWith('europe');
  });

  test('displays the selected region', () => {
    render(
      <ThemeProvider theme={theme}>
        <RegionFilter value="asia" onChange={mockOnRegionChange} />
      </ThemeProvider>
    );
    
    expect(screen.getByRole('combobox')).toHaveTextContent('Asia');
  });
});