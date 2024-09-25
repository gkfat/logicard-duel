<template>
    <v-card
        flat
        color="darkgrey"
        class="border-white border-lg rounded-lg border-opacity-75 position-relative"
        :width="65"
        :height="65"
    >
        <div
            v-for="(card, i) in cardStacks"
            :key="i"
            class="position-absolute"
            :style="{
                top: '50%',
                left: '50%',
                transform: `translateX(-${50 - i}%) translateY(-${50 + i}%)`,
            }"
        >
            <Card
                :card="card"
                :show-detail="false"
                :size="'x-small'"
                :show-rarity="false"
            />
        </div>
    </v-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import Card from '@/components/card/Card.vue';
import { useBattleStore } from '@/store/battle';
import { useOpponentStore } from '@/store/opponent';
import { usePlayerStore } from '@/store/player';

const battleStore = useBattleStore();

const cardStacks = computed(() => battleStore.cardStacks);
</script>
