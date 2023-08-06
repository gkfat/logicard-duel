<template>
  <div id="controller">
    <div type="button" class="system-btn" @click="openRank()">
      <img :src="require(`@/assets/images/rank.png`)">
    </div>
    <div type="button" class="system-btn" @click="openBackpack()">
      <img :src="require(`@/assets/images/backpack.png`)">
    </div>
  </div>
</template>

<script setup name="ControllerComponent" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Sound } from '@/service/sounds';

const store = useStore();
const sounds = computed(() => store.getters.sounds);

// 打開排行榜
const openRank = async () => {
  await Sound.playSound(sounds.value.click);
  store.dispatch(StoreAction.switchRank);
}
// 打開背包
const openBackpack = async () => {
  await Sound.playSound(sounds.value.click);
  store.dispatch(StoreAction.switchBackpack);
}
</script>

<style lang="scss" scoped>
#controller {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}
.system-btn {
  img {
    width: 30px;
    height: 30px;
  }
}
</style>
