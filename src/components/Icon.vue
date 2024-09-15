<template>
    <v-icon>
        <v-img :src="url" />
    </v-icon>
</template>

<script setup lang="ts">
defineProps<{
    url: string,
}>();
</script>

<style lang="scss" scoped>

</style>
