<template>
    <div id="rest">
        <div class="campfire" />
        <Dialog :dialogs="dialogs" />
        <button
            type="button"
            class="system-btn w-100"
            @click="openRank()"
        >
            {{ $t('button.rank') }}
        </button>
        <button
            type="button"
            class="system-btn w-100"
            @click="openBackpack()"
        >
            {{ $t('button.backpack') }}
        </button>
        <button
            type="button"
            class="system-btn w-100"
            @click="openShop()"
        >
            {{ $t('button.shop') }}
        </button>
        <button
            type="button"
            class="system-btn w-100"
            @click="battleStart()"
        >
            {{ $t('button.next_battle') }}
        </button>
        <PlayerStatus
            :is-main="true"
            :player="player"
        />
    </div>
</template>

<script setup name="Rest" lang="ts">
import { computed } from 'vue';

import { DialogDataList } from '@/data/index';
import Sound from '@/service/sounds';
import {
    useGameStateStore,
    usePlayerStore,
    useSwitchToggleStore,
} from '@/store';
import {
    enumDialog,
    enumGameState,
} from '@/types/enums';

import Dialog from './Dialog.vue';
import PlayerStatus from './PlayerStatus.vue';

const switchToggleStore = useSwitchToggleStore();
const playerStore = usePlayerStore();
const gameStateStore = useGameStateStore();

const player = computed(() => playerStore.player);
const dialogs = DialogDataList[enumDialog.Rest];

// 打開排行榜
const openRank = async () => {
    switchToggleStore.toggle('rank');
};

// 打開背包
const openBackpack = async () => {
    switchToggleStore.toggle('backpack');
};

// 打開商店
const openShop = async () => {
    switchToggleStore.toggle('shop');
};

const battleStart = async () => {
    await Sound.playSound(Sound.sounds.effect.click);
    gameStateStore.changeGameState(enumGameState.BattleStart);
};
</script>

<style lang="scss" scoped>

#rest {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .campfire {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://storage.cloud.google.com/logicard_duel/gifs/rest.gif');
    background-size: cover;
    background-position-y: 70%;
    background-repeat: no-repeat;
    z-index: -1;
  }
}
</style>
