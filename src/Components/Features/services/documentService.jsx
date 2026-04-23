import axios from '../../api/api';
import { MOCK_WITHDRAWAL_RECEIPTS, MOCK_PAYMENTS } from '../../api/mockData';

// ============================================================
// 🔀 SWITCH : changer à `false` pour utiliser l'API réelle
// ============================================================
const USE_MOCK_DATA = true;

// ============================================================
// Data fetchers — basculer transparemment entre mock et API
// ============================================================

const fetchWithdrawalReceipts = async () => {
    if (USE_MOCK_DATA) {
        // Simule un délai réseau
        await new Promise((resolve) => setTimeout(resolve, 500));
        return MOCK_WITHDRAWAL_RECEIPTS.data;
    }
    const response = await axios.get('/withdrawal_receipts');
    return response.data?.data || [];
};

const fetchPayments = async () => {
    if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return MOCK_PAYMENTS.data;
    }
    const response = await axios.get('/payments');
    return response.data?.data || [];
};

// ============================================================
// Normalisation : convertit les données API en format unifié
// ============================================================

/**
 * Normalise un récépissé (withdrawal_receipt) en document unifié
 */
const normalizeReceipt = (receipt) => {
    const motifs = [];
    if (receipt.items && receipt.items.length > 0) {
        receipt.items.forEach((item) => motifs.push(item.penalty_label));
    }
    if (receipt.custom_items && receipt.custom_items.length > 0) {
        receipt.custom_items.forEach((item) => motifs.push(item));
    }

    return {
        id: receipt.id,
        reference: receipt.ref,
        plateNumber: receipt.plate || '',
        chassis: receipt.vin || null,
        type: 'RECEPISE',
        date: receipt.date,
        citizenName: receipt.offender_name || '',
        ownerName: receipt.owner_name || '',
        ownerPhone: receipt.owner_phone || '',
        offenderPhone: receipt.offender_phone || '',
        status: receipt.payment_status === 'paid' ? 'PAYE' : 'IMPAYE',
        amount: parseFloat(receipt.penalties_total_amount) || 0,
        motifs,
        issuer: receipt.post_office_name || 'Non spécifié',
        description: receipt.description || null,
        vehicleType: receipt.vehicle_type || null,
        agentNote: receipt.agent_note || null,
        agentId: receipt.agent_id || null,
        agent: receipt.agent || null,
        withdrawnDocs: {
            cni: receipt.cni_withdrawn,
            pc: receipt.pc_withdrawn,
            cg: receipt.cg_withdrawn,
            vt: receipt.vt_withdrawn,
            lp: receipt.lp_withdrawn,
            cbtaxi: receipt.cbtaxi_withdrawn,
            insurance: receipt.insurance_withdrawn,
            vehicle: receipt.vehicle_withdrawn,
        },
        _raw: receipt,
    };
};

/**
 * Normalise un paiement (payment) en document unifié (Procès-Verbal)
 */
const normalizePayment = (payment) => {
    const receipt = payment.receipt || {};

    const motifs = [];
    if (receipt.items && receipt.items.length > 0) {
        receipt.items.forEach((item) => motifs.push(item.penalty_label));
    }
    if (receipt.custom_items && receipt.custom_items.length > 0) {
        receipt.custom_items.forEach((item) => motifs.push(item));
    }

    return {
        id: payment.id,
        reference: payment.ref,
        plateNumber: receipt.plate || '',
        chassis: receipt.vin || null,
        type: 'PROCES_VERBAL',
        date: payment.date,
        citizenName: receipt.offender_name || '',
        ownerName: receipt.owner_name || '',
        ownerPhone: receipt.owner_phone || '',
        offenderPhone: receipt.offender_phone || '',
        status: 'PAYE',
        amount: parseFloat(payment.amount_paid) || 0,
        motifs,
        issuer: receipt.post_office_name || 'Non spécifié',
        description: receipt.description || null,
        vehicleType: receipt.vehicle_type || null,
        paymentMode: payment.payment_mode || null,
        receiptRef: payment.withdrawal_receipt_ref || null,
        agentId: receipt.agent_id || payment.agent_id || null,
        agent: payment.agent || null,
        _raw: payment,
    };
};

// ============================================================
// API Calls (fonctionnent en mock ET en API réelle)
// ============================================================

