<template>
    <v-card
        flat
        color="darkgrey"
        class="border-white border-lg rounded-lg border-opacity-75 position-relative"
        :width="60"
        :height="60"
    >
        <div
            v-for="(card, i) in cardStacks"
            :key="i"
            class="position-absolute"
            :style="{
                top: '50%',
                left: '50%',
                transform: `translateX(-${48 - i * 5}%) translateY(-${
                    50 + i * 5
                }%)`,
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
import { computed } from 'vue';

import Card from '@/components/card/Card.vue';
import { useBattleStore } from '@/store/battle';

const battleStore = useBattleStore();

const cardStacks = computed(() => battleStore.cardStacks);
</script>
