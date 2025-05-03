// components/error/ErrorBoundary.jsx
import { Component } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const { resetErrorBoundary, fallback } = this.props;
      
      // Use custom fallback if provided
      if (fallback) {
        return fallback(this.state.error, resetErrorBoundary || this.resetErrorState);
      }
      
      // Default fallback UI
      return (
        <Container>
          <Box sx={{ my: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom color="error">
              Something went wrong
            </Typography>
            <Typography variant="body1" paragraph>
              An error occurred in the application. Please try refreshing the page.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (resetErrorBoundary) {
                  resetErrorBoundary();
                } else {
                  this.resetErrorState();
                }
              }}
            >
              Try Again
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ ml: 2 }}
              onClick={() => {
                window.location.href = '/';
              }}
            >
              Go to Home Page
            </Button>
            
            {/* Show error details in development */}
            {process.env.NODE_ENV !== 'production' && (
              <Box sx={{ mt: 4, textAlign: 'left', bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                <Typography variant="body2" component="pre" sx={{ color: 'error.main', whiteSpace: 'pre-wrap' }}>
                  {this.state.error && this.state.error.toString()}
                </Typography>
                {this.state.errorInfo && (
                  <Typography variant="body2" component="pre" sx={{ color: 'text.secondary', fontSize: '0.8rem', whiteSpace: 'pre-wrap', mt: 2 }}>
                    {this.state.errorInfo.componentStack}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }

  resetErrorState = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };
}

export default ErrorBoundary;