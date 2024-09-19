<template>
    <v-row class="w-100 ma-0 ga-3 flex-column">
        <v-col cols="auto" class="pa-0">
            <Dialog :dialogs="dialogs" />
        </v-col>

        <v-col cols="auto" class="pa-0">
            <v-row class="ma-0">
                <v-col
                    v-for="(opponent, index) in opponentStore.pool"
                    :key="index"
                    cols="12"
                    class="pa-1"
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
            <BtnText :text="t('button.battle')" :func="startBattle" />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { useI18n } from 'vue-i18n';

import PlayerStatus from '@/components/player-status/PlayerStatus.vue';
import BtnText from '@/components/system/BtnText.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';
import { useOpponentStore } from '@/store/opponent';
import { usePlayerStore } from '@/store/player';
import { useSoundStore } from '@/store/sound';

import OpponentCard from './components/OpponentCard.vue';

const { t } = useI18n();
const soundStore = useSoundStore();
const playerStore = usePlayerStore();
const opponentStore = useOpponentStore();
const appStore = useAppStore();
const dialogs = DialogDataList[enumDialog.ChooseOpponent];

/** 選擇的敵人 index */
const currentOpponentIndex = ref(0);

const onOpponentSelected = async (index: number) => {
    await soundStore.playSound(soundStore.sounds.effect.click);
    currentOpponentIndex.value = index;
};

const startBattle = async () => {
    await soundStore.playSound(soundStore.sounds.effect.click);
    appStore.changeGameState(enumGameState.Battle);
};

onMounted(() => {
    // 檢查若 pool 少於 2 隻則生成
});
</script>

<style lang="scss" scoped></style>
