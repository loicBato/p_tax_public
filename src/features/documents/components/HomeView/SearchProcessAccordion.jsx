import React from 'react';
import {
    Box, Typography, Accordion, AccordionSummary, AccordionDetails,
    Stack, alpha, useTheme
} from '@mui/material';
import {
    FiChevronDown as ChevronDown,
    FiSearch as SearchIcon,
    FiFileText as FileIcon,
    FiDownload as DownloadIcon,
    FiCheckCircle as CheckIcon
} from 'react-icons/fi';

const PROCESS_STEPS = [
    {
        title: "Recherche simplifiée",
        icon: <SearchIcon />,
        color: "#3b82f6",
        desc: "Utilisez votre numéro de plaque, châssis ou la référence du récépissé."
    },
    {
        title: "Consultation rapide",
        icon: <FileIcon />,
        color: "#10b981",
        desc: "Visualisez instantanément le détail de votre document et son statut."
    },
    {
        title: "Téléchargement sécurisé",
        icon: <DownloadIcon />,
        color: "#f59e0b",
        desc: "Récupérez votre reçu ou procès-verbal au format PDF certifié."
    }
];

export function SearchProcessAccordion() {
    const theme = useTheme();
    const [expanded, setExpanded] = React.useState('panel0');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ width: '100%', mb: 2 }}>
            <Typography
                variant="overline"
                sx={{
                    fontWeight: 800,
                    color: 'primary.main',
                    mb: 1.5,
                    display: 'block',
                    textAlign: 'center',
                    letterSpacing: 1.2
                }}
            >
                Comment ça marche ?
            </Typography>

            <Stack spacing={1}>
                {PROCESS_STEPS.map((step, idx) => (
                    <Accordion
                        key={idx}
                        expanded={expanded === `panel${idx}`}
                        onChange={handleChange(`panel${idx}`)}
                        elevation={0}
                        sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.5)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid',
                            borderColor: expanded === `panel${idx}` ? alpha(step.color, 0.3) : 'divider',
                            borderRadius: '12px !important',
                            transition: 'all 0.3s ease',
                            '&:before': { display: 'none' },
                            '&.Mui-expanded': {
                                mb: 1,
                                bgcolor: 'white',
                                boxShadow: `0 4px 20px ${alpha(step.color, 0.1)}`
                            }
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ChevronDown size={18} color={step.color} />}
                            sx={{
                                px: 2,
                                '& .MuiAccordionSummary-content': {
                                    alignItems: 'center',
                                    gap: 1.5,
                                    m: '12px 0 !important'
                                }
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 32,
                                height: 32,
                                borderRadius: '8px',
                                bgcolor: alpha(step.color, 0.1),
                                color: step.color
                            }}>
                                {step.icon}
                            </Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                                {step.title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 2, pb: 2, pt: 0 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem', lineHeight: 1.5 }}>
                                {step.desc}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Stack>
        </Box>
    );
}
