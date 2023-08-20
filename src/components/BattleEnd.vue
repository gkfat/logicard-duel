<template>
  <div id="battle-end" class="d-flex flex-column justify-content-center">
    <Dialog :dialogs="dialogs"></Dialog>
    
    <div>
      <p class="m-0 h6 w-100 text-center">戰利品</p>
      <p class="m-0 w-100 text-center">
        螺絲釘：{{ player.Coin }}｜物品：{{ player.ItemList.length + '／' + player.Character.ItemLimit }}
      </p>
    </div>
    <div class="items-container d-flex justify-content-center flex-wrap flex-grow-1">
      <div v-for="item in lootBox">
        <ItemComponent :item="item"></ItemComponent>
      </div>
    </div>
    <!-- 沒有多餘空間 -->
    <button v-if="noSpace" type="button" class="system-btn w-100" @click="openBackpack()">整理背包</button>
    <button v-else type="button" class="system-btn w-100" @click="goRest()">休息</button>
  </div>
</template>


<script setup name="BattleEnd" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { Item, Player } from '@/types';
import { enumGameState, enumItemType, enumDialog } from '@/types/enums';
import ItemComponent from './ItemComponent.vue';
import Dialog from './Dialog.vue';
import Util from '@/service/util';
import Sound from '@/service/sounds';
import { DIALOGS, CARDS, ITEMS } from '@/data';

const store = useStore();
const player = computed(() => store.getters.player as Player);
const enemy = computed(() => store.getters.enemy as Player);
const shop = computed(() => store.getters.shop as Item[]);
const lootBox = reactive([] as Item[]);
const noSpace = computed(() => player.value.ItemList.length > player.value.Character.ItemLimit);

const dialogs = DIALOGS[enumDialog.BattleEnd];
const box50 = Util.makeLotteryBox(50);

const makeLoot = (type: enumItemType) => {
  switch (type) {
    case enumItemType.Weapon:
      const weaponList = ITEMS.filter(item => item.ItemType === type);
      const iw = Util.getRandomInt(0, enemy.value.Character.RewardWeaponList!.length - 1);
      const weapon = weaponList[iw];
      lootBox.push(weapon);
      break;
    case enumItemType.Armor:
      const armorList = ITEMS.filter(item => item.ItemType === type);
      const ia = Util.getRandomInt(0, enemy.value.Character.RewardArmorList!.length - 1);
      const armor = armorList[ia];
      lootBox.push(armor);
      break;
  }
}

onMounted(() => {
  // 判斷戰利品
  const min = enemy.value.Character.RewardCoin![0];
  const max = enemy.value.Character.RewardCoin![1];
  const coin = ITEMS.find(item => item.ItemType === enumItemType.Coin)!;
  coin.Point = Util.getRandomInt(min, max);
  player.value.Coin += coin.Point;
  
  lootBox.push(coin);
  if (Util.lottery(box50)) {
    makeLoot(enumItemType.Weapon);
  }
  if (Util.lottery(box50)) {
    makeLoot(enumItemType.Armor);
  }
  
  lootBox.filter(loot => loot.ItemType !== enumItemType.Coin).forEach(loot => {
    player.value.ItemList.push(loot);
  })

  store.dispatch(StoreAction.player.updatePlayer, player.value);

  // 商店增加技術牌
  const newShopItems = [];
  const techCards = CARDS.filter(item => item.ItemType !== enumItemType.LogiCard);
  const shopRemainTechCards = shop.value.filter(item => item.ItemType !== enumItemType.LogiCard);
  for (const item of shopRemainTechCards) {
    newShopItems.push(item);
  }
  if (Util.lottery(box50)) { // 商店 50% 機率增加一件技術牌
    const i = Util.getRandomInt(0, techCards.length - 1);
    newShopItems.push(techCards[i]);
  }
  store.dispatch(StoreAction.general.updateShop, newShopItems);
})

// 打開背包
const openBackpack = async () => {
  await Sound.playSound(Sound.sounds.click);
  store.dispatch(StoreAction.switch.switchBackpack);
}

const goRest = async () => {
  await Sound.playSound(Sound.sounds.click);
  store.dispatch(StoreAction.general.changeGameState, enumGameState.Rest);
}
</script>

<style lang="scss" scoped>
#battle-end {
  height: 100%;
  gap: 15px;
}
.items-container {
  overflow-y: scroll;
  gap: 10px;
}
</style>
@/types