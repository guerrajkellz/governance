// eslint.config.js  (Flat‑Config, ESM)
import js                  from '@eslint/js';
import pluginReact         from 'eslint-plugin-react';
import pluginReactHooks    from 'eslint-plugin-react-hooks';
import pluginPrettier      from 'eslint-plugin-prettier';
import configPrettier      from 'eslint-config-prettier';

/* ------------------------------------------------------------------
 * 1) Base JavaScript rules (ESLint built‑ins)
 * ---------------------------------------------------------------- */
const baseConfig = js.configs.recommended;

/* ------------------------------------------------------------------
 * 2) React + React‑Hooks + Prettier layer
 * ---------------------------------------------------------------- */
const reactConfig = {
  files: ['**/*.{js,jsx}'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true }
  },
  settings: {
    react: { version: 'detect' }
  },
  plugins: {
    react:        pluginReact,
    'react-hooks': pluginReactHooks,
    prettier:      pluginPrettier
  },
  rules: {
    /* React core — start from plugin’s own recommended set */
    ...pluginReact.configs.recommended.rules,

    /* React‑Hooks recommended */
    ...pluginReactHooks.configs.recommended.rules,

    /* Turn off rules you don’t want */
    'react/react-in-jsx-scope': 'off',   // new JSX transform
    'react/prop-types':         'off',   // using TS or prefer not to validate

    /* Generic project rules */
    'no-console':   ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'warn',

    /* Prettier formatter errors inside ESLint output */
    'prettier/prettier': 'error'
  }
};

/* ------------------------------------------------------------------
 * 3) Disable any stylistic rule that conflicts with Prettier
 *    (eslint-config-prettier)
 * ---------------------------------------------------------------- */
const prettierCompat = {
  rules: configPrettier.rules
};

export default [baseConfig, reactConfig, prettierCompat];
