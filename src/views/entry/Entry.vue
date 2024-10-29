<template>
    <v-row class="w-100 ma-0 ga-3 flex-column pb-3">
        <v-col
            cols="auto"
            class="pa-0 d-flex align-center flex-wrap justify-center flex-grow-1"
        >
            <v-col
                cols="12"
                class="pa-0 text-center mt-auto text-h3 font-weight-bold font-italic"
                :class="{
                    float1: true,
                }"
                :style="{
                    paddingRight: '80px !important',
                }"
                >Logicard</v-col
            >
            <v-col
                cols="12"
                class="pa-0 text-center mb-auto text-h2 font-weight-bold font-italic"
                :class="{
                    float2: true,
                }"
                :style="{
                    paddingLeft: '120px !important',
                }"
                >Duel!</v-col
            >
        </v-col>

        <v-col cols="auto" class="mt-auto pa-0">
            <v-row class="justify-center ma-0 ga-3">
                <v-col cols="auto" class="pa-0">
                    <Btn :icon="'mdi-github'" :func="openGithub" />
                </v-col>
                <v-col cols="auto" class="pa-0">
                    <Btn
                        :icon="'mdi-script-text'"
                        :func="() => appStore.openDialog('rank')"
                    />
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="auto" class="pa-0">
            <Btn :text="t('game_view.start')" :func="start" />
        </v-col>
    </v-row>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import Btn from '@/components/system/Btn.vue';
import { useSoundEffect } from '@/composable/useSoundEffect';
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';
import { useSoundStore } from '@/store/sound';

const { t } = useI18n();
const appStore = useAppStore();
const soundStore = useSoundStore();
const { soundClick } = useSoundEffect();

const openGithub = async () => {
    await soundClick();
    window.open('https://github.com/gkfat/logicard-duel/', '_blank');
};

const start = async () => {
    appStore.switchSpinner(true);
    await soundStore.playAllInMute();

    await soundClick();

    appStore.changeGameState(enumGameState.ChooseCharacter);

    appStore.switchSpinner(false);
};
</script>
<style lang="scss" scoped>
.float1 {
    animation: float1 3s ease-in-out infinite;
}

.float2 {
    animation: float2 2.5s ease-in-out infinite;
    animation-delay: 0.5s;
}

@keyframes float1 {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
    }
}

@keyframes float2 {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
    100% {
        transform: translateY(0);
    }
}
</style>
