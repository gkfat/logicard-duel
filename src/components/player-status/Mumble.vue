<template>
    <div
        v-if="showPlayerMumble || showEnemyMumble"
        style="position: relative;"
    >
        <v-card color="white">
            <v-card-text class="py-1 px-3">
                <p v-if="showPlayerMumble">
                    {{ playerStore.playerMumbleString }}
                </p>
                <p v-if="showEnemyMumble">
                    {{ playerStore.enemyMumbleString }}
                </p>
            </v-card-text>
        </v-card>

        <v-icon
            color="white"
            size="16"
            style="transform: translateX(4px) translateY(-8px);"
        >
            mdi-triangle-down
        </v-icon>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { usePlayerStore } from '@/store';

const playerStore = usePlayerStore();

const parentProps = defineProps<{
    whoIsMumbling: 'player' | 'enemy',
}>();

const showPlayerMumble = computed(
    () => parentProps.whoIsMumbling === 'player' && playerStore.playerMumbling && playerStore.playerMumbleString.length > 0,
);

const showEnemyMumble = computed(
    () => parentProps.whoIsMumbling === 'enemy' && playerStore.enemyMumbling && playerStore.enemyMumbleString.length > 0,
);
</script>

<style lang="scss" scoped>

</style>
