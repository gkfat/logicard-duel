<template>
  <div id="footer" class="w-100 container-fluid d-flex justify-content-center"
      v-if="gameState === enumGameState.Rest">
    <div type="button" class="">
      <IconComponent :icon="`images/player`"></IconComponent>
    </div>
    <p class="seperate-line"></p>
    <div type="button" class="" @click="openBackpack()">
      <IconComponent :icon="`images/backpack`"></IconComponent>
    </div>
    <p class="seperate-line"></p>
    <div type="button" class="" @click="openRank()">
      <IconComponent :icon="`images/rank`"></IconComponent>
    </div>
    <p class="seperate-line"></p>
    <div type="button" class="" @click="openShop()">
      <IconComponent :icon="`images/shop`"></IconComponent>
    </div>
  </div>
</template>


<script setup name="FooterComponent" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { enumGameState } from '@/types/general';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import IconComponent from './IconComponent.vue';
import Sound from '@/service/sounds';
import router from '@/router';

const store = useStore();
const gameState = computed(() => store.getters.gameState as enumGameState);

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
</script>

<style lang="scss" scoped>
#footer {
  gap: 10px;
  background-color: var(--skin);
  align-items: center;
  padding: 10px;
  .icon {
    width: 40px;
    height: 40px;
  }
  .seperate-line {
    height: 30px;
    margin: 0;
    width: 2px;
    border-radius: 1px;
    background-color: var(--blue);
  }
}
</style>
