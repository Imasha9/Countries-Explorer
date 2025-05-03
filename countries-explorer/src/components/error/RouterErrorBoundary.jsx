// components/error/RouterErrorBoundary.jsx
import { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';

// Wrapper to provide navigate function to class component
const RouterErrorBoundaryWithNavigate = (props) => {
  const navigate = useNavigate();
  return <RouterErrorBoundary {...props} navigate={navigate} />;
};

class RouterErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Router Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Box sx={{ my: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom color="error">
              Navigation Error
            </Typography>
            <Typography variant="body1" paragraph>
              There was a problem with page navigation. Please try going back to the home page.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({ hasError: false });
                this.props.navigate('/');
              }}
            >
              Go to Home Page
            </Button>
            {process.env.NODE_ENV !== 'production' && (
              <Box sx={{ mt: 4, textAlign: 'left', bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                <Typography variant="body2" component="pre" sx={{ color: 'error.main', whiteSpace: 'pre-wrap' }}>
                  {this.state.error && this.state.error.toString()}
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export { RouterErrorBoundaryWithNavigate as RouterErrorBoundary };