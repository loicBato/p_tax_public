import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FiSearch as Search,
    FiChevronDown as ChevronDown,
    FiMessageCircle as MessageCircle,
    FiFileText as FileText,
    FiCreditCard as CreditCard,
    FiShield as Shield,
    FiArrowRight as ArrowRight
} from 'react-icons/fi';

const FAQ_DATA = [
    {
        category: "Consultation & Recherche",
        icon: <Search className="w-5 h-5" />,
        items: [
            {
                q: "Comment trouver mon récépissé ou procès-verbal ?",
                a: "Sur la page d'accueil, vous pouvez rechercher votre document en utilisant soit votre numéro de plaque d'immatriculation, la référence du document ou le numéro de châssis de votre véhicule."
            },
            {
                q: "Que faire si ma recherche ne donne aucun résultat ?",
                a: "Vérifiez d'abord que vous avez saisi les informations correctement, sans espace supplémentaire. Si le problème persiste, il est possible que votre document ne soit pas encore numérisé dans le système. Veuillez réessayer plus tard ou contacter le centre d'assistance."
            },
            {
                q: "Pourquoi me demande-t-on de vérifier ma plaque d'immatriculation ?",
                a: "C'est une mesure de sécurité. Pour protéger la confidentialité de vos données, nous devons nous assurer que vous êtes bien la personne autorisée à consulter ce document en vous demandant de confirmer l'immatriculation associée au document."
            }
        ]
    },
    {
        category: "Paiement & Statut",
        icon: <CreditCard className="w-5 h-5" />,
        items: [
            {
                q: "Que signifie le statut « Impayé » ?",
                a: "Un statut Impayé indique que les amendes liées aux infractions mentionnées sur votre document n'ont pas encore été réglées. Vos pièces ou votre véhicule resteront retenus jusqu'au paiement."
            },
            {
                q: "Comment puis-je payer mon amende ?",
                a: "Actuellement, le paiement s'effectue physiquement au commissariat indiqué sur votre document (ex: Commissariat Central de Lomé). Présentez-vous avec le montant exact et votre récépissé. Le paiement en ligne sera bientôt disponible."
            },
            {
                q: "Le statut de mon document ne s'actualise pas après le paiement.",
                a: "Il peut y avoir un léger délai de traitement. Si le statut n'est pas mis à jour 24h après votre paiement physique, veuillez contacter le centre d'assistance avec la référence de votre document."
            }
        ]
    },
    {
        category: "Restitution des biens",
        icon: <FileText className="w-5 h-5" />,
        items: [
            {
                q: "Quelles sont les conditions pour récupérer mon véhicule en fourrière ?",
                a: "Vous devez vous présenter au lieu de dépôt avec : le récépissé de retrait d'engin, une pièce d'identité valide, les documents originaux du véhicule (carte grise, assurance), et la preuve du paiement des amendes et des frais de fourrière."
            },
            {
                q: "Où dois-je aller pour récupérer mes pièces (permis, carte grise, etc.) ?",
                a: "Vos pièces doivent être récupérées au commissariat ou au poste de police qui a émis le récépissé, indiqué dans la section « Bureau d'émission » de votre document, après le paiement des amendes correspondantes."
            },
            {
                q: "Quelqu'un d'autre peut-il récupérer mon véhicule ou mes pièces à ma place ?",
                a: "En règle générale, le propriétaire légal doit se présenter en personne. Si cela est impossible, un mandataire peut s'y rendre muni d'une procuration légalisée, de la copie de votre pièce d'identité et de sa propre pièce d'identité."
            }
        ]
    },
    {
        category: "Sécurité & Technique",
        icon: <Shield className="w-5 h-5" />,
        items: [
            {
                q: "Le PDF téléchargé est-il un document officiel ?",
                a: "Oui, le PDF généré via notre plateforme est une copie numérique fidèle du document physique de la Police Nationale du Togo."
            },
            {
                q: "J'ai reçu un lien par SMS, est-ce sécurisé ?",
                a: "Les SMS officiels du système P-Tax contiennent des liens débutant par ptax.tg/. Si vous avez un doute, ne cliquez pas sur le lien et rendez-vous directement sur ptax.tg pour effectuer votre recherche avec la référence."
            }
        ]
    }
];

export default function FaqPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [openIndex, setOpenIndex] = useState(`0-0`); // First item of first category open by default

    // Filtrer les FAQs selon la recherche
    const filteredFaq = FAQ_DATA.map(category => ({
        ...category,
        items: category.items.filter(item =>
            item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.items.length > 0);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl w-full mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-10">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-text-title mb-3 tracking-tight">
                    Foire Aux Questions
                </h1>
                <p className="text-sm text-text-secondary max-w-lg mx-auto">
                    Retrouvez toutes les réponses à vos questions concernant l'utilisation du portail.
                </p>
            </div>

            {/* Barre de recherche */}
            <div className="relative max-w-xl mx-auto mb-12">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-text-secondary/50" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Posez votre question (ex: paiement, récépissé, fourrière...)"
                    className="w-full pl-12 pr-4 py-4 bg-white border border-divider rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all text-sm placeholder:text-text-secondary/50"
                />
            </div>

            {/* Contenu FAQ */}
            <div className="space-y-8">
                {filteredFaq.length > 0 ? (
                    filteredFaq.map((category, catIndex) => (
                        <div key={catIndex} className="bg-white rounded-xl border border-divider shadow-sm overflow-hidden">
                            {/* Titre de catégorie */}
                            <div className="flex items-center gap-3 px-6 py-4 bg-app-bg/50 border-b border-divider">
                                <div className="text-primary">{category.icon}</div>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-text-title">
                                    {category.category}
                                </h2>
                            </div>

                            {/* Questions de la catégorie */}
                            <div className="divide-y divide-divider">
                                {category.items.map((item, itemIndex) => {
                                    const currentIndex = `${catIndex}-${itemIndex}`;
                                    const isOpen = openIndex === currentIndex;

                                    return (
                                        <div key={itemIndex} className="bg-white">
                                            <button
                                                onClick={() => toggleAccordion(currentIndex)}
                                                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-app-bg transition-colors"
                                            >
                                                <span className="text-sm font-semibold text-text-title pr-8">
                                                    {item.q}
                                                </span>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'bg-primary/10 rotate-180' : 'bg-transparent'}`}>
                                                    <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-primary' : 'text-text-secondary'}`} />
                                                </div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-6 pb-5 pt-1">
                                                            <p className="text-sm text-text-secondary leading-relaxed">
                                                                {item.a}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-divider">
                        <Search className="w-8 h-8 text-text-secondary/30 mx-auto mb-3" />
                        <h3 className="text-base font-semibold text-text-title mb-1">Aucun résultat trouvé</h3>
                        <p className="text-sm text-text-secondary">
                            Nous n'avons trouvé aucune réponse pour "{searchQuery}".
                        </p>
                    </div>
                )}
            </div>

            {/* Section contact assistance */}
            <div className="mt-12 bg-primary/5 rounded-xl border border-primary/10 p-6 md:p-8 text-center flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                    <h3 className="text-lg font-bold text-text-title mb-1">Vous n'avez pas trouvé votre réponse ?</h3>
                    <p className="text-sm text-text-secondary">Notre équipe d'assistance est là pour vous aider.</p>
                </div>
                <Link
                    to="/assistance"
                    className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                >
                    Contacter l'assistance
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
