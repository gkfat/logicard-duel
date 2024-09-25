<template>
    <Seat
        :player="player"
        :mumble-content="mumbleContent"
        :extra-status="extraStatus"
    ></Seat>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { usePlayerStore } from '@/store/player';

import Seat from '../components/Seat.vue';

const playerStore = usePlayerStore();

const player = computed(() => playerStore.currentPlayer!);
const mumbleContent = computed(() => playerStore.mumbleContent);
const extraStatus = computed(() => playerStore.extraStatus);
</script>
