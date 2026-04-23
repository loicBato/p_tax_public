import React from 'react';
import { createRoot } from 'react-dom/client';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ReceiptTemplate } from '../components/ReceiptTemplate';

/**
 * Génère et télécharge le PDF du récépissé
 */
export const downloadReceiptPdf = async (doc) => {
    // Conteneur caché hors écran
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.zIndex = '-1';
    document.body.appendChild(container);

    try {
        // Rendre le composant React
        const root = createRoot(container);
        root.render(<ReceiptTemplate doc={doc} />);

        // Attendre le rendu React
        await new Promise(resolve => setTimeout(resolve, 500));

        const element = container.querySelector('#receipt-pdf');
        if (!element) throw new Error('Élément receipt-pdf introuvable');

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${doc.reference || 'Recepisse'}.pdf`);

        root.unmount();
    } catch (error) {
        console.error('Erreur génération PDF récépissé:', error);
        console.log(error);
    } finally {
        document.body.removeChild(container);
    }
};
