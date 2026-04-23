import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeView } from '../../components/HomeView';
import { searchDocuments } from '../../services/documentService';

export default function HomePage() {
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);

    /**
     * Reçoit un objet du HomeView :
     *  - { mode: 'ref', reference: '...' }
     *  - { mode: 'adv', engin, docType, plaque, chassis }
     */
    const handleSearch = async (params) => {
        setIsSearching(true);
        try {
            let query = '';
            let filters = {};

            if (params.mode === 'ref') {
                // Recherche par référence — pas de filtre supplémentaire
                query = params.reference;
            } else {
                // Mode avancé — plaque ou châssis + filtres docType & vehicleType
                query = params.plaque || params.chassis || '';
                filters = {
                    docType: params.docType || null,       // 'recepisse' | 'pv'
                    vehicleType: params.engin || null,     // 'voiture' | 'moto' | 'transport' | 'poids_lourd'
                };
            }

            if (!query.trim()) return;

            const foundDocs = await searchDocuments(query, filters);

            navigate('/results', {
                state: {
                    results: foundDocs,
                    searchQuery: query,
                },
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <HomeView
            onSearch={handleSearch}
            isSearching={isSearching}
        />
    );
}
