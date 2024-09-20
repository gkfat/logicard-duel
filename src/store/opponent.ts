import { ref } from 'vue';

import { defineStore } from 'pinia';

import { enumCharacter, OpponentValues } from '@/enums/character';
import factory from '@/factory';
import { Player } from '@/types/player';
import { getRandomInt } from '@/utils/common';

export const useOpponentStore = defineStore('opponent', () => {
    /** 被擊敗的敵人 */
    const defeatedOpponents = ref<Player[]>([]);

    /** 敵人池 */
    const pool = ref<Player[]>([]);

    /** 目前敵人 */
    const currentOpponent = ref<Player>();

    /** 補滿敵人池 */
    function refillPool() {
        while (pool.value.length < 3) {
            const randomType =
                OpponentValues[getRandomInt([0, OpponentValues.length - 1])];
            const opponent = factory.createPlayer(randomType);
            pool.value.push(opponent);
        }
    }

    /** 初始化敵人池 */
    function init() {
        // 初始化一定有工作型
        const workerTypeOpponent = factory.createPlayer(
            enumCharacter.GkbotWorker
        );
        pool.value.push(workerTypeOpponent);

        refillPool();

        console.log('opponents init');
    }

    return {
        pool,
        currentOpponent,
        defeatedOpponents,
        init,
        refillPool,
    };
});
