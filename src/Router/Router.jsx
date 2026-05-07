import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../features/layout/MainLayout';
import HomePage from '../features/documents/pages/HomePage';
import ResultsPage from '../features/documents/pages/ResultsPage';
import { DocumentDetailPage } from '../features/documents/pages/DocumentDetailPage';
import AssistancePage from '../features/assistance/pages/AssistancePage';
import FaqPage from '../features/faq/pages/FaqPage';
import LoginPage from '../features/auth/pages/LoginPage';
import { PrivateRoute } from './PrivateRoute';

const Router = () => {
    return (
        <Routes>
            {/* ── Routes publiques (pas de auth requise) ── */}
            <Route path="/login" element={<LoginPage />} />

            {/* ── Routes protégées (auth vérifiée requise) ── */}
            <Route element={<PrivateRoute />}>
                <Route element={<MainLayout />}>

                    {/* Page d'accueil - Recherche */}
                    <Route path="/" element={<HomePage />} />

                    {/* Page des résultats */}
                    <Route path="/results" element={<ResultsPage />} />

                    {/* Accès direct à un récépissé */}
                    <Route path="/recepisse/:ref" element={<DocumentDetailPage />} />

                    {/* Accès direct à un procès-verbal */}
                    <Route path="/proces-verbal/:ref" element={<DocumentDetailPage />} />

                    {/* Route générique de détail document */}
                    <Route path="/document/:ref" element={<DocumentDetailPage />} />

                    {/* Page d'assistance */}
                    <Route path="/assistance" element={<AssistancePage />} />

                    {/* Page FAQ */}
                    <Route path="/faq" element={<FaqPage />} />

                </Route>
            </Route>

            {/* Redirection par défaut */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default Router;
