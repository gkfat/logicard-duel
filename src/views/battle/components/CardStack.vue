<template>
    <v-card
        flat
        color="darkgrey"
        class="border-white border-lg rounded border-opacity-50 py-3"
        :width="100"
        :height="100"
    >
        <div
            v-for="(card, i) in cardStacks"
            :key="i"
            class="position-absolute"
            :style="{
                left: 0,
                top: 0,
                right: i + 2,
                bottom: i + 2,
            }"
        >
            <Card
                :card="card"
                :show-detail="false"
                :size="'small'"
                :show-rarity="false"
            />
        </div>
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

const cardStacks = computed(() => battleStore.cardStacks);
</script>
<style lang="scss" scoped></style>
