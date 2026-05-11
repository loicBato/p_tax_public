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
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useScrollTrigger
} from '@mui/material';
import { FiMenu, FiX, FiHelpCircle, FiMessageCircle, FiHome, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../../auth/context/AuthContext';
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
    const { user, isAuthenticated, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = [
        { label: 'Accueil', path: '/', icon: <FiHome size={20} /> },
        { label: 'Assistance', path: '/assistance', icon: <FiMessageCircle size={20} /> },
        { label: 'FAQ', path: '/faq', icon: <FiHelpCircle size={20} /> },
    ];

    const drawer = (
        <Box sx={{ width: 280, p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: -0.5 }}>
                    Menu
                </Typography>
                <IconButton onClick={handleDrawerToggle} color="inherit">
                    <FiX />
                </IconButton>
            </Box>

            <List disablePadding>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            onClick={handleDrawerToggle}
                            sx={{
                                borderRadius: 3,
                                py: 1.5,
                                '&:hover': { bgcolor: 'primary.50', color: 'primary.main' },
                                transition: 'all 0.2s'
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                slotProps={{
                                    primary: {
                                        sx: { fontWeight: 700, fontSize: '0.95rem' }
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
                {isAuthenticated && (
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => { logout(); handleDrawerToggle(); }}
                            sx={{
                                borderRadius: 3,
                                py: 1.5,
                                color: 'error.main',
                                '&:hover': { bgcolor: 'error.50' },
                                transition: 'all 0.2s'
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                                <FiLogOut size={20} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Déconnexion"
                                slotProps={{
                                    primary: {
                                        sx: { fontWeight: 700, fontSize: '0.95rem' }
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>

            <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                {isAuthenticated && user && (
                    <Box sx={{ mb: 3, textAlign: 'left', p: 2, bgcolor: 'grey.50', borderRadius: 3 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                            Connecté en tant que
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, mt: 0.5 }}>
                            {user.name}
                        </Typography>
                    </Box>
                )}
                <Chip
                    label="Portail Public"
                    size="small"
                    sx={{
                        fontWeight: 800,
                        borderRadius: 1.5,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        fontSize: '10px',
                        bgcolor: 'grey.100'
                    }}
                />
            </Box>
        </Box>
    );

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
                                gap: 0.5,
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
                                    width: 40,
                                    height: 40,
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

                        {/* Navigation Desktop */}
                        <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                            <Stack direction="row" spacing={2}>
                                {navItems.slice(1).map((item) => (
                                    <Button
                                        key={item.label}
                                        component={Link}
                                        to={item.path}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            color: 'text.secondary',
                                            '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </Stack>

                            {/* <Box sx={{ width: 1, height: 32, bgcolor: 'divider', mx: 1 }} /> */}

                            {isAuthenticated && user ? (
                                <Stack direction="row" spacing={2} alignItems="center">
                                    {/* <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, color: 'text.secondary', lineHeight: 1 }}>
                                            Citoyen
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 800 }}>
                                            {user.name}
                                        </Typography>
                                    </Box> */}
                                    {/* <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: '0.7rem', fontWeight: 700 }}>
                                        {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                    </Avatar> */}
                                    <IconButton onClick={logout} size="small" color="error" sx={{ ml: 1 }} title="Déconnexion">
                                        <FiLogOut size={18} />
                                    </IconButton>
                                </Stack>
                            ) : (
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
                            )}
                        </Stack>

                        {/* Navigation Mobile (Hamburger) */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ display: { md: 'none' }, ml: 1 }}
                        >
                            <FiMenu />
                        </IconButton>

                        <Drawer
                            anchor="left"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{ keepMounted: true }}
                            slotProps={{
                                paper: {
                                    sx: {
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10,
                                        boxShadow: '10px 0 30px rgba(0,0,0,0.1)'
                                    }
                                }
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Toolbar>
                </Container>
            </AppBar>
        </ElevationScroll>
    );
}
