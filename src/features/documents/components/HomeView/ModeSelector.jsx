import React from 'react';
import {
    Box, Typography, Card, CardActionArea, CardContent, CircularProgress,
} from '@mui/material';
import { MODES } from './svgs';

export function ModeSelector({ mode, ocr, onSelectMode }) {
    return (
        <Box>
            <Typography variant="overline" sx={{
                fontWeight: 800, color: 'text.secondary', display: 'block',
                mb: 1.5, letterSpacing: 1.2, fontSize: '0.65rem',
            }}>
                Comment souhaitez-vous rechercher ?
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {MODES.map((m) => {
                    const isSelected = mode === m.val;
                    return (
                        <Box
                            key={m.val}
                            sx={{
                                display: m.mobileOnly ? { xs: 'flex', md: 'none' } : 'flex',
                                flex: m.val === 'scan'
                                    ? '1 1 100%'
                                    : { xs: '1 1 100%', sm: '1 1 calc(50% - 6px)' },
                            }}
                        >
                            <Card
                                variant="outlined"
                                sx={{
                                    width: '100%', borderRadius: 3, transition: 'all 0.2s',
                                    borderColor: isSelected ? 'primary.main' : 'divider',
                                    borderWidth: isSelected ? 2 : 1,
                                    bgcolor: isSelected ? 'primary.main' : m.color,
                                    boxShadow: isSelected ? '0 4px 16px rgba(37,99,235,0.25)' : 'none',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        boxShadow: '0 4px 16px rgba(37,99,235,0.15)',
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                <CardActionArea
                                    onClick={() => m.val === 'scan' ? ocr.openCapture() : onSelectMode(m.val)}
                                    sx={{ p: 0 }}
                                >
                                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
                                        <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0.5 }}>
                                            {ocr.isProcessing && m.val === 'scan'
                                                ? <CircularProgress size={32} color={isSelected ? 'inherit' : 'primary'} />
                                                : <m.Img selected={isSelected} />
                                            }
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.82rem', lineHeight: 1.25, color: isSelected ? 'white' : 'text.primary' }}>
                                                {m.label}
                                            </Typography>
                                            <Typography variant="caption" sx={{ fontSize: '0.7rem', lineHeight: 1.4, color: isSelected ? 'rgba(255,255,255,0.85)' : 'text.secondary', display: 'block', mt: 0.25 }}>
                                                {m.sub}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}
