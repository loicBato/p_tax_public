import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DetailView } from '../components/DetailView';
import { PlateVerificationModal } from '../dialogs/PlateVerificationModal';
import { getDocumentByReference, verifyDocumentPlate } from '../services/documentService';
import { LuTriangleAlert } from 'react-icons/lu';
import { CiLock } from 'react-icons/ci';
import {
    Box,
    Container,
    Typography,
    CircularProgress,
    Button,
    Avatar,
    Stack,
    Paper,
    Fade
} from '@mui/material';

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
            <Container maxWidth="sm" sx={{ py: 6, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 300, justifyContent: 'center' }}>
                    <CircularProgress size={36} thickness={4} sx={{ mb: 3 }} />
                    <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 2, color: 'text.secondary' }}>
                        Chargement du document...
                    </Typography>
                </Box>
            </Container>
        );
    }

    // Error state - document not found
    if (error || !doc) {
        return (
            <Container maxWidth="sm" sx={{ py: 6 }}>
                <Paper elevation={0} sx={{ p: 3, textAlign: 'center', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                    <Avatar sx={{ width: 44, height: 44, bgcolor: 'error.light', mx: 'auto', mb: 2 }}>
                        <LuTriangleAlert size={22} color="white" />
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                        Document introuvable
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                        La référence <Box component="span" sx={{ fontWeight: 800, color: 'primary.main' }}>{ref}</Box> ne correspond à aucun document enregistré dans notre système.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/')}
                        sx={{
                            px: 4,
                            py: 1.2,
                            borderRadius: 1.5,
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: 1.2,
                            fontSize: '0.75rem'
                        }}
                    >
                        Retour à l'accueil
                    </Button>
                </Paper>
            </Container>
        );
    }

    // Waiting for plate verification (modal is shown)
    if (!isVerified) {
        return (
            <Container maxWidth="sm" sx={{ py: 6 }}>
                <Box sx={{ textAlign: 'center', minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar sx={{ width: 44, height: 44, bgcolor: 'primary.light', mx: 'auto', mb: 2 }}>
                        <CiLock size={24} color="white" />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                        Vérification requise
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, maxWidth: 400 }}>
                        Pour accéder au document <Box component="span" sx={{ fontWeight: 800, color: 'primary.main' }}>{ref}</Box>, veuillez confirmer votre identité en saisissant le numéro de plaque d'immatriculation.
                    </Typography>

                    <AnimatePresence>
                        {showPlateModal && (
                            <PlateVerificationModal
                                isOpen={showPlateModal}
                                onClose={handleCloseModal}
                                pendingDoc={doc}
                                plateInput={plateInput}
                                setPlateInput={setPlateInput}
                                plateError={plateError}
                                onVerify={handleVerifyPlate}
                            />
                        )}
                    </AnimatePresence>
                </Box>
            </Container>
        );
    }

    // Verified → show document detail
    return <DetailView doc={doc} onBack={handleBack} />;
}
