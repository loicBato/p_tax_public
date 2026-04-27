import React from 'react';
import logo from '../../assets/police.jpg';

export function PortalFooter() {
    return (
        <footer className="py-14 bg-white border-t border-divider mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="flex justify-center items-center gap-3 mb-6">
                    <img src={logo} alt="Logo" className="w-12 h-12" />
                    <div>
                        <span className="block text-xl font-bold uppercase tracking-tight text-text-title leading-none mb-1">P-Tax Togo</span>
                        <span className="text-[11px] text-primary opacity-80">Portail Public Numérique</span>
                    </div>
                </div>
                <div className="max-w-xl mx-auto p-3 rounded-xl bg-app-bg border border-divider mb-6">
                    <p className="text-xs text-text-main font-sans italic opacity-80 mb-2 tracking-wide leading-relaxed">
                        "La sécurité est un devoir partagé. Ce portail s'inscrit dans la modernisation des services du Ministère de la Sécurité et de la Protection Civile, pour plus de transparence et de proximité avec le citoyen."
                    </p>
                </div>
                <p className="text-[10px] text-text-secondary">
                    Copyright Cognitive Factory © {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
}
