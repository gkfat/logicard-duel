<template>
    <div class="battlefield"></div>

    <v-row class="w-100 ma-0 ga-3 flex-column">
        <v-col cols="auto" class="pa-0">
            <OpponentSeat></OpponentSeat>
            <v-spacer class="mb-1"></v-spacer>
            <OpponentHandCards></OpponentHandCards>
        </v-col>

        <v-col cols="auto" class="pa-0 flex-grow-1">
            <Table></Table>
        </v-col>

        <v-col cols="auto" class="pa-0 mt-auto">
            <PlayerHandCards></PlayerHandCards>
            <v-spacer class="mb-3"></v-spacer>
            <PlayerSeat></PlayerSeat>
        </v-col>
    </v-row>

    <RoundNotification></RoundNotification>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import { useI18n } from 'vue-i18n';

import { useSoundEffect } from '@/composable/useSoundEffect';
import { enumRoundPhase } from '@/enums/battle';
import { enumGameState } from '@/enums/game';
import { enumMumbleType } from '@/enums/mumble';
import { useAppStore } from '@/store/app';
import { useBattleStore } from '@/store/battle';
import { useOpponentStore } from '@/store/opponent';
import { usePlayerStore } from '@/store/player';
import { Player } from '@/types/player';
import { sleep } from '@/utils/common';

import RoundNotification from './components/RoundNotification.vue';
import Table from './components/Table.vue';
import OpponentHandCards from './opponent/OpponentHandCards.vue';
import OpponentSeat from './opponent/OpponentSeat.vue';
import PlayerHandCards from './player/PlayerHandCards.vue';
import PlayerSeat from './player/PlayerSeat.vue';

const { t } = useI18n();
const playerStore = usePlayerStore();
const opponentStore = useOpponentStore();
const appStore = useAppStore();
const battleStore = useBattleStore();

const { soundCountdown } = useSoundEffect();

const player = computed<Player>(() => playerStore.currentPlayer!);
const opponent = computed<Player>(() => opponentStore.currentOpponent!);

/** 局階段 */
const roundPhase = computed(() => battleStore.roundPhase);

/** 倒數計時 */
const remainSeconds = computed(() => battleStore.remainSeconds);

/** 倒數計時結束 */
const endCountdown = () => {
    battleStore.changeRoundPhase(enumRoundPhase.Duel);
};

/** 開始倒數計時 */
const startCountdown = () => {
    // 重置倒數計時
    battleStore.resetRemainSeconds();

    const countdownInterval = setInterval(async () => {
        if (remainSeconds.value > 0) {
            battleStore.remainSeconds -= 1;
            if (remainSeconds.value === 3) {
                await soundCountdown();
            }
        } else {
            clearInterval(countdownInterval);
            endCountdown();
        }
    }, 1000);
};

/** 判斷要重新開始或結束 */
const judgeResult = async () => {
    if (player.value.status.health === 0) {
        playerStore.randomMumble(enumMumbleType.Lose, true);

        await sleep(3000);
        appStore.changeGameState(enumGameState.GameOver);
    } else if (opponent.value.status.health === 0) {
        opponentStore.randomMumble(enumMumbleType.Lose, true);

        await sleep(3000);
        appStore.changeGameState(enumGameState.BattleEnd);
    } else {
        await sleep(3000);
        battleStore.changeRoundPhase(enumRoundPhase.RoundStart);
    }
};

/** 階段 control flow */
watch(
    () => roundPhase.value,
    async () => {
        switch (roundPhase.value) {
            case enumRoundPhase.BeforeRound: // 局未開始, 不處理
                break;
            case enumRoundPhase.RoundStart: // 開始
                // 開始喃喃自語
                playerStore.startMumble();
                opponentStore.startMumble();

                await sleep(3000);
                battleStore.changeRoundPhase(enumRoundPhase.Draw);
                break;
            case enumRoundPhase.Draw: // 發牌
                await sleep(1000);
                // 背包卡牌抽 3 張進手牌
                playerStore.drawCard();
                opponentStore.drawCard();

                await sleep(3000);
                battleStore.changeRoundPhase(enumRoundPhase.Main);
                break;
            case enumRoundPhase.Main: // 出牌
                await sleep(2000);

                // 倒數計時
                startCountdown();

                // 對手出牌
                opponentStore.logicPlaceCard();
                break;
            case enumRoundPhase.Duel: // 開牌
                await sleep(15000);

                battleStore.changeRoundPhase(enumRoundPhase.Settle);
                break;
            case enumRoundPhase.Settle: // 結算
                await sleep(3000);
                battleStore.changeRoundPhase(enumRoundPhase.RoundEnd);
                break;
            case enumRoundPhase.RoundEnd: // 局結束
                await sleep(1000);
                await battleStore.clearTable();
                playerStore.stopMumble();
                opponentStore.stopMumble();
                judgeResult();
                break;
        }
    }
);

onMounted(async () => {
    await sleep(3000);

    battleStore.resetBattle();
    battleStore.changeRoundPhase(enumRoundPhase.RoundStart);
});
</script>
<style lang="scss" scoped>
.battlefield {
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
