// frontend/src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import Preloader from './components/common/Preloader.jsx'
import HeaderGlass from './components/layout/HeaderGlass.jsx'
import App from './App.jsx'
import { theme } from './styles/theme.js'
import { AuthProvider } from './auth/AuthProvider.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'

function Root() {
  const [loading, setLoading] = React.useState(true)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <Preloader onDone={() => setLoading(false)} />
      ) : (
        <>
          <HeaderGlass />
          <div id='catalog-root'>
            <App />
          </div>
        </>
      )}
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route
          path='/*'
          element={
            <ProtectedRoute>
              <Root />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
