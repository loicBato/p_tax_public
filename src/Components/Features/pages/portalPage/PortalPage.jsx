import React from 'react';
import { FiShield as Shield } from 'react-icons/fi';
import { AnimatePresence } from 'framer-motion';
import { usePortal } from '../../hooks/usePortal';
import { PortalHeader } from '../../components/PortalHeader';
import { HomeView } from '../../components/HomeView';
import { ResultsView } from '../../components/ResultsView';
import { DetailView } from '../../components/DetailView';
import { PlateVerificationModal } from '../../components/PlateVerificationModal';
import { SplashScreen } from '../../components/SplashScreen';
import { PortalFooter } from '../../components/PortalFooter';

export function PortalPage() {
    const [showSplash, setShowSplash] = React.useState(true);
    const {
        view,
        searchQuery,
        setSearchQuery,
        isSearching,
        selectedDoc,
        results,
        showPlateModal,
        setShowPlateModal,
        plateInput,
        setPlateInput,
        plateError,
        pendingDoc,
        handleSearch,
        handleSelectDoc,
        verifyPlate,
        goBackToResults,
        resetPortal
    } = usePortal();

    return (
        <div className="min-h-screen bg-app-bg text-text-main font-sans selection:bg-primary/10 selection:text-primary flex flex-col">
            <SplashScreen onComplete={() => setShowSplash(false)} />

            {!showSplash && (
                <>
                    <PortalHeader onReset={resetPortal} />

                    <div className="flex-1 flex flex-col relative w-full">

                        <AnimatePresence>
                            <PlateVerificationModal
                                isOpen={showPlateModal}
                                onClose={() => setShowPlateModal(false)}
                                pendingDoc={pendingDoc}
                                plateInput={plateInput}
                                setPlateInput={setPlateInput}
                                plateError={plateError}
                                onVerify={verifyPlate}
                            />
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            {view === 'HOME' && (
                                <HomeView
                                    onSearch={handleSearch}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    isSearching={isSearching}
                                />
                            )}

                            {view === 'RESULTS' && (
                                <ResultsView
                                    results={results}
                                    searchQuery={searchQuery}
                                    onReset={resetPortal}
                                    onSelectDoc={handleSelectDoc}

                                />
                            )}

                            {view === 'DETAIL' && selectedDoc && (
                                <DetailView doc={selectedDoc} onBack={goBackToResults} />
                            )}
                        </AnimatePresence>

                    </div>

                    <PortalFooter />
                </>
            )}
        </div>
    );
}
