import React, { useState } from 'react';
import { FiArrowRight as ArrowRight, FiChevronLeft as ChevronLeft, FiSearch as Search, FiCamera as Camera } from 'react-icons/fi';
import { FaBus, FaCar, FaMotorcycle, FaTruck, FaShieldAlt as ShieldCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { LuFileText, LuScrollText } from 'react-icons/lu';
import { VscReferences } from 'react-icons/vsc';
import { CgPassword } from 'react-icons/cg';
import { useOcr } from '../hooks/useOcr';
import { IoScanSharp } from 'react-icons/io5';

const ENGINS = [
    { val: 'voiture', label: 'Véhicule léger', sub: 'Voitures', icon: <FaCar /> },
    { val: 'moto', label: 'Moto / Tricycle', sub: '2 et 3 roues', icon: <FaMotorcycle /> },
    { val: 'transport', label: 'Transport commun', sub: 'Bus, minibus', icon: <FaBus /> },
    { val: 'poids_lourd', label: 'Poids lourd', sub: 'Camions', icon: <FaTruck /> },
];

const DOCS = [
    { val: 'recepisse', label: 'Récépissé', icon: <LuScrollText /> },
    { val: 'pv', label: 'Procès-verbal', icon: <LuFileText /> },
];

const MODES = [
    {
        val: 'scan',
        label: 'Prendre une photo',
        sub: 'Piece d\'Identité',
        iconBg: 'bg-green-50',
        classname: 'md:hidden',
        icon: <IoScanSharp />,
    },
    {
        val: 'adv',
        label: 'Par plaque / châssis',
        sub: 'AZxxxx / xxxxxxxxxxxxxxxx',
        iconBg: 'bg-amber-50',
        icon: <CgPassword />,
    },

    {
        val: 'ref',
        label: 'N° Récépissé / PV',
        sub: 'WRxxxxxxx / PYxxxxxxxxxxx',
        iconBg: 'bg-blue-50',
        icon: <VscReferences />,
    },

];

function StepPill({ step, label, status }) {
    const isDone = status === 'done';
    const isActive = status === 'active';

    return (
        <div className={`flex items-center gap-2 transition-all ${isActive ? 'opacity-100' : 'opacity-60'}`}>
            <div className={`w-6 h-6 flex items-center justify-center rounded-full text-[11px] font-bold border-2 
                ${isDone ? 'bg-primary border-primary text-white' : isActive ? 'bg-white border-primary text-primary' : 'bg-surface border-divider text-text-secondary'}`}>
                {step}
            </div>
            <span className={`text-[13px] hidden sm:block ${isActive ? 'text-text-title' : 'text-text-secondary'}`}>{label}</span>
        </div>
    );
}

function StepDivider({ active }) {
    return <div className={`h-[2px] w-6 sm:w-15 rounded-full transition-all ${active ? 'bg-primary' : 'bg-divider'}`} />;
}

export function HomeView({ onSearch, isSearching }) {
    const [mode, setMode] = useState(null);       // 'ref' | 'adv'
    const [advStep, setAdvStep] = useState(1);    // 1 | 2 | 3
    const [engin, setEngin] = useState(null);
    const [docType, setDocType] = useState(null);
    const [reference, setReference] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // OCR : reconnaissance de texte depuis une photo
    const ocr = useOcr();

    // Lancer le scan OCR directement puis rechercher
    const handleOcrScan = () => {
        ocr.openCapture();
    };

    const handleSelectMode = (val) => {
        setMode(val);
        setAdvStep(1);
        setEngin(null);
        setDocType(null);
        setSearchTerm('');
        setReference('');
    };

    const handleSelectEngin = (val) => {
        setEngin(val);
        setTimeout(() => setAdvStep(2), 160);
    };

    const handleSelectDoc = (val) => {
        setDocType(val);
        setTimeout(() => setAdvStep(3), 160);
    };

    const goBack = (to) => {
        if (to === 1) { setEngin(null); setDocType(null); }
        if (to === 2) { setDocType(null); }
        setAdvStep(to);
    };

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

    const pillStatus = (n) => {
        if (advStep > n) return 'done';
        if (advStep === n) return 'active';
        return 'idle';
    };

    return (
        <motion.main
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-3xl w-full mx-auto px-4 py-8 md:py-16 flex flex-col items-center"
        >
            {/* Hero */}
            <section className="w-full text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest mb-5">
                    <ShieldCheck className="w-3 h-3" /> Consultation officielle
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-text-title mb-3 tracking-tight">
                    Retrouvez vos <span className="text-primary">Contraventions Routières</span>
                </h2>
                <p className="text-sm text-text-secondary italic max-w-xl mx-auto">
                    Choisissez votre mode de recherche pour commencer.
                </p>
            </section>

            {/* Card principale */}
            <div className="w-full bg-white rounded-xl border border-divider shadow-mui/5 p-4">

                {/* Sélection du mode */}
                <div className="mb-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-text-secondary mb-3">
                        Mode de recherche
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {MODES.map((m) => (
                            <button
                                key={m.val}
                                onClick={() => {
                                    if (m.val === 'scan') {
                                        handleOcrScan();
                                    } else {
                                        handleSelectMode(m.val);
                                    }
                                }}
                                className={`flex items-center gap-3 p-2 rounded-xl border text-left transition-all cursor-pointer ${m.classname}
                  ${mode === m.val
                                        ? 'border-primary border-2 bg-primary/5'
                                        : 'border-divider bg-white hover:border-primary/40 hover:bg-surface'
                                    }`}
                            >
                                <div className={`w-9 h-9 rounded-lg ${m.iconBg} flex items-center justify-center flex-shrink-0`}>
                                    {ocr.isProcessing && m.val === 'scan' ? (
                                        <div className="w-4 h-4 border-2 border-green-600/30 border-t-green-600 rounded-full animate-spin" />
                                    ) : (
                                        m.icon
                                    )}
                                </div>
                                <div>
                                    <p className={`text-[13px] font-semibold ${mode === m.val ? 'text-primary' : 'text-text-title'}`}>
                                        {m.label}
                                    </p>
                                    <p className="text-[11px] text-text-secondary">{m.sub}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Contenu dynamique */}
                <AnimatePresence mode="wait">

                    {/* ── Mode référence ── */}
                    {mode === 'ref' && (
                        <motion.div
                            key="panel-ref"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                        >
                            <div className="border-t border-divider pt-5">
                                <p className="text-sm text-text-secondary mb-3">
                                    Saisissez le numéro de récépissé ou du procès verbal
                                </p>
                                <form onSubmit={handleSearchRef} className="flex flex-col sm:flex-row gap-3 mb-2">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="WRxxxxxxxxx ou PYxxxxxxxxx"
                                            className="w-full pl-9 pr-3 py-3 border border-divider rounded-lg text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                                            value={reference}
                                            onChange={(e) => setReference(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSearching || !reference.trim()}
                                        className="w-full sm:w-auto px-5 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-all flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer"
                                    >
                                        {isSearching
                                            ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            : <><span>Rechercher</span><ArrowRight className="w-4 h-4" /></>
                                        }
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {/* ── Mode avancé ── */}
                    {mode === 'adv' && (
                        <motion.div
                            key="panel-adv"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                        >
                            <div className="border-t border-divider pt-3">

                                {/* Breadcrumb */}
                                <div className="flex items-center gap-3 mb-6 w-full justify-center">
                                    <StepPill step="1" label="Engin" status={pillStatus(1)} />
                                    <StepDivider active={advStep > 1} />
                                    <StepPill step="2" label="Document" status={pillStatus(2)} />
                                    <StepDivider active={advStep > 2} />
                                    <StepPill step="3" label="Critère" status={pillStatus(3)} />
                                </div>

                                <AnimatePresence mode="wait">

                                    {/* Étape 1 — Engin */}
                                    {advStep === 1 && (
                                        <motion.div key="a1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                                            <p className="text-sm font-semibold text-text-secondary mb-3">Quel type d'engin ?</p>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                {ENGINS.map((e) => (
                                                    <button
                                                        key={e.val}
                                                        onClick={() => handleSelectEngin(e.val)}
                                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer transition-all
                              ${engin === e.val ? 'border-primary border-2 bg-primary/5' : 'border-divider bg-white hover:border-primary/40'}`}
                                                    >
                                                        <span className="text-xl">{e.icon}</span>
                                                        <span className={`text-[13px] font-medium text-center leading-tight ${engin === e.val ? 'text-primary' : 'text-text-title'}`}>
                                                            {e.label}
                                                        </span>
                                                        <span className="text-[11px] text-text-secondary">{e.sub}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Étape 2 — Document */}
                                    {advStep === 2 && (
                                        <motion.div key="a2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                                            <p className="text-sm font-semibold text-text-secondary mb-3">Quel type de document ?</p>
                                            <div className="flex gap-3">
                                                {DOCS.map((d) => (
                                                    <button
                                                        key={d.val}
                                                        onClick={() => handleSelectDoc(d.val)}
                                                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all flex-1
                              ${docType === d.val ? 'border-primary border-2 bg-primary/5' : 'border-divider bg-white hover:border-primary/40'}`}
                                                    >
                                                        <span className="text-2xl">{d.icon}</span>
                                                        <span className={`text-[13px] font-medium ${docType === d.val ? 'text-primary' : 'text-text-title'}`}>
                                                            {d.label}
                                                        </span>
                                                        {/* <span className="text-[11px] text-text-secondary">{d.sub}</span> */}
                                                    </button>
                                                ))}
                                            </div>
                                            <button onClick={() => goBack(1)} className="mt-4 text-xs text-text-secondary flex items-center gap-1 hover:text-primary transition-colors">
                                                <ChevronLeft className="w-3 h-3" /> Retour
                                            </button>
                                        </motion.div>
                                    )}

                                    {/* Étape 3 — Plaque / Châssis */}
                                    {advStep === 3 && (
                                        <motion.div key="a3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                                            {/* Badges récap */}
                                            <div className="flex gap-2 flex-wrap mb-4">
                                                {engin && (
                                                    <span className="text-[11px] px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full">
                                                        {ENGINS.find(e => e.val === engin)?.label}
                                                    </span>
                                                )}
                                                {docType && (
                                                    <span className="text-[11px] px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full">
                                                        {DOCS.find(d => d.val === docType)?.label}
                                                    </span>
                                                )}
                                            </div>

                                            <form onSubmit={handleSearchAdv} className="flex flex-col sm:flex-row gap-3 mb-2">
                                                <div className="relative flex-1">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
                                                    <input
                                                        type="text"
                                                        placeholder="Plaque / châssis"
                                                        className="w-full pl-9 pr-3 py-3 border border-divider rounded-lg text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={isSearching || !searchTerm.trim()}
                                                    className="w-full sm:w-auto px-5 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-all flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer"
                                                >
                                                    {isSearching
                                                        ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        : <><span>Rechercher</span><ArrowRight className="w-4 h-4" /></>
                                                    }
                                                </button>
                                            </form>

                                            <button onClick={() => goBack(2)} className="mt-4 text-xs text-text-secondary flex items-center gap-1 hover:text-primary transition-colors">
                                                <ChevronLeft className="w-3 h-3" /> Retour
                                            </button>
                                        </motion.div>
                                    )}

                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}

                    {/* Placeholder initial */}
                    {!mode && (
                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="border-t border-divider pt-5 text-center text-sm text-text-secondary py-4">
                                Sélectionnez un mode de recherche ci-dessus.
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>

                {/* Input fichier caméra global (mode scan) */}
                <input
                    ref={ocr.fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => ocr.handleFileChange(e, (text) => {
                        if (text) {
                            if (mode === 'adv') {
                                setSearchTerm(text);
                            } else {
                                setMode('ref');
                                setReference(text);
                            }
                        }
                    })}
                />

                {/* Indicateur OCR global */}
                {ocr.isProcessing && (
                    <div className="flex items-center justify-center gap-3 text-sm text-primary py-4 mt-2 border-t border-divider animate-pulse">
                        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        Analyse de l'image en cours…
                    </div>
                )}
            </div>

            {/* Cards bas */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-5">
                <div className="bg-white p-5 rounded-xl border border-divider flex gap-3 items-start">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-4 h-4 text-blue-700" />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-text-title mb-1">Confidentialité</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                            Seuls le détenteur et les autorités peuvent consulter ce dossier via ces identifiants uniques.
                        </p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-divider flex gap-3 items-start">
                    <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="3" y="2" width="10" height="12" rx="1.5" stroke="#3B6D11" strokeWidth="1.2" />
                            <path d="M5.5 7.5l1.5 1.5 3-3" stroke="#3B6D11" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-text-title mb-1">Authenticité</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                            Chaque document possède un QR code d'authentification vérifiable par tout agent.
                        </p>
                    </div>
                </div>
            </div> */}
        </motion.main>
    );
}