<template>
    <Entry v-if="appStore.gameState === enumGameState.Init" />
    <ChooseCharacter
        v-if="appStore.gameState === enumGameState.ChooseCharacter"
    />
    <Rest v-if="appStore.gameState === enumGameState.Rest" />
    <!-- <BattleStart v-if="appStore.gameState === enumGameState.BattleStart" /> -->
    <!-- <Battle v-if="appStore.gameState === enumGameState.Battle" /> -->
    <!-- <BattleEnd v-if="appStore.gameState === enumGameState.BattleEnd" /> -->
    <!-- <GameOver v-if="appStore.gameState === enumGameState.GameEnd" /> -->
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';

import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';
import { useSoundStore } from '@/store/sound';
// import BattleEnd from '@/views/battle-end/BattleEnd.vue';
// import BattleStart from '@/views/battle-start/BattleStart.vue';
// import Battle from '@/views/battle/Battle.vue';
import ChooseCharacter from '@/views/choose-character/ChooseCharacter.vue';
import Entry from '@/views/entry/Entry.vue';
// import GameOver from '@/views/game-over/GameOver.vue';
import Rest from '@/views/rest/Rest.vue';

const appStore = useAppStore();

const soundStore = useSoundStore();

watch(
    () => appStore.gameState,
    async () => {
        switch (appStore.gameState) {
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
    }
);
</script>

<style lang="scss" scoped></style>
