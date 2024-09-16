<template>
    <Dialog :max-height="350" :dialogs="dialog" />

    <v-row class="justify-center ga-3">
        <v-col cols="auto" class="pa-0">
            <BtnIcon :icon="'mdi-github'" :func="openGithub" />
        </v-col>
        <v-col cols="auto" class="pa-0">
            <Rank />
        </v-col>
    </v-row>

    <BtnText :text="t('game_view.start')" :func="start" />
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import Rank from '@/components/rank/Index.vue';
import BtnIcon from '@/components/system/BtnIcon.vue';
import BtnText from '@/components/system/BtnText.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';
import { useSoundStore } from '@/store/sound';

const dialog = DialogDataList[enumDialog.Opening];

const { t } = useI18n();
const appStore = useAppStore();
const soundStore = useSoundStore();

const openGithub = async () => {
    await soundStore.playSound(soundStore.sounds.effect.click);
    window.open('https://github.com/gkfat/logicard-duel/', '_blank');
};

const start = async () => {
    appStore.switchSpinner(true);

    await soundStore.playSound(soundStore.sounds.effect.click);

    appStore.changeGameState(enumGameState.ChooseCharacter);

    appStore.switchSpinner(false);
};
</script>
