import vueLint from 'eslint-plugin-vue';
import globals from 'globals';
import tslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

import jsLint from '@eslint/js';

export default [
    // preset configs
    jsLint.configs.recommended,
    ...tslint.configs.recommended,
    ...vueLint.configs['flat/essential'],

    // vue
    {
        files: ['*.vue', '**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: { parser: tslint.parser },
        },
        rules: {
            'vue/multi-word-component-names': ['off'],
            'vue/html-self-closing': [
                'error', {
                    'html': {
                        'void': 'never',
                        'normal': 'always',
                        'component': 'always',
                    },
                    'svg': 'always',
                    'math': 'always',
                },
            ],
        },
    },

    // all files
    {
        rules: {
            indent: ['error', 4],
            quotes: ['error', 'single'],
            semi: 'error',
            'comma-dangle': ['error', 'always-multiline'],
            'no-multiple-empty-lines': ['error', { max: 1 }],
            'object-curly-spacing': ['error', 'always'],
            'object-curly-newline': [
                'error', {
                    multiline: true, minProperties: 2,
                },
            ],
            'array-bracket-newline': [
                'error', {
                    multiline: true, minItems: 3,
                },
            ],
            'array-element-newline': ['error', { minItems: 3 }],
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
