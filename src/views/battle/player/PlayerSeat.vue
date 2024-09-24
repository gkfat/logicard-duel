<template>
    <v-card
        flat
        color="bluegrey"
        class="border-white border-lg rounded-lg border-opacity-75 position-relative"
    >
        <v-card-text>
            <v-row class="ma-0 ga-3">
                <v-col cols="12" sm="6" class="pa-0 d-flex align-center ga-3">
                    <!-- Avatar -->
                    <v-col cols="auto" class="pa-0 d-flex align-center">
                        <v-avatar
                            :size="60"
                            :image="player.character.avatar"
                            color="darkamber"
                            class="border-white border-md border-opacity-75"
                        ></v-avatar>
                    </v-col>

                    <v-col
                        class="pa-0 d-flex align-center flex-wrap flex-grow-1 ga-3"
                    >
                        <!-- 生命值 -->
                        <v-col cols="12" class="pa-0">
                            <v-progress-linear
                                class="w-100 rounded-xl"
                                color="red"
                                :model-value="currentHealthPercent"
                                :height="14"
                            >
                                <template #default>
                                    <p>
                                        {{ player.status.health }} /
                                        {{ player.status.maxHealth }}
                                    </p>
                                </template>
                            </v-progress-linear>
                        </v-col>

                        <!-- 攻擊 -->
                        <v-col cols="auto" class="pa-0">
                            <v-col
                                class="pa-0 d-flex align-center ga-1"
                                cols="auto"
                            >
                                <v-icon
                                    color="skin"
                                    icon="mdi-sword-cross"
                                ></v-icon>
                                {{ player.status.attack }}
                                <em
                                    class="text-darkamber"
                                    v-if="extraStatus.attack"
                                >
                                    (+{{ extraStatus.attack }})
                                </em>
                            </v-col>
                        </v-col>

                        <!-- 防禦 -->
                        <v-col cols="auto" class="pa-0">
                            <v-col
                                class="pa-0 d-flex align-center ga-1"
                                cols="auto"
                            >
                                <v-icon color="skin" icon="mdi-shield"></v-icon>
                                {{ player.status.defense }}
                                <em
                                    class="text-darkamber"
                                    v-if="extraStatus.defense"
                                >
                                    (+{{ extraStatus.defense }})
                                </em>
                            </v-col>
                        </v-col>
                    </v-col>
                </v-col>
            </v-row>
        </v-card-text>

        <MumbleBubble :mumble-content="mumbleContent"></MumbleBubble>
    </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { usePlayerStore } from '@/store/player';

import MumbleBubble from '../components/MumbleBubble.vue';

const playerStore = usePlayerStore();

const player = computed(() => playerStore.currentPlayer!);
const mumbleContent = computed(() => playerStore.mumbleContent);
const extraStatus = computed(() => playerStore.extraStatus);

const currentHealthPercent = computed(
    () => (player.value.status.health / player.value.status.maxHealth) * 100
);
</script>
