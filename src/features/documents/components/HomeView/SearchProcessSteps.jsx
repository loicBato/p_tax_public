import React from 'react';
import { 
    Box, Typography, Stack, alpha, useTheme 
} from '@mui/material';
import { 
    FiSearch as SearchIcon,
    FiFileText as FileIcon,
    FiDownload as DownloadIcon,
} from 'react-icons/fi';

const PROCESS_STEPS = [
    {
        title: "Recherchez",
        icon: <SearchIcon />,
        color: "#3b82f6",
        desc: "Saisissez plaque ou châssis"
    },
    {
        title: "Consultez",
        icon: <FileIcon />,
        color: "#10b981",
        desc: "Vérifiez vos documents"
    },
    {
        title: "Téléchargez",
        icon: <DownloadIcon />,
        color: "#f59e0b",
        desc: "Récupérez votre PDF"
    }
];

export function SearchProcessSteps() {
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%', mb: 1 }}>
            <Typography 
                variant="overline" 
                sx={{ 
                    fontWeight: 800, 
                    color: 'primary.main', 
                    mb: 2, 
                    display: 'block', 
                    textAlign: 'center',
                    letterSpacing: 1.2,
                    fontSize: '0.65rem'
                }}
            >
                Le processus en 3 étapes
            </Typography>
            
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ position: 'relative' }}>
                {PROCESS_STEPS.map((step, idx) => (
                    <Box key={idx} sx={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                        {/* Ligne de connexion entre les étapes */}
                        {idx < PROCESS_STEPS.length - 1 && (
                            <Box sx={{
                                position: 'absolute',
                                top: 20,
                                left: '70%',
                                width: '60%',
                                height: '1.5px',
                                bgcolor: 'divider',
                                zIndex: 0,
                                opacity: 0.5,
                                borderStyle: 'dashed',
                                borderTop: '1.5px dashed',
                            }} />
                        )}

                        <Box sx={{
                            position: 'relative',
                            zIndex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                width: 40,
                                height: 40,
                                borderRadius: '12px',
                                bgcolor: 'white',
                                color: step.color,
                                border: '1px solid',
                                borderColor: alpha(step.color, 0.2),
                                boxShadow: `0 4px 12px ${alpha(step.color, 0.1)}`,
                                mb: 1.5,
                                fontSize: '1.2rem'
                            }}>
                                {step.icon}
                            </Box>
                            <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.72rem', display: 'block', color: 'text.primary', mb: 0.25 }}>
                                {step.title}
                            </Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary', lineHeight: 1.1, display: { xs: 'none', sm: 'block' } }}>
                                {step.desc}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}
