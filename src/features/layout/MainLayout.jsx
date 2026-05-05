import React from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PortalHeader } from './components/PortalHeader';
import { PortalFooter } from './components/PortalFooter';
import { SplashScreen } from './components/SplashScreen';
import { useBlockCopy } from '../../core/hooks/useBlockCopy';
import { Box } from '@mui/material';

export default function MainLayout() {
    const [showSplash, setShowSplash] = React.useState(true);
    useBlockCopy();

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', color: 'text.primary', display: 'flex', flexDirection: 'column' }}>
            <SplashScreen onComplete={() => setShowSplash(false)} />

            {!showSplash && (
                <>
                    <PortalHeader />

                    <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', width: '100%' }}>
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
