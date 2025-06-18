import React, { createContext, useState, useEffect, useCallback, useRef } from 'react'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext(null)

// flag you toggle in .env:  VITE_AUTH_DISABLED=true
export const AUTH_DISABLED = import.meta.env.VITE_AUTH_DISABLED === 'true'

const OIDC_TOKEN_URL = 'https://idag2.jpmorganchase.com/adfs/oauth2/token'
const CLIENT_ID = 'PC-110158-SID-314383-PROD'

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const refreshTimer = useRef(null)

  /** persist to sessionStorage + state */
  const saveAuth = useCallback(data => {
    sessionStorage.setItem('authData', JSON.stringify(data))
    setAuthData(data)
  }, [])

  /** logout helper */
  const logout = useCallback(() => {
    sessionStorage.removeItem('authData')
    setAuthData(null)
  }, [])

  /** silently refresh a token */
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
      // some IdPs omit a new refresh_token — keep the old one
      saveAuth({ ...fresh, refresh_token })
    },
    [saveAuth]
  )

  /** explicit wrapper so it can go in deps */
  const refreshToken = useCallback(async () => {
    try {
      await silentRefresh(authData?.refresh_token)
    } catch (err) {
      console.error('Token refresh error', err)
      logout()
    }
  }, [silentRefresh, authData?.refresh_token, logout])

  /* ------------ initial bootstrap ------------- */
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

  /* ------------ schedule automatic refresh ----- */
  useEffect(() => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current)

    if (!authData?.access_token || AUTH_DISABLED) return

    const { exp } = jwtDecode(authData.access_token)
    const ms = exp * 1000 - Date.now() - 60_000 // 1 min before expiry

    if (ms <= 0) {
      refreshToken()
      return
    }

    refreshTimer.current = setTimeout(refreshToken, ms)

    return () => clearTimeout(refreshTimer.current)
  }, [authData, refreshToken])

  /** manual login helper */
  const login = useCallback(
    tokenData => {
      if (AUTH_DISABLED) return
      if (tokenData?.access_token) saveAuth(tokenData)
      setIsAuthLoading(false)
    },
    [saveAuth]
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
