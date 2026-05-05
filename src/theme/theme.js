import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#161e54',
            light: '#2a3b9d',
            dark: '#0a0e2a',
        },
        secondary: {
            main: '#ff5151',
        },
        success: {
            main: '#059669',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
        },
        divider: 'rgba(0, 0, 0, 0.06)',
    },
    shape: {
        borderRadius: 4,
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h3: { fontWeight: 800 },
        h4: { fontWeight: 800 },
        h5: { fontWeight: 800 },
        h6: { fontWeight: 800 },
        button: {
            fontWeight: 700,
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                contained: {
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    borderRadius: 4,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                },
            },
        },
    },
});