/**
 * Recherche de documents par référence, plaque ou châssis
 * @param {string} query - Texte de recherche (ref, plaque ou châssis)
 * @param {Object} [filters] - Filtres optionnels pour la recherche avancée
 * @param {string} [filters.docType] - 'recepisse' | 'pv' (filtre par type de document)
 * @param {string} [filters.vehicleType] - 'voiture' | 'moto' | 'transport' | 'poids_lourd'
 */
export const searchDocuments = async (query, filters = {}) => {
    if (!query) return [];

    const upperQuery = query.toUpperCase().replace(/[\s-]/g, '');
    const { docType, vehicleType } = filters;

    try {
        const [receipts, payments] = await Promise.all([
            fetchWithdrawalReceipts(),
            fetchPayments(),
        ]);

        const results = [];

        // ── Récépissés ──
        // Inclure sauf si le filtre docType est 'pv' (on ne veut que des PV)
        if (docType !== 'pv') {
            receipts.forEach((receipt) => {
                // Filtre par type d'engin
                if (vehicleType && receipt.vehicle_type !== vehicleType) return;

                const refUpper = (receipt.ref || '').toUpperCase().replace(/[\s-]/g, '');
                const plateUpper = (receipt.plate || '').toUpperCase().replace(/[\s-]/g, '');
                const vinUpper = (receipt.vin || '').toUpperCase().replace(/[\s-]/g, '');

                if (
                    refUpper.includes(upperQuery) ||
                    plateUpper.includes(upperQuery) ||
                    (vinUpper && vinUpper.includes(upperQuery))
                ) {
                    results.push(normalizeReceipt(receipt));
                }
            });
        }

        // ── Paiements (PV) ──
        // Inclure sauf si le filtre docType est 'recepisse' (on ne veut que des récépissés)
        if (docType !== 'recepisse') {
            payments.forEach((payment) => {
                // Filtre par type d'engin (sur le receipt associé)
                if (vehicleType && payment.receipt?.vehicle_type !== vehicleType) return;

                const refUpper = (payment.ref || '').toUpperCase().replace(/[\s-]/g, '');
                const plateUpper = (payment.receipt?.plate || '').toUpperCase().replace(/[\s-]/g, '');
                const vinUpper = (payment.receipt?.vin || '').toUpperCase().replace(/[\s-]/g, '');

                if (
                    refUpper.includes(upperQuery) ||
                    plateUpper.includes(upperQuery) ||
                    (vinUpper && vinUpper.includes(upperQuery))
                ) {
                    results.push(normalizePayment(payment));
                }
            });
        }

        return results;
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        return [];
    }
};

/**
 * Récupère un récépissé par sa référence
 */
export const getReceiptByRef = async (ref) => {
    try {
        const receipts = await fetchWithdrawalReceipts();
        const found = receipts.find(
            (r) => r.ref.toUpperCase() === ref.toUpperCase()
        );
        return found ? normalizeReceipt(found) : null;
    } catch (error) {
        console.error('Erreur récupération récépissé:', error);
        return null;
    }
};

/**
 * Récupère un procès-verbal par sa référence
 */
export const getPaymentByRef = async (ref) => {
    try {
        const payments = await fetchPayments();
        const found = payments.find(
            (p) => p.ref.toUpperCase() === ref.toUpperCase()
        );
        return found ? normalizePayment(found) : null;
    } catch (error) {
        console.error('Erreur récupération PV:', error);
        return null;
    }
};

/**
 * Récupère un document par sa référence (détecte auto le type)
 */
export const getDocumentByReference = async (ref) => {
    if (!ref) return null;

    const upperRef = ref.toUpperCase();

    if (upperRef.startsWith('WR')) {
        return await getReceiptByRef(ref);
    } else if (upperRef.startsWith('PY')) {
        return await getPaymentByRef(ref);
    }

    // Si pas de préfixe reconnu, chercher dans les deux
    const receipt = await getReceiptByRef(ref);
    if (receipt) return receipt;

    const payment = await getPaymentByRef(ref);
    if (payment) return payment;

    return null;
};

/**
 * Vérifie la plaque d'immatriculation
 */
export const verifyDocumentPlate = async (doc, plateInput) => {
    if (!plateInput || !doc) return false;

    // Simule un petit délai pour l'UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    const cleanInput = plateInput.toUpperCase().replace(/[\s-]/g, '');
    const cleanPlate = (doc.plateNumber || '').toUpperCase().replace(/[\s-]/g, '');

    return cleanInput === cleanPlate;
};
