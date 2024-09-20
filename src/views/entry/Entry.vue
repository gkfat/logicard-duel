<template>
    <v-row class="w-100 ma-0 ga-3 flex-column">
        <v-col cols="auto" class="pa-0">
            <Dialog :max-height="350" :dialogs="dialog" />
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
import Dialog from '@/components/system/Dialog.vue';
import { useSoundEffect } from '@/composable/useSoundEffect';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';

const dialog = DialogDataList[enumDialog.Opening];

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
