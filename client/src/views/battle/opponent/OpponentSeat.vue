<template>
    <Seat
        :player="opponent"
        :mumble-content="mumbleContent"
        :extra-status="extraStatus"
    />
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useOpponentStore } from '@/store/opponent';

import Seat from '../components/Seat.vue';

const opponentStore = useOpponentStore();

const opponent = computed(() => opponentStore.currentOpponent!);
const mumbleContent = computed(() => opponentStore.mumbleContent);
const extraStatus = computed(() => opponentStore.extraStatus);
</script>
