import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Link,
  CssBaseline,
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const API_URL = 'http://localhost:8081';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[10],
}));

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(`${API_URL}/users/login`, formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('userId', response.data.userId || response.data.id || '1'); // Store userId too
      setMessageType('success');
      setMessage('Login successful! Redirecting...');
      setTimeout(() => window.location.href = '/dashboard', 2000);
    } catch (error) {
      setMessageType('error');
      setMessage(`Error: ${error.response?.data?.error || 'Login failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <StyledContainer maxWidth="sm">
        <StyledPaper>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <LoginIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Sri-Care
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Telecom Support & Billing System
            </Typography>
          </Box>

          {message && (
            <Alert severity={messageType} sx={{ mb: 3 }}>
              {message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              required
              variant="outlined"
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              variant="outlined"
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 2, py: 1.5, fontWeight: 700 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{' '}
              <Link
                href="/register"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 700,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Register here
              </Link>
            </Typography>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link 
              href="/terms" 
              variant="body2" 
              sx={{ 
                color: 'text.secondary', 
                textDecoration: 'none',
                '&:hover': { color: 'primary.main', textDecoration: 'underline' } 
              }}
            >
              Terms of Service
            </Link>
          </Box>
        </StyledPaper>
      </StyledContainer>
    </>
  );
}
