import React, { useState } from 'react';
import {
    FiArrowRight as ArrowRight,
    FiChevronLeft as ChevronLeft,
    FiSearch as Search,
    FiCamera as Camera
} from 'react-icons/fi';
import { FaBus, FaCar, FaMotorcycle, FaTruck, FaShieldAlt as ShieldCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { LuFileText, LuScrollText } from 'react-icons/lu';
import { VscReferences } from 'react-icons/vsc';
import { CgPassword } from 'react-icons/cg';
import { useOcr } from '../hooks/useOcr';
import { IoScanSharp } from 'react-icons/io5';
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    TextField,
    Stepper,
    Step,
    StepLabel,
    Grid,
    InputAdornment,
    CircularProgress,
    Card,
    CardActionArea,
    CardContent,
    Stack,
    IconButton,
    Chip,
    Fade
} from '@mui/material';

const ENGINS = [
    { val: 'voiture', label: 'Véhicule léger', sub: 'Voitures', icon: <FaCar /> },
    { val: 'moto', label: 'Moto / Tricycle', sub: '2 et 3 roues', icon: <FaMotorcycle /> },
    { val: 'transport', label: 'Transport commun', sub: 'Bus, minibus', icon: <FaBus /> },
    { val: 'poids_lourd', label: 'Poids lourd', sub: 'Camions', icon: <FaTruck /> },
];

const DOCS = [
    { val: 'recepisse', label: 'Récépissé', icon: <LuScrollText /> },
    { val: 'pv', label: 'Procès-verbal', icon: <LuFileText /> },
];

const MODES = [
    {
        val: 'scan',
        label: 'Prendre une photo',
        sub: 'Piece d\'Identité',
        iconBg: 'bg-green-50',
        classname: 'md:hidden',
        icon: <IoScanSharp />,
    },
    {
        val: 'adv',
        label: 'Par plaque / châssis',
        sub: 'AZxxxx / xxxxxxxxxxxxxxxx',
        iconBg: 'bg-amber-50',
        icon: <CgPassword />,
    },

    {
        val: 'ref',
        label: 'N° Récépissé / PV',
        sub: 'WRxxxxxxx / PYxxxxxxxxxxx',
        iconBg: 'bg-blue-50',
        icon: <VscReferences />,
    },

];

// Les composants StepPill et StepDivider sont remplacés par le Stepper MUI

