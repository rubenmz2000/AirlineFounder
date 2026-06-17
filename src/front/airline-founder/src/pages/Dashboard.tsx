import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { getDashboard } from '../services/dashboardService';
import type { Dashboard as DashboardData } from '../types/dashboard';

function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);
        setData(await getDashboard());
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    if (loading) return <Typography>Cargando...</Typography>;

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ color: '#F1F5F9' }}>Dashboard</Typography>
                <Typography sx={{ color: '#94A3B8' }}>Overview of your airline operations</Typography>
            </Box>

            {!data && (
                <Paper sx={{ p: 2.5, border: '1px solid #F59E0B' }}>
                    <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#F59E0B', mb: 0.5 }}>No airline found</Typography>
                    <Typography sx={{ color: '#94A3B8' }}>Go to the Airline section to create your company before using the simulator.</Typography>
                </Paper>
            )}

            {data && (
                <>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                        <Paper sx={{ p: 2.25, minWidth: 180, flex: 1 }}>
                            <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#475569', mb: 1.25 }}>AIRLINE</Typography>
                            <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#F1F5F9' }}>{data.companyName}</Typography>
                            <Typography sx={{ fontSize: 12, color: '#3B82F6', mt: 0.5 }}>{data.icaoCode}</Typography>
                        </Paper>
                        <Paper sx={{ p: 2.25, minWidth: 180, flex: 1 }}>
                            <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#475569', mb: 1.25 }}>BALANCE</Typography>
                            <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#10B981' }}>${data.money.toLocaleString()}</Typography>
                            <Typography sx={{ fontSize: 12, color: '#475569', mt: 0.5 }}>Available funds</Typography>
                        </Paper>
                        <Paper sx={{ p: 2.25, minWidth: 180, flex: 1 }}>
                            <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#475569', mb: 1.25 }}>HOME BASE</Typography>
                            <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#F1F5F9' }}>{data.homeBase}</Typography>
                            <Typography sx={{ fontSize: 12, color: '#475569', mt: 0.5 }}>{data.country}</Typography>
                        </Paper>
                        <Paper sx={{ p: 2.25, minWidth: 180, flex: 1 }}>
                            <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#475569', mb: 1.25 }}>FLEET SIZE</Typography>
                            <Typography sx={{ fontSize: 36, fontWeight: 700, color: '#3B82F6' }}>{data.aircraftCount}</Typography>
                            <Typography sx={{ fontSize: 12, color: '#475569' }}>aircraft</Typography>
                        </Paper>
                        <Paper sx={{ p: 2.25, minWidth: 180, flex: 1 }}>
                            <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#475569', mb: 1.25 }}>FLEET VALUE</Typography>
                            <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#8B5CF6' }}>${data.fleetValue.toLocaleString()}</Typography>
                            <Typography sx={{ fontSize: 12, color: '#475569', mt: 0.5 }}>estimated total</Typography>
                        </Paper>
                        <Paper sx={{ p: 2.25, minWidth: 180, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button onClick={load}>Refresh Data</Button>
                        </Paper>
                    </Box>

                    <Paper sx={{ p: 2.5 }}>
                        <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#F1F5F9', mb: 2 }}>Recent Activity</Typography>
                        <Box sx={{ bgcolor: '#161B27', borderRadius: 1, p: 2.5 }}>
                            <Typography sx={{ color: '#475569', fontSize: 13, textAlign: 'center' }}>
                                No recent activity. Purchase an aircraft in the Market to get started.
                            </Typography>
                        </Box>
                    </Paper>
                </>
            )}
        </Box>
    );
}

export default Dashboard;