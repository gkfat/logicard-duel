<template>
    <HandCards
        :player-type="'opponent'"
        :hand-cards="handCards"
        :card-size="'x-small'"
        :is-card-back="true"
        :show-card-detail="false"
        :display-in-sector="false"
    ></HandCards>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useOpponentStore } from '@/store/opponent';

import HandCards from '../components/HandCards.vue';

const opponentStore = useOpponentStore();

const handCards = computed(() => opponentStore.handCards.slice());
</script>
