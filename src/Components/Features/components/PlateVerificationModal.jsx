import React from 'react';
import { FiX as X, FiInfo as Info } from 'react-icons/fi';
import { FaCar as Car } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

export function PlateVerificationModal({
    isOpen,
    onClose,
    pendingDoc,
    plateInput,
    setPlateInput,
    plateError,
    onVerify,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                // onClick={onClose}
                className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-4 md:p-6"
            >
                {/* <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-app-bg transition-colors"
                >
                    <X className="w-5 h-5 text-text-secondary" />
                </button> */}

                <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                        <Car className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-semibold text-text-title mb-2">Vérification du Véhicule</h3>
                    <p className="text-sm text-text-secondary mb-6">
                        Veuillez saisir le numéro de plaque d'immatriculation associé au document <span className="font-bold text-primary">{pendingDoc?.reference}</span> pour y accéder.
                    </p>

                    <form onSubmit={onVerify} className="space-y-6">
                        <div id="plate-input-container" className="flex justify-center flex-col gap-1">
                            <label className="text-xs tracking-widest text-text-secondary text-left block mb-1 ml-1">Immatriculation</label>
                            <input
                                type="text"
                                autoFocus
                                placeholder="1234AB"
                                className={cn(
                                    "w-full text-center uppercase tracking-widest text-xl font-bold py-4 rounded-xl border outline-none transition-all",
                                    plateError
                                        ? "border-error bg-error/5 text-error ring-1 ring-error/10"
                                        : "border-divider bg-app-bg focus:border-primary focus:bg-white text-text-title"
                                )}
                                value={plateInput}
                                onChange={(e) => setPlateInput(e.target.value)}
                            />
                        </div>

                        {plateError && (
                            <p className="text-xs text-error italic tracking-widest">Numéro de plaque incorrect</p>
                        )}

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={!plateInput.trim()}
                                className="w-full py-4 bg-primary text-white rounded-xl font-semibold uppercase text-[11px] tracking-widest hover:bg-primary-light cursor-pointer"
                            >
                                Vérifier et Accéder
                            </button>
                            <div className="mt-4 p-4 bg-app-bg rounded-xl border border-divider flex items-start gap-3">
                                <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <p className="text-[10px] font-medium text-text-secondary leading-relaxed text-left">
                                    Conformément à la politique de sécurité, la re-validation de la plaque est requise même via lien direct pour protéger vos données personnelles.
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
