import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider.jsx'

export default function ProtectedRoute({ children }) {
  const { authToken, isAuthLoading, authDisabled } = useContext(AuthContext)
  const location = useLocation()

  if (authDisabled) return children
  if (isAuthLoading) return <div>Checking authentication…</div>
  if (!authToken) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}
