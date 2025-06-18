import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider.jsx'

export default function ProtectedRoute({ children }) {
  const { authToken, isAuthLoading, authDisabled } = useContext(AuthContext)

  if (authDisabled) return children // bypass
  if (isAuthLoading) return <div>Checking authentication…</div>
  if (!authToken) return <Navigate to='/login' replace />

  return children
}
