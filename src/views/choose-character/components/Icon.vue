<template>
    <v-icon :size="size" :color="color">
        <v-img :src="url" />
    </v-icon>
</template>

<script setup lang="ts">
const { url, size, color } = defineProps<{
    url: string;
    size: number;
    color?: string;
}>();
</script>
