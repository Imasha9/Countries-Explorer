import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider,
  useTheme,
  Grid,
  Container
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../../hooks/useAuth';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 24,
  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15)',
  backdropFilter: 'blur(12px)',
  backgroundColor: 'rgba(255, 255, 255, 0.97)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  width: '100%',
  maxWidth: '500px',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: '14px 0',
  borderRadius: 14,
  fontWeight: 700,
  fontSize: '1.1rem',
  letterSpacing: '0.8px',
  boxShadow: '0 6px 20px rgba(63, 81, 181, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 10px 25px rgba(63, 81, 181, 0.5)',
    transform: 'translateY(-3px)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 14,
    transition: 'all 0.3s ease',
    fontSize: '1.05rem',
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 2,
      },
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.light,
      },
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '1.05rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
  '& .MuiOutlinedInput-input': {
    padding: '16px 18px',
  },
  margin: '12px 0',
}));

const AnimatedLockIcon = styled(motion.div)(({ theme }) => ({
  width: 90,
  height: 90,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #3f51b5 0%, #757de8 100%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  color: '#fff',
  boxShadow: '0 10px 30px rgba(63, 81, 181, 0.4)',
}));

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (validate()) {
      setIsLoading(true);
      try {
        await login(formData);
      } catch (error) {
        setSubmitError(error.message || 'Invalid email or password');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Animation variants
  const formAnimations = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const itemAnimations = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 120,
        damping: 12
      }
    }
  };

  const hoverAnimation = {
    scale: 1.03,
    transition: { duration: 0.3 }
  };

  const tapAnimation = {
    scale: 0.98
  };

  return (
    <Container maxWidth="lg" sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      py: 4
    }}>
      <StyledPaper
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={formAnimations}
        elevation={24}
      >
        <motion.div 
          variants={itemAnimations}
          whileHover={{ 
            rotate: [0, -5, 5, -5, 0], 
            transition: { duration: 0.6 } 
          }}
        >
          <AnimatedLockIcon
            initial={{ scale: 0, rotate: 180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              transition: { 
                type: 'spring',
                stiffness: 300,
                damping: 20
              }
            }}
            whileHover={{
              scale: 1.1,
              rotate: [0, 5, -5, 5, 0],
              transition: { duration: 0.8 }
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 40 }} />
          </AnimatedLockIcon>
        </motion.div>
        
        <Typography
          component={motion.h1}
          variants={itemAnimations}
          variant="h3"
          sx={{
            mb: 3,
            fontWeight: 800,
            fontFamily: "'Montserrat', sans-serif",
            background: 'linear-gradient(45deg, #3f51b5 30%, #757de8 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            letterSpacing: '-0.5px'
          }}
        >
          Welcome
        </Typography>
        
        <Typography
          component={motion.p}
          variants={itemAnimations}
          variant="body1"
          sx={{
            mb: 4,
            color: theme.palette.text.secondary,
            textAlign: 'center',
            fontSize: '1.1rem',
            maxWidth: '400px'
          }}
        >
          Sign in to access your account and continue your journey with us.
        </Typography>
        
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Alert 
              severity="error" 
              sx={{ 
                width: '100%', 
                mb: 3, 
                borderRadius: 14,
                fontWeight: 500,
                fontSize: '1rem'
              }}
              component={motion.div}
              variants={itemAnimations}
            >
              {submitError}
            </Alert>
          </motion.div>
        )}
        
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate 
          sx={{ 
            mt: 1, 
            width: '100%',
          }}
        >
          <motion.div variants={itemAnimations}>
            <StyledTextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: theme.palette.primary.main }} />
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>
          
          <motion.div variants={itemAnimations}>
            <StyledTextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: theme.palette.primary.main }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      sx={{ 
                        color: showPassword ? 'primary.main' : theme.palette.text.secondary,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: 'primary.main',
                          backgroundColor: 'rgba(63, 81, 181, 0.08)'
                        }
                      }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>
          
          <Box sx={{ textAlign: 'right', mb: 2 }}>
            <motion.div
              variants={itemAnimations}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                component={RouterLink}
                to="/forgot-password"
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline',
                  }
                }}
              >
                Forgot password?
              </Link>
            </motion.div>
          </Box>
          
          <motion.div 
            variants={itemAnimations}
            whileHover={hoverAnimation}
            whileTap={tapAnimation}
          >
            <Box sx={{ position: 'relative', mt: 3, mb: 4 }}>
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{ 
                  py: 1.8,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #3f51b5 0%, #757de8 100%)',
                  color: 'white'
                }}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </StyledButton>
              {isLoading && (
                <CircularProgress
                  size={28}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-14px',
                    marginLeft: '-14px',
                    color: theme.palette.primary.light
                  }}
                />
              )}
            </Box>
          </motion.div>
          
          <motion.div variants={itemAnimations}>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body1" color="text.secondary">
                OR
              </Typography>
            </Divider>
          </motion.div>
          
          <motion.div 
            variants={itemAnimations}
            whileHover={hoverAnimation}
            whileTap={tapAnimation}
          >
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body1" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                Don't have an account?
              </Typography>
              <Link
                component={RouterLink}
                to="/register"
                variant="body1"
                sx={{
                  display: 'inline-block',
                  padding: '12px 32px',
                  borderRadius: 14,
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'white',
                  textDecoration: 'none',
                  background: 'linear-gradient(45deg, #f50057 0%, #ff4081 100%)',
                  boxShadow: '0 4px 15px rgba(245, 0, 87, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 25px rgba(245, 0, 87, 0.4)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Create Account
              </Link>
            </Box>
          </motion.div>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default LoginForm;