import React from 'react';
import { Container, Typography, Paper, Box, Button, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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

export default function Terms() {
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      <StyledContainer maxWidth="md">
        <StyledPaper>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            Terms of Service
          </Typography>
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>1. Introduction</Typography>
            <Typography variant="body1" paragraph color="textSecondary">
              Welcome to Sri-Care. These terms and conditions outline the rules and regulations for the use of our Telecom Support & Billing System.
            </Typography>

            <Typography variant="h6" gutterBottom>2. User Accounts</Typography>
            <Typography variant="body1" paragraph color="textSecondary">
              To access certain features of the platform, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials.
            </Typography>

            <Typography variant="h6" gutterBottom>3. Billing & Payments</Typography>
            <Typography variant="body1" paragraph color="textSecondary">
              All billing information provided must be accurate. Payments for services are processed securely. Any disputes regarding billing must be reported within 30 days.
            </Typography>
          </Box>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" size="large" onClick={() => navigate('/login')}>
              Back to Login
            </Button>
          </Box>
        </StyledPaper>
      </StyledContainer>
    </>
  );
}
