import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Adds Prettier plugin and config
  ],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error', // Ensures Prettier formatting as a rule
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});
