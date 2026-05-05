import React from 'react';
import { createRoot } from 'react-dom/client';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ReportPdfTemplate } from '../components/ReportPdfTemplate';

/**
 * Génère et télécharge le PDF du Procès-Verbal
 */
export const downloadReportPdf = async (doc) => {
    // Conteneur caché hors écran
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.zIndex = '-1';
    document.body.appendChild(container);

    try {
        // Rendre le composant React (Template du PV)
        const root = createRoot(container);
        root.render(<ReportPdfTemplate receipt={doc} />);

        // Attendre le rendu React
        await new Promise(resolve => setTimeout(resolve, 500));

        const element = container.querySelector('#pdf-content');
        if (!element) throw new Error('Élément pdf-content introuvable');

        // Capture avec html2canvas (comme dans le script du client)
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

        pdf.save(`Proces-Verbal_${doc.reference || Date.now()}.pdf`);

        root.unmount();
    } catch (error) {
        console.error('Erreur génération PDF du PV:', error);
        console.log(error);
        // alert('Erreur lors de la génération du PV. Veuillez réessayer.');
    } finally {
        document.body.removeChild(container);
    }
};
