<template>
    <div class="battlefield"></div>

    <v-row class="w-100 ma-0 flex-column pb-3">
        <v-col cols="auto" class="pa-0">
            <div>
                <!-- 敵人 -->
                <OpponentSeat></OpponentSeat>
                <OpponentHandCards
                    :style="{ transform: 'translateY(-20px)', height: '40px' }"
                ></OpponentHandCards>
            </div>

            <!-- 牌桌 -->
            <div :style="{ transform: 'translateY(-20px)' }">
                <Table
                    :player-round-status="playerRoundStatus"
                    :opponent-round-status="opponentRoundStatus"
                ></Table>
            </div>

            <!-- 玩家 -->
            <div
                :style="{
                    transform: 'translateY(-40px)',
                }"
            >
                <PlayerHandCards
                    :style="{
                        height: '80px',
                    }"
                ></PlayerHandCards>
                <PlayerSeat></PlayerSeat>
            </div>
        </v-col>
    </v-row>

    <RoundNotification></RoundNotification>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import { useSoundEffect } from '@/composable/useSoundEffect';
import { enumRoundPhase } from '@/enums/battle';
import { enumEffect } from '@/enums/effect';
import { enumGameState } from '@/enums/game';
import { enumMumbleType } from '@/enums/mumble';
import { useAppStore } from '@/store/app';
import { useBattleStore } from '@/store/battle';
import { useOpponentStore } from '@/store/opponent';
import { usePlayerStore } from '@/store/player';
import { sleepSeconds } from '@/utils/common';
import { createDate } from '@/utils/time';

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

const { soundCountdown, soundWin } = useSoundEffect();

const player = computed(() => playerStore.currentPlayer!);
const playerExtraStatus = computed(() => playerStore.extraStatus);
const playerAttempt = computed(() => battleStore.playerAttempt);
const playerTableCard = computed(() => playerStore.tableCard);
const playerBaseAttack = computed(
    () => player.value.status.attack + playerExtraStatus.value.attack
);
const playerBaseDefense = computed(
    () => player.value.status.defense + playerExtraStatus.value.defense
);

/** 本局戰鬥紀錄 */
const battleRecord = computed(() => {
    return player.value.records.find(
        (v) => v.opponent.id === opponent.value.id
    )!;
});

const opponent = computed(() => opponentStore.currentOpponent!);
const opponentExtraStatus = computed(() => opponentStore.extraStatus);
const opponentAttempt = computed(() => battleStore.opponentAttempt);
const opponentTableCard = computed(() => opponentStore.tableCard);
const opponentBaseAttack = computed(
    () => opponent.value.status.attack + opponentExtraStatus.value.attack
);
const opponentBaseDefense = computed(
    () => opponent.value.status.defense + opponentExtraStatus.value.defense
);

/** 玩家本局數值 */
const playerRoundStatus = computed(() => {
    let attack = playerBaseAttack.value;
    let defense = playerBaseDefense.value;

    if (playerTableCard.value) {
        const { point } = playerTableCard.value.info;
        switch (playerTableCard.value.template.effect) {
            case enumEffect.Harm:
                attack += point;
                break;
            case enumEffect.Defense:
                defense += point;
                break;
        }
    }

    return {
        attack,
        defense,
    };
});

/** 敵人本局數值 */
const opponentRoundStatus = computed(() => {
    let attack = opponentBaseAttack.value;
    let defense = opponentBaseDefense.value;

    if (opponentTableCard.value) {
        const { point } = opponentTableCard.value.info;
        switch (opponentTableCard.value.template.effect) {
            case enumEffect.Harm:
                attack += point;
                break;
            case enumEffect.Defense:
                defense += point;
                break;
        }
    }

    return {
        attack,
        defense,
    };
});

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

/** 結束戰鬥 */
const endBattle = async () => {
    // 紀錄時間
    battleRecord.value.battleEndAt = createDate().toDate();

    await playerStore.clearTableCards();
    await opponentStore.clearTableCards();
    battleStore.resetBattle();
};

