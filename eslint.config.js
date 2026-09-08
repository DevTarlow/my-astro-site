import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
  {
    // Build-time Node scripts and rehype plugins run outside the browser.
    files: ['scripts/**/*.mjs', 'plugins/**/*.mjs'],
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
]
