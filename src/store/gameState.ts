import { ref } from 'vue';

import { defineStore } from 'pinia';

import { enumGameState } from '@/types/enums';

export const useGameStateStore = defineStore('gameState', () => {
    const gameState = ref(enumGameState.Init);

    /** 改變遊戲狀態 */
    const changeGameState = (newState: enumGameState) => {
        gameState.value = newState;
    };

    return {
        gameState,
        changeGameState,
    };
});

