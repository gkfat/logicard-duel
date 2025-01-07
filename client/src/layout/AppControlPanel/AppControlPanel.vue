<template>
    <v-bottom-navigation
        v-if="appStore.gameState === enumGameState.Rest"
        v-model="appStore.viewLocation"
        :height="70"
        class="bg-bluegrey"
        color="amber"
        active
        madatory
    >
        <v-btn :value="enumViewLocation.Backpack">
            <v-icon
                class="mb-1"
                icon="mdi-bag-personal"
            />
            <span>背包</span>
        </v-btn>
        <v-btn :value="enumViewLocation.Status">
            <v-icon
                class="mb-1"
                icon="mdi-home"
            />
            <span>角色</span>
        </v-btn>
        <v-btn
            :value="enumViewLocation.Battle"
            @click="battle"
        >
            <v-icon
                icon="mdi-sword-cross"
                size="40"
                class="mb-1"
            />
            <span>戰鬥</span>
        </v-btn>
        <v-btn :value="enumViewLocation.Shop">
            <v-icon
                class="mb-1"
                icon="mdi-cart"
            />
            <span>商店</span>
        </v-btn>
        <v-btn :value="enumViewLocation.Rank">
            <v-icon
                class="mb-1"
                icon="mdi-script-text"
            />
            <span>排行</span>
        </v-btn>
    </v-bottom-navigation>
</template>
<script lang="ts" setup>
import { useSoundEffect } from '@/composable/useSoundEffect';
import { enumGameState } from '@/enums/game';
import { enumViewLocation } from '@/enums/view-location';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
const { soundClick } = useSoundEffect();

const battle = async () => {
    await soundClick();

    appStore.changeGameState(enumGameState.ChooseOpponent);
};
</script>
