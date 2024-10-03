<template>
    <v-icon v-if="icon" :color="color" :size="size" :icon="icon" :style="style">
    </v-icon>

    <v-icon v-if="url" :color="color" :size="size" :style="style">
        <v-img :src="url" />
    </v-icon>
</template>

<script setup lang="ts">
const { url, icon, size, color, style } = defineProps<{
    icon?: string;
    url?: string;
    size: number;
    color?: string;
    style?: { [key: string]: string };
}>();
</script>
