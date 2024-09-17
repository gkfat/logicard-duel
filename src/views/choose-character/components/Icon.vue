<template>
    <v-icon :size="props.size">
        <v-img :src="props.url" />
    </v-icon>
</template>

<script setup lang="ts">
const props = defineProps<{
    url: string;
    size: number;
}>();
</script>
