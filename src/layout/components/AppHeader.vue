<template>
    <v-container
        class="py-0 px-3 d-flex align-center justify-center"
        :class="{ 'text-white': isUseWhiteText }"
    >
        <v-col cols="auto" class="pa-0 mr-auto">
            v {{ appStore.ENV.appVersion }}
        </v-col>

        <v-col cols="auto" class="pa-0 text-center font-weight-bold">
            {{ appStore.ENV.appTitle }}
        </v-col>

        <v-col cols="auto" class="pa-0 ml-auto">
            <VolumeControl />
        </v-col>
    </v-container>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';

import VolumeControl from './VolumeControl.vue';

const appStore = useAppStore();

const isUseWhiteText = computed(() => {
    return [enumGameState.Rest, enumGameState.Battle].includes(
        appStore.gameState
    );
});
</script>
