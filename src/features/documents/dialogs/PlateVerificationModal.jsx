import React from 'react';
import { FiInfo as Info } from 'react-icons/fi';
import { FaCar as Car } from 'react-icons/fa';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Stack,
    Paper,
    Avatar,
    Fade
} from '@mui/material';
import { FiX as X } from 'react-icons/fi';

export function PlateVerificationModal({
    isOpen,
    onClose,
    pendingDoc,
    plateInput,
    setPlateInput,
    plateError,
    onVerify,
}) {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            TransitionComponent={Fade}
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    p: 0.5
                }
            }}
        >
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    color: 'text.secondary'
                }}
            >
                <X size={20} />
            </IconButton>

            <DialogContent sx={{ textAlign: 'center', py: 2 }}>
                <Avatar sx={{ width: 44, height: 44, bgcolor: 'primary.light', mx: 'auto', mb: 1.5 }}>
                    <Car size={22} color="white" />
                </Avatar>

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Vérification du Véhicule
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                    Veuillez saisir le numéro de plaque d'immatriculation associé au document <Box component="span" sx={{ fontWeight: 800, color: 'primary.main' }}>{pendingDoc?.reference}</Box> pour y accéder.
                </Typography>

                <Box component="form" onSubmit={onVerify} sx={{ mt: 2 }}>
                    <Stack spacing={2}>
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: 'text.secondary', ml: 1, mb: 1, display: 'block' }}>
                                Immatriculation
                            </Typography>
                            <TextField
                                fullWidth
                                autoFocus

                                placeholder="1234AB"
                                value={plateInput}
                                onChange={(e) => setPlateInput(e.target.value)}
                                error={plateError}
                                helperText={plateError ? "Numéro de plaque incorrect" : ""}
                                variant="outlined"
                                inputProps={{
                                    sx: {
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                        letterSpacing: 4,
                                        fontSize: '1.2rem',
                                        fontWeight: 800,
                                        py: 1.5
                                    }
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1.5,
                                        bgcolor: 'grey.50',
                                        '&.Mui-focused': {
                                            bgcolor: 'white'
                                        }
                                    }
                                }}
                            />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!plateInput.trim()}
                            fullWidth
                            sx={{
                                py: 1.2,
                                borderRadius: 1.5,
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: 1.5,
                                boxShadow: 0,
                                '&:hover': { boxShadow: 0 }
                            }}
                        >
                            Vérifier et Accéder
                        </Button>

                        <Paper
                            elevation={0}
                            sx={{
                                p: 1.5,
                                bgcolor: 'grey.50',
                                borderRadius: 1.5,
                                border: '1px solid',
                                borderColor: 'divider',
                                display: 'flex',
                                gap: 1.2,
                                alignItems: 'flex-start'
                            }}
                        >
                            <Info size={16} style={{ color: '#161e54', marginTop: '2px', flexShrink: 0 }} />
                            <Typography variant="caption" sx={{ textAlign: 'left', color: 'text.secondary', fontWeight: 500, lineHeight: 1.5 }}>
                                Conformément à la politique de sécurité, la re-validation de la plaque est requise même via lien direct pour protéger vos données personnelles.
                            </Typography>
                        </Paper>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
