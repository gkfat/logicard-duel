<template>
    <v-overlay
        v-model="switchToggleStore.spinnerOpen"
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
import { useSwitchToggleStore } from '@/store';

const switchToggleStore = useSwitchToggleStore();
</script>

<style scoped lang="scss">
:deep(.v-overlay__content) {
    width: 100%;
    height: 100%;
}
</style>
