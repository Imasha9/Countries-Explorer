// jest.setup.js
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder || TextDecoder; // Fallback for Node < 15

// Mock for window.matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};
const originalWarn = console.warn;

// Override console.warn to filter out MUI Grid warnings
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('MUI Grid:')) {
    // Skip MUI Grid warnings
    return;
  }
  // Call the original console.warn for all other warnings
  originalWarn.apply(console, args);
};

const originalConsoleError = console.error;

beforeAll(() => {
  // Suppress specific warnings
  console.error = (...args) => {
    if (
      /react-test-renderer is deprecated/.test(args[0]) ||
      /The current testing environment is not configured to support act/.test(args[0])
    ) {
      return;
    }
    originalConsoleError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
});

// For API error tests - allow mocking console.error per test
let consoleErrorMock;
beforeEach(() => {
  consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  consoleErrorMock.mockRestore();
});