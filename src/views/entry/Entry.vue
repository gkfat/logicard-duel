<template>
    <h1
        class="w-100 text-h6 text-center mb-5 text-white font-weight-bold"
        style="z-index:1"
    >
        Logicard Duel
    </h1>

    <Dialog
        :max-height="350"
        :dialogs="dialog"
    />

    <v-row class="justify-center ga-3 my-5">
        <v-col
            cols="auto"
            class="pa-0"
        >
            <BtnIcon
                :icon="'mdi-github'"
                :func="openGithub"
            />
        </v-col>
        <v-col
            cols="auto"
            class="pa-0"
        >
            <Rank />
        </v-col>
    </v-row>

    <BtnText
        :text="t('game_view.start')"
        :func="start"
    />
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import Rank from '@/components/rank/Index.vue';
import BtnIcon from '@/components/system/BtnIcon.vue';
import BtnText from '@/components/system/BtnText.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data';
import {
    enumDialog,
    enumGameState,
} from '@/enums/game';
import {
    useGameStateStore,
    useSwitchToggleStore,
} from '@/store';
import useSoundStore from '@/store/sound';

const dialog = DialogDataList[enumDialog.Opening];

const { t } = useI18n();
const switchToggleStore = useSwitchToggleStore();
const gameStateStore = useGameStateStore();
const soundStore = useSoundStore();

const openGithub = async () => {
    await soundStore.playSound(soundStore.sounds.effect.click);
    window.open('https://github.com/gkfat/logicard-duel/', '_blank');
};

const start = async () => {
    switchToggleStore.switchSpinner(true);
    await soundStore.playSound(soundStore.sounds.effect.click);
    gameStateStore.changeGameState(enumGameState.ChooseCharacter);
    switchToggleStore.switchSpinner(false);
};
</script>
