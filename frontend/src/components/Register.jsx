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
  Grid,
  CssBaseline,
} from '@mui/material';
import { PersonAdd as RegisterIcon } from '@mui/icons-material';
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

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
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
      const response = await axios.post(`${API_URL}/users/register`, formData);
      setMessageType('success');
      setMessage(`Registration successful! Welcome ${response.data.username}. Redirecting to login...`);
      setTimeout(() => window.location.href = '/login', 2000);
    } catch (error) {
      setMessageType('error');
      setMessage(`Error: ${error.response?.data?.error || 'Registration failed'}`);
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
            <RegisterIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Join Sri-Care
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Create your account
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
              placeholder="Choose a username"
              onChange={handleChange}
              required
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              placeholder="your@email.com"
              onChange={handleChange}
              required
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              placeholder="Strong password"
              onChange={handleChange}
              required
              disabled={loading}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  placeholder="First name"
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  placeholder="Last name"
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Phone"
              name="phoneNumber"
              type="tel"
              placeholder="Your phone number"
              onChange={handleChange}
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
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              Already have an account?{' '}
              <Link
                href="/login"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 700,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </StyledPaper>
      </StyledContainer>
    </>
  );
}
