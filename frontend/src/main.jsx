import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme.js';
import Preloader from './components/Preloader.jsx';

import HeaderGlass from './components/HeaderGlass.jsx';   // or Glass/Shrink
import App from './App.jsx';

function Root() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading && <Preloader onDone={() => setLoading(false)} />}
      {!loading && (
        <>
          <HeaderGlass />
          <div id="catalog-root">
            <App />
          </div>
        </>
      )}
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
