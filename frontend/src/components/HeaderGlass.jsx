// components/HeaderGlass.jsx
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import logo from '../assets/ccb-governance-logo-black.png';

export default function HeaderGlass() {
  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        height: 72,
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255,255,255,0.65)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        color: '#000',
      }}
      component={motion.header}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 90, damping: 16 }}
    >
      <Toolbar disableGutters sx={{ px: 2 }}>
        <Box component="img" src={logo} alt="logo" sx={{ width: 40, mr: 2 }} />
        <Typography variant="h6" fontWeight={600}>
          Consumer & Community Banking - Governance Journey
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
