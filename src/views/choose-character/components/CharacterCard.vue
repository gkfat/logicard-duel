<template>
    <v-card
        flat
        color="bluegrey"
        class="rounded-lg border-lg w-100"
    >
        <v-card-title class="text-center">
            <v-avatar size="60" :image="character.avatar"></v-avatar>
        </v-card-title>

        <v-card-title class="text-center">{{ character.name }}</v-card-title>
        <v-card-subtitle class="text-wrap">{{ character.description }}</v-card-subtitle>

        <v-card-text>
            <v-row>
                <v-col cols="4">
                    <v-icon color="red" icon="mdi-heart"></v-icon>
                    {{ character.health }}
                </v-col>
                <v-col cols="4">
                    <v-icon color="skin" icon="mdi-sword-cross"></v-icon>
                    {{ character.attack }}
                </v-col>
                <v-col cols="4">
                    <v-icon color="skin" icon="mdi-shield"></v-icon>
                    {{ character.defense }}
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-icon color="skin" icon="mdi-screw-round-top"></v-icon>
                    {{ character.coin }}
                </v-col>
                <v-col cols="4">
                    <v-icon color="skin" icon="mdi-bag-personal"></v-icon>
                    {{ character.backpackLimit }}
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { Character } from '@/types/character';

const props = defineProps<{
    character: Character,
}>();
</script>
