<template>
    <div
        style="position: fixed; top: 0; right: 0; z-index: 999"
        class="pa-3"
    >
        <VolumeControl />
    </div>
    <Entry v-if="gameState === enumGameState.Init" />
    <ChooseCharacter v-if="gameState === enumGameState.ChooseCharacter" />
    <Rest v-if="gameState === enumGameState.Rest" />
    <BattleStart v-if="gameState === enumGameState.BattleStart" />
    <Battle v-if="gameState === enumGameState.Battle" />
    <BattleEnd v-if="gameState === enumGameState.BattleEnd" />
    <GameOver v-if="gameState === enumGameState.GameEnd" />
</template>

<script setup lang="ts">
import {
    computed,
    watch,
} from 'vue';

import { enumGameState } from '@/enums/game';
import { useGameStateStore } from '@/store';
import useSoundStore from '@/store/sound';
import BattleEnd from '@/views/battle-end/BattleEnd.vue';
import BattleStart from '@/views/battle-start/BattleStart.vue';
import Battle from '@/views/battle/Battle.vue';
import ChooseCharacter from '@/views/choose-character/ChooseCharacter.vue';
import Entry from '@/views/entry/Entry.vue';
import GameOver from '@/views/game-over/GameOver.vue';
import Rest from '@/views/rest/Rest.vue';

import VolumeControl from './components/VolumeControl.vue';

const gameStateStore = useGameStateStore();

const gameState = computed(() => gameStateStore.gameState);
const soundStore = useSoundStore();

watch(
    gameState,
    async () => {
        switch (gameState.value) {
        case enumGameState.ChooseCharacter:
            await soundStore.playBGM(soundStore.sounds.bgm.prologue);
            break;
        case enumGameState.BattleStart:
            await soundStore.playBGM(soundStore.sounds.bgm.battle);
            break;
        case enumGameState.Rest:
            await soundStore.playBGM(soundStore.sounds.bgm.rest);
            break;
        case enumGameState.GameEnd:
            await soundStore.playBGM(soundStore.sounds.bgm.end);
            break;
        default:
            break;
        }
    },
);
</script>

<style lang="scss" scoped>

</style>
