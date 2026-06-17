import { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, MenuItem, Select } from '@mui/material';
import { addMoney, subtractMoney, addFreeAircraft, resetDatabase } from '../services/developerService';
import { getAvailableModels } from '../services/marketService';
import type { AircraftModel } from '../types/market';

function PanelDesarrollador() {
    const [addAmount, setAddAmount] = useState('');
    const [subtractAmount, setSubtractAmount] = useState('');
    const [models, setModels] = useState<AircraftModel[]>([]);
    const [selectedModelId, setSelectedModelId] = useState<number | ''>('');
    const [statusMessage, setStatusMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => { getAvailableModels().then(setModels); }, []);

    const run = async (action: () => Promise<void>, successMsg: string) => {
        try {
            await action();
            setStatusMessage(successMsg);
            setIsSuccess(true);
        } catch (err: any) {
            setStatusMessage(err.response?.data ?? err.message);
            setIsSuccess(false);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ color: '#F1F5F9' }}>Developer Panel</Typography>
                <Typography sx={{ color: '#94A3B8' }}>Testing and debug tools — not available in production</Typography>
            </Box>

            <Paper sx={{ p: '10px 14px', mb: 3, maxWidth: 680, bgcolor: '#1C1208', border: '1px solid #F59E0B' }}>
                <Typography sx={{ color: '#F59E0B', fontSize: 13 }}>Developer Mode Active — These actions directly affect game state.</Typography>
            </Paper>

            {statusMessage && (
                <Paper sx={{
                    p: '10px 14px', mb: 3, maxWidth: 680,
                    bgcolor: isSuccess ? '#0D2318' : '#2D1010',
                    border: `1px solid ${isSuccess ? '#10B981' : '#EF4444'}`,
                }}>
                    <Typography sx={{ color: '#F1F5F9', fontSize: 13 }}>{statusMessage}</Typography>
                </Paper>
            )}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, maxWidth: 680 }}>
                <Paper sx={{ p: 2.5, flex: '1 1 300px' }}>
                    <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#10B981', mb: 1.5 }}>ADD MONEY</Typography>
                    <Typography sx={{ fontSize: 12, color: '#94A3B8', mb: 0.5 }}>AMOUNT ($)</Typography>
                    <TextField fullWidth size="small" value={addAmount} onChange={e => setAddAmount(e.target.value)} sx={{ mb: 1.5 }} />
                    <Button variant="contained" color="success" fullWidth onClick={() => run(() => addMoney(Number(addAmount)), 'Money added successfully.')}>Add Money</Button>
                </Paper>

                <Paper sx={{ p: 2.5, flex: '1 1 300px' }}>
                    <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#EF4444', mb: 1.5 }}>SUBTRACT MONEY</Typography>
                    <Typography sx={{ fontSize: 12, color: '#94A3B8', mb: 0.5 }}>AMOUNT ($)</Typography>
                    <TextField fullWidth size="small" value={subtractAmount} onChange={e => setSubtractAmount(e.target.value)} sx={{ mb: 1.5 }} />
                    <Button variant="contained" color="error" fullWidth onClick={() => run(() => subtractMoney(Number(subtractAmount)), 'Money subtracted successfully.')}>Subtract Money</Button>
                </Paper>

                <Paper sx={{ p: 2.5, flex: '1 1 300px' }}>
                    <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#8B5CF6', mb: 1.5 }}>FREE AIRCRAFT</Typography>
                    <Typography sx={{ fontSize: 12, color: '#94A3B8', mb: 0.5 }}>SELECT MODEL</Typography>
                    <Select fullWidth size="small" value={selectedModelId} onChange={e => setSelectedModelId(e.target.value as number)} sx={{ mb: 1.5 }}>
                        {models.map(m => <MenuItem key={m.id} value={m.id}>{m.manufacturer} {m.name}</MenuItem>)}
                    </Select>
                    <Button variant="contained" fullWidth sx={{ bgcolor: '#8B5CF6' }} disabled={!selectedModelId} onClick={() => run(() => addFreeAircraft(Number(selectedModelId)), 'Free aircraft added successfully.')}>Add Free Aircraft</Button>
                </Paper>

                <Paper sx={{ p: 2.5, flex: '1 1 300px' }}>
                    <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#EF4444', mb: 1.5 }}>DATABASE</Typography>
                    <Typography sx={{ fontSize: 12, color: '#94A3B8', mb: 1.5 }}>Completely wipes all game data. This action cannot be undone.</Typography>
                    <Button variant="contained" color="error" fullWidth onClick={() => run(resetDatabase, 'Database reset successfully.')}>Reset Database</Button>
                </Paper>
            </Box>
        </Box>
    );
}

export default PanelDesarrollador;