<template>
    <HandCards
        :player-type="'player'"
        :hand-cards="handCards"
        :card-size="'small'"
        :is-card-back="false"
        :show-card-detail="true"
        :display-in-sector="true"
    ></HandCards>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { usePlayerStore } from '@/store/player';

import HandCards from '../components/HandCards.vue';

const playerStore = usePlayerStore();

const handCards = computed(() => playerStore.handCards.slice());
</script>
