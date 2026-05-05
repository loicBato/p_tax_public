import React from 'react';
import logo from "../../../assets/police.JPG";
import {
    Box,
    Typography,
    Container,
    Paper,
    Avatar,
    Stack,
    Divider
} from '@mui/material';

export function PortalFooter() {
    return (
        <Box component="footer" sx={{ py: 4, bgcolor: 'white', borderTop: '1px solid', borderColor: 'divider', mt: 'auto' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    {/* Logo & Title */}
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                        <Avatar src={logo} sx={{ width: 32, height: 32 }} />
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800, textTransform: 'uppercase', lineHeight: 1 }}>
                                P-Tax Togo
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700, opacity: 0.8 }}>
                                Portail Public Numérique
                            </Typography>
                        </Box>
                    </Stack>

                    {/* Quote */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            maxWidth: 500,
                            bgcolor: 'grey.50',
                            borderRadius: 1.5,
                            border: '1px solid',
                            borderColor: 'divider',
                            mb: 2
                        }}
                    >
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', lineHeight: 1.6, opacity: 0.9 }}>
                            "La sécurité est un devoir partagé. Ce portail s'inscrit dans la modernisation des services du Ministère de la Sécurité et de la Protection Civile, pour plus de transparence et de proximité avec le citoyen."
                        </Typography>
                    </Paper>

                    {/* Copyright */}
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, opacity: 0.6 }}>
                        Copyright Cognitive Factory © {new Date().getFullYear()}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
