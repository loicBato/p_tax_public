import React from 'react';
import { Box, Typography, IconButton, SwipeableDrawer } from '@mui/material';
import { IoClose } from 'react-icons/io5';

export function SearchDrawer({ open, mode, onClose, children }) {
    return (
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            onOpen={() => { }}
            disableSwipeToOpen
            sx={{
                '& .MuiPaper-root': {
                    height: '60vh',
                    borderRadius: '20px 20px 0 0',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <Box sx={{ px: 3, pt: 0, pb: 5, flex: 1 }}>
                {/* Handle */}
                <Box sx={{ width: 40, height: 4, bgcolor: 'grey.300', borderRadius: 2, mx: 'auto', mb: 2.5, mt: 1.5 }} />
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: '0.95rem' }}>
                        {mode === 'ref' ? 'Recherche par référence' : 'Recherche avancée'}
                    </Typography>
                    <IconButton size="small" onClick={onClose} sx={{ color: 'text.secondary' }}>
                        <IoClose fontSize="18px" />
                    </IconButton>
                </Box>
                {/* Contenu injecté */}
                {children}
            </Box>
        </SwipeableDrawer>
    );
}
