<template>
    <v-btn
        class="pa-0"
        icon
        flat
        variant="plain"
        size="32"
        style="opacity: 1; z-index: 999"
        @click="soundStore.toggleMute"
    >
        <v-icon
            :icon="soundStore.muteMode ? 'mdi-volume-off' : 'mdi-volume-high'"
            size="22"
        >
        </v-icon>
    </v-btn>
</template>
<script lang="ts" setup>
import { useSoundStore } from '@/store/sound';

const soundStore = useSoundStore();
</script>
