import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiPhone as Phone,
    FiMail as Mail,
    FiMapPin as MapPin,
    FiClock as Clock,
    FiMessageCircle as MessageCircle,
    FiHelpCircle as HelpCircle,
    FiChevronRight as ChevronRight,
    FiExternalLink as ExternalLink,
    FiAlertCircle as AlertCircle,
    FiFileText as FileText,
    FiShield as Shield,
} from 'react-icons/fi';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Stack,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Divider
} from '@mui/material';
import { FiChevronDown as ChevronDown } from 'react-icons/fi';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' },
    }),
};

export default function AssistancePage() {
    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            {/* En-tête */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Avatar sx={{ width: 44, height: 44, bgcolor: 'primary.light', mx: 'auto', mb: 1.5 }}>
                        <HelpCircle size={24} color="white" />
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, trackingTight: -0.5 }}>
                        Centre d'Assistance
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}>
                        Besoin d'aide pour consulter vos documents, comprendre une infraction ou effectuer un paiement ?
                        Notre équipe est à votre disposition.
                    </Typography>
                </Box>
            </motion.div>

            {/* Cartes de contact */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                {/* <Grid item xs={12} md={4}> */}
                <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
                    <ContactCard
                        icon={<Phone size={24} />}
                        title="Par téléphone"
                        detail="+228 22 21 29 62"
                        subDetail="Lun - Ven: 07h30 - 17h00"
                        color="primary.main"
                        href="tel:+22822212962"
                    />
                </motion.div>
                {/* </Grid> */}
                {/* <Grid item xs={12} md={4}> */}
                <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
                    <ContactCard
                        icon={<Mail size={24} />}
                        title="Par email"
                        detail="support@ptax.tg"
                        subDetail="Réponse en 24h"
                        color="#2563eb"
                        href="mailto:support@ptax.tg"
                    />
                </motion.div>
                {/* </Grid> */}
                {/* <Grid item xs={12} md={4}> */}
                <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
                    <ContactCard
                        icon={<MapPin size={24} />}
                        title="En personne"
                        detail="Commissariat Central"
                        subDetail="Lomé, Boulevard du 13 Janvier"
                        color="#059669"
                    />
                </motion.div>
                {/* </Grid> */}
            </Grid>

            {/* Horaires d'ouverture */}
            {/* <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
                <Paper elevation={0} sx={{ p: 2.5, mb: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                        <Avatar variant="rounded" sx={{ width: 36, height: 36, bgcolor: 'warning.light', borderRadius: 1.5 }}>
                            <Clock size={20} color="white" />
                        </Avatar>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                            Horaires d'ouverture
                        </Typography>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <HoraireRow jour="Lundi – Vendredi" horaire="07h30 – 12h00 / 14h30 – 17h00" actif />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <HoraireRow jour="Samedi" horaire="08h00 – 12h00" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <HoraireRow jour="Dimanche" horaire="Fermé" ferme />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <HoraireRow jour="Jours fériés" horaire="Fermé" ferme />
                        </Grid>
                    </Grid>
                </Paper>
            </motion.div> */}

            {/* FAQ rapide */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
                <Paper elevation={0} sx={{ p: 2.5, mb: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                        <Avatar variant="rounded" sx={{ width: 36, height: 36, bgcolor: 'primary.light', borderRadius: 1.5 }}>
                            <MessageCircle size={20} color="white" />
                        </Avatar>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                            Questions fréquentes
                        </Typography>
                    </Stack>
                    <Stack spacing={2}>
                        <FaqItem
                            question="Comment consulter mon récépissé en ligne ?"
                            answer="Rendez-vous sur la page d'accueil et saisissez votre numéro de plaque d'immatriculation, votre référence de récépissé (ex: WR2604AA00052) ou votre numéro de châssis. Les résultats s'afficheront automatiquement."
                        />
                        <FaqItem
                            question="Que signifie le statut « Impayé » ?"
                            answer="Un statut Impayé indique que les amendes liées aux infractions constatées n'ont pas encore été réglées. Veuillez vous rendre au commissariat émetteur muni de votre récépissé pour effectuer le paiement."
                        />
                        <FaqItem
                            question="Comment récupérer mon véhicule mis en fourrière ?"
                            answer="Présentez-vous au commissariat indiqué sur votre récépissé avec : votre pièce d'identité, le récépissé de retrait d'engin, les documents du véhicule (carte grise, assurance)."
                        />
                        <FaqItem
                            question="J'ai reçu un SMS avec un lien, est-ce fiable ?"
                            answer="Oui, les liens officiels P-Tax commencent toujours par ptax.tg/ suivi de /recepisse/ ou /proces-verbal/. Pour votre sécurité, une vérification de plaque d'immatriculation vous sera demandée avant l'affichage du document."
                        />
                        <FaqItem
                            question="Comment télécharger mon récépissé en PDF ?"
                            answer="Après avoir consulté votre document et vérifié votre plaque d'immatriculation, cliquez sur le bouton « Télécharger le récépissé » en haut à droite de la page de détail du document."
                        />
                    </Stack>
                </Paper>
            </motion.div>

            {/* Informations utiles */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible">
                        <Paper elevation={0} sx={{ p: 2.5, height: '100%', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                                <Avatar variant="rounded" sx={{ width: 36, height: 36, bgcolor: 'error.light', borderRadius: 1.5 }}>
                                    <AlertCircle size={20} color="white" />
                                </Avatar>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                                    Signaler un problème
                                </Typography>
                            </Stack>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
                                Vous constatez une erreur sur votre récépissé ou procès-verbal ? Contactez-nous avec votre numéro de référence pour une vérification.
                            </Typography>
                            <Button
                                component="a"
                                href="mailto:reclamation@ptax.tg"
                                endIcon={<ExternalLink size={14} />}
                                sx={{ textTransform: 'none', fontWeight: 700, p: 0, '&:hover': { bgcolor: 'transparent', color: 'primary.dark' } }}
                            >
                                reclamation@ptax.tg
                            </Button>
                        </Paper>
                    </motion.div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
                        <Paper elevation={0} sx={{ p: 2.5, height: '100%', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                                <Avatar variant="rounded" sx={{ width: 36, height: 36, bgcolor: 'success.light', borderRadius: 1.5 }}>
                                    <Shield size={20} color="white" />
                                </Avatar>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                                    Sécurité & Confidentialité
                                </Typography>
                            </Stack>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
                                Vos données personnelles sont protégées conformément à la réglementation en vigueur. L'accès aux documents nécessite une vérification de plaque d'immatriculation.
                            </Typography>
                            <Button
                                component={Link}
                                to="/"
                                endIcon={<ChevronRight size={14} />}
                                sx={{ textTransform: 'none', fontWeight: 700, p: 0, '&:hover': { bgcolor: 'transparent', color: 'primary.dark' } }}
                            >
                                Retour à l'accueil
                            </Button>
                        </Paper>
                    </motion.div>
                </Grid>
            </Grid>

            {/* Pied de page assistance */}
            <Box sx={{ py: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 2, color: 'text.secondary', opacity: 0.7, fontWeight: 700 }}>
                    P-Tax Togo — Ministère de la Sécurité — Police Nationale — Direction de la Sécurité Routière
                </Typography>
            </Box>
        </Container>
    );
}

// ── Composants internes ──

function ContactCard({ icon, title, detail, subDetail, color, href }) {
    const isLink = !!href;

    return (
        <Card
            elevation={0}
            component={isLink ? 'a' : 'div'}
            href={href}
            sx={{
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                // height: '100%',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': isLink ? {
                    borderColor: 'primary.main',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                    transform: 'translateY(-2px)'
                } : {}
            }}
        >
            <CardContent sx={{ p: 2 }}>
                <Avatar sx={{ bgcolor: color, width: 36, height: 36, mb: 1.5, borderRadius: 1.5 }}>
                    {icon}
                </Avatar>
                <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: 'text.secondary', display: 'block', mb: 0.5, fontSize: '0.6rem' }}>
                    {title}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.2 }}>
                    {detail}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.65rem' }}>
                    {subDetail}
                </Typography>
            </CardContent>
        </Card>
    );
}

// function HoraireRow({ jour, horaire, actif = false, ferme = false }) {
//     return (
//         <Paper
//             elevation={0}
//             sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 px: 2,
//                 py: 1,
//                 borderRadius: 1.5,
//                 bgcolor: actif ? 'success.light' : ferme ? 'error.light' : 'grey.50',
//                 color: (actif || ferme) ? 'white' : 'text.primary',
//                 border: '1px solid',
//                 borderColor: actif ? 'success.main' : ferme ? 'error.main' : 'divider'
//             }}
//         >
//             <Typography variant="caption" sx={{ fontWeight: 800 }}>{jour}</Typography>
//             <Typography variant="caption" sx={{ fontWeight: 800 }}>{horaire}</Typography>
//         </Paper>
//     );
// }

function FaqItem({ question, answer }) {
    return (
        <Accordion
            elevation={0}
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px !important',
                '&:before': { display: 'none' },
                overflow: 'hidden',
                mb: 1
            }}
        >
            <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{question}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>{answer}</Typography>
            </AccordionDetails>
        </Accordion>
    );
}
