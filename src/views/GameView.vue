<template>
    <Entry v-if="appStore.gameState === enumGameState.Initialized" />
    <ChooseCharacter
        v-if="appStore.gameState === enumGameState.ChooseCharacter"
    />
    <Rest v-if="appStore.gameState === enumGameState.Rest" />
    <ChooseOpponent
        v-if="appStore.gameState === enumGameState.ChooseOpponent"
    />
    <Battle v-if="appStore.gameState === enumGameState.Battle" />
    <!-- <BattleEnd v-if="appStore.gameState === enumGameState.BattleEnd" /> -->
    <GameOver v-if="appStore.gameState === enumGameState.GameOver" />
</template>

<script setup lang="ts">
import { watch } from 'vue';

import { useSoundEffect } from '@/composable/useSoundEffect';
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';
// import BattleEnd from '@/views/battle-end/BattleEnd.vue';
import Battle from '@/views/battle/Battle.vue';
import ChooseCharacter from '@/views/choose-character/ChooseCharacter.vue';
import Entry from '@/views/entry/Entry.vue';
import GameOver from '@/views/game-over/GameOver.vue';
import Rest from '@/views/rest/Rest.vue';

import ChooseOpponent from './choose-opponent/ChooseOpponent.vue';

const appStore = useAppStore();
const { bgmBattle, bgmEnd, bgmPrologue, bgmRest } = useSoundEffect();

watch(
    () => appStore.gameState,
    async () => {
        switch (appStore.gameState) {
            case enumGameState.ChooseCharacter:
                bgmPrologue();
                break;
            case enumGameState.Rest:
                bgmRest();
                break;
            case enumGameState.ChooseOpponent:
                bgmBattle();
                break;
            case enumGameState.GameOver:
                bgmEnd();
                break;
            default:
                break;
        }
    }
);
</script>

<style lang="scss" scoped></style>
