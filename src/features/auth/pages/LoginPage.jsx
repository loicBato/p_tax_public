import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box, Container, Typography, TextField, Button,
    CircularProgress, Alert, InputAdornment, Paper, IconButton,
    Avatar,
} from '@mui/material';
import { FiPhone, FiArrowLeft } from 'react-icons/fi';
import { FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { loginRequest, verifyOtpRequest, resendOtpRequest } from '../services/authService';
import logo from '../../../assets/police1.JPG';

const OTP_LENGTH = 6;
const RESEND_DELAY = 120;

export default function LoginPage() {
    const navigate = useNavigate();
    const { setPhone, confirmVerified, phone: sessionPhone } = useAuth();

    // États
    const [step, setStep] = useState('phone'); // 'phone' | 'otp'
    const [phoneInput, setPhoneInput] = useState('');
    const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [countdown, setCountdown] = useState(0);

    // Pour le mode test : affiche l'OTP reçu
    const [testOtp, setTestOtp] = useState('');

    const inputRefs = useRef([]);

    // Effet pour le compte à rebours du renvoi
    useEffect(() => {
        if (countdown <= 0) return;
        const t = setInterval(() => setCountdown(c => c - 1), 1000);
        return () => clearInterval(t);
    }, [countdown]);

    // Étape 1 : Demande de code
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        let phone = phoneInput.trim().replace(/\s/g, '');
        if (!phone.startsWith('+')) phone = '+228' + phone;

        if (phone.length < 11) {
            setError('Numéro de téléphone trop court.');
            return;
        }

        setLoading(true);
        try {
            const res = await loginRequest(phone);
            if (res.success) {
                // data = "+22890909090||600006"
                const parts = res.data.split('||');
                const realPhone = parts[0];
                const otpCode = parts[1];

                setPhone(realPhone);
                setTestOtp(otpCode); // On stocke l'OTP pour l'affichage en mode test
                setStep('otp');
                setCountdown(RESEND_DELAY);
                setDigits(Array(OTP_LENGTH).fill(''));
            } else {
                setError(res.message || 'Erreur lors de l\'envoi du code.');
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Impossible de contacter le serveur.');
        } finally {
            setLoading(false);
        }
    };

    // Étape 2 : Vérification du code
    const handleVerifySubmit = async (e) => {
        if (e) e.preventDefault();
        const otp = digits.join('');
        if (otp.length < OTP_LENGTH) return;

        setError('');
        setLoading(true);
        try {
            const res = await verifyOtpRequest(sessionPhone, otp);
            if (res.success) {
                confirmVerified();
                navigate('/', { replace: true });
            } else {
                setError(res.message || 'Code incorrect. Réessayez.');
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Erreur de vérification.');
        } finally {
            setLoading(false);
        }
    };

    // Renvoi du code
    const handleResend = async () => {
        setError('');
        setSuccess('');
        setResending(true);
        try {
            const res = await resendOtpRequest(sessionPhone);
            if (res.success) {
                const otpCode = res.data.split('||')[1];
                setTestOtp(otpCode);
                setSuccess('Un nouveau code a été envoyé.');
                setCountdown(RESEND_DELAY);
                setDigits(Array(OTP_LENGTH).fill(''));
                inputRefs.current[0]?.focus();
            } else {
                setError(res.message || 'Impossible de renvoyer le code.');
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Erreur lors du renvoi.');
        } finally {
            setResending(false);
        }
    };

    // Gestion des inputs OTP
    const handleDigitChange = (idx, val) => {
        if (!/^\d?$/.test(val)) return;
        const next = [...digits];
        next[idx] = val;
        setDigits(next);
        if (val && idx < OTP_LENGTH - 1) {
            inputRefs.current[idx + 1]?.focus();
        }
    };

    const handleKeyDown = (idx, e) => {
        if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
            inputRefs.current[idx - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
        if (!pasted) return;
        const newDigits = pasted.split('').concat(Array(OTP_LENGTH - pasted.length).fill(''));
        setDigits(newDigits);
        inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
    };

    const maskedPhone = sessionPhone
        ? sessionPhone.slice(0, 4) + ' ·· ·· ' + sessionPhone.slice(-2)
        : '';

    return (
        <Box sx={{
            height: '100dvh', display: 'flex', alignItems: 'center',
            justifyContent: 'center', p: 2, overflow: 'hidden',
        }}>
            <Container maxWidth="xs" sx={{ p: 0, mt: -4 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Header Logo */}
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        {/* <Box sx={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: 60, height: 60, borderRadius: '18px',
                            bgcolor: 'primary.main', mb: 2,
                            boxShadow: '0 8px 24px rgba(37,99,235,0.3)',
                        }}>
                            <FaShieldAlt size={26} color="#fff" />
                        </Box> */}
                        <Avatar
                            src={logo}
                            variant="rounded"
                            sx={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                width: 60, height: 60, borderRadius: '10px',
                                bgcolor: 'transparent',
                            }}
                        />
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: -0.5 }}>
                            P-Tax Togo
                        </Typography>
                        {/* <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            République Togolaise
                        </Typography> */}
                    </Box>

                    <Paper elevation={0} sx={{
                        p: { xs: 3, sm: 3 }, borderRadius: 4,
                        border: '1px solid', borderColor: 'divider',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                        overflow: 'hidden', position: 'relative'
                    }}>

                        <AnimatePresence mode="wait">
                            {step === 'phone' ? (
                                <motion.div
                                    key="phone-step"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                                        Bienvenue
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3.5 }}>
                                        Saisissez votre numéro pour consulter vos contraventions.
                                    </Typography>

                                    {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2.5 }}>{error}</Alert>}

                                    <Box component="form" onSubmit={handleLoginSubmit}>
                                        <TextField
                                            fullWidth
                                            label="Téléphone"
                                            placeholder="90 00 00 00"
                                            value={phoneInput}
                                            onChange={(e) => setPhoneInput(e.target.value)}
                                            type="tel"
                                            required
                                            autoFocus
                                            variant="outlined"
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <FiPhone size={16} color="#94a3b8" />
                                                            <Typography sx={{ fontWeight: 700, color: 'text.secondary', ml: 1 }}>+228</Typography>

                                                        </InputAdornment>
                                                    ),
                                                    sx: { borderRadius: 3 },
                                                }
                                            }}
                                            sx={{ mb: 3 }}
                                        />

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            disabled={loading || !phoneInput.trim()}
                                            sx={{ borderRadius: 3, py: 1.8, fontWeight: 700, boxShadow: '0 4px 12px rgba(37,99,235,0.2)' }}
                                        >
                                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Continuer'}
                                        </Button>
                                    </Box>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="otp-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, ml: -1 }}>
                                        <IconButton onClick={() => setStep('phone')} size="small">
                                            <FiArrowLeft />
                                        </IconButton>
                                        <Typography variant="h9" sx={{ fontWeight: 800, ml: 0.5 }}>
                                            Vérification
                                        </Typography>
                                    </Box>
                                    {testOtp && (
                                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 3 }}>
                                            Un code a été envoyé au <strong>{maskedPhone}</strong> || {testOtp}
                                        </Typography>
                                    )}

                                    {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
                                    {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}

                                    <Box component="form" onSubmit={handleVerifySubmit} onPaste={handlePaste}>
                                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 4 }}>
                                            {digits.map((d, i) => (
                                                <Box
                                                    key={i}
                                                    component="input"
                                                    ref={el => inputRefs.current[i] = el}
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={1}
                                                    value={d}
                                                    onChange={e => handleDigitChange(i, e.target.value)}
                                                    onKeyDown={e => handleKeyDown(i, e)}
                                                    sx={{
                                                        width: { xs: 48, sm: 48 },
                                                        height: { xs: 50, sm: 56 },
                                                        textAlign: 'center',
                                                        fontSize: '1.4rem',
                                                        fontWeight: 800,
                                                        borderRadius: '12px',
                                                        border: '1.5px solid',
                                                        borderColor: d ? 'primary.main' : 'divider',
                                                        bgcolor: d ? '#eff6ff' : '#f8fafc',
                                                        color: 'text.primary',
                                                        outline: 'none',
                                                        transition: 'all 0.15s',
                                                        '&:focus': {
                                                            borderColor: 'primary.main',
                                                            boxShadow: '0 0 0 4px rgba(37,99,235,0.1)',
                                                        },
                                                    }}
                                                />
                                            ))}
                                        </Box>

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            disabled={loading || digits.join('').length < OTP_LENGTH}
                                            sx={{ borderRadius: 3, py: 1.8, fontWeight: 700, mb: 3 }}
                                        >
                                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Vérifier'}
                                        </Button>

                                        <Box sx={{ textAlign: 'center' }}>
                                            {countdown > 0 ? (
                                                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                                    Renvoyer le code dans <span style={{ color: '#3b82f6', fontWeight: 600 }}>{countdown}s</span>
                                                </Typography>
                                            ) : (
                                                <Button
                                                    variant="text"
                                                    onClick={handleResend}
                                                    disabled={resending}
                                                    sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
                                                >
                                                    {resending ? <CircularProgress size={18} /> : 'Renvoyer un code'}
                                                </Button>
                                            )}
                                        </Box>
                                    </Box>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Paper>

                    {/* <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 3, color: 'text.secondary', fontWeight: 500, opacity: 0.8 }}>
                        © 2024 République Togolaise — P-Tax
                    </Typography> */}
                </motion.div>
            </Container>
        </Box>
    );
}
