import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const SESSION_KEY = 'ptax_auth';

function loadSession() {
    try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function saveSession(data) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }) {
    const [session, setSession] = useState(() => loadSession());

    /** Appelé après login réussi — on stocke le numéro de téléphone */
    const setPhone = useCallback((phone) => {
        const s = { phone, verified: false };
        setSession(s);
        saveSession(s);
    }, []);

    /** Appelé après verify-otp réussi */
    const confirmVerified = useCallback((token, citizen) => {
        setSession(prev => {
            const s = { ...prev, verified: true, token, citizen };
            saveSession(s);
            return s;
        });
    }, []);

    const logout = useCallback(() => {
        clearSession();
        setSession(null);
    }, []);

    const isAuthenticated = Boolean(session?.verified);
    const phone = session?.phone ?? null;
    const user = session?.citizen ?? null;
    const token = session?.token ?? null;

    return (
        <AuthContext.Provider value={{ isAuthenticated, phone, user, token, setPhone, confirmVerified, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth doit être utilisé dans <AuthProvider>');
    return ctx;
}
