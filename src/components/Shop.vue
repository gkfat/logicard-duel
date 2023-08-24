<template>
  <div id="shop" class="frame" :class="{ 'frame-show': isShopOpen }" v-if="player && player.ItemList">
    <Dialog :dialogs="dialogs" />
    <p class="w-100 text-center m-0">
      螺絲釘：{{ player.Coin }}｜物品：{{ player.ItemList.length + '／' + player.Character.ItemLimit }}
    </p>
    <div class="nav-container">
      <button type="button" class="nav-btn" @click="toggleDisplayType(0)">裝備</button>
      <button type="button" class="nav-btn" @click="toggleDisplayType(1)">技術牌</button>
    </div>
    <div class="items-container" v-if="displayType === 0">
      <template v-if="shop.ItemList.length === 0">
        <p class="reminder-text">商店目前沒有裝備。</p>
      </template>
      <template v-else>
        <div v-for="(item, i) in shop.ItemList" :key="i">
          <ItemComponent
            :shop="true"
            :item="item"
            :index="i"
          />
        </div>
      </template>
    </div>
    <div class="items-container" v-if="displayType === 1">
      <template v-if="shop.CardList.length === 0">
        <p class="reminder-text">商店目前沒有技術牌。</p>
      </template>
      <template v-else>
        <div v-for="(item, i) in shop.CardList" :key="i">
          <ItemComponent
            :shop="true"
            :item="item"
            :index="i"
          />
        </div>
      </template>
    </div>
    <button type="button" class="system-btn" @click="closeShop()">離開商店</button>
  </div>
</template>

<script setup name="Shop" lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import StoreAction from '@/store/storeActions';
import { Shop, Player } from '@/types';
import { enumDialog } from '@/types/enums';
import { DIALOGS } from '@/data/index';
import Sound from '@/service/sounds';

const store = useStore();
const isShopOpen = computed(() => store.getters.isShopOpen);
const dialogs = DIALOGS[enumDialog.Shop];
const player = computed(() => store.getters.player as Player);
const shop = computed(() => store.getters.shop as Shop);

const displayType = ref(0);

const toggleDisplayType = async (type: number) => {
	await Sound.playSound(Sound.sounds.click);
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
	padding-top: 10px;
	height: 100%;
	gap: 10px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	flex-grow: 1;
	overflow-y: scroll;
}
</style>
