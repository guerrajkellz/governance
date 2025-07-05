// frontend/src/auth/AuthProvider.jsx

import React, { createContext, useState, useEffect, useCallback, useRef } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate, useLocation } from 'react-router-dom'

export const AuthContext = createContext(null)

export const AUTH_DISABLED = import.meta.env.VITE_AUTH_DISABLED === 'true'

const OIDC_TOKEN_URL = ''
const CLIENT_ID = ''

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const refreshTimer = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const saveAuth = useCallback(data => {
    sessionStorage.setItem('authData', JSON.stringify(data))
    setAuthData(data)
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem('authData')
    setAuthData(null)
  }, [])

  const silentRefresh = useCallback(
    async refresh_token => {
      const params = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: CLIENT_ID,
        refresh_token
      })

      const res = await fetch(OIDC_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      })

      if (!res.ok) throw new Error(`refresh failed: ${res.status}`)

      const fresh = await res.json()
      saveAuth({ ...fresh, refresh_token })
    },
    [saveAuth]
  )

  const refreshToken = useCallback(async () => {
    try {
      await silentRefresh(authData?.refresh_token)
    } catch (err) {
      console.error('Token refresh error', err)
      logout()
    }
  }, [silentRefresh, authData?.refresh_token, logout])

  useEffect(() => {
    if (AUTH_DISABLED) {
      setIsAuthLoading(false)
      return
    }

    const stored = sessionStorage.getItem('authData')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        const { access_token, refresh_token } = parsed
        const { exp } = jwtDecode(access_token)

        if (Date.now() / 1000 < exp) {
          setAuthData(parsed)
        } else if (refresh_token) {
          silentRefresh(refresh_token)
        } else {
          sessionStorage.removeItem('authData')
        }
      } catch {
        sessionStorage.removeItem('authData')
      }
    }
    setIsAuthLoading(false)
  }, [silentRefresh])

  useEffect(() => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current)

    if (!authData?.access_token || AUTH_DISABLED) return

    const { exp } = jwtDecode(authData.access_token)
    const ms = exp * 1000 - Date.now() - 60_000

    if (ms <= 0) {
      refreshToken()
      return
    }

    refreshTimer.current = setTimeout(refreshToken, ms)

    return () => clearTimeout(refreshTimer.current)
  }, [authData, refreshToken])

  const login = useCallback(
    tokenData => {
      if (AUTH_DISABLED) return
      if (tokenData?.access_token) {
        saveAuth(tokenData)
        // Navigate back after login
        const origin = location.state?.from?.pathname || '/'
        navigate(origin, { replace: true })
      }
      setIsAuthLoading(false)
    },
    [saveAuth, navigate, location]
  )

  return (
    <AuthContext.Provider
      value={{
        authToken: authData?.access_token ?? null,
        isAuthLoading: isAuthLoading && !AUTH_DISABLED,
        login,
        logout,
        authDisabled: AUTH_DISABLED
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
