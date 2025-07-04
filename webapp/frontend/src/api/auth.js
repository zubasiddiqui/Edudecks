// src/api/auth.js
// Handles authentication API calls to the backend

// Use VITE_BACKEND_URL from environment variables if available, else default to '' (same origin)
const API_BASE = `${import.meta.env.VITE_BACKEND_URL || ''}/auth`;

export async function signin({ email, password }) {
  const response = await fetch(`${API_BASE}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Sign in failed');
  }
  return data;
}

export async function signup({ name, email, password }) {
  const response = await fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Sign up failed');
  }
  return data;
}

import { clearSession } from './authSession';

export async function signout() {
  const response = await fetch(`${API_BASE}/signout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Sign out failed');
  }
  // Remove session from localStorage
  clearSession();
  return data;
}
