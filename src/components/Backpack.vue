<template>
  <div id="backpack"
    class="frame" :class="{ 'frame-show': isBackpackOpen }"
    v-if="player && player.ItemList && player.CardList">
    <Dialog :dialogs="dialogs"></Dialog>
    <p class="w-100 text-center m-0">
      螺絲釘：{{ player.Coin }}｜物品：{{ player.ItemList.length + '／' + player.Character.ItemLimit }}
    </p>
    <div class="items-container">
      <div v-for="(item, i) in player.ItemList">
        <ItemComponent
            :equiped="isEquiped(i)"
            :backpack="true"
            :item="item"
            :index="i">
        </ItemComponent>
      </div>
      <div v-for="(item, i) in player.CardList">
        <ItemComponent
            :backpack="true"
            :item="item">
        </ItemComponent>
      </div>
    </div>
    <button type="button" class="w-100 system-btn" @click="closeBackpack()">關上背包</button>
  </div>
</template>

<script setup name="Backpack" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { computed, watch, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import type { Player } from '@/types';
import { enumDialog } from '@/types/enums';
import Dialog from './Dialog.vue';
import ItemComponent from './ItemComponent.vue';
import Sound from '@/service/sounds';
import { DIALOGS } from '@/data';

const store = useStore();
const isBackpackOpen = computed(() => store.getters.isBackpackOpen);
const dialogs = DIALOGS[enumDialog.Backpack];
const player = computed(() => store.getters.player as Player);
const canShow = computed(() => player.value.ItemList && player.value.ItemList.length > 0);

const isEquiped = (i: number) => {
  if (player.value.WeaponIndex && player.value.WeaponIndex - 1 === i) {
    return true;
  } else if (player.value.ArmorIndex && player.value.ArmorIndex - 1 === i) {
    return true;
  } else {
    return false;
  }
}
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
  flex-wrap: wrap;
  flex-grow: 1;
  overflow-y: scroll;
}
</style>