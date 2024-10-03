import { createApp } from 'vue';

import BigNumber from 'bignumber.js';

import { registerPlugins } from '@/plugins';

import App from './App.vue';
import { boot } from './boot/boot';

BigNumber.config({
    FORMAT: {
        // 小數分隔符號，使用"點"區隔
        decimalSeparator: '.',
        // 整數部分的分組分隔符號，使用"逗點"區隔
        groupSeparator: ',',
        // 整數部分每3個為一單位
        groupSize: 3,
    },
    // 捨入模式：無條件捨去
    ROUNDING_MODE: BigNumber.ROUND_FLOOR,
});

const app = createApp(App);

registerPlugins(app);

boot().then(() => {
    app.mount('#app');
});
