import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header.tsx';
import MainContent from './components/MainContent/MainContent.tsx';
import Sidebar from './components/SideBar/SideBar.tsx';
import Footer from './rmz-ui/components/Footer.tsx';
import Aerolinea from './pages/Aerolinea.tsx';
import {Alert, CssBaseline, Snackbar, ThemeProvider, Box} from '@mui/material';
import theme from './theme';

function App() {
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    
    const triggerAlert = (message, severity = 'success') => {
        setAlert({
            open: true,
            message: message,
            severity: severity
        });
    }
    
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setAlert(prev => ({ ...prev, open: false }));
    }
    
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
              <Box sx={{ display: 'flex' }}>
                  <Sidebar />
                  <MainContent />
              </Box>
              <Snackbar className={"alert"} open={alert.open} autoHideDuration={4000} onClose={handleCloseAlert}>
                  <Alert severity={alert.severity} variant={"filled"}>{alert.message}</Alert>
              </Snackbar>
          </BrowserRouter>
      </ThemeProvider>
  )
}

export default App
