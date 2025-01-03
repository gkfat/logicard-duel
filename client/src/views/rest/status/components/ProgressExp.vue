<template>
    <v-progress-linear
        class="w-100 rounded-xl"
        color="amber"
        :model-value="currentExpPercent"
        :height="14"
    >
        <template #default>
            <p>
                {{ thousands(player.status.exp) }} /
                {{ thousands(player.status.expToNextLevel) }}
            </p>
        </template>
    </v-progress-linear>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { Player } from '@/types/player';
import { thousands } from '@/utils/number';

const { player } = defineProps<{
    player: Player;
}>();

const currentExpPercent = computed(() => (player.status.exp / player.status.expToNextLevel) * 100);
</script>
