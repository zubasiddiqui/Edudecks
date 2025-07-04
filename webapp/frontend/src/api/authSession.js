// src/api/authSession.js
// Simple session management using localStorage

export function setSession(session) {
    if (session && session.access_token && session.expires_at) {
        localStorage.setItem('session', JSON.stringify(session));
    }
}

export function getSession() {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
}

export function clearSession() {
    localStorage.removeItem('session');
}

export function isLoggedIn() {
    const session = getSession();
    if (!session || !session.access_token || !session.expires_at) return false;
    // expires_at is usually a unix timestamp (seconds)
    const now = Math.floor(Date.now() / 1000);
    return session.expires_at > now;
}
