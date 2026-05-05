import baseAxios from 'axios';

export const APP_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.68:8000/api';

const axios = baseAxios.create({
    baseURL: APP_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axios;
