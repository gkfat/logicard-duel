module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        '@vue/eslint-config-typescript',
        'airbnb',
        'airbnb/hooks',
    ],
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
        'vue/html-indent': ['error', 4],
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'vue/multi-word-component-names': 'off',
        'import/no-extraneous-dependencies': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'no-param-reassign': 'off',
        'class-methods-use-this': 'off',
        'vue/no-v-html': 'off',
        'no-restricted-globals': 'off',
        'no-alert': 'off',
    },
};
