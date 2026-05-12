import React from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PortalHeader } from './components/PortalHeader';
import { PortalFooter } from './components/PortalFooter';
import { SplashScreen } from './components/SplashScreen';
import { useBlockCopy } from '../../core/hooks/useBlockCopy';
import lionBackground from '../../assets/lion_vector_green.svg';
import { Box } from '@mui/material';

export default function MainLayout() {
    const [showSplash, setShowSplash] = React.useState(true);
    useBlockCopy();

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#F0F4F2', // Fond gris-vert institutionnel très clair
            color: 'text.primary',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflowX: 'hidden'
        }}>
            {/* ── Filigrane Institutionnel (Lion Togo) ── */}
            <Box sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80vh',
                height: '80vh',
                backgroundImage: `url(${lionBackground})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                opacity: 0.03, // Très subtil pour ne pas gêner la lecture
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <SplashScreen onComplete={() => setShowSplash(false)} />

            {!showSplash && (
                <>
                    <PortalHeader />

                    <Box component="main" sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        zIndex: 1, // Au-dessus du filigrane
                        width: '100%'
                    }}>
                        <AnimatePresence mode="wait">
                            <Outlet />
                        </AnimatePresence>
                    </Box>

                    <PortalFooter />
                </>
            )}
        </Box>
    );
}
