<template>
  <div class="battle-end flex-grow-1 d-flex flex-column justify-content-center">
    <DialogComponent :dialogs="dialogs"></DialogComponent>
    <p class="h6 w-100 m-0">機器人殘骸</p>
    <div class="items-container px-3 d-flex flex-wrap">
      <div v-for="(item, i) in enemy.ItemList" type="button"
            @click="switchItem('enemy', item, i)">
        <CardComponent :item="item"></CardComponent>
      </div>
    </div>
    <hr class="hr m-0" />
    <p class="h6 w-100 m-0">你的背包（上限：{{ player.ItemList.length + '／' + player.Character.ItemLimit }}）</p>
    <p class="w-100 m-0">獲得螺絲釘：{{ earnCoin }} ／總螺絲釘：{{ player.Coin }}</p>
    <div class="items-container px-3 d-flex flex-wrap">
      <div v-for="(item, i) in player.ItemList" type="button"
            @click="switchItem('player', item, i)">
        <CardComponent :item="item"></CardComponent>
      </div>
    </div>
    <button type="button" class="system-btn w-100 mb-3" @click="goRest()">休息</button>
  </div>
</template>


<script setup name="BattleEndComponent" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { Item, Player, Character, enumGameState, enumItemType, enumBattleResult, enumMumbleType, enumDialog } from '@/types/general';
import MumbleComponent from './MumbleComponent.vue';
import CardComponent from './CardComponent.vue';
import DialogComponent from './DialogComponent.vue';
import PlayerStatusComponent from './PlayerStatusComponent.vue';
import Util from '@/service/util';
import { Sound } from '@/service/sounds';
import { DIALOGS, ITEM } from '@/data';

const store = useStore();
const player = computed(() => store.getters.player as Player);
const enemy = computed(() => store.getters.enemy as Player);
const shop = computed(() => store.getters.shop as Item[]);
const earnCoin = ref(0);
const sounds = computed(() => store.getters.sounds);

const dialogs = DIALOGS[enumDialog.BattleEnd];

const box50 = Util.makeLotteryBox(50);
onMounted(() => {
  // 商店補充邏輯牌，隨機增加技術牌
  const newShopItems = [];
  const logiCards = ITEM.filter(item => item.ItemType === enumItemType.LogiCard);
  const techCards = ITEM.filter(item => item.ItemType !== enumItemType.LogiCard);
  for (const item of logiCards) {
    newShopItems.push(item);
  }
  const shopRemainTechCards = shop.value.filter(item => item.ItemType !== enumItemType.LogiCard);
  for (const item of shopRemainTechCards) {
    newShopItems.push(item);
  }
  if (Util.lottery(box50)) { // 商店 50% 機率增加一件技術牌
    const i = Util.getRandomInt(0, techCards.length - 1);
    newShopItems.push(techCards[i]);
  }
  store.dispatch(StoreAction.updateShop, newShopItems);

  const min = enemy.value.Character.RewardCoin![0];
  const max = enemy.value.Character.RewardCoin![1];
  earnCoin.value = Util.getRandomInt(min, max);
  player.value.Coin += earnCoin.value;
})

const switchItem = (who: string, item: Item, i: number) => {
  switch (who) {
    case 'player':
      enemy.value.ItemList.push(item);
      player.value.ItemList.splice(i, 1);
      enemy.value.ItemList.sort((a, b) => a.ID - b.ID);
      break;
    case 'enemy':
      if (player.value.ItemList.length < player.value.Character.ItemLimit) {
        player.value.ItemList.push(item);
        enemy.value.ItemList.splice(i, 1);
        player.value.ItemList.sort((a, b) => a.ID - b.ID);
      } else {
        alert('已達背包上限！');
      }
      break;
  }
}
const goRest = async () => {
  const confirmBox = confirm('離開後就無法取回機器人殘骸裡的卡牌了，確定嗎？');
  if (confirmBox) {
    await Sound.playSound(sounds.value.click);
    store.dispatch(StoreAction.updatePlayer, player.value);
    store.dispatch(StoreAction.changeGameState, enumGameState.Rest);
  }
}
</script>

<style lang="scss" scoped>
.battle-end {
  gap: 15px;
}
</style>
