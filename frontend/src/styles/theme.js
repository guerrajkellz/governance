// frontend/src/styles/theme.js
import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

// Google Font “Inter”
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'

export const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif'
  },
  palette: {
    mode: 'light',
    background: { default: grey[50] }
  }
})
