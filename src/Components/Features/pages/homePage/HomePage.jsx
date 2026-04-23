import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeView } from '../../components/HomeView';
import { searchDocuments } from '../../services/documentService';

export default function HomePage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e) => {
        e?.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const foundDocs = await searchDocuments(searchQuery);
            // Navigate to results page with search data via location state
            navigate('/results', {
                state: {
                    results: foundDocs,
                    searchQuery: searchQuery,
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
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isSearching={isSearching}
        />
    );
}
