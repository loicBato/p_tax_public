import React, { useState } from 'react';
import { FiArrowRight as ArrowRight, FiChevronLeft as ChevronLeft, FiSearch as Search } from 'react-icons/fi';
import { FaBus, FaCar, FaMotorcycle, FaTruck, FaShieldAlt as ShieldCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { LuFileText, LuScrollText } from 'react-icons/lu';
import { VscReferences } from 'react-icons/vsc';
import { CgPassword } from 'react-icons/cg';

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
        val: 'ref',
        label: 'Par référence',
        sub: 'Accès direct, résultat unique',
        iconBg: 'bg-blue-50',
        icon: <VscReferences />,
    },
    {
        val: 'adv',
        label: 'Par plaque / châssis',
        sub: 'Filtrer par engin et document',
        iconBg: 'bg-amber-50',
        icon: <CgPassword />,
    },
];

function StepPill({ label, status }) {
    const base = 'text-[11px] font-semibold px-3 py-1 rounded-full border transition-all';
    const styles = {
        active: 'bg-blue-50 text-blue-700 border-blue-300',
        done: 'bg-green-50 text-green-700 border-green-300',
        idle: 'bg-surface text-text-secondary border-divider',
    };
    return <span className={`${base} ${styles[status]}`}>{label}</span>;
}

function Chevron() {
    return (
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path d="M5 3l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function HomeView({ onSearch, isSearching }) {
    const [mode, setMode] = useState(null);       // 'ref' | 'adv'
    const [advStep, setAdvStep] = useState(1);    // 1 | 2 | 3
    const [engin, setEngin] = useState(null);
    const [docType, setDocType] = useState(null);
    const [reference, setReference] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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
                                onClick={() => handleSelectMode(m.val)}
                                className={`flex items-center gap-3 p-2 rounded-xl border text-left transition-all cursor-pointer
                  ${mode === m.val
                                        ? 'border-primary border-2 bg-primary/5'
                                        : 'border-divider bg-white hover:border-primary/40 hover:bg-surface'
                                    }`}
                            >
                                <div className={`w-9 h-9 rounded-lg ${m.iconBg} flex items-center justify-center flex-shrink-0`}>
                                    {m.icon}
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
                                    Saisissez le numéro de référence.
                                </p>
                                <form onSubmit={handleSearchRef} className="flex flex-col sm:flex-row gap-3 mb-2">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Ex: REC-2024-001 · PV-2024-992"
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
                                <div className="flex items-center gap-2 mb-5 flex-wrap">
                                    <StepPill label="1 · Engin" status={pillStatus(1)} />
                                    <Chevron />
                                    <StepPill label="2 · Document" status={pillStatus(2)} />
                                    <Chevron />
                                    <StepPill label="3 · Critère" status={pillStatus(3)} />
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