import { ref } from 'vue';

import { defineStore } from 'pinia';

import { Player } from '@/types/player';

import { useSoundStore } from './sound';

export const useOpponentStore = defineStore('opponent', () => {
    const soundStore = useSoundStore();

    /** 敵人池 */
    const pool = ref<Player[]>([]);

    /** 目前敵人 */
    const currentOpponent = ref<Player>();

    /** 初始化敵人池 */
    const init = () => {

    }

    return {
        pool,
        currentOpponent,
        init,
    };
});

