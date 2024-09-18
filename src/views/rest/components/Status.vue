<template>
    <v-card
        flat
        color="bluegrey"
        class="border-white border-xl rounded-lg border-opacity-75 overflow-y-auto"
    >
        <v-card-text class="pa-0">
            <v-row class="justify-space-between ma-0 mb-3">
                <v-col cols="auto" class="pa-1 d-flex align-center">
                    <v-avatar
                        :size="50"
                        :image="player.character.avatar"
                    ></v-avatar>
                    <p>{{ player.character.name }}</p>
                </v-col>

                <v-col cols="auto" class="d-flex align-center">
                    <v-col class="pa-1 d-flex align-center ga-1" cols="auto">
                        <v-icon
                            color="skin"
                            icon="mdi-screw-round-top"
                        ></v-icon>
                        {{ player.backpack.coin }}
                    </v-col>
                    <v-col class="pa-1 d-flex align-center ga-1" cols="auto">
                        <v-icon color="skin" icon="mdi-bag-personal"></v-icon>
                        {{ currentBackpackItems }}/{{
                            player.character.backpackLimit
                        }}
                    </v-col>
                </v-col>
            </v-row>

            <!-- 狀態值 -->
            <v-row class="justify-space-between ma-0 mb-3">
                <v-col class="py-0 d-flex align-center ga-1" cols="auto">
                    <v-icon color="red" icon="mdi-heart"></v-icon>
                    {{ player.status.health }}/{{ player.status.maxHealth }}
                </v-col>
                <v-col class="py-0 d-flex align-center ga-1" cols="auto">
                    <v-icon color="skin" icon="mdi-sword-cross"></v-icon>
                    {{ player.status.attack }}
                    <em class="text-darkamber" v-if="extraAttack">
                        (+{{ extraAttack }})
                    </em>
                </v-col>
                <v-col class="py-0 d-flex align-center ga-1" cols="auto">
                    <v-icon color="skin" icon="mdi-shield"></v-icon>
                    {{ player.status.defense }}
                    <em class="text-darkamber" v-if="extraDefense">
                        (+{{ extraDefense }})
                    </em>
                </v-col>
            </v-row>

            <!-- 裝備 -->
            <v-row class="align-center ma-0 ga-1">
                <v-col class="pa-0">
                    <Equip
                        :equip="player.equipment[enumEquipPosition.Head]"
                        :position="enumEquipPosition.Head"
                        :is-player-equip="true"
                        :size="'small'"
                    ></Equip>
                </v-col>
                <v-col class="pa-0">
                    <Equip
                        :equip="player.equipment[enumEquipPosition.PrimaryHand]"
                        :position="enumEquipPosition.PrimaryHand"
                        :is-player-equip="true"
                        :size="'small'"
                    ></Equip>
                </v-col>
                <v-col class="pa-0">
                    <Equip
                        :equip="
                            player.equipment[enumEquipPosition.SecondaryHand]
                        "
                        :position="enumEquipPosition.SecondaryHand"
                        :is-player-equip="true"
                        :size="'small'"
                    ></Equip>
                </v-col>
                <v-col class="pa-0">
                    <Equip
                        :equip="player.equipment[enumEquipPosition.Body]"
                        :position="enumEquipPosition.Body"
                        :is-player-equip="true"
                        :size="'small'"
                    ></Equip>
                </v-col>
                <v-col class="pa-0">
                    <Equip
                        :equip="player.equipment[enumEquipPosition.Shoes]"
                        :position="enumEquipPosition.Shoes"
                        :is-player-equip="true"
                        :size="'small'"
                    ></Equip>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import Equip from '@/components/equip/Equip.vue';
import { enumEffect } from '@/enums/effect';
import { enumEquipPosition } from '@/enums/equip';
import { usePlayerStore } from '@/store/player';

const playerStore = usePlayerStore();

const player = computed(() => playerStore.currentPlayer!);

const extraAttack = computed(() => {
    const findEquips = player.value.backpack.equips.filter(
        (v) => v.template.effect === enumEffect.Harm && v.is_equiped
    );
    const point = findEquips.reduce((num, equip) => num + equip.info.point, 0);

    return point;
});

const extraDefense = computed(() => {
    const findEquips = player.value.backpack.equips.filter(
        (v) => v.template.effect === enumEffect.Defense && v.is_equiped
    );
    const point = findEquips.reduce((num, equip) => num + equip.info.point, 0);

    return point;
});

const currentBackpackItems = computed(() => {
    const result =
        player.value.backpack.cards.length +
        player.value.backpack.equips.length;

    return result;
});
</script>
