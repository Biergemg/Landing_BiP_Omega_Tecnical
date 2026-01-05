import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import astroParser from 'astro-eslint-parser';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            '@typescript-eslint': typescript,
        },
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            ...typescript.configs.recommended.rules,
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'error',
        },
    },
    {
        files: ['**/*.astro'],
        plugins: {
            astro,
        },
        languageOptions: {
            parser: astroParser,
            parserOptions: {
                parser: typescriptParser,
                extraFileExtensions: ['.astro'],
            },
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            ...astro.configs.recommended.rules,
        },
    },
    {
        ignores: ['dist/**', 'node_modules/**', '.astro/**', '*.config.{js,mjs,ts}'],
    },
];