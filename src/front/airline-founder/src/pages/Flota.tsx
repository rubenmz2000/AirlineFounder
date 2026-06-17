import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getFleet } from '../services/fleetService';
import { getCurrentCompany } from '../services/companyService';
import type { FleetItem } from '../types/fleet';

const statusColors: Record<string, string> = {
    Parked: '#F59E0B',
    InFlight: '#10B981',
    Maintenance: '#EF4444',
    Retired: '#64748B',
};

function Flota() {
    const [hasCompany, setHasCompany] = useState(true);
    const [fleet, setFleet] = useState<FleetItem[]>([]);
    const [loading, setLoading] = useState(true);

    const loadFleet = async () => {
        setLoading(true);
        const company = await getCurrentCompany();
        if (!company) {
            setHasCompany(false);
            setLoading(false);
            return;
        }
        setHasCompany(true);
        const data = await getFleet();
        setFleet(data ?? []);
        setLoading(false);
    };

    useEffect(() => { loadFleet(); }, []);

    if (loading) return <Typography>Cargando...</Typography>;

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3.5 }}>
                <Box>
                    <Typography variant="h4" sx={{ color: '#F1F5F9' }}>Fleet</Typography>
                    <Typography sx={{ color: '#94A3B8' }}>Your active aircraft fleet</Typography>
                </Box>
                <Button onClick={loadFleet}>↻ Refresh</Button>
            </Box>

            {!hasCompany && (
                <Paper sx={{ p: 2.5, mb: 3, border: '1px solid #F59E0B' }}>
                    <Typography sx={{ color: '#F59E0B', fontSize: 14 }}>⚠ Create your airline first to manage your fleet.</Typography>
                </Paper>
            )}

            {hasCompany && fleet.length === 0 && (
                <Paper sx={{ p: 5, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 48, color: '#2D3748' }}>✈</Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#475569', mt: 1.5 }}>No aircraft in your fleet</Typography>
                    <Typography sx={{ fontSize: 13, color: '#334155', mt: 0.5 }}>Visit the Market to purchase your first aircraft.</Typography>
                </Paper>
            )}

            {hasCompany && fleet.length > 0 && (
                <Paper sx={{ p: 0 }}>
                    <Box sx={{ p: '16px 20px', borderBottom: '1px solid #1E293B' }}>
                        <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#F1F5F9' }}>Aircraft</Typography>
                    </Box>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>REGISTRATION</TableCell>
                                    <TableCell>MODEL</TableCell>
                                    <TableCell>LOCATION</TableCell>
                                    <TableCell>STATUS</TableCell>
                                    <TableCell>FLIGHT HOURS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fleet.map((a, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{a.registration}</TableCell>
                                        <TableCell>{a.modelName}</TableCell>
                                        <TableCell>{a.location}</TableCell>
                                        <TableCell>
                                            <Box sx={{
                                                display: 'inline-block',
                                                bgcolor: `${statusColors[a.status] ?? '#94A3B8'}26`,
                                                color: statusColors[a.status] ?? '#94A3B8',
                                                fontSize: 11, fontWeight: 600, px: 1, py: 0.3, borderRadius: 1,
                                            }}>
                                                {a.status}
                                            </Box>
                                        </TableCell>
                                        <TableCell>{a.flightHours.toFixed(0)} h</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )}
        </Box>
    );
}

export default Flota;