<template>
    <v-card
        flat
        :color="isSelected ? 'darkgreen' : 'bluegrey'"
        class="rounded-lg border-xl cursor-pointer"
    >
        <v-row class="ma-0 text-nowarp">
            <v-col cols="auto">
                <v-avatar
                    size="60"
                    :image="character.avatar"
                    color="orange"
                    class="border-lg"
                ></v-avatar>
            </v-col>
            <v-col>
                <p class="text-h6">{{ character.name }}</p>
            </v-col>
        </v-row>
    </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { CharacterTemplate } from '@/types/character';

const { character, isSelected = false } = defineProps<{
    character: CharacterTemplate;
    isSelected: boolean;
}>();
</script>
