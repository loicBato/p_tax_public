export function formatAmount(amount, currencySymbol = 'F CFA', decimalPlaces = 0) {
    const fixedAmount = parseFloat(amount).toFixed(decimalPlaces);
    return `${fixedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(".", ".")} ${currencySymbol}`;
}

export const formatPhoneNumber = (phone) => {
    if (!phone) return "";

    let cleaned = phone.replace(/[^\d+]/g, "");

    // Convertir 00228 en +228
    if (cleaned.startsWith("00228")) {
        cleaned = "+228" + cleaned.slice(5);
    }

    // Convertir 228 en +228
    if (cleaned.startsWith("228")) {
        cleaned = "+228" + cleaned.slice(3);
    }

    // Ajouter +228 si numéro local (8 chiffres)
    if (!cleaned.startsWith("+") && cleaned.length === 8) {
        cleaned = "+228" + cleaned;
    }

    // Format Togo
    if (cleaned.startsWith("+228")) {
        const rest = cleaned.slice(4);
        return "+228 " + rest.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
    }

    // Autres pays, on laisse tel quel
    return cleaned;
};