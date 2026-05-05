import React from 'react';
import {
    FiChevronLeft as ChevronLeft,
    FiDownload as Download,
    FiCreditCard as CreditCard,
    FiCheckCircle as CheckCircle2,
    FiInfo as Info,
    FiUser as User,
    FiPhone as Phone
} from 'react-icons/fi';
import { FaStamp as Stamp, FaGavel as Gavel, FaCar as Car, FaShieldAlt as ShieldCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Stack,
    Avatar,
    IconButton,
    CircularProgress,
    Divider,
    Chip
} from '@mui/material';
import moment from 'moment';
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
                    {/* En-tête du document */}
                    <Box sx={{ bgcolor: 'primary.main', p: { xs: 2, md: 3 }, color: 'white', position: 'relative', overflow: 'hidden' }}>
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: 300,
                            height: 300,
                            bgcolor: 'white',
                            opacity: 0.05,
                            borderRadius: '50%',
                            mr: -15,
                            mt: -15,
                            filter: 'blur(40px)'
                        }} />

                        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 3 }}>
                            <Box>
                                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                                    <Avatar variant="rounded" sx={{ width: 36, height: 36, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: 1.5 }}>
                                        {doc.type === 'RECEPISE' ? <Stamp size={20} /> : <Gavel size={20} />}
                                    </Avatar>
                                    <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 1.5, color: 'rgba(255,255,255,0.8)', display: 'block', lineHeight: 1.2 }}>
                                        {doc.type === 'RECEPISE' ? (doc.withdrawnDocs?.vehicle ? "Récépissé de retrait d'engin" : "Récépissé de retrait de pièces") : 'Procès-Verbal de Paiement'}
                                    </Typography>
                                </Stack>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
                                    {doc.reference}
                                </Typography>
                                <Chip
                                    icon={<Car size={14} color="white" />}
                                    label={doc.plateNumber || doc.chassis}
                                    sx={{
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: 2,
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        '& .MuiChip-icon': { ml: 1 }
                                    }}
                                />
                            </Box>

                            <Button
                                variant="contained"
                                onClick={handleDownload}
                                disabled={downloading}
                                startIcon={downloading ? <CircularProgress size={16} color="inherit" /> : <Download size={16} />}
                                sx={{
                                    bgcolor: 'white',
                                    color: 'primary.main',
                                    px: 3,
                                    py: 1.5,
                                    borderRadius: 2.5,
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: 1.2,
                                    fontSize: '0.65rem',
                                    '&:hover': { bgcolor: 'grey.100' },
                                    boxShadow: 0,
                                    '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.5)', color: 'primary.main' }
                                }}
                            >
                                {downloading ? 'Téléchargement...' : (doc.type === 'RECEPISE' ? 'Télécharger le récépissé' : 'Télécharger le PV')}
                            </Button>
                        </Box>
                    </Box>

                    {/* Corps du document : Aperçu du PDF */}
                    <Box sx={{
                        width: '100%',
                        overflowX: 'auto',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'grey.100',
                        p: { xs: 1.5, md: 3 },
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Paper
                            elevation={4}
                            sx={{
                                width: '794px',
                                minHeight: '1123px',
                                bgcolor: 'white',
                                shrink: 0,
                                pointerEvents: 'none',
                                transformOrigin: 'top center',
                                transform: { xs: 'scale(0.4)', sm: 'scale(0.7)', md: 'scale(1)' }
                            }}
                        >
                            {doc.type === 'RECEPISE' ? (
                                <ReceiptTemplate doc={doc} />
                            ) : (
                                <ReportPdfTemplate receipt={doc} />
                            )}
                        </Paper>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
}
