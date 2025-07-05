import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../assets/logos/ccb-governance-logo-white.png' // adjust if needed

export default function Preloader({ onDone }) {
  const [step, setStep] = useState(0) // 0: logo, 1: GA, 2: CCB, 3: exit

  /* ── timeline controller ───────────────────────── */
  useEffect(() => {
    let nextDelay = 0
    switch (step) {
      case 0:
        nextDelay = 400
        break // after logo bounce
      case 1:
        nextDelay = 400
        break // after GA text
      case 2:
        nextDelay = 500
        break // after CCB text
      case 3:
        nextDelay = 600
        break
      default:
        break
    }
    if (step < 4) {
      const id = setTimeout(() => setStep(s => s + 1), nextDelay)
      return () => clearTimeout(id)
    }

    const exitTimer = setTimeout(onDone, 300) // fade‑out duration
    return () => clearTimeout(exitTimer)
  }, [step, onDone])

  /* ── helper flags ─────────────────────────────── */
  const showGA = step >= 1
  const showCCB = step >= 2

  /* ── component ────────────────────────────────── */
  return (
    <AnimatePresence>
      {step < 4 && (
        <Box
          component={motion.div}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 1300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f1115',
            color: '#fff'
          }}
        >
          <motion.img
            src={logo}
            alt='logo'
            style={{ width: 150, marginBottom: 24 }}
            initial={{ scale: 0, y: -100 }}
            animate={{
              scale: step === 3 ? [1, 1.1, 0.9, 1.05, 0.95, 1] : [0, 1.2, 1],
              rotate: step === 3 ? [0, -10, 10, -8, 8, 0] : 0,
              y: step === 3 ? 0 : [-100, 0, 0]
            }}
            transition={{
              duration: step === 3 ? 1 : 0.4,
              ease: 'easeOut'
            }}
          />

          {showGA && (
            <Typography
              component={motion.h1}
              variant='h5'
              fontWeight={700}
              letterSpacing={1}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              sx={{ mb: 1 }}
            >
              Governance&nbsp;Architecture
            </Typography>
          )}

          {/* Consumer & Community Banking drop‑in thump */}
          {showCCB && (
            <Typography
              component={motion.h2}
              variant='h5'
              fontWeight={700}
              letterSpacing={0.5}
              initial={{ scale: 0.5, y: -50, opacity: 0 }}
              animate={{ scale: [0.5, 1.15, 1], y: [-50, 0, 0], opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              Consumer&nbsp;&amp;&nbsp;Community&nbsp;Banking
            </Typography>
          )}
        </Box>
      )}
    </AnimatePresence>
  )
}
