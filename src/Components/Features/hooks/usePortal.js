import { useState } from 'react';
import { searchDocuments, verifyDocumentPlate } from '../services/documentService';

export function usePortal() {
    const [view, setView] = useState('HOME');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState([]);

    const [selectedDoc, setSelectedDoc] = useState(null);
    const [pendingDoc, setPendingDoc] = useState(null);
    const [showPlateModal, setShowPlateModal] = useState(false);
    const [plateInput, setPlateInput] = useState('');
    const [plateError, setPlateError] = useState(false);

    const handleSearch = async (params) => {
        // Gérer le cas où l'appel vient d'un événement direct (fallback)
        if (params && params.preventDefault) {
            params.preventDefault();
        }

        let query = '';
        let filters = {};

        if (params && params.mode) {
            // Appel depuis HomeView
            query = params.mode === 'ref' ? params.reference : (params.plaque || params.chassis);
            filters = { docType: params.docType, vehicleType: params.engin };
        } else {
            query = searchQuery;
        }

        if (!query || !query.trim()) return;

        setSearchQuery(query.trim());
        setIsSearching(true);
        try {
            const foundDocs = await searchDocuments(query.trim(), filters);
            setResults(foundDocs);
            setView('RESULTS');
        } catch (error) {
            console.error(error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectDoc = (doc) => {
        setPendingDoc(doc);
        setPlateInput('');
        setPlateError(false);
        setShowPlateModal(true);
    };

    const verifyPlate = async (e) => {
        e?.preventDefault();
        if (!pendingDoc) return;

        try {
            const isValid = await verifyDocumentPlate(pendingDoc.id, plateInput);
            if (isValid) {
                setShowPlateModal(false);
                setSelectedDoc(pendingDoc);
                setView('DETAIL');
            } else {
                setPlateError(true);
            }
        } catch (error) {
            console.error(error);
            setPlateError(true);
        }
    };

    const goBackToResults = () => {
        setView('RESULTS');
        setSelectedDoc(null);
    };

    const resetPortal = () => {
        setView('HOME');
        setSearchQuery('');
        setResults([]);
        setSelectedDoc(null);
        setPendingDoc(null);
    };

    return {
        view,
        searchQuery,
        setSearchQuery,
        isSearching,
        selectedDoc,
        results,
        showPlateModal,
        setShowPlateModal,
        plateInput,
        setPlateInput,
        plateError,
        pendingDoc,
        handleSearch,
        handleSelectDoc,
        verifyPlate,
        goBackToResults,
        resetPortal
    };
}
