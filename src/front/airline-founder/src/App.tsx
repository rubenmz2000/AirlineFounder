import { BrowserRouter } from "react-router-dom";
import './App.css';
import MainContent from './components/MainContent/MainContent.tsx';
import Sidebar from './components/SideBar/SideBar.tsx';
import { CssBaseline, ThemeProvider, Box} from '@mui/material';
import theme from './theme';

function App() {
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
              <Box sx={{ display: 'flex' }}>
                  <Sidebar />
                  <MainContent />
              </Box>
          </BrowserRouter>
      </ThemeProvider>
  )
}

export default App
