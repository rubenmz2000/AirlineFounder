import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import { getCurrentCompany, createCompany, updateCompany } from '../services/companyService.ts';
import type { Company } from '../../types/company';

function Aerolinea() {
    const [company, setCompany] = useState<Company | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const [name, setName] = useState('');
    const [icaoCode, setIcaoCode] = useState('');
    const [iataCode, setIataCode] = useState('');
    const [homeBase, setHomeBase] = useState('');
    const [country, setCountry] = useState('');

    const loadCompany = async () => {
        setLoading(true);
        setCompany(await getCurrentCompany());
        setLoading(false);
    };

    useEffect(() => { loadCompany(); }, []);

    const hasCompany = !!company;
    const showForm = !hasCompany || isEditing;

    const handleSave = async () => {
        if (!name.trim()) return setStatusMessage('El nombre de la compañía es obligatorio.');
        if (!icaoCode.trim() || icaoCode.length < 2) return setStatusMessage('El código ICAO debe tener al menos 2 caracteres.');

        setSaving(true);
        setStatusMessage('');
        try {
            if (hasCompany) {
                await updateCompany({ name, icaoCode, iataCode, homeBase, country });
            } else {
                await createCompany({ name, icaoCode, iataCode, homeBase, country });
            }
            setIsEditing(false);
            await loadCompany();
        } catch (err: any) {
            setStatusMessage(`Error: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };

    const FieldLabel = ({ text }: { text: string }) => (
        <Typography sx={{ fontSize: 12, letterSpacing: 1, color: '#94A3B8', mb: 0.5 }}>{text}</Typography>
    );

    if (loading) return <Typography>Cargando...</Typography>;

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ color: '#F1F5F9' }}>Airline</Typography>
                <Typography sx={{ color: '#94A3B8' }}>Manage your airline company profile</Typography>
            </Box>

            {hasCompany && (
                <Paper sx={{ p: 3, mb: 3, maxWidth: 700 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
                        <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#F1F5F9' }}>Company Profile</Typography>
                        {!isEditing && (
                            <Button size="small" onClick={() => setIsEditing(true)}>Edit</Button>
                        )}
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FieldLabel text="COMPANY NAME" />
                            <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#F1F5F9' }}>{company!.name}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <FieldLabel text="COUNTRY" />
                            <Typography sx={{ fontSize: 14, color: '#F1F5F9' }}>{company!.country}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <FieldLabel text="ICAO" />
                            <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#3B82F6' }}>{company!.icaoCode}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <FieldLabel text="IATA" />
                            <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#06B6D4' }}>{company!.iataCode}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <FieldLabel text="HOME BASE" />
                            <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#F1F5F9' }}>{company!.homeBase}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            )}

            {showForm && (
                <Paper sx={{ p: 3, maxWidth: 700 }}>
                    <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#F1F5F9', mb: 2.5 }}>
                        {hasCompany ? 'Edit Airline' : 'Create Airline'}
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                            <FieldLabel text="COMPANY NAME *" />
                            <TextField fullWidth size="small" placeholder="e.g. Iberia Airlines" value={name} onChange={e => setName(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <FieldLabel text="COUNTRY" />
                            <TextField fullWidth size="small" placeholder="e.g. Spain" value={country} onChange={e => setCountry(e.target.value)} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={4}>
                            <FieldLabel text="ICAO CODE *" />
                            <TextField fullWidth size="small" placeholder="e.g. IBE" inputProps={{ maxLength: 4 }} value={icaoCode} onChange={e => setIcaoCode(e.target.value)} />
                        </Grid>
                        <Grid item xs={4}>
                            <FieldLabel text="IATA CODE" />
                            <TextField fullWidth size="small" placeholder="e.g. IB" inputProps={{ maxLength: 3 }} value={iataCode} onChange={e => setIataCode(e.target.value)} />
                        </Grid>
                        <Grid item xs={4}>
                            <FieldLabel text="HOME BASE (ICAO)" />
                            <TextField fullWidth size="small" placeholder="e.g. LEMD" inputProps={{ maxLength: 4 }} value={homeBase} onChange={e => setHomeBase(e.target.value)} />
                        </Grid>
                    </Grid>

                    {statusMessage && (
                        <Typography sx={{ fontSize: 13, color: '#EF4444', mb: 2 }}>{statusMessage}</Typography>
                    )}

                    <Button variant="contained" disabled={saving} onClick={handleSave}>
                        Save Airline
                    </Button>
                </Paper>
            )}
        </Box>
    );
}

export default Aerolinea;