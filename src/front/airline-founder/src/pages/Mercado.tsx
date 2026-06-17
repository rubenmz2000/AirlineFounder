import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { getAvailableModels } from '../services/marketService';
import { purchaseAircraft } from '../services/fleetService';
import { getCurrentCompany } from '../services/companyService';
import type { AircraftModel } from '../types/market';

function Mercado() {
    const [hasCompany, setHasCompany] = useState(true);
    const [models, setModels] = useState<AircraftModel[]>([]);
    const [statusMessage, setStatusMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        const company = await getCurrentCompany();
        setHasCompany(!!company);
        setModels(await getAvailableModels());
        setLoading(false);
    };

    useEffect(() => { loadData(); }, []);

    const handleBuy = async (modelId: number, name: string) => {
        const company = await getCurrentCompany();
        if (!company) {
            setStatusMessage('No airline found. Create your airline first.');
            setIsSuccess(false);
            return;
        }
        try {
            await purchaseAircraft(modelId);
            setStatusMessage(`${name} purchased successfully! Check your Fleet.`);
            setIsSuccess(true);
        } catch (err: any) {
            setStatusMessage(err.response?.data ?? err.message);
            setIsSuccess(false);
        }
    };

    if (loading) return <Typography>Cargando...</Typography>;

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ color: '#F1F5F9' }}>Aircraft Market</Typography>
                <Typography sx={{ color: '#94A3B8' }}>Purchase aircraft to expand your fleet</Typography>
            </Box>

            {!hasCompany && (
                <Paper sx={{ p: 2.5, mb: 3, border: '1px solid #F59E0B' }}>
                    <Typography sx={{ color: '#F59E0B', fontSize: 14 }}>⚠ Create your airline first before purchasing aircraft.</Typography>
                </Paper>
            )}

            {statusMessage && (
                <Paper sx={{
                    p: '10px 14px', mb: 2.5,
                    bgcolor: isSuccess ? '#0D2318' : '#2D1010',
                    border: `1px solid ${isSuccess ? '#10B981' : '#EF4444'}`,
                }}>
                    <Typography sx={{ color: '#F1F5F9', fontSize: 13 }}>{statusMessage}</Typography>
                </Paper>
            )}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {models.map(m => {
                    const badgeColor = m.manufacturer === 'Boeing' ? '#EF4444' : '#3B82F6';
                    return (
                        <Paper key={m.id} sx={{ width: 290, p: 2.5 }}>
                            <Box sx={{ display: 'inline-block', bgcolor: badgeColor, borderRadius: 1, px: 1, py: 0.5, mb: 1.5 }}>
                                <Typography sx={{ fontSize: 10, fontWeight: 700, color: 'white' }}>{m.manufacturer}</Typography>
                            </Box>

                            <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#F1F5F9' }}>{m.manufacturer} {m.name}</Typography>
                            <Typography sx={{ fontSize: 12, color: '#94A3B8', mb: 2 }}>{m.description}</Typography>

                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontSize: 10, color: '#475569', fontWeight: 700 }}>CAPACITY</Typography>
                                    <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#06B6D4' }}>{m.capacity} pax</Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontSize: 10, color: '#475569', fontWeight: 700 }}>RANGE</Typography>
                                    <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#8B5CF6' }}>{m.rangeKm} km</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ height: '1px', bgcolor: '#1E293B', mb: 1.75 }} />

                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontSize: 10, color: '#475569', fontWeight: 700 }}>PURCHASE</Typography>
                                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#10B981' }}>${m.purchasePrice.toLocaleString()}</Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontSize: 10, color: '#475569', fontWeight: 700 }}>LEASING</Typography>
                                    <Typography sx={{ fontSize: 12, color: '#94A3B8' }}>${m.leasingPricePerMonth.toLocaleString()}/mo</Typography>
                                </Box>
                            </Box>

                            <Button variant="contained" fullWidth onClick={() => handleBuy(m.id, `${m.manufacturer} ${m.name}`)}>
                                Purchase Aircraft
                            </Button>
                        </Paper>
                    );
                })}
            </Box>
        </Box>
    );
}

export default Mercado;