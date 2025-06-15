import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import reactHooksRecommended from 'eslint-plugin-react-hooks'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { React: true, JSX: true }
    },
    plugins: {
      'react-hooks': reactHooksRecommended
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
    }
  },
  reactRecommended,
  prettierRecommended
]
