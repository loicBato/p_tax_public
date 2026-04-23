import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ResultsView } from '../../components/ResultsView';
import { PlateVerificationModal } from '../../components/PlateVerificationModal';
import { verifyDocumentPlate } from '../../services/documentService';

export default function ResultsPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // Get results and searchQuery from navigation state
    const results = location.state?.results || [];
    const searchQuery = location.state?.searchQuery || '';

    // Plate verification state
    const [pendingDoc, setPendingDoc] = useState(null);
    const [showPlateModal, setShowPlateModal] = useState(false);
    const [plateInput, setPlateInput] = useState('');
    const [plateError, setPlateError] = useState(false);

    // If no results data, redirect to home
    if (!location.state?.results) {
        navigate('/', { replace: true });
        return null;
    }

    const handleSelectDoc = (doc) => {
        setPendingDoc(doc);
        setPlateInput('');
        setPlateError(false);
        setShowPlateModal(true);
    };

    const verifyPlate = async (e) => {
        e?.preventDefault();
        if (!pendingDoc) return;

        try {
            const isValid = await verifyDocumentPlate(pendingDoc, plateInput);
            if (isValid) {
                setShowPlateModal(false);
                // Navigate to document detail page with the verified document
                // Navigate to the appropriate route based on document type
                const routePrefix = pendingDoc.type === 'RECEPISE' ? 'recepisse' : 'proces-verbal';
                navigate(`/${routePrefix}/${pendingDoc.reference}`, {
                    state: { document: pendingDoc, verified: true },
                });
            } else {
                setPlateError(true);
            }
        } catch (error) {
            console.error(error);
            setPlateError(true);
        }
    };

    const handleReset = () => {
        navigate('/');
    };

    return (
        <>
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

            <ResultsView
                results={results}
                searchQuery={searchQuery}
                onReset={handleReset}
                onSelectDoc={handleSelectDoc}
            />
        </>
    );
}
