<template>
    <v-app
        full-height
        :style="{
            width: '100vw',
            height: '100vh',
        }"
        class="bg-transparent overflow-hidden"
    >
        <router-view />
    </v-app>

    <!-- 背景動畫 -->
    <ul class="blocks" v-if="isDisplayBackground">
        <li v-for="i in 10" :key="i" />
    </ul>
</template>

<script setup lang="ts">
import {
    computed,
    onMounted,
} from 'vue';

import { enumGameState } from './enums/game';
import { useAppStore } from './store/app';

const appStore = useAppStore();

const setEnv = async () => {
    appStore.ENV = {
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
        countdownSeconds: Number(import.meta.env.VITE_COUNTDOWN_SECONDS) ?? 60,
        handCardMaxLimit: Number(import.meta.env.VITE_HANDCARD_MAX_LIMIT) ?? 7,
    };
};

const isDisplayBackground = computed(() => {
    return [
        enumGameState.Init,
        enumGameState.ChooseCharacter,
        enumGameState.ChooseOpponent,
    ].includes(appStore.gameState);
});

onMounted(() => {
    setEnv();
});
</script>
<style lang="scss">
// 背景動畫
.blocks {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    background-color: rgb(var(--v-theme-primary));
    li {
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.2);
        animation: animate 20s linear infinite;
        bottom: -150px;
        &:nth-child(1) {
            left: 25%;
            width: 80px;
            height: 80px;
            animation-delay: 0s;
        }
        &:nth-child(2) {
            left: 10%;
            width: 20px;
            height: 20px;
            animation-delay: 2s;
            animation-duration: 10s;
        }
        &:nth-child(3) {
            left: 70%;
            width: 20px;
            height: 20px;
            animation-delay: 4s;
        }
        &:nth-child(4) {
            left: 40%;
            width: 60px;
            height: 60px;
            animation-delay: 0s;
            animation-duration: 15s;
        }
        &:nth-child(5) {
            left: 65%;
            width: 20px;
            height: 20px;
            animation-delay: 0s;
        }
        &:nth-child(6) {
            left: 75%;
            width: 110px;
            height: 110px;
            animation-delay: 3s;
        }
        &:nth-child(7) {
            left: 35%;
            width: 150px;
            height: 150px;
            animation-delay: 7s;
        }
        &:nth-child(8) {
            left: 50%;
            width: 25px;
            height: 25px;
            animation-delay: 15s;
            animation-duration: 35s;
        }
        &:nth-child(9) {
            left: 20%;
            width: 15px;
            height: 15px;
            animation-delay: 2s;
            animation-duration: 25s;
        }
        &:nth-child(10) {
            left: 85%;
            width: 150px;
            height: 150px;
            animation-delay: 0s;
            animation-duration: 11s;
        }
    }
}

@keyframes animate {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }
    100% {
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }
}
</style>
