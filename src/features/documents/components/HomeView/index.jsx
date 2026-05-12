import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box, Container, Paper, CircularProgress, Typography,
    useMediaQuery, useTheme,
} from '@mui/material';
import { useOcr } from '../../hooks/useOcr';
import illustration from '../../../../assets/ptax_illustration.png'

import { HomeHero } from './HomeHero';
import { ModeSelector } from './ModeSelector';
import { PanelRef } from './PanelRef';
import { PanelAdv } from './PanelAdv';
import { SearchDrawer } from './SearchDrawer';
import { SearchProcessSteps } from './SearchProcessSteps';
import { useAuth } from '../../../auth/context/AuthContext';
import { FiLock as LockIcon } from 'react-icons/fi';
import { alpha } from '@mui/material/styles';

export function HomeView({ onSearch, isSearching }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [mode, setMode] = useState(null);
    const [engin, setEngin] = useState(null);
    const [docType, setDocType] = useState(null);
    const [reference, setReference] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const { phone } = useAuth();
    const ocr = useOcr();

    const handleSelectMode = (val) => {
        setMode(val);
        setEngin(null);
        setDocType(null);
        setSearchTerm('');
        setReference('');
    };

    const handleCloseDrawer = () => setMode(null);

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

    /* ── Contenu dynamique partagé desktop / mobile ── */
    const dynamicContent = (
        <Box sx={{ pt: 0 }}>
            <AnimatePresence mode="wait">
                {mode === 'ref' && (
                    <motion.div key="panel-ref" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <PanelRef
                            reference={reference}
                            setReference={setReference}
                            isSearching={isSearching}
                            onSubmit={handleSearchRef}
                        />
                    </motion.div>
                )}
                {mode === 'adv' && (
                    <motion.div key="panel-adv" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <PanelAdv
                            engin={engin}
                            setEngin={setEngin}
                            docType={docType}
                            setDocType={setDocType}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            isSearching={isSearching}
                            onSubmit={handleSearchAdv}
                        />
                    </motion.div>
                )}
                {!mode && (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Box sx={{ pt: 4, pb: 4, textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Sélectionnez un mode de recherche ci-dessus pour commencer.
                            </Typography>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Alerte de confidentialité */}
            <Box sx={{
                mt: mode ? 3 : 1, p: 2, borderRadius: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.04),
                border: '1px solid',
                borderColor: alpha(theme.palette.primary.main, 0.1),
                display: 'flex', gap: 2, alignItems: 'flex-start'
            }}>
                <Box sx={{
                    p: 1, borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                    <LockIcon size={14} />
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5, fontSize: '0.75rem' }}>
                        Confidentialité & Sécurité
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.5, display: 'block' }}>
                        Pour votre sécurité, vous ne pouvez rechercher que les engins liés au numéro <Box component="span" sx={{ fontWeight: 800, color: 'primary.main' }}>{phone}</Box>.
                        Toute recherche pour un autre numéro ne donnera aucun résultat.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%' }}>

                {/* ── Hero ── */}
                <HomeHero />
                <Box sx={{
                    display: 'flex',
                    gap: 3,
                    alignItems: 'flex',
                    flexDirection: { xs: 'column', md: 'row' }
                }}>



                    {!isMobile && (
                        <Box sx={{
                            flex: '0 0 40%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                        }}>
                            <SearchProcessSteps />
                            <Box sx={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 3,
                                bgcolor: 'background.paper',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                                border: '1px solid',
                                borderColor: 'divider',
                                overflow: 'hidden'
                            }}>
                                <img src={illustration} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </Box>
                        </Box>
                    )}

                    {/* ── Carte principale ── */}
                    <Paper elevation={0} sx={{
                        flex: 1,
                        p: { xs: 2, md: 3 }, borderRadius: 3,
                        border: '1px solid', borderColor: 'divider',
                        bgcolor: 'background.paper', boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                        display: 'flex', flexDirection: 'column', gap: isMobile ? 2 : 0
                    }}>
                        {isMobile && <SearchProcessSteps />}

                        <Box sx={{ mb: isMobile ? 0 : 3 }}>
                            <ModeSelector mode={mode} ocr={ocr} onSelectMode={handleSelectMode} />
                        </Box>

                        {/* Desktop : contenu inline */}
                        {!isMobile && (
                            <Box sx={{ borderTop: mode ? '1px solid' : 'none', borderColor: 'divider', pt: mode ? 1 : 0 }}>
                                {dynamicContent}
                            </Box>
                        )}
                    </Paper>

                </Box>

                {/* Mobile : bottom sheet */}
                {isMobile && (
                    <SearchDrawer open={!!mode} mode={mode} onClose={handleCloseDrawer}>
                        {dynamicContent}
                    </SearchDrawer>
                )}

                {/* Input caméra OCR (caché) */}
                <input
                    ref={ocr.fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    style={{ display: 'none' }}
                    onChange={(e) => ocr.handleFileChange(e, (text) => {
                        if (text) {
                            if (mode === 'adv') { setSearchTerm(text); }
                            else { setMode('ref'); setReference(text); }
                        }
                    })}
                />

                {/* Indicateur OCR */}
                <AnimatePresence>
                    {ocr.isProcessing && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                            <Box sx={{
                                mt: 3, p: 2, borderRadius: 3, bgcolor: 'primary.main', color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, width: '100%',
                            }}>
                                <CircularProgress size={20} color="inherit" />
                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                    Analyse de l'image en cours…
                                </Typography>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </Container>
    );
}
