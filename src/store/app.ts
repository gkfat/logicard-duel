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
    readonly supabaseUrl: string;
    readonly supabaseKey: string;
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
        supabaseUrl: '',
        supabaseKey: '',
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
        const {
            VITE_APP_TITLE,
            VITE_APP_VERSION,
            VITE_APP_DESCRIPTION,
            VITE_APP_OG_TITLE,
            VITE_APP_OG_IMAGE,
            VITE_APP_OG_DESCRIPTION,
            VITE_COUNTDOWN_SECONDS,
            VITE_HANDCARD_MAX_LIMIT,
            VITE_SHOP_REFRESH_MINUTES,
            VITE_API_URL,
            VITE_SUPABASE_URL,
            VITE_SUPABASE_KEY,
        } = import.meta.env;

        ENV.value = {
            appTitle: VITE_APP_TITLE ?? 'Logicard Duel!',
            appVersion: VITE_APP_VERSION ?? 'unreleased',
            appDescription: VITE_APP_DESCRIPTION ?? '你能在反叛機器人 GkBot 的肆虐下生存多久？',
            ogTitle: VITE_APP_OG_TITLE ?? 'Logicard Duel!',
            ogImage: VITE_APP_OG_IMAGE ?? 'https://logicard-duel.pages.dev/ogimage.png',
            ogDescription: VITE_APP_OG_DESCRIPTION ?? '你能在反叛機器人 GkBot 的肆虐下生存多久？',
            countdownSeconds: VITE_COUNTDOWN_SECONDS ? Number(VITE_COUNTDOWN_SECONDS) : 60,
            handCardMaxLimit: VITE_HANDCARD_MAX_LIMIT ? Number(VITE_HANDCARD_MAX_LIMIT) : 7,
            shopRefreshMinutes: VITE_SHOP_REFRESH_MINUTES? Number(VITE_SHOP_REFRESH_MINUTES) : 10,
            apiUrl: import.meta.env.MODE === 'production' ? VITE_API_URL : '/api',
            supabaseUrl: VITE_SUPABASE_URL,
            supabaseKey: VITE_SUPABASE_KEY,
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
        await opponentStore.init();
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
