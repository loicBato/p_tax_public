import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FiSearch as Search,
    FiChevronDown as ChevronDown,
    FiMessageCircle as MessageCircle,
    FiFileText as FileText,
    FiCreditCard as CreditCard,
    FiShield as Shield,
    FiArrowRight as ArrowRight
} from 'react-icons/fi';
import {
    Box,
    Container,
    Typography,
    TextField,
    InputAdornment,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack,
    Avatar,
    Paper,
    Button,
    Grid,
    Fade
} from '@mui/material';

const FAQ_DATA = [
    {
        category: "Consultation & Recherche",
        icon: <Search size={20} />,
        items: [
            {
                q: "Comment trouver mon récépissé ou procès-verbal ?",
                a: "Sur la page d'accueil, vous pouvez rechercher votre document en utilisant soit votre numéro de plaque d'immatriculation, la référence du document ou le numéro de châssis de votre véhicule."
            },
            {
                q: "Que faire si ma recherche ne donne aucun résultat ?",
                a: "Vérifiez d'abord que vous avez saisi les informations correctement, sans espace supplémentaire. Si le problème persiste, il est possible que votre document ne soit pas encore numérisé dans le système. Veuillez réessayer plus tard ou contacter le centre d'assistance."
            },
            {
                q: "Pourquoi me demande-t-on de vérifier ma plaque d'immatriculation ?",
                a: "C'est une mesure de sécurité. Pour protéger la confidentialité de vos données, nous devons nous assurer que vous êtes bien la personne autorisée à consulter ce document en vous demandant de confirmer l'immatriculation associée au document."
            }
        ]
    },
    {
        category: "Paiement & Statut",
        icon: <CreditCard size={20} />,
        items: [
            {
                q: "Que signifie le statut « Impayé » ?",
                a: "Un statut Impayé indique que les amendes liées aux infractions mentionnées sur votre document n'ont pas encore été réglées. Vos pièces ou votre véhicule resteront retenus jusqu'au paiement."
            },
            {
                q: "Comment puis-je payer mon amende ?",
                a: "Actuellement, le paiement s'effectue physiquement au commissariat indiqué sur votre document (ex: Commissariat Central de Lomé). Présentez-vous avec le montant exact et votre récépissé. Le paiement en ligne sera bientôt disponible."
            },
            {
                q: "Le statut de mon document ne s'actualise pas après le paiement.",
                a: "Il peut y avoir un léger délai de traitement. Si le statut n'est pas mis à jour 24h après votre paiement physique, veuillez contacter le centre d'assistance avec la référence de votre document."
            }
        ]
    },
    {
        category: "Restitution des biens",
        icon: <FileText size={20} />,
        items: [
            {
                q: "Quelles sont les conditions pour récupérer mon véhicule en fourrière ?",
                a: "Vous devez vous présenter au lieu de dépôt avec : le récépissé de retrait d'engin, une pièce d'identité valide, les documents originaux du véhicule (carte grise, assurance), et la preuve du paiement des amendes et des frais de fourrière."
            },
            {
                q: "Où dois-je aller pour récupérer mes pièces (permis, carte grise, etc.) ?",
                a: "Vos pièces doivent être récupérées au commissariat ou au poste de police qui a émis le récépissé, indiqué dans la section « Bureau d'émission » de votre document, après le paiement des amendes correspondantes."
            },
            {
                q: "Quelqu'un d'autre peut-il récupérer mon véhicule ou mes pièces à ma place ?",
                a: "En règle générale, le propriétaire légal doit se présenter en personne. Si cela est impossible, un mandataire peut s'y rendre muni d'une procuration légalisée, de la copie de votre pièce d'identité et de sa propre pièce d'identité."
            }
        ]
    },
    {
        category: "Sécurité & Technique",
        icon: <Shield size={20} />,
        items: [
            {
                q: "Le PDF téléchargé est-il un document officiel ?",
                a: "Oui, le PDF généré via notre plateforme est une copie numérique fidèle du document physique de la Police Nationale du Togo."
            },
            {
                q: "J'ai reçu un lien par SMS, est-ce sécurisé ?",
                a: "Les SMS officiels du système P-Tax contiennent des liens débutant par ptax.tg/. Si vous avez un doute, ne cliquez pas sur le lien et rendez-vous directement sur ptax.tg pour effectuer votre recherche avec la référence."
            }
        ]
    }
];

