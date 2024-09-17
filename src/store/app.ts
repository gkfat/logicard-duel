import { ref } from 'vue';

import { defineStore } from 'pinia';

import { enumGameState } from '@/enums/game';

import { useSoundStore } from './sound';

export const useAppStore = defineStore('appStore', () => {
    const gameState = ref(enumGameState.Init);
    const spinnerOpen = ref(false);
    const isOpen = ref<'rank' | 'backpack' | 'shop' | null>(null);
    const soundStore = useSoundStore();

    /** 改變遊戲狀態 */
    const changeGameState = (newState: enumGameState) => {
        gameState.value = newState;
    };

    /** 開關 Spinner */
    function switchSpinner(target: boolean) {
        spinnerOpen.value = target;
    }

    function openDialog(target: 'rank' | 'backpack' | 'shop') {
        soundStore.playSound(soundStore.sounds.effect.click);
        isOpen.value = target;
    }

    function closeDialog() {
        soundStore.playSound(soundStore.sounds.effect.click);
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
