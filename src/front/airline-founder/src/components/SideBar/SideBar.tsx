import {Avatar, Box, Button, Typography} from '@mui/material';
import { NavLink } from 'react-router-dom';
import Login from './Login/Login.tsx';
import { useState } from 'react';
import './sidebar.css'
import {useGoogleLogin} from '@react-oauth/google'

const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'block',
    padding: '10px 16px',
    margin: '2px 8px',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    textDecoration: 'none',
    color: isActive ? '#3B82F6' : '#94A3B8',
    background: isActive ? '#1E3A5F' : 'transparent',
});

function Sidebar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginConGoogle = useGoogleLogin({
        flow: 'auth-code', // Esto asegura el flujo limpio para obtener el código/token
        onSuccess: (tokenResponse) => {
            console.log('¡Logueado con éxito en Google! ✈️');
            // Aquí capturas el token para mandarlo a tu API de .NET 10
            console.log('Datos del token:', tokenResponse);
            console.log('Token para pedir datos:', tokenResponse.code);

            // Aquí activarías el estado para desbloquear lo que necesites
        },
        onError: () => {
            console.error('Error al abrir la ventana de inicio de sesión de Google ❌');
        }
    });
    
    const handleGoogleLogin = () => {
        loginConGoogle();
    }
    return (
        <Box sx={{ width: 240, bgcolor: '#13181F', borderRight: '1px solid #1E293B', display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Box sx={{ p: '20px 20px 20px', borderBottom: '1px solid #1E293B' }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#F1F5F9' }}>AIRLINE</Typography>
                <Typography sx={{ fontSize: 11, color: '#3B82F6' }}>FOUNDER</Typography>
            </Box>

            <Box sx={{ flex: 1, mt: 1.5 }}>
                {isLoggedIn && (<>
                    <Typography
                        sx={{fontSize: 10, fontWeight: 700, color: '#475569', m: '8px 20px 4px'}}>MAIN</Typography>
                    <NavLink to="/dashboard" style={navLinkStyle}>Dashboard</NavLink>
                    <NavLink to="/livemap" style={navLinkStyle}>Flight Map</NavLink>
                    <NavLink to="/" style={navLinkStyle}>Airline</NavLink>
                    <NavLink to="/fleet" style={navLinkStyle}>Fleet</NavLink>
                    <NavLink to="/market" style={navLinkStyle}>Market</NavLink>

                    {import.meta.env.DEV && (
                        <>
                            <Typography sx={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: '#475569',
                                m: '16px 20px 4px'
                            }}>TOOLS</Typography>
                            <NavLink to="/developer" style={navLinkStyle}>Developer Panel</NavLink>
                        </>
                    )}
                </>)}
            </Box>
            
            <Box sx={{ p: '12px 20px', borderTop: '1px solid #1E293B' }}>
                <div className={'user-info-container'}>
                    {isLoggedIn ? (
                        <>
                            <Avatar/>
                            <Typography sx={{fontSize: 13}}>Pepito el de los palotes</Typography>
                        </>
                    ) : (
                        <Button
                        onClick={handleGoogleLogin}
                        variant={"contained"}
                        fullWidth
                        startIcon={
                            <img
                                src="http://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                alt="Google logo"
                                style={{ width: 16, height: 16, display: 'block'}}
                            />
                        }
                        sx={{
                            bgcolor: '#FFFFFF',
                            color: '#1F2937',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: 12,
                            borderRadius: 1.5,
                            padding: '6px 12px',
                            border: '1px solid #E5E7EB',
                            boxShadow: 'none',
                            '&:hover': {
                                bgcolor: '#F3F4F6',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05',
                            }
                        }}
                        >Sign in with google</Button>
                    )}
                </div>
            </Box>

            <Box sx={{ p: '12px 20px', borderTop: '1px solid #1E293B' }}>
                <Typography sx={{ fontSize: 11, color: '#475569' }}>v{__APP_VERSION__}</Typography>
                <Typography sx={{ fontSize: 11, color: '#475569' }}>© RMZ Softwares 2026</Typography>
            </Box>
        </Box>
    );
}

export default Sidebar;