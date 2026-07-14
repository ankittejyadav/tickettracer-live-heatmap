import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#60a5fa',
      light: '#93c5fd',
      dark: '#3b82f6',
    },
    secondary: {
      main: '#f472b6',
    },
    success: {
      main: '#34d399',
    },
    warning: {
      main: '#fbbf24',
    },
    error: {
      main: '#f87171',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    divider: 'rgba(148, 163, 184, 0.1)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.75rem',
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          borderColor: 'rgba(148, 163, 184, 0.1)',
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
