import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

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
    return (
        <Box sx={{ width: 240, bgcolor: '#13181F', borderRight: '1px solid #1E293B', display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Box sx={{ p: '20px 20px 20px', borderBottom: '1px solid #1E293B' }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#F1F5F9' }}>AIRLINE</Typography>
                <Typography sx={{ fontSize: 11, color: '#3B82F6' }}>FOUNDER</Typography>
            </Box>

            <Box sx={{ flex: 1, mt: 1.5 }}>
                <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#475569', m: '8px 20px 4px' }}>MAIN</Typography>
                <NavLink to="/dashboard" style={navLinkStyle}>Dashboard</NavLink>
                <NavLink to="/" style={navLinkStyle}>Airline</NavLink>
                <NavLink to="/fleet" style={navLinkStyle}>Fleet</NavLink>
                <NavLink to="/market" style={navLinkStyle}>Market</NavLink>

                <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#475569', m: '16px 20px 4px' }}>TOOLS</Typography>
                <NavLink to="/developer" style={navLinkStyle}>Developer Panel</NavLink>
            </Box>

            <Box sx={{ p: '12px 20px', borderTop: '1px solid #1E293B' }}>
                <Typography sx={{ fontSize: 11, color: '#475569' }}>v0.1.0 — Alpha</Typography>
                <Typography sx={{ fontSize: 11, color: '#475569' }}>© RMZ Softwares 2026</Typography>
            </Box>
        </Box>
    );
}

export default Sidebar;