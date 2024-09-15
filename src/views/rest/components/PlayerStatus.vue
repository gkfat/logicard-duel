<template>
    <v-card
        flat
        color="bluegrey"
        class="rounded-lg border-lg"
    >
        <v-card-title class="text-center position-relative">
            <v-avatar size="60" :image="character.avatar"></v-avatar>
            <div class="position-absolute" style="left: 0; bottom: 0;">
                <Equip :item="equip.weapon"></Equip>
            </div>
            <div class="position-absolute" style="right: 0; bottom: 0;">
                <Equip :item="equip.armor"></Equip>
            </div>
        </v-card-title>

        <v-card-title class="text-center">{{ character.name }}</v-card-title>
        <v-card-subtitle class="text-wrap">{{ character.description }}</v-card-subtitle>

        <v-card-text>
            <v-row>
                <v-col cols="4">
                    <v-icon color="red" icon="mdi-heart"></v-icon>
                    {{ player.status.health }}／{{ character.health }}
                </v-col>
                <v-col cols="4">
                    <v-icon color="skin" icon="mdi-sword-cross"></v-icon>
                    {{ player.status.attack }}
                </v-col>
                <v-col cols="4">
                    <v-icon color="skin" icon="mdi-shield"></v-icon>
                    {{ player.status.defense }}
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-icon color="skin" icon="mdi-screw-round-top"></v-icon>
                    {{ player.backpack.coin }}
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import {
    computed,
    ref,
} from 'vue';

import { Game } from '@/types';
import { Player } from '@/types/player';

import Equip from './Equip.vue';

const props = defineProps<{player: Player}>();

const character = ref(props.player.info.character);
const equip = computed(() => {
    const findWeapon = props.player.equip.find((item) => item.position=== 'weapon');
    const findArmor = props.player.equip.find((item) => item.position=== 'armor');

    return {
        weapon: findWeapon,
        armor: findArmor,
    }
})

</script>
