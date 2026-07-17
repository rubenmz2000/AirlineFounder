import { BrowserRouter } from "react-router-dom";
import './App.css';
import MainContent from './components/MainContent/MainContent.tsx';
import Sidebar from './components/SideBar/SideBar.tsx';
import { CssBaseline, ThemeProvider, Box} from '@mui/material';
import {useState} from "react";
import theme from './theme';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {client} from './FirebaseConfig/firebaseConfig';

function App() {
    const [isLoggedin, setIsLoggedIn] = useState(false);
  return (
      <GoogleOAuthProvider clientId={client.clientId}>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <BrowserRouter>
                  <Box sx={{ display: 'flex' }}>
                      <Sidebar />
                      <MainContent />
                  </Box>
              </BrowserRouter>
          </ThemeProvider>
      </GoogleOAuthProvider>
  )
}

export default App
