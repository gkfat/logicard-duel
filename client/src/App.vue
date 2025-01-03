<template>
    <v-app
        full-height
        :styles="{
            height,
            width
        }"
        class="bg-transparent overflow-hidden"
    >
        <!-- 載入動畫 -->
        <template v-if="isBooting">
            <v-card
                flat
                color="darkgrey"
                class="w-100 fill-height"
            >
                <v-row
                    class="ma-0 align-center fill-height mx-auto"
                    :style="{
                        maxWidth: '350px',
                    }"
                >
                    <v-col cols="12">
                        <p class="text-h6 text-center">
                            載入中...
                            <em class="text-caption">{{ bootingPercent }} %</em>
                        </p>

                        <v-spacer class="my-3" />

                        <v-progress-linear
                            class="w-100 rounded-xl"
                            color="skin"
                            :model-value="bootingPercent"
                            :height="10"
                        />
                    </v-col>
                </v-row>
            </v-card>
        </template>

        <template v-else>
            <router-view />
        </template>
    </v-app>

    <!-- 背景動畫 -->
    <ul
        v-if="isDisplayBackground"
        class="blocks"
    >
        <li
            v-for="i in 10"
            :key="i"
        />
    </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useWindowSize } from '@vueuse/core';

import { enumGameState } from './enums/game';
import { useAppStore } from './store/app';

const {
    height, width, 
} = useWindowSize();

const appStore = useAppStore();
const isBooting = computed(() => appStore.gameState === enumGameState.Booting);
const bootProcess = computed(() => appStore.bootProcess);
const bootingPercent = computed(() => {
    const {
        totalTasks, doneTasks, 
    } = bootProcess.value;
    return (doneTasks / totalTasks) * 100;
});

const isDisplayBackground = computed(() => {
    return [
        enumGameState.Initialized,
        enumGameState.ChooseCharacter,
        enumGameState.ChooseOpponent,
    ].includes(
        appStore.gameState,
    );
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
