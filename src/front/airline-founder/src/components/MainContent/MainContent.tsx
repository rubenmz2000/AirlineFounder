import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Aerolinea from '../../pages/Aerolinea';
import Flota from '../../pages/Flota';
import Mercado from '../../pages/Mercado';
import PanelDesarrollador from '../../pages/PanelDesarrollador';
import Dashboard from '../../pages/Dashboard';

function MainContent() {
    return (
        <Box component="main" sx={{ flex: 1, bgcolor: '#0F1117', minHeight: '100vh' }}>
            <Routes>
                <Route path="/" element={<Aerolinea />} />
                <Route path="/fleet" element={<Flota />} />
                <Route path="/market" element={<Mercado />} />
                <Route path="/developer" element={<PanelDesarrollador />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Box>
    );
}

export default MainContent;