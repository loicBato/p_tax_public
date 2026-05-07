import React from 'react';

/* ─── SVG Véhicules ─── */

export const CarSVG = ({ selected }) => (
    <svg viewBox="0 0 80 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 80, height: 52 }}>
        <rect x="4" y="22" width="72" height="20" rx="4" fill={selected ? '#fff' : '#dbeafe'} />
        <path d="M12 22 L20 10 Q22 8 25 8 L55 8 Q58 8 60 10 L68 22 Z" fill={selected ? '#bfdbfe' : '#93c5fd'} />
        <rect x="22" y="10" width="14" height="10" rx="2" fill={selected ? '#e0f2fe' : '#bae6fd'} />
        <rect x="44" y="10" width="14" height="10" rx="2" fill={selected ? '#e0f2fe' : '#bae6fd'} />
        <circle cx="22" cy="42" r="7" fill={selected ? '#60a5fa' : '#3b82f6'} />
        <circle cx="22" cy="42" r="3.5" fill={selected ? '#fff' : '#dbeafe'} />
        <circle cx="58" cy="42" r="7" fill={selected ? '#60a5fa' : '#3b82f6'} />
        <circle cx="58" cy="42" r="3.5" fill={selected ? '#fff' : '#dbeafe'} />
        <rect x="4" y="28" width="6" height="4" rx="1" fill={selected ? '#fbbf24' : '#fcd34d'} />
        <rect x="70" y="28" width="6" height="4" rx="1" fill={selected ? '#f87171' : '#fca5a5'} />
        <rect x="28" y="19" width="24" height="3" rx="1.5" fill={selected ? '#93c5fd' : '#60a5fa'} opacity="0.5" />
    </svg>
);

export const MotoSVG = ({ selected }) => (
    <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 80, height: 56 }}>
        <circle cx="18" cy="42" r="12" stroke={selected ? '#3b82f6' : '#6366f1'} strokeWidth="3" fill="none" />
        <circle cx="18" cy="42" r="5" fill={selected ? '#bfdbfe' : '#c7d2fe'} />
        <circle cx="62" cy="42" r="12" stroke={selected ? '#3b82f6' : '#6366f1'} strokeWidth="3" fill="none" />
        <circle cx="62" cy="42" r="5" fill={selected ? '#bfdbfe' : '#c7d2fe'} />
        <path d="M18 42 L30 20 L48 20 L62 42" stroke={selected ? '#60a5fa' : '#818cf8'} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M30 20 L36 12 L52 12 L48 20 Z" fill={selected ? '#93c5fd' : '#a5b4fc'} />
        <circle cx="54" cy="16" r="4" fill={selected ? '#fbbf24' : '#fcd34d'} />
        <path d="M32 28 L50 28 L48 34 L34 34 Z" fill={selected ? '#dbeafe' : '#e0e7ff'} />
        <circle cx="40" cy="28" r="3" fill={selected ? '#60a5fa' : '#6366f1'} />
    </svg>
);

export const BusSVG = ({ selected }) => (
    <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 80, height: 56 }}>
        <rect x="6" y="8" width="68" height="36" rx="5" fill={selected ? '#a7f3d0' : '#d1fae5'} />
        <rect x="6" y="8" width="68" height="10" rx="5" fill={selected ? '#6ee7b7' : '#a7f3d0'} />
        <rect x="10" y="20" width="12" height="10" rx="2" fill={selected ? '#fff' : '#ecfdf5'} />
        <rect x="26" y="20" width="12" height="10" rx="2" fill={selected ? '#fff' : '#ecfdf5'} />
        <rect x="42" y="20" width="12" height="10" rx="2" fill={selected ? '#fff' : '#ecfdf5'} />
        <rect x="58" y="20" width="12" height="10" rx="2" fill={selected ? '#fff' : '#ecfdf5'} />
        <rect x="6" y="34" width="68" height="8" rx="2" fill={selected ? '#34d399' : '#6ee7b7'} />
        <circle cx="20" cy="48" r="7" fill={selected ? '#059669' : '#10b981'} />
        <circle cx="20" cy="48" r="3" fill={selected ? '#a7f3d0' : '#d1fae5'} />
        <circle cx="60" cy="48" r="7" fill={selected ? '#059669' : '#10b981'} />
        <circle cx="60" cy="48" r="3" fill={selected ? '#a7f3d0' : '#d1fae5'} />
        <rect x="30" y="20" width="20" height="8" rx="1" fill={selected ? '#6ee7b7' : '#a7f3d0'} />
        <text x="36" y="27" fontSize="5" fill={selected ? '#065f46' : '#047857'} fontWeight="bold">BUS</text>
    </svg>
);

