<template>
    <v-card
        flat
        :color="isSelected ? 'darkgreen' : 'bluegrey'"
        class="rounded-lg border-xl cursor-pointer"
    >
        <v-card-text class="text-center">
            <PlayerAvatar :character="character"/>

            <p class="w-100 mt-3">
                {{ character.name }}
            </p>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import PlayerAvatar from '@/components/common/PlayerAvatar.vue';
import { CharacterTemplate } from '@/types/character';

const { character, isSelected = false } = defineProps<{
    character: CharacterTemplate;
    isSelected: boolean;
}>();
</script>
