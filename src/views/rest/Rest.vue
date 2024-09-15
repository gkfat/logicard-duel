<template>
    <div class="campfire" />

    <v-col
        cols="12"
        class="pa-0 mb-3"
    >
        <Dialog :dialogs="dialogs" />
    </v-col>

    <v-col
        cols="12"
        class="pa-0 mb-3"
    >
        <PlayerStatus
            :player="player"
        />
    </v-col>

    <v-col
        cols="12"
        class="pa-0 mt-auto"
    >
        <v-row class="ma-0 ga-3 justify-center">
            <!-- 背包 -->
            <v-col
                cols="auto"
                class="pa-0"
            >
                <Backpack />
            </v-col>
            <!-- 排行榜 -->
            <v-col
                cols="auto"
                class="pa-0"
            >
                <Rank />
            </v-col>
            <!-- 商店 -->
            <v-col
                cols="auto"
                class="pa-0"
            >
                <Shop />
            </v-col>
            <v-col
                cols="12"
                class="pa-0"
            >
                <BtnText
                    :text="t('button.next_battle')"
                    :func="battleStart"
                />
            </v-col>
        </v-row>
    </v-col>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useI18n } from 'vue-i18n';

import Backpack from '@/components/backpack/Backpack.vue';
import Rank from '@/components/rank/Index.vue';
import Shop from '@/components/shop/Index.vue';
import BtnText from '@/components/system/BtnText.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import {
    enumDialog,
    enumGameState,
} from '@/enums/game';
import {
    useGameStateStore,
    usePlayerStore,
} from '@/store';
import useSoundStore from '@/store/sound';

import PlayerStatus from './components/PlayerStatus.vue';

const playerStore = usePlayerStore();
const gameStateStore = useGameStateStore();
const soundStore = useSoundStore();
const { t } = useI18n();
const player = computed(() => playerStore.player);
const dialogs = DialogDataList[enumDialog.Rest];

const battleStart = async () => {
    await soundStore.playSound(soundStore.sounds.effect.click);
    gameStateStore.changeGameState(enumGameState.BattleStart);
};
</script>

<style lang="scss" scoped>
  .campfire {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://storage.googleapis.com/logicard_duel/gifs/rest.gif');
    background-size: cover;
    background-position-y: 70%;
    background-repeat: no-repeat;
    z-index: -1;
  }
</style>
