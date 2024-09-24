<template>
    <v-card
        flat
        color="bluegrey"
        class="border-white border-lg rounded-lg border-opacity-75 overflow-y-auto fill-height"
    >
        <v-card-text class="px-0">
            <v-row class="ma-0 flex-nowrap ga-1 px-3 mb-3">
                <v-col cols="auto" class="pa-0 d-flex align-center">
                    <v-avatar
                        :size="50"
                        :image="player.character.avatar"
                    ></v-avatar>
                </v-col>

                <v-col cols="5" class="pa-0 d-flex align-center">
                    <div>
                        <p>{{ player.character.name }}</p>
                        <p class="text-caption">
                            {{ player.character.description }}
                        </p>
                    </div>
                </v-col>

                <v-col cols="auto" class="pa-0 ml-auto">
                    <div class="d-flex align-center ga-1 mb-1">
                        <v-icon
                            color="skin"
                            icon="mdi-screw-round-top"
                        ></v-icon>
                        {{ thousands(player.backpack.coin) }}
                    </div>
                    <div class="d-flex align-center ga-1">
                        <v-icon color="skin" icon="mdi-bag-personal"></v-icon>
                        {{ currentBackpackItems }}/{{
                            player.character.backpackLimit
                        }}
                    </div>
                </v-col>
            </v-row>

            <!-- 狀態值 -->
            <v-row class="ma-0 mb-3">
                <v-col class="py-0 d-flex align-center ga-1" cols="auto">
                    <v-icon color="red" icon="mdi-heart"></v-icon>
                    {{ player.status.health }}/{{ player.status.maxHealth }}
                </v-col>
                <v-col class="py-0 d-flex align-center ga-1" cols="auto">
                    <v-icon color="skin" icon="mdi-sword-cross"></v-icon>
                    {{ player.status.attack }}
                    <em class="text-darkamber" v-if="extraStatus.attack">
                        (+{{ extraStatus.attack }})
                    </em>
                </v-col>
                <v-col class="py-0 d-flex align-center ga-1" cols="auto">
                    <v-icon color="skin" icon="mdi-shield"></v-icon>
                    {{ player.status.defense }}
                    <em class="text-darkamber" v-if="extraStatus.defense">
                        (+{{ extraStatus.defense }})
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
import { enumEquipPosition } from '@/enums/equip';
import { usePlayerStore } from '@/store/player';
import { thousands } from '@/utils/number';

const playerStore = usePlayerStore();
const player = computed(() => playerStore.currentPlayer!);
const extraStatus = computed(() => playerStore.extraStatus);

const currentBackpackItems = computed(() => {
    const result =
        player.value.backpack.cards.length +
        player.value.backpack.equips.length;

    return result;
});
</script>
