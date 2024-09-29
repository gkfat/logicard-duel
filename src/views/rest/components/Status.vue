<template>
    <v-card
        flat
        color="bluegrey"
        class="border-white border-lg rounded-lg border-opacity-75 overflow-y-auto fill-height"
    >
        <v-card-text class="px-0">
            <v-row class="ma-0 ga-1 px-3 mb-3">
                <v-col cols="auto" class="pa-0 d-flex align-center">
                    <PlayerAvatar :character="player.character"></PlayerAvatar>
                </v-col>

                <v-col
                    cols="auto"
                    class="pa-0 d-flex flex-grow-1 align-center"
                    :style="{ maxWidth: '150px' }"
                >
                    <div>
                        <p class="text-h6 text-darkamber">
                            {{ player.character.name }}
                        </p>
                        <em class="text-caption text-wrap">
                            {{ player.character.description }}
                        </em>
                    </div>
                </v-col>

                <v-col cols="auto" class="pa-0 ml-auto">
                    <!-- 錢 -->
                    <div class="d-flex align-center ga-1 mb-1">
                        <v-icon
                            color="skin"
                            icon="mdi-screw-round-top"
                        ></v-icon>
                        {{ thousands(player.backpack.coin) }}
                    </div>
                    <!-- 背包數量 -->
                    <div class="d-flex align-center ga-1 mb-1">
                        <v-icon color="skin" icon="mdi-bag-personal"></v-icon>
                        {{ currentBackpackItems }}/{{
                            player.character.backpackLimit
                        }}
                    </div>
                    <!-- 卡牌數量 -->
                    <div class="d-flex align-center ga-1">
                        <v-icon color="skin" icon="mdi-cards-playing"></v-icon>
                        {{ player.backpack.cards.length }}
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

import PlayerAvatar from '@/components/common/PlayerAvatar.vue';
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
