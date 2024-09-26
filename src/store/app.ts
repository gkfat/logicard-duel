import { ref } from 'vue';

import { defineStore } from 'pinia';

import { useSoundEffect } from '@/composable/useSoundEffect';
import { enumGameState } from '@/enums/game';
import { sleepSeconds } from '@/utils/common';

import { useOpponentStore } from './opponent';
import { useRankStore } from './rank';
import { useShopStore } from './shop';
import { useSoundStore } from './sound';

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

    const gameState = ref(enumGameState.Booting);
    const spinnerOpen = ref(false);
    const isOpen = ref<'rank' | 'backpack' | 'shop' | null>(null);
    const { soundClick } = useSoundEffect();
    const shopStore = useShopStore();
    const rankStore = useRankStore();
    const opponentStore = useOpponentStore();
    const soundStore = useSoundStore();

    /** 遊戲初始化進度 */
    const bootProcess = ref({
        totalTasks: 0,
        doneTasks: 0,
    });

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

    async function bootGame() {
        console.log('start booting game');

        bootProcess.value.totalTasks = 4;

        // init shop
        shopStore.init();
        await sleepSeconds(0.1);
        bootProcess.value.doneTasks += 1;

        // init opponents pool
        opponentStore.init();
        await sleepSeconds(0.1);
        bootProcess.value.doneTasks += 1;

        // init sound assets
        soundStore.init();
        await sleepSeconds(0.1);
        bootProcess.value.doneTasks += 1;

        // init rank
        await rankStore.init();
        bootProcess.value.doneTasks += 1;
        await sleepSeconds(0.5);

        changeGameState(enumGameState.Initialized);
        console.log('boot success');
    }

    return {
        bootGame,
        bootProcess,
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
