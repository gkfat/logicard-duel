<template>
  <div id="shop" class="frame" :class="{ 'frame-show': isShopOpen }" v-if="player && player.ItemList">
    <Dialog :dialogs="dialogs" />
    <p class="w-100 text-center m-0">
      螺絲釘：{{ player.Coin }}｜物品：{{ player.ItemList.length + '／' + player.Character.ItemLimit }}
    </p>
	<div class="w-100 py-1 d-flex justify-content-center align-items-center">
      <button type="button" class="" @click="toggleDisplayType(0)">裝備</button>
      <button type="button" class="" @click="toggleDisplayType(1)">技術牌</button>
    </div>
	<div class="items-container" v-if="displayType === 0">
      <div v-for="(item, i) in shop.ItemList" :key="i">
        <ItemComponent
          :shop="true"
          :item="item"
          :index="i"
        />
      </div>
    </div>
    <div class="items-container" v-if="displayType === 1">
      <div v-for="(item, i) in shop.CardList" :key="i">
        <ItemComponent
          :shop="true"
          :item="item"
          :index="i"
        />
      </div>
    </div>
    <button type="button" class="system-btn" @click="closeShop()">離開商店</button>
  </div>
</template>

<script setup name="Shop" lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import StoreAction from '@/store/storeActions';
import { Item, Player } from '@/types';
import { enumDialog } from '@/types/enums';
import { DIALOGS } from '@/data/index';
import Sound from '@/service/sounds';

const store = useStore();
const isShopOpen = computed(() => store.getters.isShopOpen);
const dialogs = DIALOGS[enumDialog.Shop];
const player = computed(() => store.getters.player as Player);
const shop = computed(() => store.getters.shop as Item[]);

const displayType = ref(0);

const toggleDisplayType = (type: number) => {
	displayType.value = type;
};

const closeShop = async () => {
	await Sound.playSound(Sound.sounds.click);
	store.dispatch(StoreAction.switch.switchShop);
};

</script>

<style lang="scss" scoped>
#shop {
	height: 90%;
}
.items-container {
	height: 100%;
	gap: 10px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	flex-grow: 1;
	overflow-y: scroll;
}
</style>
