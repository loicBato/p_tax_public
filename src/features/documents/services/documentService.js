import axios from '../../../core/services/api';


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
// API Calls — Recherche côté serveur via query params
// ============================================================

/**
 * Recherche de documents par référence, plaque ou châssis.
 * Utilise les endpoints :
 *   GET /withdrawal-receipts?search=<query>
 *   GET /payments-public?search=<query>
 *
 * @param {string} query - Texte de recherche (ref, plaque, châssis, nom…)
 * @param {Object} [filters] - Filtres optionnels
 * @param {string} [filters.docType] - 'recepisse' | 'pv'
 * @param {string} [filters.vehicleType] - 'voiture' | 'moto' | 'transport' | 'poids_lourd'
 */
export const searchDocuments = async (query, filters = {}) => {
    if (!query) return [];

    const { docType, vehicleType } = filters;
    const results = [];

    try {
        // Construire les requêtes en parallèle selon le filtre docType
        const requests = [];

        if (docType !== 'pv') {
            requests.push(
                axios.get('public/receipts', { params: { search: query } })
                    .then(res => ({ type: 'receipts', data: res.data?.data || [] }))
                    .catch(() => ({ type: 'receipts', data: [] }))
            );
        }

        if (docType !== 'recepisse') {
            requests.push(
                axios.get('public/payments', { params: { search: query } })
                    .then(res => ({ type: 'payments', data: res.data?.data || [] }))
                    .catch(() => ({ type: 'payments', data: [] }))
            );
        }

        const responses = await Promise.all(requests);

        for (const resp of responses) {
            if (resp.type === 'receipts') {
                resp.data.forEach((receipt) => {
                    // Filtre véhicule côté client si spécifié
                    if (vehicleType && receipt.vehicle_type !== vehicleType) return;
                    results.push(normalizeReceipt(receipt));
                });
            } else if (resp.type === 'payments') {
                resp.data.forEach((payment) => {
                    if (vehicleType && payment.receipt?.vehicle_type !== vehicleType) return;
                    results.push(normalizePayment(payment));
                });
            }
        }

        return results;
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        return [];
    }
};

/**
 * Récupère un récépissé par sa référence
 *   GET /withdrawal-receipts?search=<ref>
 */
export const getReceiptByRef = async (ref) => {
    try {
        const response = await axios.get('public/receipts', { params: { search: ref } });
        const receipts = response.data?.data || [];

        // Chercher le match exact (insensible casse, sans espaces/tirets)
        const cleanRef = ref.toUpperCase().replace(/[\s-]/g, '');
        const found = receipts.find(
            (r) => (r.ref || '').toUpperCase().replace(/[\s-]/g, '') === cleanRef
        );

        return found ? normalizeReceipt(found) : null;
    } catch (error) {
        console.error('Erreur récupération récépissé:', error);
        return null;
    }
};

/**
 * Récupère un procès-verbal par sa référence
 *   GET /payments-public?search=<ref>
 */
export const getPaymentByRef = async (ref) => {
    try {
        const response = await axios.get('public/payments', { params: { search: ref } });
        const payments = response.data?.data || [];

        const cleanRef = ref.toUpperCase().replace(/[\s-]/g, '');
        const found = payments.find(
            (p) => (p.ref || '').toUpperCase().replace(/[\s-]/g, '') === cleanRef
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

    const cleanInput = plateInput.toUpperCase().replace(/[\s-]/g, '');
    const cleanPlate = (doc.plateNumber || '').toUpperCase().replace(/[\s-]/g, '');

    return cleanInput === cleanPlate;
};
