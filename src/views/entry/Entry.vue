<template>
    <v-row class="w-100 ma-0 ga-3 flex-column">
        <v-col
            cols="auto"
            class="pa-0 d-flex align-center flex-wrap justify-center flex-grow-1"
        >
            <v-col
                cols="12"
                class="pa-0 text-center mt-auto text-h3 font-weight-bold font-italic"
                :style="{
                    paddingRight: '80px !important',
                }"
                >Logicard</v-col
            >
            <v-col
                cols="12"
                class="pa-0 text-center mb-auto text-h2 font-weight-bold font-italic"
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

const { t } = useI18n();
const appStore = useAppStore();
const { soundClick } = useSoundEffect();

const openGithub = async () => {
    await soundClick();
    window.open('https://github.com/gkfat/logicard-duel/', '_blank');
};

const start = async () => {
    appStore.switchSpinner(true);

    await soundClick();

    appStore.changeGameState(enumGameState.ChooseCharacter);

    appStore.switchSpinner(false);
};
</script>
