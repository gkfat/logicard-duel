<template>
    <v-card
        flat
        :color="isSelected ? 'darkgreen' : 'bluegrey'"
        class="rounded-lg border-xl cursor-pointer"
    >
        <v-card-text class="pa-1 text-center">
            <PlayerAvatar :character="opponent.character" />

            <p class="mt-1">
                Lv. {{ opponent.status.level }}
            </p>
            <p>{{ opponent.character.name }}</p>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import PlayerAvatar from '@/components/common/PlayerAvatar.vue';
import { Player } from '@/types/player';

const {
    opponent, isSelected = false, 
} = defineProps<{
    opponent: Player;
    isSelected: boolean;
}>();
</script>
