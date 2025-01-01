<template>
    <v-overlay
        v-model="isOpen"
        opacity="0.6"
        persistent
    >
        <v-row class="ma-0 justify-center align-center fill-height">
            <v-progress-circular
                color="primary"
                size="50"
                indeterminate
            />
        </v-row>
    </v-overlay>
</template>

<script setup name="Spinner" lang="ts">
import { computed } from 'vue';

import { useAppStore } from '@/store/app';

const appStore = useAppStore();

const isOpen = computed(() => appStore.spinnerOpen);
</script>

<style scoped lang="scss">
:deep(.v-overlay__content) {
    width: 100%;
    height: 100%;
}
</style>
