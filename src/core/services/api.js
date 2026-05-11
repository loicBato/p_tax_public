import baseAxios from 'axios';

export const APP_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.68:8000/api';

const axios = baseAxios.create({
    baseURL: APP_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour injecter le token
axios.interceptors.request.use((config) => {
    const sessionRaw = sessionStorage.getItem('ptax_auth');
    if (sessionRaw) {
        try {
            const session = JSON.parse(sessionRaw);
            if (session.token) {
                config.headers.Authorization = `Bearer ${session.token}`;
            }
        } catch (e) {
            console.error('Erreur lecture session token', e);
        }
    }
    return config;
});

export default axios;
