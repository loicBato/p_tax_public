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
import { ReceiptTemplate } from './ReceiptTemplate';
import { ReportPdfTemplate } from './ReportPdfTemplate';

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
                <div className="bg-primary p-4 md:p-4 text-white relative overflow-hidden">
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
                            <h2 className="text-sm md:text-2xl font-sans font-semibold mb-3 leading-none tracking-tight">{doc.reference}</h2>
                            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest opacity-90 px-4 py-2 bg-white/10 rounded-xl w-fit backdrop-blur-md">
                                <Car className="w-4 h-4" /> {doc.plateNumber || doc.chassis}
                            </div>
                        </div>
                        <button
                            onClick={handleDownload}
                            disabled={downloading}
                            className="px-3 py-3 bg-white text-primary rounded-lg font-semibold uppercase text-[11px] tracking-widest hover:bg-app-bg transition-all flex items-center gap-2 cursor-pointer text-center disabled:opacity-50 disabled:cursor-wait"
                        >
                            {downloading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" /><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" /></svg>
                                    <span>Téléchargement...</span>
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

                {/* Corps du document : Aperçu du PDF (Horizontal Scroll interne) */}
                <div className="w-full max-w-full overflow-x-auto border-t border-divider">
                    <div className="mx-auto bg-white shadow-2xl shrink-0" style={{ width: '794px', minHeight: '1123px' }}>
                        <div className="pointer-events-none">
                            {doc.type === 'RECEPISE' ? (
                                <ReceiptTemplate doc={doc} />
                            ) : (
                                <ReportPdfTemplate receipt={doc} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.main>
    );
}
