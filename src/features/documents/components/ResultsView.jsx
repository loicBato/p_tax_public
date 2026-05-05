import React from 'react';
import {
    FiChevronLeft as ChevronLeft,
    FiSearch as Search,
    FiInfo as Info,
    FiClock as Clock,
    FiChevronRight as ChevronRight
} from 'react-icons/fi';
import { FaStamp as Stamp, FaGavel as Gavel, FaCar as Car } from 'react-icons/fa';
import { motion } from 'framer-motion';
import moment from 'moment';
import { FiUser as User } from 'react-icons/fi';
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Stack,
    IconButton,
    Chip,
    Divider,
    Avatar
} from '@mui/material';
import { BiCalendar } from 'react-icons/bi';

/**
 * Masque un nom : "LHADJO GTOKOU" → "LH**** GT****"
 */
function maskName(name) {
    if (!name) return '—';
    return name.split(/\s+/).map(word => {
        if (word.length <= 2) return word;
        return word.slice(0, 2).toUpperCase() + 'x'.repeat(Math.min(word.length - 2, 3));
    }).join(' ');
}

/**
 * Masque une plaque : "TG1234AB" → "TG****AB", "9131AJ" → "91**AJ"
 */
function maskPlate(plate) {
    if (!plate) return '—';
    const clean = plate.replace(/[\s-]/g, '');
    if (clean.length <= 4) return clean.slice(0, 1) + 'x'.repeat(clean.length - 1);
    return clean.slice(0, 1) + 'x'.repeat(clean.length - 2) + clean.slice(-1);
}

export function ResultsView({ results, searchQuery, onReset, onSelectDoc }) {
    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <motion.div
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
            >
                {/* Header */}
                <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'flex-end' }, justifyContent: 'space-between', gap: 2, borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
                    <Box>
                        <Button
                            startIcon={<ChevronLeft />}
                            onClick={onReset}
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
                            Retour à la recherche
                        </Button>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                            Résultats de <Box component="span" sx={{ color: 'primary.main', fontStyle: 'italic' }}>Consultation</Box>
                        </Typography>
                        <Chip
                            icon={<Search size={12} />}
                            label={searchQuery.toUpperCase()}
                            size="small"
                            sx={{
                                bgcolor: 'grey.100',
                                color: 'text.secondary',
                                fontWeight: 700,
                                letterSpacing: 1.2,
                                fontSize: '10px'
                            }}
                        />
                    </Box>

                    <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                            {results.length} document(s) trouvé(s)
                        </Typography>
                    </Box>
                </Box>

                {/* Content */}
                {results.length === 0 ? (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            borderRadius: 4,
                            border: '1px dashed',
                            borderColor: 'divider',
                            bgcolor: 'background.paper'
                        }}
                    >
                        <Avatar sx={{ width: 64, height: 64, bgcolor: 'grey.100', mx: 'auto', mb: 3 }}>
                            <Info size={32} color="#8595A6" />
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                            Aucun dossier trouvé
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, opacity: 0.8 }}>
                            Nous n'avons trouvé aucun document correspondant à votre recherche.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={onReset}
                            sx={{
                                px: 4,
                                py: 1.2,
                                borderRadius: 2.5,
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: 1.2,
                                fontSize: '0.75rem'
                            }}
                        >
                            Réessayer
                        </Button>
                    </Paper>
                ) : (
                    <Stack spacing={2}>
                        {results.map((doc) => (
                            <Card
                                key={doc.id}
                                elevation={0}
                                sx={{
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                        transform: 'translateY(-2px)'
                                    }
                                }}
                            >
                                <CardActionArea onClick={() => onSelectDoc(doc)} sx={{ p: { xs: 1.5, md: 2 } }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: { xs: 2, md: 4 } }}>
                                        {/* Icon */}
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: 1.5,
                                                bgcolor: doc.type === 'PROCES_VERBAL' ? 'primary.light' : 'grey.100',
                                                color: doc.type === 'PROCES_VERBAL' ? 'white' : 'text.secondary',
                                                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
                                            }}
                                        >
                                            {doc.type === 'RECEPISE' ? <Stamp size={18} /> : <Gavel size={18} />}
                                        </Avatar>

                                        {/* Info */}
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, display: 'block', mb: 0.5, opacity: 0.8 }}>
                                                {doc.type === 'RECEPISE' ? 'Récépissé' : 'Procès-Verbal'}
                                            </Typography>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5 }}>
                                                {doc.reference}
                                            </Typography>

                                            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Car size={14} color="#8595A6" />
                                                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase' }}>
                                                        {maskPlate(doc.plateNumber)}
                                                    </Typography>
                                                </Box>
                                                {/* <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <User size={14} color="#8595A6" />
                                                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                                        {maskName(doc.citizenName || doc.ownerName)}
                                                    </Typography>
                                                </Box> */}
                                                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <BiCalendar size={14} color="#8595A6" />
                                                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                                        {moment(doc.date).format('DD/MM/YYYY')}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </Box>

                                        {/* Actions/Amount */}
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            pl: { xs: 0, md: 2 },
                                            borderLeft: { xs: 'none', md: '1px solid' },
                                            borderColor: 'divider'
                                        }}>
                                            {doc?.type === 'PROCES_VERBAL' && (
                                                <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1 }}>
                                                        {doc.amount ? `${doc.amount.toLocaleString('fr-FR')} FCFA` : '—'}
                                                    </Typography>
                                                </Box>
                                            )}
                                            <Avatar sx={{ bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider', color: 'text.primary', width: 32, height: 32 }}>
                                                <ChevronRight size={18} />
                                            </Avatar>
                                        </Box>
                                    </Box>
                                </CardActionArea>
                            </Card>
                        ))}
                    </Stack>
                )}
            </motion.div>
        </Container>
    );
}
