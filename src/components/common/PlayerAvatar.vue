<template>
    <v-avatar
        size="50"
        :image="character.avatar"
        color="darkamber"
        class="border-md"
    ></v-avatar>
</template>
<script lang="ts" setup>
import { CharacterTemplate } from '@/types/character';

const { character } = defineProps<{
    character: CharacterTemplate;
}>();
</script>
