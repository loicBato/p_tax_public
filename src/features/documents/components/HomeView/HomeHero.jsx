import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { FaShieldAlt as ShieldCheck } from 'react-icons/fa';

export function HomeHero() {
    return (
        <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Chip
                icon={<ShieldCheck size={13} />}
                label="Consultation officielle"
                size="small"
                sx={{
                    bgcolor: 'primary.main', color: 'white', fontWeight: 'bold',
                    textTransform: 'uppercase', letterSpacing: 1.5, fontSize: '10px', mb: 2,
                    '& .MuiChip-icon': { color: 'inherit' },
                }}
            />
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
                Retrouvez vos{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>Contraventions</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic', maxWidth: 520, mx: 'auto' }}>
                Quelques clics suffisent, choisissez comment vous souhaitez rechercher.
            </Typography>
        </Box>
    );
}
