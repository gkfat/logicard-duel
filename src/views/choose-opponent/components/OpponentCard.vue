<template>
    <v-card
        flat
        :color="isSelected ? 'darkgreen' : 'bluegrey'"
        class="rounded-lg border-xl cursor-pointer"
    >
        <v-row class="ma-0">
            <v-col cols="auto" class="py-1 d-flex align-center">
                <PlayerAvatar :character="character"></PlayerAvatar>
            </v-col>

            <v-col class="py-1 d-flex align-center">
                <p class="text-body-1">{{ character.name }}</p>
            </v-col>
        </v-row>
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
