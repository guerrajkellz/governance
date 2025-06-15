import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node, // <-- Adds Node.js globals like `process`, `console`, etc.
      },
    },
    plugins: { prettier },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-unused-vars': ['warn'],
      'prettier/prettier': 'error',
    },
  },
]
