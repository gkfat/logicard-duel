<template>
  <div id="shop" class="frame" :class="{ 'frame-show': isShopOpen }" v-if="player && player.ItemList">
    <Dialog :dialogs="dialogs"></Dialog>
    <p class="w-100 text-center m-0">
      螺絲釘：{{ player.Coin }}｜物品：{{ player.ItemList.length + '／' + player.Character.ItemLimit }}
    </p>
    <div class="items-container">
      <div v-for="(item, i) in shop">
        <ItemComponent :shop="true" :item="item" :index="i"></ItemComponent>
      </div>
    </div>
    <button type="button" class="system-btn" @click="closeShop()">離開商店</button>
  </div>
</template>

<script setup name="Shop" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Dialog from './Dialog.vue';
import ItemComponent from './ItemComponent.vue';
import { Item, Player } from '@/types';
import { enumDialog } from '@/types/enums';
import { DIALOGS } from '@/data/index';
import Sound from '@/service/sounds';

const store = useStore();
const isShopOpen = computed(() => store.getters.isShopOpen);
const dialogs = DIALOGS[enumDialog.Shop];
const player = computed(() => store.getters.player as Player);
const canShow = computed(() => player.value.ItemList && player.value.ItemList.length > 0);
const shop = computed(() => store.getters.shop as Item[]);

// 打開商店
const closeShop = async () => {
  await Sound.playSound(Sound.sounds.click);
  store.dispatch(StoreAction.switch.switchShop);
}

</script>

<style lang="scss" scoped>
#shop {
  height: 90%;
}
.items-container {
  gap: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-grow: 1;
  overflow-y: scroll;
  padding-top: 10px;
}
</style>