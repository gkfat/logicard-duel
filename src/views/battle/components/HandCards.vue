<template>
    <v-card flat class="bg-transparent">
        <v-row class="ma-0 align-center flex-nowrap justify-center">
            <v-col
                v-for="(card, i) in handCards"
                :key="i"
                cols="1"
                class="pa-0 card-container"
                :class="{
                    'mx-3': displayInSector && cardSize !== 'x-small',
                }"
                :style="displayInSector ? calcCardStyle(i) : ''"
            >
                <Card
                    :ref="(el) => /** @ts-ignore */ (cardRefs[i] = el)"
                    :card="card"
                    :size="cardSize"
                    :is-card-back="isCardBack"
                    :show-detail="showCardDetail"
                >
                    <template #actions>
                        <p>{{ isAbleToPlaceCard }}</p>
                        <Btn
                            v-if="isAbleToPlaceCard"
                            :text="'出牌'"
                            :func="() => placeCard(i)"
                        />
                        <Btn
                            v-else
                            :text="'現在無法出牌'"
                            :func="() => closeDetail(i)"
                        />
                    </template>
                </Card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script lang="ts" setup>
import {
    computed,
    ref,
} from 'vue';

import Card from '@/components/card/Card.vue';
import Btn from '@/components/system/Btn.vue';
import { enumRoundPhase } from '@/enums/battle';
import { useBattleStore } from '@/store/battle';
import { useOpponentStore } from '@/store/opponent';
import { usePlayerStore } from '@/store/player';
import { Card as CardType } from '@/types/core';

const playerStore = usePlayerStore();
const opponentStore = useOpponentStore();
const battleStore = useBattleStore();

const roundPhase = computed(() => battleStore.roundPhase);
const cardRefs = ref<(InstanceType<typeof Card> | null)[]>([]);

const {
    playerType,
    handCards,
    cardSize,
    isCardBack,
    showCardDetail,
    displayInSector,
} = defineProps<{
    playerType: 'player' | 'opponent';
    handCards: CardType[];
    cardSize: 'small' | 'x-small';
    isCardBack: boolean;
    showCardDetail: boolean;
    displayInSector: boolean;
}>();

/** 是否可出牌 */
const isAbleToPlaceCard = computed(
    () =>
        roundPhase.value === enumRoundPhase.Main &&
        battleStore.remainSeconds > 0,
);

/** 計算弧形排列 */
const calcCardStyle = (i: number) => {
    const middleIndex = Math.floor(handCards.length / 2);
    /** 偏差值 */
    const deviation = i - middleIndex;
    const deg = deviation * 1.5 * 7;
    const y = Math.abs(deviation) * Math.abs(deviation) * 5;
    return `transform: rotate(${deg}deg) translateY(${y}px)`;
};

const closeDetail = (index: number) => {
    const getCardComponent = cardRefs.value[index];
    getCardComponent?.toggleDialog(false);
};

const placeCard = (index: number) => {
    const getCard = handCards[index];
    const getCardComponent = cardRefs.value[index];

    if (playerType === 'player') {
        playerStore.placeCard(getCard);
        getCardComponent?.toggleDialog(false);
    }
};
</script>
<style lang="scss" scoped>
.card-container {
    transition: transform 0.5s ease;
    transform-origin: center;
}
</style>
