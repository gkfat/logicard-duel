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
                            :image="opponent.character.avatar"
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
                                        {{ opponent.status.health }} /
                                        {{ opponent.status.maxHealth }}
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
                                {{ opponent.status.attack }}
                                <em class="text-darkamber" v-if="extraAttack">
                                    (+{{ extraAttack }})
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
                                {{ opponent.status.defense }}
                                <em class="text-darkamber" v-if="extraDefense">
                                    (+{{ extraDefense }})
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

import Equip from '@/components/equip/Equip.vue';
import { enumEffect } from '@/enums/effect';
import { enumEquipPosition } from '@/enums/equip';
import { useOpponentStore } from '@/store/opponent';
import { usePlayerStore } from '@/store/player';
import { thousands } from '@/utils/number';

import MumbleBubble from '../components/MumbleBubble.vue';

const opponentStore = useOpponentStore();

const opponent = computed(() => opponentStore.currentOpponent!);
const mumbleContent = computed(() => opponentStore.mumbleContent);

const currentHealthPercent = computed(
    () => (opponent.value.status.health / opponent.value.status.maxHealth) * 100
);

const extraAttack = computed(() => {
    const findEquips = opponent.value.backpack.equips.filter(
        (v) => v.template.effect === enumEffect.Harm && v.is_equiped
    );
    const point = findEquips.reduce((num, equip) => num + equip.info.point, 0);

    return point;
});

const extraDefense = computed(() => {
    const findEquips = opponent.value.backpack.equips.filter(
        (v) => v.template.effect === enumEffect.Defense && v.is_equiped
    );
    const point = findEquips.reduce((num, equip) => num + equip.info.point, 0);

    return point;
});
</script>
