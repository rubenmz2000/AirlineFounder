import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0F1117',
            paper: '#1E2535',
        },
        primary: { main: '#3B82F6' },
        secondary: { main: '#06B6D4' },
        success: { main: '#10B981' },
        warning: { main: '#F59E0B' },
        error: { main: '#EF4444' },
        text: {
            primary: '#F1F5F9',
            secondary: '#94A3B8',
        },
    },
});

export default theme;