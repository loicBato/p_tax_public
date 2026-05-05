import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../../../assets/police1.JPG";
import {
    Box,
    Typography,
    Avatar,
    LinearProgress,
    Stack
} from '@mui/material';

export function SplashScreen({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Wait for exit animation
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <Box
                    component={motion.div}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    sx={{
                        fixed: 'inset-0',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        background: 'linear-gradient(160deg, #abbcc9 45%, #161e54 45%)'
                    }}
                >
                    {/* Decorative Pattern overlay */}
                    {/* <Box sx={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.05,
                        pointerEvents: 'none',
                        background: 'radial-gradient(#fff 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }} /> */}

                    <Stack spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 10 }}>
                        <Box
                            component={motion.div}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            {/* Logo Area */}
                            <Box sx={{ position: 'relative', mb: 2, display: 'flex', justifyContent: 'center' }}>
                                <motion.div
                                    initial={{ rotate: -10, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    transition={{ duration: 1.2, ease: "backOut", delay: 0.3 }}
                                >
                                    <Avatar
                                        src={logo}
                                        variant="rounded"
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            mx: 'auto',
                                            borderRadius: 4,
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                            bgcolor: 'white'
                                        }}
                                    />
                                </motion.div>
                                <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'white', opacity: 0.2, filter: 'blur(30px)', transform: 'scale(1.5)', zIndex: -1 }} />
                            </Box>
                        </Box>


                        {/* Text Area */}
                        <Box
                            component={motion.div}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            sx={{ textAlign: 'center' }}
                        >
                            <Typography variant="h4" sx={{ color: 'white', fontWeight: 900, textTransform: 'uppercase', letterSpacing: -2, lineHeight: 1, mb: 1 }}>
                                P-Tax <Box component="span" sx={{ opacity: 0.6 }}>Togo</Box>
                            </Typography>
                            <Typography variant="overline" sx={{ color: 'white', opacity: 0.5, letterSpacing: 5, fontWeight: 700 }}>
                                Portail Numérique Officiel
                            </Typography>
                        </Box>

                        {/* Progress Indicator */}
                        <Box sx={{ mt: 4 }}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <LinearProgress
                                    variant="indeterminate"
                                    sx={{
                                        height: 4,
                                        borderRadius: 2,
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                        '& .MuiLinearProgress-bar': { bgcolor: 'white', opacity: 0.6 }
                                    }}
                                />
                            </motion.div>
                        </Box>
                    </Stack>

                    {/* Bottom attribution */}
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        sx={{ position: 'absolute', bottom: 48, textAlign: 'center' }}
                    >
                        <Typography variant="caption" sx={{ color: 'white', opacity: 0.3, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
                            Ministère de la Sécurité et de la Protection Civile
                        </Typography>
                    </Box>
                </Box>
            )}
        </AnimatePresence>
    );
}
