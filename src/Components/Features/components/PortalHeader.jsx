import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield as Shield, FiInfo as Info } from 'react-icons/fi';
import logo from "../../assets/police.jpg";

export function PortalHeader() {
    return (
        <header className="bg-white border-b border-divider shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-4 cursor-pointer">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center bg-transparent justify-center transition-transform active:scale-95">
                        {/* <Shield className="text-white w-6 h-6" /> */}
                        <img src={logo} alt="" className="w-full h-full object-cover bg-transparent" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold uppercase tracking-tight leading-none mb-1 text-text-title transition-colors hover:text-primary">P-Tax Togo</h1>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary opacity-80">Ministère de la Sécurité</p>
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    <nav className="flex gap-8">
                        <Link to="/assistance" className="text-xs font-semibold tracking-widest text-text-secondary hover:text-primary transition-all">Assistance</Link>
                        <Link to="/faq" className="text-xs font-semibold tracking-widest text-text-secondary hover:text-primary transition-all">FAQ</Link>
                    </nav>
                    <div className="h-8 w-px bg-divider" />
                    <div className="flex items-center gap-2 px-4 py-2 bg-app-bg rounded-lg border border-divider">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Portail Public</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
