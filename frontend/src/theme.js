import { createTheme } from '@mui/material/styles';
import '@fontsource/figtree/400.css';
import '@fontsource/figtree/500.css';
import '@fontsource/figtree/600.css';
import '@fontsource/figtree/700.css';

// Material 3 Color Palette (Google-style)
const theme = createTheme({
  typography: {
    fontFamily: '"Figtree", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Figtree", sans-serif',
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Figtree", sans-serif',
      fontWeight: 700,
      fontSize: '1.875rem',
      lineHeight: 1.25,
    },
    h3: {
      fontFamily: '"Figtree", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: '"Figtree", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h5: {
      fontFamily: '"Figtree", sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
    },
    h6: {
      fontFamily: '"Figtree", sans-serif',
      fontWeight: 600,
      fontSize: '0.875rem',
    },
    body1: {
      fontFamily: '"Figtree", sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: '"Figtree", sans-serif',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    button: {
      fontFamily: '"Figtree", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.95rem',
    },
  },
  palette: {
    primary: {
      main: '#1F5E3C',
      light: '#4CAF50',
      dark: '#0D3B1F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0891B2',
      light: '#06B6D4',
      dark: '#0E7490',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#10B981',
      light: '#A7F3D0',
      dark: '#059669',
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#FCA5A5',
      dark: '#DC2626',
    },
    info: {
      main: '#3B82F6',
      light: '#BFDBFE',
      dark: '#1D4ED8',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      disabled: '#D1D5DB',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          borderRadius: '8px',
          padding: '10px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
          },
        },
        contained: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
      defaultProps: {
        disableElevation: false,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            '&:hover fieldset': {
              borderColor: '#1F5E3C',
              borderWidth: '2px',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1F5E3C',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#FFFFFF',
          color: '#1F2937',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: '20px',
          fontSize: '0.85rem',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #E5E7EB',
        },
        indicator: {
          backgroundColor: '#1F5E3C',
          height: '4px',
          borderRadius: '4px 4px 0 0',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '0.95rem',
          '&.Mui-selected': {
            color: '#1F5E3C',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '12px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
