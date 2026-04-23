import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DetailView } from '../../components/DetailView';
import { PlateVerificationModal } from '../../components/PlateVerificationModal';
import { getDocumentByReference, verifyDocumentPlate } from '../../services/documentService';
import { LuTriangleAlert } from 'react-icons/lu';
import { CiLock } from 'react-icons/ci';

export function DocumentDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { ref } = useParams();

    // Document state
    const [doc, setDoc] = useState(location.state?.document || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Verification state - document is verified only if arriving from ResultsPage (already verified)
    const [isVerified, setIsVerified] = useState(!!location.state?.verified);

    // Plate verification modal state
    const [showPlateModal, setShowPlateModal] = useState(false);
    const [plateInput, setPlateInput] = useState('');
    const [plateError, setPlateError] = useState(false);

    // Fetch document by reference if not already in location state
    useEffect(() => {
        const fetchDocument = async () => {
            setLoading(true);
            setError(null);

            try {
                // If we already have the doc from navigation state, use it
                if (location.state?.document) {
                    setDoc(location.state.document);
                } else if (ref) {
                    // Fetch by reference (direct link from SMS)
                    const fetchedDoc = await getDocumentByReference(ref);
                    if (fetchedDoc) {
                        setDoc(fetchedDoc);
                    } else {
                        setError('document_not_found');
                    }
                }
            } catch (err) {
                console.error(err);
                setError('fetch_error');
            } finally {
                setLoading(false);
            }
        };

        fetchDocument();
    }, [ref]);

    // Once doc is loaded and NOT verified, show the plate modal
    useEffect(() => {
        if (doc && !isVerified && !loading) {
            setShowPlateModal(true);
        }
    }, [doc, isVerified, loading]);

    // Handle plate verification
    const handleVerifyPlate = async (e) => {
        e?.preventDefault();
        if (!doc) return;

        try {
            const isValid = await verifyDocumentPlate(doc, plateInput);
            if (isValid) {
                setShowPlateModal(false);
                setIsVerified(true);
                setPlateError(false);
            } else {
                setPlateError(true);
            }
        } catch (err) {
            console.error(err);
            setPlateError(true);
        }
    };

    // Handle closing the modal without verifying → go back home
    const handleCloseModal = () => {
        setShowPlateModal(false);
        navigate('/', { replace: true });
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-sm text-text-secondary tracking-widest uppercase">
                    Chargement du document...
                </p>
            </div>
        );
    }

    // Error state - document not found
    if (error || !doc) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl"><LuTriangleAlert /></span>
                </div>
                <h3 className="text-xl font-semibold text-text-title mb-3">Document introuvable</h3>
                <p className="text-text-secondary mb-8 max-w-md">
                    La référence <span className="font-bold text-primary">{ref}</span> ne correspond à aucun document enregistré dans notre système.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3 bg-primary text-white rounded-lg text-sm tracking-widest hover:bg-primary-light cursor-pointer transition-all"
                >
                    Retour à l'accueil
                </button>
            </div>
        );
    }

    // Waiting for plate verification (modal is shown)
    if (!isVerified) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl"><CiLock /></span>
                </div>
                <h3 className="text-lg font-semibold text-text-title mb-2">Vérification requise</h3>
                <p className="text-sm text-text-secondary mb-4 max-w-md">
                    Pour accéder au document <span className="font-bold text-primary">{ref}</span>, veuillez confirmer votre identité en saisissant le numéro de plaque d'immatriculation.
                </p>

                <AnimatePresence>
                    <PlateVerificationModal
                        isOpen={showPlateModal}
                        onClose={handleCloseModal}
                        pendingDoc={doc}
                        plateInput={plateInput}
                        setPlateInput={setPlateInput}
                        plateError={plateError}
                        onVerify={handleVerifyPlate}
                    />
                </AnimatePresence>
            </div>
        );
    }

    // Verified → show document detail
    return <DetailView doc={doc} onBack={handleBack} />;
}
