import { ref } from 'vue';

import { defineStore } from 'pinia';

import { enumRoundPhase } from '@/enums/battle';
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

    /** 用過的牌堆 */
    const cardStacks = ref<Card[]>([]);

    /** 重置倒數計時 */
    function resetRemainSeconds() {
        remainSeconds.value = appStore.ENV.countdownSeconds;
    }

    /** 重置戰鬥 */
    function resetBattle() {
        roundPhase.value = enumRoundPhase.BeforeRound;
    }

    /** 改變局階段 */
    function changeRoundPhase(phase: enumRoundPhase) {
        roundPhase.value = phase;
    }

    /** 清理桌面 */
    async function clearTable() {
        const playerCard = playerStore.tableCard;
        const opponentCard = playerStore.tableCard;

        if (playerCard) {
            cardStacks.value.push(playerCard);
            playerStore.tableCard = undefined;
        }

        if (opponentCard) {
            cardStacks.value.push(opponentCard);
            opponentStore.tableCard = undefined;
        }
    }

    return {
        remainSeconds,
        roundPhase,
        cardStacks,
        resetRemainSeconds,
        resetBattle,
        changeRoundPhase,
        clearTable,
    };
});
