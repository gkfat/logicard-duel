<template>
    <v-card flat class="bg-transparent">
        <v-row class="ma-0 pb-7 align-center flex-nowrap justify-center">
            <v-col
                v-for="(card, i) in handCards"
                :key="i"
                cols="1"
                class="pa-0 card-container"
                :class="{
                    'mx-2': displayInSector,
                }"
                :style="
                    displayInSector
                        ? {
                              transform: `rotate(${
                                  (i - (handCards.length - 1) / 2) * 8
                              }deg) translateY(${calcTranslateY(i)}px)`,
                          }
                        : ''
                "
            >
                <Card
                    :ref="(el) => (cardRefs[i] = el)"
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
                        ></Btn>
                        <Btn
                            v-else
                            :text="'關閉'"
                            :func="() => closeDetail(i)"
                        ></Btn>
                    </template>
                </Card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

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
        battleStore.remainSeconds > 0
);

const calcTranslateY = (i: number) => {
    const distance = (handCards.length - 1 - i) * 10;
    const centerIndex = Math.floor(handCards.length / 2);
    const centerDistance = (handCards.length - 1 - centerIndex) * 10;

    return i === centerIndex
        ? 3
        : Math.abs(Math.abs(distance) - Math.abs(centerDistance));
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
    } else if (playerType === 'opponent') {
        opponentStore.placeCard(getCard);
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
