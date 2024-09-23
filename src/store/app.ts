import { ref } from 'vue';

import { defineStore } from 'pinia';

import { useSoundEffect } from '@/composable/useSoundEffect';
import { enumGameState } from '@/enums/game';

interface EnvironmentVariables {
    readonly appTitle: string;
    readonly appVersion: string;
    readonly appDescription: string;
    readonly ogTitle: string;
    readonly ogImage: string;
    readonly ogDescription: string;
    readonly countdownSeconds: number;
    readonly handCardMaxLimit: number;
}

export const useAppStore = defineStore('appStore', () => {
    const ENV = ref<EnvironmentVariables>({
        appTitle: '',
        appVersion: '',
        appDescription: '',
        ogTitle: '',
        ogImage: '',
        ogDescription: '',
        countdownSeconds: 0,
        handCardMaxLimit: 0,
    });

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
        ENV,
        gameState,
        changeGameState,
        spinnerOpen,
        switchSpinner,
        isOpen,
        openDialog,
        closeDialog,
    };
});