export const TruckSVG = ({ selected }) => (
    <svg viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 80, height: 56 }}>
        <rect x="2" y="18" width="46" height="26" rx="3" fill={selected ? '#fde68a' : '#fef3c7'} />
        <rect x="2" y="18" width="46" height="8" rx="3" fill={selected ? '#fbbf24' : '#fde68a'} />
        <path d="M48 26 L62 26 L74 36 L74 44 L48 44 Z" fill={selected ? '#fed7aa' : '#ffedd5'} />
        <rect x="52" y="28" width="14" height="10" rx="2" fill={selected ? '#fff' : '#fef9c3'} />
        <rect x="2" y="22" width="10" height="8" rx="1" fill={selected ? '#fff' : '#fef9c3'} />
        <circle cx="16" cy="48" r="7" fill={selected ? '#d97706' : '#f59e0b'} />
        <circle cx="16" cy="48" r="3" fill={selected ? '#fde68a' : '#fef3c7'} />
        <circle cx="38" cy="48" r="7" fill={selected ? '#d97706' : '#f59e0b'} />
        <circle cx="38" cy="48" r="3" fill={selected ? '#fde68a' : '#fef3c7'} />
        <circle cx="64" cy="48" r="7" fill={selected ? '#d97706' : '#f59e0b'} />
        <circle cx="64" cy="48" r="3" fill={selected ? '#fde68a' : '#fef3c7'} />
        <rect x="4" y="26" width="6" height="4" rx="1" fill={selected ? '#fbbf24' : '#fcd34d'} />
        <rect x="70" y="36" width="6" height="4" rx="1" fill={selected ? '#f87171' : '#fca5a5'} />
    </svg>
);

/* ─── SVG Documents ─── */

export const RecepisseDocSVG = ({ selected }) => (
    <svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 64, height: 80 }}>
        <rect x="4" y="4" width="56" height="72" rx="5" fill={selected ? '#fff' : '#f0fdf4'} stroke={selected ? '#3b82f6' : '#bbf7d0'} strokeWidth="1.5" />
        <rect x="10" y="14" width="44" height="6" rx="2" fill={selected ? '#bfdbfe' : '#bbf7d0'} />
        <rect x="10" y="24" width="30" height="3" rx="1.5" fill={selected ? '#dbeafe' : '#dcfce7'} />
        <rect x="10" y="30" width="38" height="3" rx="1.5" fill={selected ? '#dbeafe' : '#dcfce7'} />
        <rect x="10" y="36" width="24" height="3" rx="1.5" fill={selected ? '#dbeafe' : '#dcfce7'} />
        <rect x="10" y="46" width="44" height="10" rx="2" fill={selected ? '#93c5fd' : '#86efac'} />
        <text x="14" y="54" fontSize="7" fill={selected ? '#1e40af' : '#166534'} fontWeight="bold">WR 0000123</text>
        <rect x="10" y="60" width="20" height="3" rx="1.5" fill={selected ? '#dbeafe' : '#dcfce7'} />
        <rect x="10" y="66" width="30" height="3" rx="1.5" fill={selected ? '#dbeafe' : '#dcfce7'} />
        <path d="M46 62 L56 62 L56 72 L46 72 Z" fill={selected ? '#bfdbfe' : '#bbf7d0'} />
        <path d="M48 64 L54 64 M48 67 L54 67 M48 70 L52 70" stroke={selected ? '#3b82f6' : '#16a34a'} strokeWidth="1" strokeLinecap="round" />
    </svg>
);

