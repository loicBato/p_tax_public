import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Container,
    Button,
    Stack,
    Chip,
    Avatar,
    useScrollTrigger
} from '@mui/material';
import logo from "../../../assets/police.JPG";

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
        sx: {
            bgcolor: trigger ? 'rgba(255, 255, 255, 0.9)' : 'white',
            backdropFilter: trigger ? 'blur(10px)' : 'none',
            borderBottom: trigger ? 'none' : '1px solid',
            borderColor: 'divider',
            transition: 'all 0.3s'
        }
    });
}

export function PortalHeader(props) {
    return (
        <ElevationScroll {...props}>
            <AppBar position="sticky" color="inherit">
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 0.5, minHeight: { xs: 56, md: 64 } }}>
                        {/* Logo & Title */}
                        <Box
                            component={Link}
                            to="/"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover h1': { color: 'primary.main' },
                                transition: 'all 0.2s'
                            }}
                        >
                            <Avatar
                                src={logo}
                                variant="rounded"
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 1.5,
                                    bgcolor: 'transparent'
                                }}
                            />
                            <Box>
                                <Typography
                                    variant="subtitle1"
                                    component="h1"
                                    sx={{
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: -0.5,
                                        lineHeight: 1,
                                        mb: 0.2,
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    P-Tax Togo
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: 'block',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: 1.5,
                                        color: 'text.secondary',
                                        opacity: 0.8,
                                        fontSize: '8px'
                                    }}
                                >
                                    Ministère de la Sécurité
                                </Typography>
                            </Box>
                        </Box>

                        {/* Navigation */}
                        <Stack direction="row" spacing={3} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    component={Link}
                                    to="/assistance"
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        color: 'text.secondary',
                                        '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
                                    }}
                                >
                                    Assistance
                                </Button>
                                <Button
                                    component={Link}
                                    to="/faq"
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        color: 'text.secondary',
                                        '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
                                    }}
                                >
                                    FAQ
                                </Button>
                            </Stack>

                            <Box sx={{ width: 1, height: 32, bgcolor: 'divider' }} />

                            <Chip
                                label="Portail Public"
                                size="small"
                                sx={{
                                    bgcolor: 'grey.50',
                                    border: '1px solid',
                                    px: 1,
                                    borderRadius: 1.5,
                                    borderColor: 'divider',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: 1.2,
                                    fontSize: '10px',
                                    color: 'text.secondary',
                                    '& .MuiChip-label': { px: 1 },
                                    '&::before': {
                                        content: '""',
                                        width: 8,
                                        height: 8,
                                        bgcolor: 'success.main',
                                        borderRadius: '50%',
                                        mr: 0,
                                        animation: 'pulse 2s infinite'
                                    },
                                    '@keyframes pulse': {
                                        '0%': { opacity: 1, transform: 'scale(1)' },
                                        '50%': { opacity: 0.5, transform: 'scale(1.2)' },
                                        '100%': { opacity: 1, transform: 'scale(1)' }
                                    }
                                }}
                            />
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
        </ElevationScroll>
    );
}
