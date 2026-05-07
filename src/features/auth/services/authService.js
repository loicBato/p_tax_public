import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL;

/**
 * Envoie un OTP au numéro de téléphone
 * @param {string} phone  Ex: "+22890909090"
 */
export async function loginRequest(phone) {
    const { data } = await axios.post(`${BASE}/public/login`, { phone });
    return data; // { success, message, data: "+22890909090||600006" }
}

/**
 * Vérifie l'OTP
 * @param {string} phone
 * @param {string} otp
 */
export async function verifyOtpRequest(phone, otp) {
    const { data } = await axios.post(`${BASE}/public/verify-otp`, { phone, otp });
    return data;
}

/**
 * Renvoie un OTP
 * @param {string} phone
 */
export async function resendOtpRequest(phone) {
    const { data } = await axios.post(`${BASE}/public/resend-otp`, { phone });
    return data;
}
