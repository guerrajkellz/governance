// src/auth/ProtectedRoute.jsx
import { useContext, useEffect } from 'react'
import { AuthContext } from './AuthProvider.jsx'

export default function ProtectedRoute({ children }) {
  const { authToken, isAuthLoading, authDisabled } = useContext(AuthContext)

  /* ⬇ trigger server‑side /login when needed */
  useEffect(() => {
    if (!isAuthLoading && !authDisabled && !authToken) {
      window.location.assign('/login') // full page reload
    }
  }, [isAuthLoading, authDisabled, authToken])

  if (authDisabled) return children
  if (isAuthLoading) return <div>Checking authentication…</div>
  if (!authToken) return <div>Redirecting to SSO…</div>

  return children
}
