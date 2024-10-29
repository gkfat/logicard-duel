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
        rules: {
            indent: ['error', 4],
            quotes: ['error', 'single'],
            semi: 'error',
        },
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
            indent: ['error', 4],
            quotes: ['error', 'single'],
            'import/prefer-default-export': 'off',
            camelcase: 'off',
            semi: 'error',
        },
    },
    // config envs
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        }
    },
];
