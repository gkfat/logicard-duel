<template>
    <v-item-group 
        v-model="isMuteMode"
        mandatory
        selected-class="primary"
    >
        <v-container>
            <v-row class="flex-nowrap align-cetner">
                <v-col
                    v-for="(item, i) of selection"
                    :key="i"
                >
                    <v-item
                        v-slot="{isSelected, toggle}"
                        :value="item.value"
                    >
                        <v-card
                            :class="isSelected ? 'bg-primary': 'border border-primary'"
                            class="d-flex align-center border border-primary justify-center"
                            flat
                            rounded
                            @click="toggle"
                        >
                            <v-card-text class="text-center text-no-wrap">
                                <v-icon :icon="item.icon" />
                            </v-card-text>
                        </v-card>
                    </v-item>
                </v-col>
            </v-row>
        </v-container>
    </v-item-group>
</template>
<script lang="ts" setup>
import {
    ref,
    watch,
} from 'vue';

import { useSoundEffect } from '@/composable/useSoundEffect';
import { useAppStore } from '@/store/app';
import { useSoundStore } from '@/store/sound';

const soundStore = useSoundStore();
const appStore = useAppStore();

const isMuteMode = ref(false);

watch(
    () => isMuteMode.value,
    () => soundStore.toggleMute(),
);

const { soundClick } = useSoundEffect();

const selection = [
    {
        value: true, icon: 'mdi-volume-off', 
    }, {
        value: false, icon: 'mdi-volume-high', 
    },
];

watch(
    () => appStore.isSettingDrawerOpen,
    () => soundClick(),
);
</script>
