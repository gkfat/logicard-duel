<template>
  <div id="rest">
    <div class="campfire"></div>
    <Dialog :dialogs="dialogs"></Dialog>
    <button type="button" class="system-btn w-100" @click="openRank()">排行榜</button>
    <button type="button" class="system-btn w-100" @click="openBackpack()">背包</button>
    <button type="button" class="system-btn w-100" @click="openShop()">商店</button>
    <button type="button" class="system-btn w-100" @click="battleStart()">尋找下一個 GKBot</button>
    <PlayerStatus :is-main="true" :player="player"></PlayerStatus>
  </div>
</template>

<script setup name="Rest" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { Player } from '@/types';
import { enumGameState, enumDialog } from '@/types/enums';
import { computed } from 'vue';
import PlayerStatus from './PlayerStatus.vue';
import Dialog from './Dialog.vue';
import { DIALOGS } from '@/data/index';
import { useStore } from 'vuex';
import Sound from '@/service/sounds';

const store = useStore();
const player = computed(() => store.getters.player as Player);
const dialogs = DIALOGS[enumDialog.Rest];

// 打開排行榜
const openRank = async () => {
  await Sound.playSound(Sound.sounds.click);
  store.dispatch(StoreAction.switch.switchRank);
}
// 打開背包
const openBackpack = async () => {
  await Sound.playSound(Sound.sounds.click);
  store.dispatch(StoreAction.switch.switchBackpack);
}
// 打開商店
const openShop = async () => {
  await Sound.playSound(Sound.sounds.click);
  store.dispatch(StoreAction.switch.switchShop);
}

const battleStart = async () => {
  await Sound.playSound(Sound.sounds.click);
  store.dispatch(StoreAction.general.changeGameState, enumGameState.BattleStart);
}
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
    background-image: url('@/assets/gifs/rest.gif');
    background-size: cover;
    background-position-y: 70%;
    background-repeat: no-repeat;
    z-index: -1;
  }
}
</style>