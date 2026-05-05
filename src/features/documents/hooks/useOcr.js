import { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

/**
 * Hook pour la reconnaissance de texte (OCR) depuis une image/photo.
 * Utilise Tesseract.js côté client.
 */
export function useOcr() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    /**
     * Ouvre le sélecteur de fichier / caméra
     */
    const openCapture = () => {
        fileInputRef.current?.click();
    };

    /**
     * Traite l'image capturée et extrait le texte via OCR
     * @param {File} file - Le fichier image
     * @returns {Promise<string>} - Le texte extrait
     */
    const processImage = async (file) => {
        if (!file) return '';

        setIsProcessing(true);
        setPreview(URL.createObjectURL(file));

        try {
            const result = await Tesseract.recognize(file, 'fra+eng', {
                logger: () => {}, // silencieux
            });

            const rawText = result.data.text || '';

            // Nettoyer le texte : extraire les patterns utiles
            const extracted = extractRelevantText(rawText);
            return extracted;
        } catch (error) {
            console.error('Erreur OCR:', error);
            return '';
        } finally {
            setIsProcessing(false);
        }
    };

    /**
     * Gère le changement de fichier depuis l'input
     */
    const handleFileChange = async (e, onResult) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const text = await processImage(file);
        if (text && onResult) {
            onResult(text);
        }

        // Reset l'input pour permettre de re-sélectionner le même fichier
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const clearPreview = () => {
        setPreview(null);
    };

    return {
        isProcessing,
        preview,
        fileInputRef,
        openCapture,
        handleFileChange,
        clearPreview,
    };
}

/**
 * Extrait les informations pertinentes du texte OCR brut.
 * Cherche des patterns de référence (WR..., PY...), de plaque, ou de châssis.
 */
function extractRelevantText(rawText) {
    // Normaliser : retirer les sauts de ligne multiples
    const cleaned = rawText.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();

    // Pattern référence : WR ou PY suivi de chiffres/lettres
    const refMatch = cleaned.match(/[WP][RY][\s-]?\d{4}[\s-]?[A-Z]{2}[\s-]?\d{4,5}/i);
    if (refMatch) {
        return refMatch[0].replace(/[\s-]/g, '').toUpperCase();
    }

    // Pattern plaque togolaise : lettres + chiffres (ex: TG1234AB, 9131AJ)
    const plateMatch = cleaned.match(/\b[A-Z]{0,2}\d{3,4}[A-Z]{2}\b/i);
    if (plateMatch) {
        return plateMatch[0].toUpperCase();
    }

    // Pattern VIN/châssis : 17 caractères alphanumériques
    const vinMatch = cleaned.match(/\b[A-HJ-NPR-Z0-9]{17}\b/i);
    if (vinMatch) {
        return vinMatch[0].toUpperCase();
    }

    // Sinon retourner le texte nettoyé (premiers 50 caractères pertinents)
    const alphanumOnly = cleaned.replace(/[^A-Za-z0-9\s-]/g, '').trim();
    return alphanumOnly.substring(0, 50).trim();
}
