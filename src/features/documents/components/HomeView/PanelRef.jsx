import React from 'react';
import {
    Box, Typography, TextField, Button, InputAdornment, CircularProgress,
} from '@mui/material';
import { FiSearch as Search } from 'react-icons/fi';

export function PanelRef({ reference, setReference, isSearching, onSubmit }) {
    return (
        <Box>
            <Typography variant="overline" sx={{
                fontWeight: 800, color: 'text.secondary', letterSpacing: 1.2,
                fontSize: '0.65rem', display: 'block', mb: 1.5,
            }}>
                Trouvez votre numéro sur le document
            </Typography>

            {/* Formulaire de recherche */}
            <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, mb: 2 }}>
                <TextField
                    fullWidth
                    placeholder="WRxxxxxxxxx ou PYxxxxxxxxx"
                    size="medium"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    variant="outlined"
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start"><Search size={16} color="#666" /></InputAdornment>,
                            sx: { borderRadius: 2, bgcolor: 'grey.50' },
                        }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isSearching || !reference.trim()}
                    sx={{ borderRadius: 2, px: 3, py: 2, fontSize: '0.85rem', boxShadow: 0, whiteSpace: 'nowrap' }}
                >
                    {isSearching ? <CircularProgress size={18} color="inherit" /> : 'Rechercher'}
                </Button>
            </Box>

            {/* Info : où trouver le numéro */}
            <Box sx={{
                mt: 2, p: 1.5, borderRadius: 2,
                bgcolor: 'grey.50', border: '1px dashed', borderColor: 'grey.300',
                display: 'flex', alignItems: 'flex-start', gap: 2,
            }}>
                {/* Mini doc SVG annoté */}
                <Box sx={{ flexShrink: 0 }}>
                    <svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 52, height: 65 }}>
                        <rect x="2" y="2" width="60" height="76" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
                        <rect x="8" y="14" width="30" height="2.5" rx="1" fill="#cbd5e1" />
                        <rect x="8" y="20" width="22" height="2" rx="1" fill="#e2e8f0" />
                        <rect x="8" y="25" width="28" height="2" rx="1" fill="#e2e8f0" />
                        <rect x="8" y="30" width="18" height="2" rx="1" fill="#e2e8f0" />
                        <rect x="8" y="38" width="48" height="2" rx="1" fill="#e2e8f0" />
                        <rect x="8" y="43" width="40" height="2" rx="1" fill="#e2e8f0" />
                        <rect x="8" y="48" width="44" height="2" rx="1" fill="#e2e8f0" />
                        {/* Numéro surligné en haut à droite */}
                        <rect x="34" y="8" width="24" height="8" rx="2" fill="#fef9c3" stroke="#fbbf24" strokeWidth="1" />
                        <text x="36" y="14.5" fontSize="4.5" fill="#92400e" fontWeight="bold" fontFamily="monospace">WR 00123</text>
                        {/* Flèche */}
                        <path d="M28 22 Q28 10 33 12" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none" markerEnd="url(#arrow-ref)" />
                        <defs>
                            <marker id="arrow-ref" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                                <path d="M0,0 L4,2 L0,4 Z" fill="#f59e0b" />
                            </marker>
                        </defs>
                    </svg>
                </Box>
                {/* Texte */}
                <Box sx={{ flex: 1, pt: 0.25 }}>
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: 'text.primary', mb: 0.75 }}>
                        Situé en haut du récépissé ou du procès-verbal
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#16a34a', flexShrink: 0 }} />
                            <Typography sx={{ fontSize: '0.67rem', color: 'text.secondary' }}>
                                Récépissé :{' '}
                                <Box component="span" sx={{ fontFamily: 'monospace', fontWeight: 800, color: '#16a34a' }}>WRxxxxxxxxxx</Box>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#d97706', flexShrink: 0 }} />
                            <Typography sx={{ fontSize: '0.67rem', color: 'text.secondary' }}>
                                Procès-verbal :{' '}
                                <Box component="span" sx={{ fontFamily: 'monospace', fontWeight: 800, color: '#d97706' }}>PYxxxxxxxxxx</Box>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
