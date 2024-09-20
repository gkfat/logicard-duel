<template>
    <v-card
        flat
        :color="isSelected ? 'darkgreen' : 'bluegrey'"
        class="rounded-lg border-xl cursor-pointer"
    >
        <v-row class="ma-0">
            <v-col cols="auto" class="py-1 d-flex align-center">
                <v-avatar
                    size="50"
                    :image="character.avatar"
                    color="darkamber"
                    class="border-md"
                ></v-avatar>
            </v-col>

            <v-col class="py-1 d-flex align-center">
                <p class="text-body-1">{{ character.name }}</p>
            </v-col>
        </v-row>
    </v-card>
</template>

<script lang="ts" setup>
import { CharacterTemplate } from '@/types/character';

const { character, isSelected = false } = defineProps<{
    character: CharacterTemplate;
    isSelected: boolean;
}>();
</script>
