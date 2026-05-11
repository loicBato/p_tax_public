import React from 'react';
import {
    FiChevronLeft as ChevronLeft,
    FiDownload as Download,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import {
    Box,
    Container,
    Paper,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from '@mui/material';
import { downloadReceiptPdf } from '../services/receiptPdfGenerator.jsx';
import { downloadReportPdf } from '../services/reportPdfGenerator.jsx';
import { ReceiptTemplate } from './ReceiptTemplate';
import { ReportPdfTemplate } from './ReportPdfTemplate';

export function DetailView({ doc, onBack }) {
    const [downloading, setDownloading] = React.useState(false);

    const handleDownload = async () => {
        setDownloading(true);
        try {
            if (doc.type === 'RECEPISE') {
                await downloadReceiptPdf(doc);
            } else {
                await downloadReportPdf(doc);
            }
        } finally {
            setDownloading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 3 }}>
            <motion.div
                key="detail"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
            >
                <Button
                    startIcon={<ChevronLeft />}
                    onClick={onBack}
                    sx={{
                        textTransform: 'none',
                        color: 'text.secondary',
                        fontSize: '0.75rem',
                        mb: 2,
                        '&:hover': { color: 'primary.main', bgcolor: 'transparent', '& .MuiButton-startIcon': { transform: 'translateX(-4px)' } },
                        transition: 'all 0.2s',
                        p: 0
                    }}
                >
                    Retour aux résultats
                </Button>

                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        overflow: 'hidden',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                    }}
                >
                    {/* Barre d'outils style visionneuse */}
                    <Box sx={{
                        px: { xs: 1, md: 3 },
                        py: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bgcolor: '#f8fafc', // Light slate background for toolbar
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                    }}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Box sx={{
                                width: 10,
                                height: 10,
                                bgcolor: doc.status === 'PAYE' ? 'success.main' : 'warning.main',
                                borderRadius: '50%',
                                animation: 'pulse 2s infinite'
                            }} />
                            <Box>
                                <Typography variant="caption" sx={{ display: 'block', fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.65rem', lineHeight: 1 }}>
                                    Aperçu Officiel
                                </Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary' }}>
                                    {doc.reference}
                                </Typography>
                            </Box>
                        </Stack>

                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleDownload}
                            disabled={downloading}
                            startIcon={downloading ? <CircularProgress size={14} color="inherit" /> : <Download size={14} />}
                            sx={{
                                borderRadius: 1.5,
                                py: 0.8,
                                px: 1,
                                fontWeight: 700,
                                textTransform: 'none',
                                fontSize: '0.75rem',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                '&:hover': { boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }
                            }}
                        >
                            {downloading ? 'Chargement...' : 'Télécharger PDF'}
                        </Button>
                    </Box>

                    {/* Corps du document : Zone de visionnage style PDF */}
                    <Box sx={{
                        width: '100%',
                        bgcolor: '#475569', // Slate 600 for a real PDF viewer look
                        p: { xs: 2, sm: 3, md: 4 },
                        display: 'flex',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        minHeight: '500px',
                        position: 'relative'
                    }}>
                        <Box sx={{
                            transformOrigin: 'top center',
                            transform: {
                                xs: 'scale(0.42)',
                                sm: 'scale(0.72)',
                                md: 'scale(0.95)',
                                lg: 'scale(1)'
                            },
                            // Compensation pour l'espace vide créé par le scale
                            mb: {
                                xs: '-900px', // Très important pour éviter les scrolls infinis vides
                                sm: '-280px',
                                md: '-50px',
                                lg: 0
                            }
                        }}>
                            <Paper
                                elevation={12}
                                sx={{
                                    width: '794px',
                                    minHeight: '1123px',
                                    bgcolor: 'white',
                                    flexShrink: 0,
                                    pointerEvents: 'none', // Évite les interactions accidentelles dans l'aperçu
                                    borderRadius: '2px', // Coins plus vifs pour un aspect papier
                                }}
                            >
                                {doc.type === 'RECEPISE' ? (
                                    <ReceiptTemplate doc={doc} />
                                ) : (
                                    <ReportPdfTemplate receipt={doc} />
                                )}
                            </Paper>
                        </Box>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
}
