import { ref } from 'vue';

import { defineStore } from 'pinia';

import { useSoundEffect } from '@/composable/useSoundEffect';
import { enumGameState } from '@/enums/game';

export const useAppStore = defineStore('appStore', () => {
    const gameState = ref(enumGameState.Init);
    const spinnerOpen = ref(false);
    const isOpen = ref<'rank' | 'backpack' | 'shop' | null>(null);
    const { soundClick } = useSoundEffect();

    /** 改變遊戲狀態 */
    const changeGameState = (newState: enumGameState) => {
        gameState.value = newState;
    };

    /** 開關 Spinner */
    function switchSpinner(target: boolean) {
        spinnerOpen.value = target;
    }

    function openDialog(target: 'rank' | 'backpack' | 'shop') {
        soundClick();
        isOpen.value = target;
    }

    function closeDialog() {
        soundClick();
        isOpen.value = null;
    }

    return {
        gameState,
        changeGameState,
        spinnerOpen,
        switchSpinner,
        isOpen,
        openDialog,
        closeDialog,
    };
});
