import { ref } from 'vue';

import { defineStore } from 'pinia';

import { OpponentValues } from '@/enums/character';
import factory from '@/factory';
import { Player } from '@/types/player';
import { getRandomInt } from '@/utils/common';

import { useSoundStore } from './sound';

export const useOpponentStore = defineStore('opponent', () => {
    const soundStore = useSoundStore();

    /** 敵人池 */
    const pool = ref<Player[]>([]);

    /** 目前敵人 */
    const currentOpponent = ref<Player>();

    /** 初始化敵人池 */
    function init() {
        Array.from({ length: 5 }).forEach(() => {
            const randomType =
                OpponentValues[getRandomInt([0, OpponentValues.length - 1])];
            const opponent = factory.createPlayer(randomType);
            pool.value.push(opponent);
        });

        console.log(pool.value);

        console.log('opponents init');
    }

    return {
        pool,
        currentOpponent,
        init,
    };
});
