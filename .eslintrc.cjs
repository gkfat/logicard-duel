const path = require('node:path');
const createAliasSetting = require('@vue/eslint-config-airbnb/createAliasSetting');
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
        parser: '@typescript-eslint/parser',
    },
    extends: [
        'eslint:recommended',
        '@vue/typescript/recommended',
        'plugin:vue/vue3-essential',
        '@vue/typescript',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-airbnb',
    ],
    settings: {
        ...createAliasSetting({
            '@': `${path.resolve(__dirname, './src')}`,
        }),
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
    rules: {
        indent: ['error', 4, {
            SwitchCase: 1,
        }],
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'linebreak-style': ['error', 'windows'],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'click-events-have-key-events': 'off',
        'vuejs-accessibility/click-events-have-key-events': 'off',
        'max-len': 'off',
        'vue/max-len': 'off',
        'class-method-use-this': 'off',
        'no-restricted-globals': 'off',
        'no-alert': 'off',
        'no-new': 'off',
        'no-console': 'off',
        'vuejs-accessibility/form-control-has-label': 'off',
    },
};
