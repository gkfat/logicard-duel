<template>
  <div id="footer" class="w-100 container-fluid p-1 d-flex justify-content-center align-center"
      v-if="gameState === enumGameState.Rest">
    <div type="button" class="system-btn">
      玩家狀態
    </div>
    <div type="button" class="system-btn" @click="openBackpack()">
      <img :src="require(`@/assets/images/backpack.png`)">
    </div>
    <div type="button" class="system-btn" @click="openRank()">
      <img :src="require(`@/assets/images/rank.png`)">
    </div>
    <div type="button" class="system-btn" @click="openShop()">
      商店
    </div>
  </div>
</template>


<script setup name="FooterComponent" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { enumGameState } from '@/types/general';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
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
  .system-btn {
    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
