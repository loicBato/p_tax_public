import React, { useState } from 'react';
import {
    Box, Typography, Button, TextField, Stepper, Step, StepLabel,
    InputAdornment, CircularProgress, Stack, Chip,
} from '@mui/material';
import { FiSearch as Search, FiChevronLeft as ChevronLeft } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { ENGINS, DOCS, PlaqueSVG } from './svgs';

export function PanelAdv({ engin, setEngin, docType, setDocType, searchTerm, setSearchTerm, isSearching, onSubmit }) {
    const [advStep, setAdvStep] = useState(1);

    const handleSelectEngin = (val) => {
        setEngin(val);
        setTimeout(() => setAdvStep(2), 160);
    };

    const handleSelectDoc = (val) => {
        setDocType(val);
        setTimeout(() => setAdvStep(3), 160);
    };

    const goBack = (to) => {
        if (to === 1) { setEngin(null); setDocType(null); }
        if (to === 2) { setDocType(null); }
        setAdvStep(to);
    };

    return (
        <Box>
            <Stepper activeStep={advStep - 1} alternativeLabel sx={{ mb: 3 }}>
                {['Engin', 'Document', 'Critère'].map((label) => (
                    <Step key={label}><StepLabel>{label}</StepLabel></Step>
                ))}
            </Stepper>

            <Box sx={{ minHeight: 220 }}>
                <AnimatePresence mode="wait">

                    {advStep === 1 && (
                        <motion.div key="a1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 800, color: 'text.secondary', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: 1 }}>
                                Quel type de véhicule ?
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 1.5 }}>
                                {ENGINS.map((e) => {
                                    const isSel = engin === e.val;
                                    return (
                                        <Box
                                            key={e.val}
                                            onClick={() => handleSelectEngin(e.val)}
                                            sx={{
                                                borderRadius: 3, border: '1.5px solid',
                                                borderColor: isSel ? 'primary.main' : 'divider',
                                                bgcolor: isSel ? 'primary.main' : 'background.paper',
                                                cursor: 'pointer', p: 1.5,
                                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75,
                                                transition: 'all 0.18s',
                                                boxShadow: isSel ? '0 4px 16px rgba(37,99,235,0.25)' : 'none',
                                                '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(37,99,235,0.15)' },
                                            }}
                                        >
                                            <e.Img selected={isSel} />
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: isSel ? 'white' : 'text.primary', fontSize: '0.72rem', textAlign: 'center', lineHeight: 1.2 }}>
                                                {e.label}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: isSel ? 'rgba(255,255,255,0.75)' : 'text.secondary', fontSize: '0.65rem', textAlign: 'center' }}>
                                                {e.sub}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </motion.div>
                    )}

                    {advStep === 2 && (
                        <motion.div key="a2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 800, color: 'text.secondary', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: 1 }}>
                                Quel document avez-vous ?
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                {DOCS.map((d) => {
                                    const isSel = docType === d.val;
                                    return (
                                        <Box
                                            key={d.val}
                                            onClick={() => handleSelectDoc(d.val)}
                                            sx={{
                                                flex: 1, borderRadius: 3, border: '1.5px solid',
                                                borderColor: isSel ? 'primary.main' : 'divider',
                                                bgcolor: isSel ? 'primary.main' : 'background.paper',
                                                cursor: 'pointer', p: 1,
                                                display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1,
                                                transition: 'all 0.18s',
                                                boxShadow: isSel ? '0 4px 16px rgba(37,99,235,0.25)' : 'none',
                                                '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(37,99,235,0.15)' },
                                            }}
                                        >
                                            <d.Img selected={isSel} />
                                            <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 1, justifyContent: 'center', }}>

                                                <Typography variant="body2" sx={{ fontWeight: 800, color: isSel ? 'white' : 'text.primary' }}>
                                                    {d.label}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: isSel ? 'rgba(255,255,255,0.8)' : 'text.secondary', textAlign: 'start', fontSize: '0.7rem', lineHeight: 1.4 }}>
                                                    {d.sub}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    );
                                })}
                            </Stack>
                            <Button startIcon={<ChevronLeft />} onClick={() => goBack(1)} sx={{ mt: 2, textTransform: 'none', color: 'text.secondary', fontSize: '0.75rem' }}>
                                Retour
                            </Button>
                        </motion.div>
                    )}

                    {advStep === 3 && (
                        <motion.div key="a3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                <Chip label={ENGINS.find(e => e.val === engin)?.label} size="small" color="success" variant="outlined" />
                                <Chip label={DOCS.find(d => d.val === docType)?.label} size="small" color="success" variant="outlined" />
                            </Stack>
                            <Box sx={{ mb: 2, p: 1.5, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2 }}>
                                <PlaqueSVG selected={false} />
                                <Box>
                                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.8, mb: 0.25 }}>
                                        Exemple de plaque
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 800, color: 'primary.main' }}>
                                        AZ 1234 TG
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.67rem', color: 'text.secondary' }}>
                                        ou le numéro de châssis à 17 caractères
                                    </Typography>
                                </Box>
                            </Box>
                            <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5 }}>
                                <TextField
                                    fullWidth
                                    placeholder="Plaque (AZ 1234) ou châssis (17 car.)"
                                    size="small"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Search size={16} color="#666" /></InputAdornment>,
                                        sx: { borderRadius: 2, bgcolor: 'grey.50' },
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSearching || !searchTerm.trim()}
                                    sx={{ borderRadius: 2, px: 3, py: 1, fontSize: '0.85rem', textTransform: 'none', boxShadow: 0, whiteSpace: 'nowrap' }}
                                >
                                    {isSearching ? <CircularProgress size={20} color="inherit" /> : 'Rechercher'}
                                </Button>
                            </Box>
                            <Button startIcon={<ChevronLeft />} onClick={() => goBack(2)} sx={{ mt: 1.5, textTransform: 'none', color: 'text.secondary', fontSize: '0.75rem' }}>
                                Retour
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </Box>
    );
}
