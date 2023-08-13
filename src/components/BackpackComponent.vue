<template>
  <div id="backpack" class="frame" :class="{ 'frame-show': isBackpackOpen }">
    <DialogComponent :dialogs="dialogs"></DialogComponent>
    <p class="w-100 text-center m-0" v-if="canShow">
      螺絲釘：{{ player.Coin }}｜物品：{{ player.ItemList.length + '／' + player.Character.ItemLimit }}
    </p>
    <div class="items-container" v-if="canShow">
      <div v-for="(item, i) in player.ItemList">
        <ItemComponent :backpack="true" :item="item" :index="i"></ItemComponent>
      </div>
    </div>
    <button type="button" class="w-100 system-btn" @click="closeBackpack()">關上背包</button>
  </div>
</template>

<script setup name="BackpackComponent" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { computed, watch, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Player, enumDialog } from '@/types/general';
import DialogComponent from './DialogComponent.vue';
import ItemComponent from './ItemComponent.vue';
import Sound from '@/service/sounds';
import { DIALOGS } from '@/data';

const store = useStore();
const isBackpackOpen = computed(() => store.getters.isBackpackOpen);
const dialogs = DIALOGS[enumDialog.Backpack];
const player = computed(() => store.getters.player as Player);
const canShow = computed(() => player.value.ItemList && player.value.ItemList.length > 0);

// 關上背包
const closeBackpack = async () => {
  await Sound.playSound(Sound.sounds.click);
  store.dispatch(StoreAction.switch.switchBackpack);
}
</script>

<style lang="scss" scoped>
#backpack {
  height: 90%;
}
.items-container {
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 1;
  overflow-y: scroll;
}
</style>
