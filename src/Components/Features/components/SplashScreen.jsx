import React, { useEffect, useState } from 'react';
import { FiShield as Shield } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../../assets/police.jpeg";

export function SplashScreen({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Wait for exit animation
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
                    style={{
                        background: 'linear-gradient(160deg, #abbcc9 45%, #161e54 45%)'
                    }}
                >
                    {/* Decorative Pattern overlay */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 1,
                                ease: "easeOut",
                                delay: 0.2
                            }}
                            className="flex flex-col items-center text-center"
                        >
                            {/* Logo Area */}
                            <div className="relative mb-8">
                                <motion.div
                                    initial={{ rotate: -10, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    transition={{ duration: 1.2, ease: "backOut", delay: 0.3 }}
                                    className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl relative z-10"
                                >
                                    {/* <Shield className="w-20 h-20 text-[#161e54]" /> */}
                                    <img src={logo} alt="Logo" className="w-24 h-24 rounded-xl" />
                                </motion.div>
                                {/* Shadow/Glow effect */}
                                <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150 -z-0" />
                            </div>

                            {/* Text Area */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="space-y-2"
                            >
                                <h1 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                                    P-Tax <span className="text-white/70">Togo</span>
                                </h1>
                                <p className="text-white/50 text-[10px] font-semibold uppercase tracking-[0.3em] ml-1">
                                    Portail Numérique Officiel
                                </p>
                            </motion.div>

                            {/* Progress Indicator */}
                            <div className="mt-16 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "0%" }}
                                    transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                                    className="w-full h-full bg-white/60"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom attribution */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute bottom-12 text-center"
                    >
                        <p className="text-white/30 text-[11px] font-semibold tracking-[0.2em]">
                            Ministère de la Sécurité et de la Protection Civile
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
