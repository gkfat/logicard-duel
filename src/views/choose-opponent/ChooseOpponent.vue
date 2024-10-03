<template>
    <v-row class="w-100 ma-0 ga-3 flex-column pb-3">
        <v-col cols="auto" class="pa-0">
            <Dialog :dialogs="dialogs" />
        </v-col>

        <v-col cols="auto" class="pa-0 flex-grow-1">
            <v-row class="ma-0 justify-center align-center fill-height ga-3">
                <v-col
                    v-for="(opponent, index) in opponentStore.pool"
                    :key="index"
                    cols="auto"
                    class="pa-0"
                    @click="onOpponentSelected(index)"
                >
                    <OpponentCard
                        :is-selected="currentOpponentIndex === index"
                        :character="opponent.character"
                    />
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="auto" class="pa-0 mt-auto">
            <Btn :text="t('button.battle')" :func="startBattle" />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import {
    onMounted,
    ref,
    watch,
} from 'vue';

import { useI18n } from 'vue-i18n';

import Btn from '@/components/system/Btn.vue';
import Dialog from '@/components/system/Dialog.vue';
import { useSoundEffect } from '@/composable/useSoundEffect';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';
import { useOpponentStore } from '@/store/opponent';

import OpponentCard from './components/OpponentCard.vue';

const { t } = useI18n();
const opponentStore = useOpponentStore();
const { soundClick } = useSoundEffect();
const appStore = useAppStore();
const dialogs = DialogDataList[enumDialog.ChooseOpponent];

/** 選擇的敵人 index */
const currentOpponentIndex = ref(0);

const onOpponentSelected = async (index: number) => {
    await soundClick();
    currentOpponentIndex.value = index;
};

const startBattle = async () => {
    await soundClick();

    // 決定敵人
    opponentStore.currentOpponent =
        opponentStore.pool[currentOpponentIndex.value];

    appStore.changeGameState(enumGameState.Battle);
};

onMounted(async () => {
    await opponentStore.clearOpponent();

    // 檢查若 pool 少於 3 隻則生成
    if (opponentStore.pool.length < 3) {
        opponentStore.refillPool();
    }
});
</script>
