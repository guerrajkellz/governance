import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'

export default [
  js.configs.recommended,
  {
    files: ['./**/*.js'],
    languageOptions: {
      ecmaVersion: 2024, // clear specification instead of 'latest'
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    },
    plugins: {
      prettier,
      import: importPlugin
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prettier/prettier': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-implicit-coercion': ['warn'],
      'prefer-const': ['error'],

      // Recommended import rules:
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error'
    }
  }
]
