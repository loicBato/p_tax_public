import React from 'react';
import { FiChevronLeft as ChevronLeft, FiSearch as Search, FiInfo as Info, FiClock as Clock, FiChevronRight as ChevronRight } from 'react-icons/fi';
import { FaStamp as Stamp, FaGavel as Gavel, FaCar as Car } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { getStatusColor, getStatusIcon } from '../services/uiHelpers';
import moment from 'moment';
import { FiUser as User } from 'react-icons/fi';

/**
 * Masque un nom : "LHADJO GTOKOU" → "LH**** GT****"
 */
function maskName(name) {
    if (!name) return '—';
    return name.split(/\s+/).map(word => {
        if (word.length <= 2) return word;
        return word.slice(0, 2).toUpperCase() + 'x'.repeat(Math.min(word.length - 0, 6));
    }).join(' ');
}

/**
 * Masque une plaque : "TG1234AB" → "TG****AB", "9131AJ" → "91**AJ"
 */
function maskPlate(plate) {
    if (!plate) return '—';
    const clean = plate.replace(/[\s-]/g, '');
    if (clean.length <= 4) return clean.slice(0, 1) + 'x'.repeat(clean.length - 1);
    return clean.slice(0, 1) + 'x'.repeat(clean.length - 2) + clean.slice(-1);
}

export function ResultsView({ results, searchQuery, onReset, onSelectDoc }) {
    return (
        <motion.main
            key="results"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-5xl w-full mx-auto px-4 py-8"
        >
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-3 mb-6 border-b border-divider pb-3">
                <div className="space-y-1">
                    <button
                        onClick={onReset}
                        className="group flex items-center gap-2 text-xs text-text-secondary hover:text-primary transition-colors mb-6 cursor-pointer"
                    >
                        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Retour à la recherche
                    </button>
                    <h2 className="text-base md:text-xl ">Résultats de <span className="text-primary italic">Consultation</span></h2>
                    <div className="flex items-center gap-2 px-3 py-1 bg-divider/30 rounded-full w-fit">
                        <Search className="w-3 h-3 text-text-secondary" />
                        <span className="text-[10px] font-semibold text-text-secondary tracking-widest uppercase">{searchQuery}</span>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-sm font-sans font-medium text-text-secondary mb-1">{results.length} document(s) trouvé(s)</p>
                    {/* <div className="h-1 w-20 bg-primary ml-auto" /> */}
                </div>
            </div>

            {results.length === 0 ? (
                <div className="text-center px-6 py-16 bg-white rounded-xl border border-dashed border-divider">
                    <div className="w-16 h-16 bg-app-bg rounded-full flex items-center justify-center mx-auto mb-6">
                        <Info className="w-8 h-8 text-text-secondary/50" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-title mb-3">Aucun dossier trouvé</h3>
                    <p className="text-text-main mb-8 opacity-70">Nous n'avons trouvé aucun document correspondant à votre recherche.</p>
                    <button
                        onClick={onReset}
                        className="px-8 py-3 bg-primary text-white rounded-lg  text-sm tracking-widest hover:bg-primary-light cursor-pointer"
                    >
                        Réessayer
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {results.map((doc) => (
                        <motion.div
                            key={doc.id}
                            onClick={() => onSelectDoc(doc)}
                            // whileHover={{ y: -4, scale: 1.01 }}
                            className="group bg-white p-3 md:p-5 rounded-xl border border-divider hover:border-primary cursor-pointer flex flex-row md:items-center gap-4 shadow-mui/5"
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-inner",
                                doc.type === 'PROCES_VERBAL' ? "bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white" : "bg-app-bg text-text-secondary group-hover:bg-primary group-hover:text-white"
                            )}>
                                {doc.type === 'RECEPISE' ? <Stamp className="w-5 h-5" /> : <Gavel className="w-5 h-5" />}
                            </div>

                            <div className="flex-1 space-y-1">
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-primary/60 leading-none mb-1">
                                            {doc.type === 'RECEPISE' ? 'Récépissé en attente' : 'Procès-Verbal Finalisé'}
                                        </span>
                                        <span className="text-sm md:text-base font-sans font-semibold ">{doc.reference}</span>
                                    </div>
                                    {/* <div className={cn(
                                        "px-2 py-1 rounded-md text-[10px] border flex items-center gap-1",
                                        getStatusColor(doc.status)
                                    )}>
                                        {getStatusIcon(doc.status)}
                                        {doc.status}
                                    </div> */}
                                </div>
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex items-center gap-2 text-[11px] text-text-secondary uppercase">
                                        <Car className="w-3 h-3" /> {maskPlate(doc.plateNumber)}
                                    </div>
                                    <div className="w-px h-3 bg-divider" />
                                    <div className="flex items-center gap-2 text-[11px] text-text-secondary">
                                        <User className="w-3 h-3" /> {maskName(doc.citizenName || doc.ownerName)}
                                    </div>
                                    <div className="w-px h-3 bg-divider" />
                                    <div className="flex items-center gap-2 text-[11px] text-text-secondary">
                                        <Clock className="w-3 h-3" /> {moment(doc.date).format('DD/MM/YYYY HH:mm')}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 md:pl-10 md:border-l border-divider">
                                <div className="text-right hidden sm:block">
                                    {doc?.type === 'PROCES_VERBAL' && <p className="text-xl font-bold text-text-title leading-tight">{doc.amount ? `${doc.amount.toLocaleString('fr-FR')} FCFA` : '—'}</p>}
                                    {/* <p className="text-[10px] font-medium text-text-secondary uppercase tracking-tighter">{doc.issuer}</p> */}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-app-bg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-inner border border-divider group-hover:border-primary">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.main>
    );
}
