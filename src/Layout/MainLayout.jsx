import React from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PortalHeader } from '../Components/Features/components/PortalHeader';
import { PortalFooter } from '../Components/Features/components/PortalFooter';
import { SplashScreen } from '../Components/Features/components/SplashScreen';

export default function MainLayout() {
    const [showSplash, setShowSplash] = React.useState(true);

    return (
        <div className="min-h-screen bg-app-bg text-text-main font-sans flex flex-col">
            <SplashScreen onComplete={() => setShowSplash(false)} />

            {!showSplash && (
                <>
                    <PortalHeader />

                    <div className="flex-1 flex flex-col relative w-full">
                        <AnimatePresence mode="wait">
                            <Outlet />
                        </AnimatePresence>
                    </div>

                    <PortalFooter />
                </>
            )}
        </div>
    );
}
