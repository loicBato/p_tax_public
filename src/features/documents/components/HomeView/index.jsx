import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box, Container, Paper, CircularProgress, Typography,
    useMediaQuery, useTheme,
} from '@mui/material';
import { useOcr } from '../../hooks/useOcr';

import { HomeHero } from './HomeHero';
import { ModeSelector } from './ModeSelector';
import { PanelRef } from './PanelRef';
import { PanelAdv } from './PanelAdv';
import { SearchDrawer } from './SearchDrawer';

export function HomeView({ onSearch, isSearching }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [mode, setMode] = useState(null);
    const [engin, setEngin] = useState(null);
    const [docType, setDocType] = useState(null);
    const [reference, setReference] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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
                            Sélectionnez un mode de recherche ci-dessus.
                        </Typography>
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%' }}>

                {/* ── Hero ── */}
                <HomeHero />

                {/* ── Carte principale ── */}
                <Paper elevation={0} sx={{
                    p: { xs: 2, md: 3 }, borderRadius: 3,
                    border: '1px solid', borderColor: 'divider',
                    bgcolor: 'background.paper', boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                }}>
                    <Box sx={{ mb: isMobile ? 0 : 3 }}>
                        <ModeSelector mode={mode} ocr={ocr} onSelectMode={handleSelectMode} />
                    </Box>

                    {/* Desktop : contenu inline */}
                    {!isMobile && (
                        <Box sx={{ borderTop: mode ? '1px solid' : 'none', borderColor: 'divider', pt: mode ? 2.5 : 0 }}>
                            {dynamicContent}
                        </Box>
                    )}
                </Paper>


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
