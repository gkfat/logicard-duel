import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tsEslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";

import eslintJs from "@eslint/js";

export default [
  eslintJs.configs.recommended,
  // general
  {
    files: ["src/**/*.{js,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        globals: {
          ...globals.browser,
          ...globals.node,
        },
      },
    },
    rules: {
      indent: ["error", 4],
      quotes: ["error", "single"],
      "import/prefer-default-export": "off",
      camelcase: "off",
    },
  },
  // typescript
  {
    files: ["src/**/*.{ts,tsx,vue}"],
    languageOptions: {
      parser: tsEslint.parser,
    },
  },
  // vue
  ...pluginVue.configs["flat/essential"],
  {
    files: ["src/**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsEslint.parser, // parse TS inside VUE
      },
    },
    rules: {
      "vue/multi-word-component-names": ["off"],
    },
  },
];
