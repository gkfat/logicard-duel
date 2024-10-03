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
    readonly shopRefreshMinutes: number;
    readonly apiUrl: string;
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
        shopRefreshMinutes: 0,
        apiUrl: '',
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

    function setEnv() {
        ENV.value = {
            appTitle: import.meta.env.VITE_APP_TITLE ?? 'Logicard Duel!',
            appVersion: import.meta.env.VITE_APP_VERSION ?? 'unreleased',
            appDescription:
                import.meta.env.VITE_APP_DESCRIPTION ??
                '你能在反叛機器人 GkBot 的肆虐下生存多久？',
            ogTitle: import.meta.env.VITE_APP_OG_TITLE ?? 'Logicard Duel!',
            ogImage:
                import.meta.env.VITE_APP_OG_IMAGE ??
                'https://logicard-duel.pages.dev/ogimage.png',
            ogDescription:
                import.meta.env.VITE_APP_OG_DESCRIPTION ??
                '你能在反叛機器人 GkBot 的肆虐下生存多久？',
            countdownSeconds:
                Number(import.meta.env.VITE_COUNTDOWN_SECONDS) ?? 60,
            handCardMaxLimit:
                Number(import.meta.env.VITE_HANDCARD_MAX_LIMIT) ?? 7,
            shopRefreshMinutes:
                Number(import.meta.env.VITE_SHOP_REFRESH_MINUTES) ?? 10,
            apiUrl:
                import.meta.env.MODE === 'production'
                    ? import.meta.env.VITE_API_URL
                    : '/api',
        };
    }

    async function bootGame() {
        console.log('start booting game');

        setEnv();

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
