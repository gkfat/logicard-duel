import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

import eslintJs from '@eslint/js';

export default [
    // syntax rules
    eslintJs.configs.recommended,
    ...tsEslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    // config parsers
    {
        files: ['src/**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
    },
    {
        files: ['*.vue', '**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsEslint.parser, // parse TS inside VUE
            },
        },
        rules: {
            'vue/multi-word-component-names': ['off'],
        },
    },
    {
        rules: {
            indent: ['error', 4],
            quotes: ['error', 'single'],
            semi: 'error',
            'comma-dangle': ['error', 'always-multiline'],
            'no-multiple-empty-lines': ['error', { max: 1 }],
            'space-before-function-paren': ['error', 'never'],
            'object-curly-newline': ['error', { consistent: true }],
            'array-bracket-newline': ['error', { multiline: true, minItems: 3 }],
            'array-element-newline': [
                'error', {
                    minItems: 3,
                },
            ],
        },
    },
    // config envs
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
];
