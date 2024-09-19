<template>
    <v-container
        class="py-0 px-3 d-flex align-center justify-center"
        :class="{ 'text-white': appStore.gameState === enumGameState.Rest }"
    >
        <v-col cols="auto" class="pa-0 mr-auto">
            v {{ appVersion }}
        </v-col>
        <v-col cols="auto" class="pa-0 text-center font-weight-bold">
            {{ appTtile }}
        </v-col>
        <v-col cols="auto" class="pa-0 ml-auto">
            <VolumeControl />
        </v-col>
    </v-container>
</template>
<script lang="ts" setup>
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';

import VolumeControl from './VolumeControl.vue';

const appStore = useAppStore();

const appTtile = import.meta.env.VITE_APP_TITLE;
const appVersion = import.meta.env.VITE_APP_VERSION;
</script>