export default function FaqPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expanded, setExpanded] = useState('panel-0-0');

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // Filtrer les FAQs selon la recherche
    const filteredFaq = FAQ_DATA.map(category => ({
        ...category,
        items: category.items.filter(item =>
            item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.items.length > 0);

    return (
        <Container maxWidth="md" sx={{ py: 3 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Avatar sx={{ width: 44, height: 44, bgcolor: 'primary.light', mx: 'auto', mb: 1.5 }}>
                    <MessageCircle size={24} color="white" />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, trackingTight: -0.5 }}>
                    Foire Aux Questions
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
                    Retrouvez toutes les réponses à vos questions concernant l'utilisation du portail.
                </Typography>
            </Box>

            {/* Barre de recherche */}
            <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Posez votre question (ex: paiement, récépissé, fourrière...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search size={20} color="grey" />
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: 1.5,
                            bgcolor: 'white',
                            '& fieldset': { borderColor: 'divider' },
                            '&:hover fieldset': { borderColor: 'primary.main' },
                            py: 0.2
                        }
                    }}
                />
            </Box>

            {/* Contenu FAQ */}
            <Stack spacing={4}>
                {filteredFaq.length > 0 ? (
                    filteredFaq.map((category, catIndex) => (
                        <Box key={catIndex}>
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3, px: 1 }}>
                                <Avatar variant="rounded" sx={{ width: 36, height: 36, bgcolor: 'primary.main', color: 'white', borderRadius: 2 }}>
                                    {category.icon}
                                </Avatar>
                                <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 2, color: 'text.primary' }}>
                                    {category.category}
                                </Typography>
                            </Stack>

                            <Paper elevation={0} sx={{ borderRadius: 1.5, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                                {category.items.map((item, itemIndex) => {
                                    const panelId = `panel-${catIndex}-${itemIndex}`;
                                    const isExpanded = expanded === panelId;

                                    return (
                                        <Accordion
                                            key={itemIndex}
                                            expanded={isExpanded}
                                            onChange={handleAccordionChange(panelId)}
                                            elevation={0}
                                            sx={{
                                                '&:not(:last-child)': { borderBottom: '1px solid', borderColor: 'divider' },
                                                '&:before': { display: 'none' },
                                                bgcolor: isExpanded ? 'grey.50' : 'white',
                                                transition: 'background-color 0.2s'
                                            }}
                                        >
                                            <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 700, pr: 2 }}>
                                                    {item.q}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                                    {item.a}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    );
                                })}
                            </Paper>
                        </Box>
                    ))
                ) : (
                    <Paper elevation={0} sx={{ py: 4, textAlign: 'center', borderRadius: 1.5, border: '1px dashed', borderColor: 'divider' }}>
                        <Search size={48} color="lightgrey" />
                        <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
                            Aucun résultat trouvé
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Nous n'avons trouvé aucune réponse pour "{searchQuery}".
                        </Typography>
                    </Paper>
                )}
            </Stack>

            {/* Section contact assistance */}
            <Paper
                elevation={0}
                sx={{
                    mt: 6,
                    p: { xs: 2, md: 3 },
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, bgcolor: 'white', opacity: 0.05, borderRadius: '50%', mr: -10, mt: -10 }} />
                
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
                            Vous n'avez pas trouvé votre réponse ?
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Notre équipe d'assistance est là pour vous aider à chaque étape de votre démarche.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
                        <Button
                            component={Link}
                            to="/assistance"
                            variant="contained"
                            endIcon={<ArrowRight size={18} />}
                            sx={{
                                bgcolor: 'white',
                                color: 'primary.main',
                                fontWeight: 800,
                                px: 4,
                                py: 1,
                                borderRadius: 1.5,
                                '&:hover': { bgcolor: 'grey.100' }
                            }}
                        >
                            Contacter l'assistance
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
