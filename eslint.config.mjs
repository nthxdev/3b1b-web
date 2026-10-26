import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-config-prettier/flat'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['src/**/*.{ts,tsx}'],

    languageOptions: {
      globals: globals.browser,
    },

    plugins: {
      'react-hooks': reactHooks,
    },

    rules: {
      ...reactHooks.configs.flat.recommended.rules,
    },
  },

  {
    files: ['vite.config.ts', 'playwright.config.ts', 'tests/**/*.ts'],

    languageOptions: {
      globals: globals.node,
    },
  },

  prettier,
)
