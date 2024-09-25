import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { useI18n } from 'vue-i18n';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import colors from 'vuetify/lib/util/colors.mjs';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';

import { i18n } from './i18n';

export const vuetify = createVuetify({
    components: {
        ...components,
    },
    directives,
    locale: {
        adapter: createVueI18nAdapter({ i18n, useI18n }),
    },
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: colors.orange.darken1,
                    lightgrey: colors.grey.lighten2,
                    darkgrey: colors.grey.darken3,
                    bluegrey: colors.blueGrey.darken3,
                    white: '#f4f1de',
                    red: colors.red.darken2,
                    darkred: '#c8411c',
                    amber: colors.amber.darken1,
                    darkamber: colors.amber.darken3,
                    blue: colors.blue.darken1,
                    green: '#81b29a',
                    darkgreen: '#52856c',
                    skin: '#f2cc8f',
                },
            },
        },
    },
});
