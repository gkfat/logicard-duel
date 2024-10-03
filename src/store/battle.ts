import {
    computed,
    ref,
} from 'vue';

import { defineStore } from 'pinia';

import { enumRoundPhase } from '@/enums/battle';
import { enumEffect } from '@/enums/effect';
import { Card } from '@/types/core';

import { useAppStore } from './app';
import { useOpponentStore } from './opponent';
import { usePlayerStore } from './player';

export const useBattleStore = defineStore('battle', () => {
    const appStore = useAppStore();
    const playerStore = usePlayerStore();
    const opponentStore = useOpponentStore();

    const remainSeconds = ref(0);
    const roundPhase = ref(enumRoundPhase.BeforeRound);

    /** 玩家傾向 */
    const playerAttempt = computed(() => {
        if (playerStore.tableCard?.template.effect === enumEffect.Defense) {
            return enumEffect.Defense;
        }

        return enumEffect.Harm;
    });

    /** 敵人傾向 */
    const opponentAttempt = computed(() => {
        if (opponentStore.tableCard?.template.effect === enumEffect.Defense) {
            return enumEffect.Defense;
        }

        return enumEffect.Harm;
    });

    /** 用過的牌堆 */
    const cardStacks = ref<Card[]>([]);

    /** 重置倒數計時 */
    function resetRemainSeconds() {
        remainSeconds.value = appStore.ENV.countdownSeconds;
    }

    /** 改變局階段 */
    function changeRoundPhase(phase: enumRoundPhase) {
        roundPhase.value = phase;
    }

    /** 清理桌面 */
    async function clearTable() {
        const playerCard = playerStore.tableCard;
        const opponentCard = opponentStore.tableCard;

        if (playerCard) {
            cardStacks.value.push(playerCard);
            playerStore.tableCard = undefined;
        }

        if (opponentCard) {
            cardStacks.value.push(opponentCard);
            opponentStore.tableCard = undefined;
        }
    }

    /** 重置戰鬥 */
    function resetBattle() {
        clearTable();
        cardStacks.value = [];
        roundPhase.value = enumRoundPhase.BeforeRound;
    }

    return {
        remainSeconds,
        roundPhase,
        cardStacks,
        playerAttempt,
        opponentAttempt,

        resetRemainSeconds,
        resetBattle,
        changeRoundPhase,
        clearTable,
    };
});
