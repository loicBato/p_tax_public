import React from 'react';
import { FiSearch as Search, FiArrowRight as ArrowRight } from 'react-icons/fi';
import { FaShieldAlt as ShieldCheck, FaStamp as Stamp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export function HomeView({ onSearch, searchQuery, setSearchQuery, isSearching }) {
    return (
        <motion.main
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-5xl mx-auto px-4 py-8 md:py-16 flex flex-col items-center"
        >
            {/* Search Hero */}
            <section className="w-full max-w-3xl text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
                    <ShieldCheck className="w-3 h-3" /> Consultation Officielle
                </div>
                <h2 className="text-2xl md:text-4xl font-sans font-bold text-text-title mb-4 leading-tight tracking-tight">
                    Consultez votre <span className="text-primary">Dossier Routier</span>
                </h2>
                <p className="text-base md:text-lg text-text-secondary italic mb-8 leading-relaxed max-w-2xl mx-auto">
                    Saisissez votre numéro de récépissé ou votre plaque d'immatriculation pour accéder à vos documents sécurisés.
                </p>

                <form onSubmit={onSearch} className="relative group max-w-2xl mx-auto">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative bg-white p-2 rounded-lg border border-divider shadow-mui flex flex-col sm:flex-row gap-2 md:gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-1 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Référence / Plaque / Chassis"
                                className="w-full pl-10 pr-1 py-4 md:py-3 bg-transparent outline-none text-base md:text-lg font-medium text-text-title placeholder:text-text-secondary/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="px-12 py-4 md:py-3 bg-primary text-white rounded-lg text-sm md:text-base hover:bg-primary-light transition-all flex items-center justify-center gap-3 cursor-pointer"
                        >
                            {isSearching ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Rechercher <ArrowRight className="w-4 h-4" /></>}
                        </button>
                    </div>
                </form>

                {/* <div className="mt-10 flex flex-wrap gap-3 justify-center items-center">
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest opacity-60">Exemples :</span>
                    {['REC-2024-001', 'PV-2024-992', 'TG-1234-AB'].map(term => (
                        <button
                            key={term}
                            onClick={() => { setSearchQuery(term); }}
                            className="px-4 py-2 bg-white border border-divider rounded-xl text-[10px] font-bold text-text-secondary hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95"
                        >
                            {term}
                        </button>
                    ))}
                </div> */}
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                <div className="bg-white p-6 rounded-xl border border-divider text-center space-y-4">
                    <div className="w-12 h-12 bg-app-bg rounded-2xl flex items-center justify-center mx-auto text-primary">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-semibold text-text-title">Confidentialité</h4>
                    <p className="text-sm text-text-main opacity-80 leading-relaxed">Seuls le détenteur du récépissé et les autorités peuvent consulter ce dossier via ces identifiants uniques.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-divider text-center space-y-4">
                    <div className="w-12 h-12 bg-app-bg rounded-2xl flex items-center justify-center mx-auto text-primary">
                        <Stamp className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-semibold text-text-title">Authenticité</h4>
                    <p className="text-sm text-text-main opacity-80 leading-relaxed">Chaque document téléchargé possède un QR code d'authentification vérifiable par tout agent de police.</p>
                </div>
            </div>
        </motion.main>
    );
}
