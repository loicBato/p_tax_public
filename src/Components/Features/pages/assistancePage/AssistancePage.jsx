import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiPhone as Phone,
    FiMail as Mail,
    FiMapPin as MapPin,
    FiClock as Clock,
    FiMessageCircle as MessageCircle,
    FiHelpCircle as HelpCircle,
    FiChevronRight as ChevronRight,
    FiExternalLink as ExternalLink,
    FiAlertCircle as AlertCircle,
    FiFileText as FileText,
    FiShield as Shield,
} from 'react-icons/fi';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' },
    }),
};

export default function AssistancePage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            {/* En-tête */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                    <HelpCircle className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-text-title mb-3 tracking-tight">
                    Centre d'Assistance
                </h1>
                <p className="text-sm text-text-secondary max-w-lg mx-auto leading-relaxed">
                    Besoin d'aide pour consulter vos documents, comprendre une infraction ou effectuer un paiement ?
                    Notre équipe est à votre disposition.
                </p>
            </motion.div>

            {/* Cartes de contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
                <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
                    <ContactCard
                        icon={<Phone className="w-5 h-5" />}
                        title="Par téléphone"
                        detail="+228 22 21 29 62"
                        subDetail="Lun – Ven : 07h30 – 17h00"
                        color="bg-primary"
                        href="tel:+22822212962"
                    />
                </motion.div>
                <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
                    <ContactCard
                        icon={<Mail className="w-5 h-5" />}
                        title="Par email"
                        detail="support@ptax.tg"
                        subDetail="Réponse en 24h"
                        color="bg-[#2563eb]"
                        href="mailto:support@ptax.tg"
                    />
                </motion.div>
                <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
                    <ContactCard
                        icon={<MapPin className="w-5 h-5" />}
                        title="En personne"
                        detail="Commissariat Central"
                        subDetail="Lomé, Boulevard du 13 Janvier"
                        color="bg-[#059669]"
                    />
                </motion.div>
            </div>

            {/* Horaires d'ouverture */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
                className="bg-white rounded-xl border border-divider shadow-sm p-4 mb-8"
            >
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-warning/10 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-warning" />
                    </div>
                    <h2 className="text-lg font-bold text-text-title">Horaires d'ouverture</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <HoraireRow jour="Lundi – Vendredi" horaire="07h30 – 12h00 / 14h30 – 17h00" actif />
                    <HoraireRow jour="Samedi" horaire="08h00 – 12h00" />
                    <HoraireRow jour="Dimanche" horaire="Fermé" ferme />
                    <HoraireRow jour="Jours fériés" horaire="Fermé" ferme />
                </div>
            </motion.div>

            {/* FAQ rapide */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
                className="bg-white rounded-xl border border-divider shadow-sm p-4 mb-8"
            >
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold text-text-title">Questions fréquentes</h2>
                </div>
                <div className="flex flex-col gap-3">
                    <FaqItem
                        question="Comment consulter mon récépissé en ligne ?"
                        answer="Rendez-vous sur la page d'accueil et saisissez votre numéro de plaque d'immatriculation, votre référence de récépissé (ex: WR2604AA00052) ou votre numéro de châssis. Les résultats s'afficheront automatiquement."
                    />
                    <FaqItem
                        question="Que signifie le statut « Impayé » ?"
                        answer="Un statut Impayé indique que les amendes liées aux infractions constatées n'ont pas encore été réglées. Veuillez vous rendre au commissariat émetteur muni de votre récépissé pour effectuer le paiement."
                    />
                    <FaqItem
                        question="Comment récupérer mon véhicule mis en fourrière ?"
                        answer="Présentez-vous au commissariat indiqué sur votre récépissé avec : votre pièce d'identité, le récépissé de retrait d'engin, les documents du véhicule (carte grise, assurance)."
                    />
                    {/* <FaqItem
                        question="Comment récupérer mes pièces retirées ?"
                        answer="Après le paiement de vos amendes, rendez-vous au bureau d'émission avec votre récépissé de retrait de pièces et une pièce d'identité. Vos documents vous seront restitués sur présentation du justificatif de paiement."
                    /> */}
                    <FaqItem
                        question="J'ai reçu un SMS avec un lien, est-ce fiable ?"
                        answer="Oui, les liens officiels P-Tax commencent toujours par ptax.tg/ suivi de /recepisse/ ou /proces-verbal/. Pour votre sécurité, une vérification de plaque d'immatriculation vous sera demandée avant l'affichage du document."
                    />
                    <FaqItem
                        question="Comment télécharger mon récépissé en PDF ?"
                        answer="Après avoir consulté votre document et vérifié votre plaque d'immatriculation, cliquez sur le bouton « Télécharger le récépissé » en haut à droite de la page de détail du document."
                    />
                </div>
            </motion.div>

            {/* Informations utiles */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
            >
                <div className="bg-white rounded-xl border border-divider shadow-sm p-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-error/10 rounded-xl flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-error" />
                        </div>
                        <h3 className="text-base font-bold text-text-title">Signaler un problème</h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                        Vous constatez une erreur sur votre récépissé ou procès-verbal ? Contactez-nous avec votre numéro de référence pour une vérification.
                    </p>
                    <a href="mailto:reclamation@ptax.tg" className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                        reclamation@ptax.tg <ExternalLink className="w-3 h-3" />
                    </a>
                </div>

                <div className="bg-white rounded-xl border border-divider shadow-sm p-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-success/10 rounded-xl flex items-center justify-center">
                            <Shield className="w-5 h-5 text-success" />
                        </div>
                        <h3 className="text-base font-bold text-text-title">Sécurité & Confidentialité</h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                        Vos données personnelles sont protégées conformément à la réglementation en vigueur. L'accès aux documents nécessite une vérification de plaque d'immatriculation.
                    </p>
                    <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                        Retour à l'accueil <ChevronRight className="w-3 h-3" />
                    </Link>
                </div>
            </motion.div>

            {/* Pied de page assistance */}
            <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible"
                className="text-center py-6 border-t border-divider"
            >
                <p className="text-[10px] uppercase tracking-widest text-text-secondary opacity-70">
                    P-Tax Togo — Ministère de la Sécurité — Police Nationale — Direction de la Sécurité Routière
                </p>
            </motion.div>
        </div>
    );
}

// ── Composants internes ──

function ContactCard({ icon, title, detail, subDetail, color, href }) {
    const Wrapper = href ? 'a' : 'div';
    const props = href ? { href, target: href.startsWith('mailto') ? '_self' : '_self' } : {};

    return (
        <Wrapper {...props} className={`block bg-white rounded-xl border border-divider shadow-sm p-4 hover:shadow-md transition-all group ${href ? 'cursor-pointer' : ''}`}>
            <div className={`w-8 h-8 ${color} rounded-xl flex items-center justify-center text-white mb-2 group-hover:scale-105 transition-transform`}>
                {icon}
            </div>
            <p className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-1">{title}</p>
            <p className="text-base font-semibold text-text-title mb-1">{detail}</p>
            <p className="text-xs text-text-secondary">{subDetail}</p>
        </Wrapper>
    );
}

function HoraireRow({ jour, horaire, actif = false, ferme = false }) {
    return (
        <div className={`flex items-center justify-between px-4 py-2.5 rounded-lg border ${actif ? 'bg-success/5 border-success/20' : ferme ? 'bg-error/5 border-error/10' : 'bg-app-bg border-divider'}`}>
            <span className="text-xs font-semibold text-text-title">{jour}</span>
            <span className={`text-xs font-bold ${ferme ? 'text-error' : actif ? 'text-success' : 'text-text-secondary'}`}>
                {horaire}
            </span>
        </div>
    );
}

function FaqItem({ question, answer }) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="border border-divider rounded-lg overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-app-bg/50 transition-colors cursor-pointer"
            >
                <span className="text-sm font-semibold text-text-title pr-4">{question}</span>
                <ChevronRight className={`w-4 h-4 text-text-secondary shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} />
            </button>
            {open && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-4 pb-4"
                >
                    <p className="text-sm text-text-secondary leading-relaxed">{answer}</p>
                </motion.div>
            )}
        </div>
    );
}