export const ProcesVerbalSVG = ({ selected }) => (
    <svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 64, height: 80 }}>
        <rect x="4" y="4" width="56" height="72" rx="5" fill={selected ? '#fff' : '#fff7ed'} stroke={selected ? '#3b82f6' : '#fed7aa'} strokeWidth="1.5" />
        <path d="M4 4 Q4 4 60 4 L60 18 Q32 14 4 18 Z" fill={selected ? '#bfdbfe' : '#fed7aa'} />
        <text x="14" y="14" fontSize="7" fill={selected ? '#1e40af' : '#9a3412'} fontWeight="bold">PROCÈS-VERBAL</text>
        <rect x="10" y="24" width="44" height="3" rx="1.5" fill={selected ? '#dbeafe' : '#ffedd5'} />
        <rect x="10" y="30" width="30" height="3" rx="1.5" fill={selected ? '#dbeafe' : '#ffedd5'} />
        <rect x="10" y="36" width="38" height="3" rx="1.5" fill={selected ? '#dbeafe' : '#ffedd5'} />
        <rect x="10" y="42" width="22" height="3" rx="1.5" fill={selected ? '#dbeafe' : '#ffedd5'} />
        <rect x="10" y="52" width="44" height="10" rx="2" fill={selected ? '#93c5fd' : '#fb923c'} />
        <text x="14" y="60" fontSize="7" fill={selected ? '#1e40af' : '#fff'} fontWeight="bold">PY 0098765</text>
        <circle cx="50" cy="68" r="8" fill={selected ? '#bfdbfe' : '#fecdd3'} />
        <path d="M47 68 L49 70 L53 66" stroke={selected ? '#3b82f6' : '#e11d48'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ScanIDSVG = ({ selected }) => (
    <svg viewBox="0 0 72 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 72, height: 56 }}>
        <rect x="4" y="8" width="64" height="40" rx="5" fill={selected ? '#fff' : '#f0fdf4'} stroke={selected ? '#fff' : '#bbf7d0'} strokeWidth="1.5" />
        <circle cx="18" cy="24" r="8" fill={selected ? '#86efac' : '#4ade80'} />
        <circle cx="18" cy="22" r="4" fill={selected ? '#dcfce7' : '#bbf7d0'} />
        <path d="M10 32 Q18 26 26 32" stroke={selected ? '#16a34a' : '#15803d'} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <rect x="30" y="18" width="30" height="3" rx="1.5" fill={selected ? '#bfdbfe' : '#bbf7d0'} />
        <rect x="30" y="24" width="20" height="3" rx="1.5" fill={selected ? '#dbeafe' : '#dcfce7'} />
        <rect x="30" y="30" width="26" height="3" rx="1.5" fill={selected ? '#dbeafe' : '#dcfce7'} />
        <rect x="8" y="38" width="56" height="4" rx="1" fill={selected ? '#86efac' : '#4ade80'} opacity="0.5" />
        <path d="M2 14 L2 8 L8 8" stroke={selected ? '#fff' : '#16a34a'} strokeWidth="2" strokeLinecap="round" />
        <path d="M64 8 L70 8 L70 14" stroke={selected ? '#fff' : '#16a34a'} strokeWidth="2" strokeLinecap="round" />
        <path d="M2 42 L2 48 L8 48" stroke={selected ? '#fff' : '#16a34a'} strokeWidth="2" strokeLinecap="round" />
        <path d="M64 48 L70 48 L70 42" stroke={selected ? '#fff' : '#16a34a'} strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const PlaqueSVG = ({ selected }) => (
    <svg viewBox="0 0 72 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 72, height: 44 }}>
        <rect x="2" y="2" width="68" height="40" rx="6" fill={selected ? '#fff' : '#fffbeb'} stroke={selected ? '#fff' : '#fde68a'} strokeWidth="1.5" />
        <rect x="6" y="8" width="60" height="28" rx="4" fill={selected ? '#fde68a' : '#fef3c7'} />
        {/* <rect x="8" y="10" width="18" height="24" rx="2" fill={selected ? '#1e3a8a' : '#1e40af'} />
        <text x="11" y="26" fontSize="8" fill="#fff" fontWeight="bold">TG</text> */}
        <rect x="6" y="8" width="60" height="28" rx="2" fill={selected ? '#fffbeb' : '#fffde7'} />
        <text x="10" y="24" width="38" height="20" fontSize="11" fill={selected ? '#1e40af' : '#1e3a8a'} fontWeight="bold" letterSpacing="2">AZ1234</text>
        {/* <rect x="6" y="32" width="60" height="2" rx="1" fill={selected ? '#93c5fd' : '#fbbf24'} opacity="0.4" /> */}
    </svg>
);

export const RefNumSVG = ({ selected }) => (
    <svg viewBox="0 0 72 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 72, height: 44 }}>
        <rect x="2" y="2" width="68" height="40" rx="6" fill={selected ? '#fff' : '#eff6ff'} stroke={selected ? '#fff' : '#bfdbfe'} strokeWidth="1.5" />
        <rect x="6" y="6" width="28" height="32" rx="3" fill={selected ? '#bfdbfe' : '#dbeafe'} />
        <rect x="8" y="9" width="24" height="4" rx="1.5" fill="#93c5fd" />
        <rect x="8" y="16" width="18" height="2.5" rx="1" fill={selected ? '#dbeafe' : '#bfdbfe'} />
        <rect x="8" y="21" width="22" height="2.5" rx="1" fill={selected ? '#dbeafe' : '#bfdbfe'} />
        <rect x="8" y="26" width="14" height="2.5" rx="1" fill={selected ? '#dbeafe' : '#bfdbfe'} />
        <rect x="38" y="8" width="28" height="12" rx="3" fill={selected ? '#60a5fa' : '#3b82f6'} />
        <text x="42" y="17" fontSize="7" fill="#fff" fontWeight="bold">WRxxx</text>
        <rect x="38" y="24" width="28" height="12" rx="3" fill={selected ? '#93c5fd' : '#60a5fa'} />
        <text x="42" y="33" fontSize="7" fill={selected ? '#1e40af' : '#fff'} fontWeight="bold">PYxxx</text>
    </svg>
);

/* ─── Données statiques ─── */

export const ENGINS = [
    { val: 'voiture', label: 'Véhicule léger', sub: 'Voitures, 4x4', Img: CarSVG },
    { val: 'moto', label: 'Moto / Tricycle', sub: '2 et 3 roues', Img: MotoSVG },
    { val: 'transport', label: 'Transport commun', sub: 'Bus, minibus', Img: BusSVG },
    { val: 'poids_lourd', label: 'Poids lourd', sub: 'Camions, remorques', Img: TruckSVG },
];

export const DOCS = [
    { val: 'recepisse', label: 'Récépissé', sub: "Remis lors d'une saisie ou d'une contravention", Img: RecepisseDocSVG },
    { val: 'pv', label: 'Procès-verbal', sub: "Document rédigé lors d'un payement", Img: ProcesVerbalSVG },
];

export const MODES = [
    { val: 'scan', label: "Scanner une pièce d'identité", sub: 'Prenez une photo', mobileOnly: true, Img: ScanIDSVG, color: '#f0fdf4' },
    { val: 'adv', label: 'Par plaque ou châssis', sub: 'Saisissez la plaque AZxxxx ou le n° châssis', Img: PlaqueSVG, color: '#fffbeb' },
    { val: 'ref', label: 'N° Récépissé / PV', sub: 'Sous forme WRxxxxxxxx ou PYxxxxxxx', Img: RefNumSVG, color: '#eff6ff' },
];
