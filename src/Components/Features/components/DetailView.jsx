import React from 'react';
import { FiChevronLeft as ChevronLeft, FiDownload as Download, FiCreditCard as CreditCard, FiCheckCircle as CheckCircle2, FiInfo as Info, FiUser as User, FiPhone as Phone } from 'react-icons/fi';
import { FaStamp as Stamp, FaGavel as Gavel, FaCar as Car, FaShieldAlt as ShieldCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { getStatusColor, getStatusIcon } from '../services/uiHelpers';
import { DetailField } from './DetailField';
import moment from 'moment';
import { downloadReceiptPdf } from '../services/receiptPdfGenerator';
import { downloadReportPdf } from '../services/reportPdfGenerator';

export function DetailView({ doc, onBack }) {
    const [downloading, setDownloading] = React.useState(false);

    const handleDownload = async () => {
        setDownloading(true);
        try {
            if (doc.type === 'RECEPISE') {
                await downloadReceiptPdf(doc);
            } else {
                await downloadReportPdf(doc);
            }
        } finally {
            setDownloading(false);
        }
    };
    // Liste des documents/pièces retirés
    const withdrawnItems = [];
    if (doc.withdrawnDocs) {
        const labels = {
            cni: 'CNI',
            pc: 'Permis de conduire',
            cg: 'Carte grise',
            vt: 'Visite technique',
            lp: 'Laisser-passer',
            cbtaxi: 'Carte bleue taxi',
            insurance: 'Assurance',
        };
        Object.entries(labels).forEach(([key, label]) => {
            if (doc.withdrawnDocs[key]) {
                withdrawnItems.push({ label, value: doc.withdrawnDocs[key] });
            }
        });
        if (doc.withdrawnDocs.vehicle) {
            withdrawnItems.push({ label: 'Véhicule / Engin', value: 'Mis en fourrière' });
        }
    }

    return (
        <motion.main
            key="detail"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="max-w-4xl mx-auto px-4 py-6"
        >
            <button
                onClick={onBack}
                className="group flex items-center gap-2 text-xs text-text-secondary hover:text-primary transition-colors mb-6 cursor-pointer"
            >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Retour aux résultats
            </button>

            <div className="bg-white rounded-xl border border-divider shadow-mui/10 overflow-hidden">
                {/* En-tête du document */}
                <div className="bg-primary p-4 md:p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 backdrop-blur-3xl animate-pulse" />
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                                    {doc.type === 'RECEPISE' ? <Stamp className="w-6 h-6 text-white" /> : <Gavel className="w-6 h-6 text-white" />}
                                </div>
                                <span className="text-xs font-semibold tracking-[0.2em] opacity-80">
                                    {doc.type === 'RECEPISE' ? (doc.withdrawnDocs?.vehicle ? "Récépissé de retrait d'engin" : "Récépissé de retrait de pièces") : 'Procès-Verbal Matérialisant le Paiement'}
                                </span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-sans font-semibold mb-3 leading-none tracking-tight">{doc.reference}</h2>
                            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest opacity-90 px-4 py-2 bg-white/10 rounded-xl w-fit backdrop-blur-md">
                                <Car className="w-4 h-4" /> {doc.plateNumber}
                            </div>
                        </div>
                        <button 
                            onClick={handleDownload}
                            disabled={downloading}
                            className="px-6 py-4 bg-white text-primary rounded-xl font-semibold uppercase text-[11px] tracking-widest hover:bg-app-bg transition-all flex items-center gap-2 cursor-pointer text-center disabled:opacity-50 disabled:cursor-wait"
                        >
                            {downloading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75"/></svg>
                                    <span>Génération...</span>
                                </>
                            ) : (
                                <>
                                    <Download className="w-4 h-4 shrink-0" />
                                    <span>{doc.type === 'RECEPISE' ? 'Télécharger le récépissé' : 'Télécharger le PV'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Corps du document */}
                <div className="p-4 md:p-6 relative bg-white">
                    {/* Statut + Propriétaire */}
                    <div className="flex justify-between items-center mb-6">
                        <div className={cn(
                            "px-4 py-2 rounded-lg text-[11px] uppercase tracking-widest border flex items-center gap-2 shadow-sm",
                            getStatusColor(doc.status)
                        )}>
                            {getStatusIcon(doc.status)}
                            {doc.status === 'PAYE' ? 'Payé' : doc.status === 'IMPAYE' ? 'Impayé' : doc.status}
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-xs text-text-secondary leading-none mb-1">Contrevenant</span>
                            <p className="text-xs font-semibold text-text-title">{doc.citizenName}</p>
                        </div>
                    </div>

                    {/* Informations principales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <DetailField label="Date d'enregistrement" value={moment(doc.date).format('DD/MM/YYYY HH:mm:ss')} />
                        {/* <DetailField label="Bureau d'émission" value={doc.issuer} /> */}

                        {doc.agentId && (
                            <DetailField label="Agent verbalisateur" value={doc.agentId} />
                        )}

                        {doc.description && (
                            <DetailField label="Description du véhicule" value={doc.description} />
                        )}

                        {doc.chassis && (
                            <DetailField label="N° de Châssis (VIN)" value={doc.chassis} />
                        )}

                        {doc.ownerName && doc.ownerName !== doc.citizenName && (
                            <DetailField label="Propriétaire du véhicule" value={doc.ownerName} />
                        )}

                        {doc.amount > 0 && (
                            <DetailField
                                label={doc.type === 'PROCES_VERBAL' ? "Montant réglé" : doc.status === 'IMPAYE' ? "Montant à régulariser" : "Montant réglé"}
                                value={`${doc.amount.toLocaleString()} FCFA`}
                                color={doc.status === 'IMPAYE' ? "text-error" : "text-success"}
                            />
                        )}

                        {doc.paymentMode && (
                            <DetailField label="Mode de paiement" value={doc.paymentMode === 'cash' ? 'Espèces' : doc.paymentMode === 'mobile_money' ? 'Mobile Money' : doc.paymentMode} />
                        )}

                        {doc.receiptRef && (
                            <DetailField label="Récépissé associé" value={doc.receiptRef} />
                        )}
                    </div>

                    {/* Documents / Pièces retirés */}
                    {withdrawnItems.length > 0 && (
                        <div className="bg-app-bg p-4 rounded-xl mb-4 border border-divider">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-text-secondary text-center mb-3">
                                Pièces retirées ({withdrawnItems.length})
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {withdrawnItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-divider">
                                        <div className="w-2 h-2 bg-error rounded-full shrink-0" />
                                        <span className="text-xs font-semibold text-text-title">{item.label}</span>
                                        {typeof item.value === 'string' && item.value !== 'Mis en fourrière' && (
                                            <span className="text-[10px] text-text-secondary ml-auto truncate max-w-[120px]">{item.value}</span>
                                        )}
                                        {item.value === 'Mis en fourrière' && (
                                            <span className="text-[10px] text-error font-semibold ml-auto">Fourrière</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Motifs / Infractions */}
                    {doc.motifs && doc.motifs.length > 0 && (
                        <div className="bg-app-bg p-4 rounded-xl mb-4 border border-divider relative overflow-hidden">
                            <div className="flex flex justify-center text-center gap-2 mb-3">
                                <p className="text-[11px] font-bold uppercase tracking-widest text-text-secondary text-center">
                                    {doc.type === 'RECEPISE' ? 'Infractions' : 'Motifs'} ({doc.motifs.length})
                                </p>
                            </div>

                            <ul className="text-sm md:text-base font-sans font-medium text-text-title leading-relaxed max-w-2xl mx-auto space-y-2 text-left list-disc list-inside">
                                {doc.motifs.map((motif, index) => (
                                    <li key={index}>{motif}</li>
                                ))}
                            </ul>
                            {doc.type === 'PROCES_VERBAL' && (
                                <div className="mt-8 pt-8 border-t border-divider/50 flex items-center justify-center gap-2 text-[10px] font-bold uppercase text-success tracking-widest">
                                    <CheckCircle2 className="w-4 h-4" /> Ce PV confirme la clôture administrative du dossier
                                </div>
                            )}
                        </div>
                    )}

                    {/* Note de l'agent */}
                    {doc.agentNote && (
                        <div className="bg-warning/5 p-4 rounded-xl mb-4 border border-warning/20">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-warning mb-2">Note de l'agent</p>
                            <p className="text-sm text-text-main italic">{doc.agentNote}</p>
                        </div>
                    )}

                    <div className="mt-16 pt-10 border-t border-divider flex items-center justify-center gap-3">
                        <ShieldCheck className="w-4 h-4 text-success" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary opacity-80">Ce document est crypté et authentifié par la Police Nationale du Togo.</p>
                    </div>
                </div>
            </div>
        </motion.main>
    );
}
