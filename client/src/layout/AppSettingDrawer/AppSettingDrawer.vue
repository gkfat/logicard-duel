<template>
    <v-navigation-drawer
        v-model="appStore.isSettingDrawerOpen"
        location="right"
        class="bg-grey"
        disable-resize-watcher
        :width="getWidth"
    >
        <v-list>
            <Volume />

            <template v-if="appStore.gameState >= enumGameState.Rest">
                <v-divider />
    
                <Suicide />
            </template>
        </v-list>

        <template #append>
            <v-divider />
            <Author />
        </template>
    </v-navigation-drawer>
</template>
<script lang="ts" setup>
import {
    computed,
    watch,
} from 'vue';

import { useSoundEffect } from '@/composable/useSoundEffect';
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';
import { useWindowSize } from '@vueuse/core';

import Author from './components/Author.vue';
import Suicide from './components/Suicide.vue';
import Volume from './components/Volume.vue';

const appStore = useAppStore();
const { width } = useWindowSize();
const getWidth = computed(() => width.value * 0.8);
const { soundClick } = useSoundEffect();

watch(
    () => appStore.isSettingDrawerOpen,
    () => soundClick(),
);
</script>
