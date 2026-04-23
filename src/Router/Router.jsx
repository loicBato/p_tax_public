import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import HomePage from '../Components/Features/pages/homePage/HomePage';
import ResultsPage from '../Components/Features/pages/resultsPage/ResultsPage';
import { DocumentDetailPage } from '../Components/Features/pages/documentDetail/DocumentDetailPage';
import AssistancePage from '../Components/Features/pages/assistancePage/AssistancePage';
import FaqPage from '../Components/Features/pages/faqPage/FaqPage';

const Router = () => {
    return (
        <Routes>
            {/* Layout principal avec Header + Footer */}
            <Route element={<MainLayout />}>

                {/* Page d'accueil - Recherche */}
                <Route path="/" element={<HomePage />} />

                {/* Page des résultats de recherche */}
                <Route path="/results" element={<ResultsPage />} />

                {/* ===== Liens directs envoyés par SMS ===== */}

                {/* Accès direct à un récépissé (ex: /recepisse/WR2604AA00052) */}
                <Route path="/recepisse/:ref" element={<DocumentDetailPage />} />

                {/* Accès direct à un procès-verbal (ex: /proces-verbal/PV2604XX00001) */}
                <Route path="/proces-verbal/:ref" element={<DocumentDetailPage />} />

                {/* ===== Route générique de détail document ===== */}
                <Route path="/document/:ref" element={<DocumentDetailPage />} />

                {/* Page d'assistance */}
                <Route path="/assistance" element={<AssistancePage />} />

                {/* Page FAQ */}
                <Route path="/faq" element={<FaqPage />} />

            </Route>

            {/* Redirection par défaut */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default Router;