/** 結算 */
const settle = async () => {
    if (player.value.status.health === 0) {
        // 玩家沒血, game over
        playerStore.randomMumble(enumMumbleType.Lose, true);

        await sleepSeconds(3);
        await endBattle();
        appStore.changeGameState(enumGameState.GameOver);
    } else if (opponent.value.status.health === 0) {
        // 敵人沒血, battle end
        opponentStore.randomMumble(enumMumbleType.Lose, true);

        await sleepSeconds(3);
        await soundWin();
        await sleepSeconds(1);
        await endBattle();
        appStore.changeGameState(enumGameState.BattleEnd);
    }
};

/** 開牌 */
const duel = async () => {
    // 若玩家為攻擊狀態則先攻, 否則跳過
    if (
        player.value.status.health > 0 &&
        playerAttempt.value === enumEffect.Harm &&
        roundPhase.value === enumRoundPhase.Duel
    ) {
        // 玩家攻擊力 - 敵人防禦力
        const opponentDeduction =
            playerRoundStatus.value.attack - opponentRoundStatus.value.defense;

        if (opponentDeduction > 0) {
            // 紀錄攻擊力
            battleRecord.value.harm += opponentDeduction;

            playerStore.randomMumble(enumMumbleType.Attack, true);
            opponentStore.randomMumble(enumMumbleType.Hurt, true);
            await sleepSeconds(1);
            // 敵人扣血
            opponentStore.decreaseHealth(opponentDeduction);
            await sleepSeconds(0.5);
            await settle();
        }
    }

    await sleepSeconds(1);

    // 敵人攻擊
    if (
        opponent.value.status.health > 0 &&
        opponentAttempt.value === enumEffect.Harm &&
        roundPhase.value === enumRoundPhase.Duel
    ) {
        // 敵人攻擊力 - 玩家防禦力
        const playerDeduction =
            opponentRoundStatus.value.attack - playerRoundStatus.value.defense;

        // 紀錄防禦力
        if (
            playerRoundStatus.value.defense < opponentRoundStatus.value.attack
        ) {
            battleRecord.value.defense += playerRoundStatus.value.defense;
        } else {
            battleRecord.value.defense += opponentRoundStatus.value.attack;
        }

        if (playerDeduction > 0) {
            // 紀錄受傷害
            battleRecord.value.damaged += playerDeduction;

            opponentStore.randomMumble(enumMumbleType.Attack, true);
            await sleepSeconds(1);
            // 玩家扣血
            playerStore.decreaseHealth(playerDeduction);
            playerStore.randomMumble(enumMumbleType.Hurt, true);
            await sleepSeconds(0.5);
            await settle();
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

                await sleepSeconds(3);
                battleStore.changeRoundPhase(enumRoundPhase.Draw);
                break;
            case enumRoundPhase.Draw: // 發牌
                await sleepSeconds(1);

                // 從背包補充手牌
                playerStore.drawCard();
                opponentStore.drawCard();

                await sleepSeconds(3);
                battleStore.changeRoundPhase(enumRoundPhase.Main);
                break;
            case enumRoundPhase.Main: // 出牌
                await sleepSeconds(3);

                // 倒數計時
                startCountdown();

                // 對手出牌
                opponentStore.logicPlaceCard();
                break;
            case enumRoundPhase.Duel: // 開牌
                playerStore.stopMumble();
                opponentStore.stopMumble();

                await sleepSeconds(3);

                await duel();

                await sleepSeconds(3);
                battleStore.changeRoundPhase(enumRoundPhase.Settle);
                break;
            case enumRoundPhase.Settle: // 結算
                // 紀錄使用牌數
                if (playerTableCard.value) {
                    battleRecord.value.cardsUsed += 1;
                }

                await battleStore.clearTable();
                await sleepSeconds(1);
                battleStore.changeRoundPhase(enumRoundPhase.RoundEnd);
                break;
            case enumRoundPhase.RoundEnd: // 局結束
                await sleepSeconds(1);
                battleStore.changeRoundPhase(enumRoundPhase.RoundStart);
                break;
        }
    }
);

onMounted(async () => {
    await sleepSeconds(3);

    playerStore.createRecord(opponent.value);

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
