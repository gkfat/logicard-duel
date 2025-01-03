<template>
    <v-row class="align-center ma-0 ga-3 mb-3">
        <v-col class="pa-0">
            <Equip
                :equip="equipment.head"
                :position="enumEquipPosition.Head"
                :is-player-equip="true"
                :show-rarity="true"
            />
        </v-col>
        <v-col class="pa-0">
            <Equip
                :equip="equipment.primaryHand"
                :position="enumEquipPosition.PrimaryHand"
                :is-player-equip="true"
                :show-rarity="true"
            />
        </v-col>
        <v-col class="pa-0">
            <Equip
                :equip="equipment.secondaryHand"
                :position="enumEquipPosition.SecondaryHand"
                :is-player-equip="true"
                :show-rarity="true"
            />
        </v-col>
    </v-row>
    <v-row class="align-center ma-0 ga-3">
        <v-col class="pa-0">
            <Equip
                :equip="equipment.body"
                :position="enumEquipPosition.Body"
                :is-player-equip="true"
                :show-rarity="true"
            />
        </v-col>
        <v-col class="pa-0">
            <Equip
                :equip="equipment.pants"
                :position="enumEquipPosition.Pants"
                :is-player-equip="true"
                :show-rarity="true"
            />
        </v-col>
        <v-col class="pa-0">
            <Equip
                :equip="equipment.shoes"
                :position="enumEquipPosition.Shoes"
                :is-player-equip="true"
                :show-rarity="true"
            />
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import {
    computed,
    onMounted,
} from 'vue';

import Equip from '@/components/equip/Equip.vue';
import { enumEquipPosition } from '@/enums/equip';
import { useOpponentStore } from '@/store/opponent';
import { usePlayerStore } from '@/store/player';
import { calcGainExp } from '@/utils/common';

const playerStore = usePlayerStore();
const opponentStore = useOpponentStore();

const player = computed(() => playerStore.currentPlayer!);

const equipment = computed(() => ({
    head: player.value.equipment[enumEquipPosition.Head],
    primaryHand: player.value.equipment[enumEquipPosition.PrimaryHand],
    secondaryHand: player.value.equipment[enumEquipPosition.SecondaryHand],
    body: player.value.equipment[enumEquipPosition.Body],
    pants: player.value.equipment[enumEquipPosition.Pants],
    shoes: player.value.equipment[enumEquipPosition.Shoes],
}));

onMounted(async () => {
    const getOpponent = opponentStore.currentOpponent;

    if (getOpponent) {
        const exp = calcGainExp(getOpponent);
        await playerStore.gainExp(exp);
    }
});
</script>