export function HomeView({ onSearch, isSearching }) {
    const [mode, setMode] = useState(null);       // 'ref' | 'adv'
    const [advStep, setAdvStep] = useState(1);    // 1 | 2 | 3
    const [engin, setEngin] = useState(null);
    const [docType, setDocType] = useState(null);
    const [reference, setReference] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // OCR : reconnaissance de texte depuis une photo
    const ocr = useOcr();

    // Lancer le scan OCR directement puis rechercher
    const handleOcrScan = () => {
        ocr.openCapture();
    };

    const handleSelectMode = (val) => {
        setMode(val);
        setAdvStep(1);
        setEngin(null);
        setDocType(null);
        setSearchTerm('');
        setReference('');
    };

    const handleSelectEngin = (val) => {
        setEngin(val);
        setTimeout(() => setAdvStep(2), 160);
    };

    const handleSelectDoc = (val) => {
        setDocType(val);
        setTimeout(() => setAdvStep(3), 160);
    };

    const goBack = (to) => {
        if (to === 1) { setEngin(null); setDocType(null); }
        if (to === 2) { setDocType(null); }
        setAdvStep(to);
    };

    const handleSearchRef = (e) => {
        e.preventDefault();
        if (!reference.trim()) return;
        onSearch({ mode: 'ref', reference: reference.trim() });
    };

    const handleSearchAdv = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        onSearch({ mode: 'adv', engin, docType, plaque: searchTerm.trim(), chassis: searchTerm.trim() });
    };

    return (
        <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ width: '100%' }}
            >
                {/* Hero */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Chip
                        icon={<ShieldCheck size={14} />}
                        label="Consultation officielle"
                        size="small"
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: 1.5,
                            fontSize: '10px',
                            mb: 2,
                            '& .MuiChip-icon': { color: 'inherit' }
                        }}
                    />
                    <Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
                        Retrouvez vos <Box component="span" sx={{ color: 'primary.main' }}>Contraventions</Box>
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic', maxWidth: 600, mx: 'auto' }}>
                        Choisissez votre mode de recherche pour commencer.
                    </Typography>
                </Box>

                {/* Card principale */}
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2, md: 3 },
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                    }}
                >
                    {/* Sélection du mode */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="overline" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mb: 1, letterSpacing: 1.2, fontSize: '0.65rem' }}>
                            Mode de recherche
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, width: '100%' }}>
                            {MODES.map((m) => (
                                <Box
                                    key={m.val}
                                    sx={{
                                        display: m.classname === 'md:hidden' ? { xs: 'flex', md: 'none' } : 'flex',
                                        flex: m.val === 'scan' ? '1 1 100%' : { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' },
                                    }}
                                >
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            width: '100%',
                                            borderRadius: 3,
                                            transition: 'all 0.2s',
                                            borderColor: mode === m.val ? 'primary.main' : 'divider',
                                            borderWidth: mode === m.val ? 2 : 1,
                                            bgcolor: mode === m.val ? 'primary.main' : 'transparent',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                bgcolor: mode === m.val ? 'primary.main' : 'rgba(0,0,0,0.02)'
                                            }
                                        }}
                                    >
                                        <CardActionArea
                                            onClick={() => {
                                                if (m.val === 'scan') {
                                                    handleOcrScan();
                                                } else {
                                                    handleSelectMode(m.val);
                                                }
                                            }}
                                            sx={{ p: 1 }}
                                        >
                                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1, '&:last-child': { pb: 1 } }}>
                                                <Box sx={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    bgcolor: mode === m.val ? 'white' : 'grey.100',
                                                    color: mode === m.val ? 'primary.main' : 'text.primary',
                                                    flexShrink: 0
                                                }}>
                                                    {ocr.isProcessing && m.val === 'scan' ? (
                                                        <CircularProgress size={16} color="inherit" />
                                                    ) : (
                                                        m.icon
                                                    )}
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: mode === m.val ? 'white' : 'text.primary', fontSize: '0.75rem', lineHeight: 1.2 }}>
                                                        {m.label}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: mode === m.val ? 'rgba(255,255,255,0.8)' : 'text.secondary', fontSize: '0.65rem' }}>
                                                        {m.sub}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Contenu dynamique */}
                    <AnimatePresence mode="wait">
                        {/* ── Mode référence ── */}
                        {mode === 'ref' && (
                            <motion.div
                                key="panel-ref"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 3 }}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                                        Saisissez le numéro de récépissé ou du procès verbal
                                    </Typography>
                                    <Box component="form" onSubmit={handleSearchRef} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5 }}>
                                        <TextField
                                            fullWidth
                                            placeholder="WRxxxxxxxxx ou PYxxxxxxxxx"
                                            size="small"
                                            value={reference}
                                            onChange={(e) => setReference(e.target.value)}
                                            variant="outlined"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Search size={16} color="#666" />
                                                    </InputAdornment>
                                                ),
                                                sx: { borderRadius: 1.5, bgcolor: 'grey.50' }
                                            }}
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={isSearching || !reference.trim()}
                                            sx={{
                                                borderRadius: 1.5,
                                                px: 3,
                                                py: 1,
                                                fontSize: '0.85rem'
                                            }}
                                        >
                                            {isSearching ? <CircularProgress size={18} color="inherit" /> : 'Rechercher'}
                                        </Button>
                                    </Box>
                                </Box>
                            </motion.div>
                        )}

                        {/* ── Mode avancé ── */}
                        {mode === 'adv' && (
                            <motion.div
                                key="panel-adv"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
                                    <Stepper activeStep={advStep - 1} alternativeLabel sx={{ mb: 3 }}>
                                        {['Engin', 'Document', 'Critère'].map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>

                                    <Box sx={{ minHeight: 200 }}>
                                        <AnimatePresence mode="wait">
                                            {/* Étape 1 — Engin */}
                                            {advStep === 1 && (
                                                <motion.div key="a1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>Quel type d'engin ?</Typography>
                                                    <Box sx={{
                                                        display: 'grid',
                                                        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                                                        gap: 2,
                                                        width: '100%'
                                                    }}>
                                                        {ENGINS.map((e) => (
                                                            <Button
                                                                key={e.val}
                                                                fullWidth
                                                                variant="outlined"
                                                                onClick={() => handleSelectEngin(e.val)}
                                                                sx={{
                                                                    flexDirection: 'column',
                                                                    p: 2,
                                                                    borderRadius: 3,
                                                                    borderColor: engin === e.val ? 'primary.main' : 'divider',
                                                                    borderWidth: engin === e.val ? 2 : 1,
                                                                    bgcolor: engin === e.val ? 'primary.main' : 'white',
                                                                    color: engin === e.val ? 'white' : 'text.primary',
                                                                    height: '100%',
                                                                    '&:hover': {
                                                                        borderColor: 'primary.main',
                                                                        bgcolor: engin === e.val ? 'primary.main' : 'rgba(0,0,0,0.02)'
                                                                    },
                                                                    textTransform: 'none'
                                                                }}
                                                            >
                                                                <Box sx={{ fontSize: '1.5rem', mb: 1 }}>{e.icon}</Box>
                                                                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{e.label}</Typography>
                                                                <Typography variant="caption" sx={{ opacity: 0.7 }}>{e.sub}</Typography>
                                                            </Button>
                                                        ))}
                                                    </Box>
                                                </motion.div>
                                            )}

                                            {/* Étape 2 — Document */}
                                            {advStep === 2 && (
                                                <motion.div key="a2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>Quel type de document ?</Typography>
                                                    <Stack direction="row" spacing={2}>
                                                        {DOCS.map((d) => (
                                                            <Button
                                                                key={d.val}
                                                                fullWidth
                                                                variant="outlined"
                                                                onClick={() => handleSelectDoc(d.val)}
                                                                sx={{
                                                                    flexDirection: 'column',
                                                                    p: 3,
                                                                    borderRadius: 3,
                                                                    borderColor: docType === d.val ? 'primary.main' : 'divider',
                                                                    borderWidth: docType === d.val ? 2 : 1,
                                                                    bgcolor: docType === d.val ? 'primary.main' : 'white',
                                                                    color: docType === d.val ? 'white' : 'text.primary',
                                                                    '&:hover': {
                                                                        borderColor: 'primary.main',
                                                                        bgcolor: docType === d.val ? 'primary.main' : 'rgba(0,0,0,0.02)'
                                                                    },
                                                                    textTransform: 'none'
                                                                }}
                                                            >
                                                                <Box sx={{ fontSize: '1.8rem', mb: 1 }}>{d.icon}</Box>
                                                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{d.label}</Typography>
                                                            </Button>
                                                        ))}
                                                    </Stack>
                                                    <Button
                                                        startIcon={<ChevronLeft />}
                                                        onClick={() => goBack(1)}
                                                        sx={{ mt: 2, textTransform: 'none', color: 'text.secondary', fontSize: '0.75rem' }}
                                                    >
                                                        Retour
                                                    </Button>
                                                </motion.div>
                                            )}

                                            {/* Étape 3 — Plaque / Châssis */}
                                            {advStep === 3 && (
                                                <motion.div key="a3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                                    <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                                                        <Chip label={ENGINS.find(e => e.val === engin)?.label} size="small" color="success" variant="outlined" />
                                                        <Chip label={DOCS.find(d => d.val === docType)?.label} size="small" color="success" variant="outlined" />
                                                    </Stack>

                                                    <Box component="form" onSubmit={handleSearchAdv} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                                        <TextField
                                                            fullWidth
                                                            placeholder="Plaque / châssis"
                                                            size="small"
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                            variant="outlined"
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <Search size={18} color="#666" />
                                                                    </InputAdornment>
                                                                ),
                                                                sx: { borderRadius: 2.5, bgcolor: 'grey.50' }
                                                            }}
                                                        />
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            disabled={isSearching || !searchTerm.trim()}
                                                            sx={{
                                                                borderRadius: 1.5,
                                                                px: 3,
                                                                py: 1,
                                                                fontSize: '0.85rem',
                                                                textTransform: 'none',
                                                                boxShadow: 0,
                                                                '&:hover': { boxShadow: 0 }
                                                            }}
                                                        >
                                                            {isSearching ? <CircularProgress size={20} color="inherit" /> : 'Rechercher'}
                                                        </Button>
                                                    </Box>
                                                    <Button
                                                        startIcon={<ChevronLeft />}
                                                        onClick={() => goBack(2)}
                                                        sx={{ mt: 2, textTransform: 'none', color: 'text.secondary', fontSize: '0.75rem' }}
                                                    >
                                                        Retour
                                                    </Button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Box>
                                </Box>
                            </motion.div>
                        )}

                        {/* Placeholder initial */}
                        {!mode && (
                            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 4, textAlign: 'center', py: 4 }}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Sélectionnez un mode de recherche ci-dessus.
                                    </Typography>
                                </Box>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Paper>

                {/* Input fichier caméra global (mode scan) */}
                <input
                    ref={ocr.fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    style={{ display: 'none' }}
                    onChange={(e) => ocr.handleFileChange(e, (text) => {
                        if (text) {
                            if (mode === 'adv') {
                                setSearchTerm(text);
                            } else {
                                setMode('ref');
                                setReference(text);
                            }
                        }
                    })}
                />

                {/* Indicateur OCR global */}
                <AnimatePresence>
                    {ocr.isProcessing && (
                        <Fade in={true}>
                            <Box sx={{
                                mt: 3,
                                p: 2,
                                borderRadius: 3,
                                bgcolor: 'primary.main',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                width: '100%'
                            }}>
                                <CircularProgress size={20} color="inherit" />
                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                    Analyse de l'image en cours…
                                </Typography>
                            </Box>
                        </Fade>
                    )}
                </AnimatePresence>
            </motion.div>
        </Container>
    );
}