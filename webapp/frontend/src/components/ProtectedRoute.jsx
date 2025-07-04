import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../api/authSession';

export default function ProtectedRoute({ children }) {
    if (!isLoggedIn()) {
        return <Navigate to="/" replace />;
    }
    return children;
}
