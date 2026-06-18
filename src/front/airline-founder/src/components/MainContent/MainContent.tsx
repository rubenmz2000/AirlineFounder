import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Aerolinea from '../../pages/Aerolinea';
import Flota from '../../pages/Flota';
import Mercado from '../../pages/Mercado';
import PanelDesarrollador from '../../pages/PanelDesarrollador';
import Dashboard from '../../pages/Dashboard';
// import {useState} from "react";

function MainContent() {
    // const [alert, setAlert] = useState({
    //     open: false,
    //     message: '',
    //     severity: 'success'
    // });
    //
    // const triggerAlert = ( severity = 'success', message = 'Success.') => {
    //     setAlert({
    //         open: true,
    //         message: message,
    //         severity: severity
    //     });
    // }
    //
    // const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    //     if (reason === 'clickaway') return;
    //     console.log(event);
    //     setAlert(prev => ({ ...prev, open: false }));
    // }
    
    return (
        <Box component="main" sx={{ flex: 1, bgcolor: '#0F1117', minHeight: '100vh' }}>
            <Routes>
                <Route path="/" element={<Aerolinea />} />
                <Route path="/fleet" element={<Flota />} />
                <Route path="/market" element={<Mercado />} />
                <Route path="/developer" element={<PanelDesarrollador />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>


            {/*<Snackbar className={"alert"} open={alert.open} autoHideDuration={4000} onClose={handleCloseAlert}>*/}
            {/*    <Alert severity={alert.severity as AlertColor} variant={"filled"}>{alert.message}</Alert>*/}
            {/*</Snackbar>*/}
        </Box>
    );
}

export default MainContent;