import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'


import Signin from './components/signin.jsx'
import Dashboard from './components/dashboard.jsx'
import PresentationUI from './components/presentation.jsx'
import Classes from './components/class.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Signin />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/presentation" element={
          <ProtectedRoute>
            <PresentationUI />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
