<template>
    <div class="battleend"></div>

    <v-row class="w-100 ma-0 ga-3 flex-column pb-3">
        <v-col cols="auto" class="pa-0">
            <Dialog :dialogs="dialogs" />
        </v-col>

        <v-col cols="auto" class="pa-0">
            <CoinStatus></CoinStatus>
        </v-col>

        <v-col cols="auto" class="pa-0">
            <Loots></Loots>
            <v-spacer class="my-3"></v-spacer>
            <PlayerItems></PlayerItems>
        </v-col>

        <v-col cols="auto" class="pa-0 mt-auto">
            <Btn
                :disabled="isDisabledGoRest"
                :text="isDisabledGoRest ? '背包太重了！' : '回到避難所'"
                :func="goRest"
            />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import {
    computed,
    onMounted,
} from 'vue';

import CoinStatus from '@/components/common/CoinStatus.vue';
import Btn from '@/components/system/Btn.vue';
import Dialog from '@/components/system/Dialog.vue';
import { useSoundEffect } from '@/composable/useSoundEffect';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';
import { useOpponentStore } from '@/store/opponent';
import { usePlayerStore } from '@/store/player';

import Loots from './components/Loots.vue';
import PlayerItems from './components/PlayerItems.vue';

const appStore = useAppStore();
const opponentStore = useOpponentStore();
const playerStore = usePlayerStore();
const player = computed(() => playerStore.currentPlayer!);

const { soundClick } = useSoundEffect();

const dialogs = DialogDataList[enumDialog.BattleEnd];

const goRest = async () => {
    await soundClick();
    appStore.changeGameState(enumGameState.Rest);
};

const isDisabledGoRest = computed(() => {
    const equips = player.value.backpack.equips.length;
    const cards = player.value.backpack.cards.length;

    return equips + cards > player.value.character.backpackLimit;
});

onMounted(() => {
    playerStore.collectCoin(opponentStore.currentOpponent!.backpack.coin);
});
</script>
<style lang="scss" scoped>
.battleend {
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
    opacity: 0.8;
}
</style>
