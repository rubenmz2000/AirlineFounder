import { Box } from '@mui/material';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Aerolinea from '../../pages/Aerolinea';
import Flota from '../../pages/Flota';
import Mercado from '../../pages/Mercado';
import PanelDesarrollador from '../../pages/PanelDesarrollador';
import Dashboard from '../../pages/Dashboard';
import FlightMap from '../../pages/FlightMap';
import EmptyPage from '../../components/.temp/EmptyPage';
import {useState} from "react";
// import {useState} from "react";

const ProtectedRoute = ({ isLogged }: { isLogged: boolean }) => {
    return isLogged ? <Outlet /> : <Navigate to="/emptyPage" replace />;
};

function MainContent() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    return (
        <Box component="main" sx={{ flex: 1, bgcolor: '#0F1117', minHeight: '100vh' }}>
            <Routes>
                {/* Ruta pública */}
                <Route
                    path="/emptyPage"
                    element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <EmptyPage />}
                />
                {/* Envoltorio con el componente de arriba */}
                    <Route element={<ProtectedRoute isLogged={isLoggedIn} />}>
                    <Route path="/" element={<Aerolinea />} />
                    <Route path="/fleet" element={<Flota />} />
                    <Route path="/market" element={<Mercado />} />
                    {import.meta.env.DEV && <Route path="/developer" element={<PanelDesarrollador />} />}
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/livemap" element={<FlightMap />} />
                    <Route path="/emptyPage" element={<EmptyPage />} />
                </Route>

                {/* Comodín por si acaso */}
                <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/emptyPage"} replace />} />
            </Routes>
        </Box>
    );
}

export default MainContent;