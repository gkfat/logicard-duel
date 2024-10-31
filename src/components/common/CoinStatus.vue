<template>
    <v-row class="ma-0 justify-end">
        <v-col
            cols="auto"
            class="pa-1 d-flex align-center ga-1"
            :class="`text-${color}`"
        >
            <IconCoin/>
            {{ thousands(player.backpack.coin) }}
        </v-col>
        <v-col
            cols="auto"
            class="pa-1 d-flex align-center ga-1"
            :class="`text-${color}`"
        >
            <IconBackpack/>
            {{ currentBackpackItems }}/{{ player.character.backpackLimit }}
        </v-col>
    </v-row>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import IconBackpack from '@/components/icons/IconBackpack.vue';
import IconCoin from '@/components/icons/IconCoin.vue';
import { usePlayerStore } from '@/store/player';

import { thousands } from '../../utils/number';

const { theme = 'light' } = defineProps<{
    theme?: 'light' | 'dark';
}>();

const color = computed(() => (theme === 'light' ? 'skin' : 'bluegrey'));

const playerStore = usePlayerStore();

const player = computed(() => playerStore.currentPlayer!);

const currentBackpackItems = computed(() => {
    const result =
        player.value.backpack.cards.length +
        player.value.backpack.equips.length;

    return result;
});
</script>
