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
import { Link } from 'react-router-dom';

export function PortalFooter() {
    return (
        <Box component="footer" sx={{ py: 4, bgcolor: 'white', borderTop: '1px solid', borderColor: 'divider', mt: 'auto' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    {/* Logo & Title */}
                    <Stack direction="row" spacing={0.5} sx={{ mb: 2, alignItems: 'center' }}>
                        <Avatar src={logo} sx={{ width: 38, height: 38 }} />
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800, textTransform: 'uppercase', lineHeight: 1 }}>
                                P-Tax Togo
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 500, opacity: 0.8 }}>
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

                    {/* Quick Links */}
                    <Stack
                        direction="row"
                        spacing={3}
                        sx={{
                            mb: 3,
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            '& a': {
                                textDecoration: 'none',
                                color: 'text.secondary',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                transition: 'color 0.2s',
                                '&:hover': { color: 'primary.main' }
                            }
                        }}
                    >
                        <Link to="/">Accueil</Link>
                        <Link to="/assistance">Assistance</Link>
                        <Link to="/faq">FAQ</Link>
                    </Stack>

                    <Divider sx={{ width: '100%', mb: 3, opacity: 0.5 }} />

                    {/* Copyright */}
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, opacity: 0.6 }}>
                        Copyright Cognitive Factory © {new Date().getFullYear()}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
