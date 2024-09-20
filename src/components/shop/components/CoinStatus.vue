<template>
    <v-row class="ma-0 justify-end">
        <v-col class="pa-1 d-flex align-center ga-1" cols="auto">
            <v-icon color="bluegrey" icon="mdi-screw-round-top"></v-icon>
            {{ player.backpack.coin }}
        </v-col>
        <v-col class="pa-1 d-flex align-center ga-1" cols="auto">
            <v-icon color="bluegrey" icon="mdi-bag-personal"></v-icon>
            {{ currentBackpackItems }}/{{ player.character.backpackLimit }}
        </v-col>
    </v-row>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import { usePlayerStore } from '@/store/player';

const playerStore = usePlayerStore();

const player = computed(() => playerStore.currentPlayer!);

const currentBackpackItems = computed(() => {
    const result =
        player.value.backpack.cards.length +
        player.value.backpack.equips.length;

    return result;
});
</script>
