<template>
    <div class="battlefield"></div>

    <v-row class="w-100 ma-0 ga-3 flex-column">
        <v-col cols="auto" class="pa-0">
            <OpponentSeat></OpponentSeat>
            <v-spacer class="mb-1"></v-spacer>
            <OpponentHandCards></OpponentHandCards>
        </v-col>

        <v-col cols="auto" class="pa-0 flex-grow-1">
            <Table
                :player-round-status="playerRoundStatus"
                :opponent-round-status="opponentRoundStatus"
            ></Table>
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
import {
    computed,
    onMounted,
    ref,
    watch,
} from 'vue';

import { useSoundEffect } from '@/composable/useSoundEffect';
import { enumRoundPhase } from '@/enums/battle';
import { enumEffect } from '@/enums/effect';
import { enumGameState } from '@/enums/game';
import { enumMumbleType } from '@/enums/mumble';
import { useAppStore } from '@/store/app';
import { useBattleStore } from '@/store/battle';
import { useOpponentStore } from '@/store/opponent';
import { usePlayerStore } from '@/store/player';
import { sleep } from '@/utils/common';

import RoundNotification from './components/RoundNotification.vue';
import Table from './components/Table.vue';
import OpponentHandCards from './opponent/OpponentHandCards.vue';
import OpponentSeat from './opponent/OpponentSeat.vue';
import PlayerHandCards from './player/PlayerHandCards.vue';
import PlayerSeat from './player/PlayerSeat.vue';

const playerStore = usePlayerStore();
const opponentStore = useOpponentStore();
const appStore = useAppStore();
const battleStore = useBattleStore();

const { soundCountdown } = useSoundEffect();

const player = computed(() => playerStore.currentPlayer!);
const playerExtraStatus = computed(() => playerStore.extraStatus);
const playerAttempt = computed(() => battleStore.playerAttempt);
const playerTableCardPoint = computed(
    () => playerStore.tableCard?.info.point ?? 0
);
const playerBaseAttack = computed(
    () => player.value.status.attack + playerExtraStatus.value.attack
);
const playerBaseDefense = computed(
    () => player.value.status.defense + playerExtraStatus.value.defense
);

const playerRoundStatus = computed(() => {
    const attack =
        playerAttempt.value === enumEffect.Harm
            ? playerBaseAttack.value + playerTableCardPoint.value
            : playerBaseAttack.value;
    const defense =
        playerAttempt.value === enumEffect.Defense
            ? playerBaseDefense.value + playerTableCardPoint.value
            : playerBaseDefense.value;

    return {
        attack,
        defense,
    };
});

const opponentRoundStatus = computed(() => {
    const attack =
        opponentAttempt.value === enumEffect.Harm
            ? opponentBaseAttack.value + opponentTableCardPoint.value
            : opponentBaseAttack.value;
    const defense =
        opponentAttempt.value === enumEffect.Defense
            ? opponentBaseDefense.value + opponentTableCardPoint.value
            : opponentBaseDefense.value;

    return {
        attack,
        defense,
    };
});

const opponent = computed(() => opponentStore.currentOpponent!);
const opponentExtraStatus = computed(() => opponentStore.extraStatus);
const opponentAttempt = computed(() => battleStore.opponentAttempt);
const opponentTableCardPoint = computed(
    () => opponentStore.tableCard?.info.point ?? 0
);
const opponentBaseAttack = computed(
    () => opponent.value.status.attack + opponentExtraStatus.value.attack
);
const opponentBaseDefense = computed(
    () => opponent.value.status.defense + opponentExtraStatus.value.defense
);

/** 局階段 */
const roundPhase = computed(() => battleStore.roundPhase);

/** 倒數計時 */
const remainSeconds = computed(() => battleStore.remainSeconds);

const isCountingDown = ref(false);

/** 倒數計時結束 */
const endCountdown = () => {
    isCountingDown.value = false;
};

/** 開始倒數計時 */
const startCountdown = () => {
    isCountingDown.value = true;

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

/** 結算 */
const settle = async () => {
    if (player.value.status.health === 0) {
        // 玩家沒血, game over
        playerStore.randomMumble(enumMumbleType.Lose, true);

        await sleep(3000);
        appStore.changeGameState(enumGameState.GameOver);
    } else if (opponent.value.status.health === 0) {
        // 敵人沒血, battle end
        opponentStore.randomMumble(enumMumbleType.Lose, true);

        await sleep(3000);
        appStore.changeGameState(enumGameState.BattleEnd);
    }
};

/** 開牌 */
const duel = async () => {
    // 若玩家為攻擊狀態則先攻, 否則跳過
    if (playerAttempt.value === enumEffect.Harm) {
        // 玩家攻擊力 - 敵人防禦力
        const opponentDeduction =
            playerRoundStatus.value.attack - opponentRoundStatus.value.defense;

        if (opponentDeduction > 0) {
            console.log('敵人扣血: ', opponentDeduction);
            playerStore.randomMumble(enumMumbleType.Attack, true);
            opponentStore.randomMumble(enumMumbleType.Hurt, true);
            await sleep(1000);
            // 敵人扣血
            opponentStore.decreaseHealth(opponentDeduction);
            await sleep(1000);
            settle();
        }
    }

    await sleep(1000);

    // 敵人攻擊
    if (opponentAttempt.value === enumEffect.Harm) {
        // 敵人攻擊力 - 玩家防禦力
        const playerDeduction =
            opponentRoundStatus.value.attack - playerRoundStatus.value.defense;

        if (playerDeduction > 0) {
            console.log('玩家扣血: ', playerDeduction);
            opponentStore.randomMumble(enumMumbleType.Attack, true);
            await sleep(1000);
            // 玩家扣血
            playerStore.decreaseHealth(playerDeduction);
            playerStore.randomMumble(enumMumbleType.Hurt, true);
            await sleep(1000);
            settle();
        }
    }
};

/** 倒數計時結束後轉換局狀態 */
watch(
    () => isCountingDown.value,
    async () => {
        if (
            roundPhase.value === enumRoundPhase.Main &&
            isCountingDown.value === false
        ) {
            await sleep(1000);
            battleStore.changeRoundPhase(enumRoundPhase.Duel);
        }
    }
);

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

                // 從背包補充手牌
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
                playerStore.stopMumble();
                opponentStore.stopMumble();
                await sleep(1500);

                await duel();

                await sleep(3000);
                battleStore.changeRoundPhase(enumRoundPhase.Settle);
                break;
            case enumRoundPhase.Settle: // 結算
                await battleStore.clearTable();
                battleStore.changeRoundPhase(enumRoundPhase.RoundEnd);
                break;
            case enumRoundPhase.RoundEnd: // 局結束
                await sleep(1000);
                battleStore.changeRoundPhase(enumRoundPhase.RoundStart);
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
