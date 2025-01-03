<template>
    <v-bottom-navigation
        v-if="appStore.gameState === enumGameState.Rest"
        class="bg-bluegrey"
    >
        <v-btn
            icon="mdi-bag-personal"
            @click="appStore.viewLocation = enumViewLocation.Backpack"
        />
        <v-btn
            icon="mdi-home"
            @click="appStore.viewLocation = enumViewLocation.Status"
        />
        <v-btn
            icon="mdi-sword-cross"
            @click="battle"
        >
            <v-icon
                icon="mdi-sword-cross"
                size="40"
            />
        </v-btn>
        <v-btn
            icon="mdi-cart"
            @click="appStore.viewLocation = enumViewLocation.Shop"
        />
        <v-btn
            icon="mdi-script-text"
            @click="appStore.viewLocation = enumViewLocation.Rank"
        />
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
