<template>
  <div id="shop" class="frame" :class="{ 'frame-show': isShopOpen }">
    <DialogComponent :dialogs="dialogs"></DialogComponent>
    <div class="d-flex justify-content-end align-items-center" v-if="player && player.Character">
      <div class="items-container d-flex flex-wrap justify-content-end">
        <p class="limit m-0 w-100 mb-1">
          <span>你口袋裡有： </span>
          <span class="wallet">
            <IconComponent :icon="'images/screw'"></IconComponent>
            {{ player.Coin }}
          </span>
          <span>背包上限：{{ player.CardList.length }} / {{ player.Character.ItemLimit }}</span>
        </p>
        <CardComponent v-for="item in player.CardList" :sm="true" :item="item"></CardComponent>
      </div>
    </div>
    <div class="item-list flex-grow-1">
      <template v-for="(item, i) of shop">
        <div class="item" type="button" @click="confirmPurchase(i)">
          <p class="price-tag m-0 h6">
            <IconComponent :icon="'images/screw'"></IconComponent>
            {{ item.Price }}
          </p>
          <CardComponent :item="item"></CardComponent>
          <div class="item-description w-100 text-center">
            <p class="h6 m-0 mb-1">{{ item.Name }}</p>
            <p class="m-0">{{ item.Description }}</p>
          </div>
        </div>
      </template>
    </div>
    <button type="button" class="system-btn mb-3" @click="closeShop()">離開商店</button>
  </div>
</template>


<script setup name="ShopComponent" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import DialogComponent from './DialogComponent.vue';
import CardComponent from './CardComponent.vue';
import IconComponent from './IconComponent.vue';
import { Item, Player, enumDialog } from '@/types/general';
import { DIALOGS } from '@/data/index';
import Sound from '@/service/sounds';

const store = useStore();
const isShopOpen = computed(() => store.getters.isShopOpen);
const dialogs = DIALOGS[enumDialog.Shop];
const player = computed(() => store.getters.player as Player);
const shop = computed(() => store.getters.shop as Item[]);

const confirmPurchase = async (i: number) => {
  const item = shop.value[i];
  if (item.Price > player.value.Coin) {
    alert('你沒有足夠的螺絲釘。');
  } else {
    const confirmBox = confirm('確定購買？');
    if (confirmBox) {
      await Sound.playSound(Sound.sounds.coinDrop);
      const updatedShop = [ ...shop.value ];
      updatedShop.splice(i, 1);
      store.dispatch(StoreAction.general.updateShop, updatedShop);
      const updatedPlayer = { ...player.value };
      updatedPlayer.Coin -= item.Price;
      updatedPlayer.CardList.push(item);
      store.dispatch(StoreAction.player.updatePlayer, { who: 'player', player: updatedPlayer });
      alert('感謝購買！');
    }
  }
}

// 打開商店
const closeShop = async () => {
  await Sound.playSound(Sound.sounds.click);
  store.dispatch(StoreAction.switch.switchShop);
}

</script>

<style lang="scss" scoped>
#shop {
  .wallet {
    background-color: var(--blue);
    color: var(--skin);
    padding: 2px 4px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .items-container {
    .limit {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 5px;
      font-size: 0.8rem;
      text-align: right;
    }
  }
  .item-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow-y: scroll;
    padding: 5px;
    background-color: var(--darkblue);
    border-radius: 10px;
    .item {
      position: relative;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      background-color: var(--blue);
      border: 6px solid var(--darkblue);
      border-radius: 10px;
      max-width: 50%;
      height: 220px;
      padding-top: 5px;
      transition: all 0.3s;
      gap: 5px;
      @media screen and (min-width: 576px) {
        max-width: 33.33%;
      }
      @media screen and (min-width: 768px) {
        max-width: 25%;
      }
      &-description {
        padding: 5px;
        width: 100%;
        color: var(--skin);
        font-size: 0.8rem;
        text-align: center;
      }
      &:hover {
        background-color: var(--green);
        .item-description {
          color: var(--darkblue);
        }
      }
    }
  }
  .price-tag {
    display: flex;
    align-items: center;
    position: absolute;
    background-color: var(--skin);
    color: var(--blue);
    padding: 2px 4px;
    border-radius: 5px;
    top: 5px;
    right: 5px;
  }
}
</style>
