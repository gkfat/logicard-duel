<template>
  <div type="button" class="item p-1"
      :class="{ 'item-equiped': equiped }"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      :title="`【${item.Name}】${item.Description}`"
      v-if="!playerStatus"
      @click="toggleControl()">
      <!-- Item -->
      <template v-if="isItem">
        <div class="item-point w-100 d-flex justify-content-end align-items-center">
          <Icon v-if="item.ItemType === enumItemType.Weapon" :url="IMAGES.icon.attack"></Icon>
          <Icon v-if="item.ItemType === enumItemType.Armor" :url="IMAGES.icon.defense"></Icon>
          <p class="m-0">{{ item.Point }}</p>
        </div>
        <Icon v-if="isItem" :url="item.Icon"></Icon>
      </template>
      <!-- Card -->
      <template v-if="!isItem">
        <div class="price rounded">$ {{ item.Price }}</div>
        <Card :sm="true" :item="item"></Card>
      </template>
      <p class="m-0 w-100 py-1 text-center">{{ item.Name }}</p>
  </div>
  <!-- 玩家狀態：裝備中 -->
  <div class="item"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      :title="`【${item.Name}】${item.Description}`"
      v-if="playerStatus">
      <Icon :url=item.Icon></Icon>
  </div>
  <!-- Backpack Control -->
  <div class="control" :class="{ 'control-show': isShowBackpackControl }">
    <button class="system-btn w-100" @click="sellItem()">以 $ {{ evaluateSalePrice }} 賣出</button>
    <button class="system-btn w-100" @click="switchEquip()">裝備／脫下</button>
    <button class="system-btn system-btn-skip w-100" @click="toggleControl()">取消</button>
  </div>
  <!-- Shop Control -->
  <div class="control" :class="{ 'control-show': isShowShopControl }">
    <button class="system-btn w-100" @click="buyItem()">以 $ {{ item.Price }} 買入</button>
    <button class="system-btn system-btn-skip w-100" @click="toggleControl()">取消</button>
  </div>
</template>

<script setup name="ItemComponent" lang="ts">
import { Item, Player } from '@/types';
import { enumItemType } from '@/types/enums';
import { Tooltip } from 'bootstrap';
import Sound from '@/service/sounds';
import { IMAGES } from '@/data';
import { ref, onMounted, computed } from 'vue';
import Icon from './Icon.vue';
import Card from './Card.vue';
import { useStore } from 'vuex';
import { StoreAction } from '@/store/storeActions';

const store = useStore();
const player = computed(() => store.getters.player as Player);
const shop = computed(() => store.getters.shop as Item[]);

const props = withDefaults(defineProps<{
  item: Item,
  index?: number,
  backpack?: boolean,
  shop?: boolean,
  equiped?: boolean,
  playerStatus?: boolean
}>(), {
  backpack: false,
  shop: false,
  equiped: false,
  playerStatus: false,
})

const isItem = props.item.ItemType === enumItemType.Coin ||
                props.item.ItemType === enumItemType.Weapon || 
                props.item.ItemType === enumItemType.Armor;

const evaluateSalePrice = Math.floor(props.item.Price * 0.5);

const isShowBackpackControl = ref(false);
const isShowShopControl = ref(false);

// 開啟操作選單
const toggleControl = () => {
  if (props.backpack) {
    isShowBackpackControl.value = !isShowBackpackControl.value;
  } else if (props.shop) {
    isShowShopControl.value = !isShowShopControl.value;
  }
}

// 穿脫裝備
const switchEquip = async () => {
  await Sound.playSound(Sound.sounds.equip);
  const updatedPlayer = { ...player.value };
  switch (props.item.ItemType) {
    case enumItemType.Weapon:
      if (updatedPlayer.WeaponIndex) {
        updatedPlayer.WeaponIndex = updatedPlayer.WeaponIndex === props.index! + 1 ? null : props.index! + 1;
      } else {
        updatedPlayer.WeaponIndex = props.index! + 1;
      }
      break;
    case enumItemType.Armor:
      if (updatedPlayer.ArmorIndex) {
        updatedPlayer.ArmorIndex = updatedPlayer.ArmorIndex === props.index! + 1 ? null : props.index! + 1;
      } else {
        updatedPlayer.ArmorIndex = props.index! + 1;
      }
      break;
  }
  await store.dispatch(StoreAction.player.updatePlayer, { who: 'player', player: updatedPlayer });
  toggleControl();
}

// 賣出物品
const sellItem = async () => {
  const confirmBox = confirm('確定要賣掉？');
  if (confirmBox) {
    const updatedPlayer = { ...player.value };
    if (props.equiped) {
      const confirmSell = confirm('你正穿著這件裝備，確定賣出？');
      if (confirmSell) {
        switch (props.item.ItemType) {
          case enumItemType.Weapon:
            updatedPlayer.WeaponIndex = null;
            break;
          case enumItemType.Armor:
            updatedPlayer.ArmorIndex = null;
            break;
        }
      }
    }
    await Sound.playSound(Sound.sounds.coin);
    updatedPlayer.ItemList.splice(props.index!, 1);
    updatedPlayer.Coin += evaluateSalePrice;
    await store.dispatch(StoreAction.player.updatePlayer, { who: 'player', player: updatedPlayer });
    alert(`成功賣出！賺了 ${evaluateSalePrice} 個螺絲釘`);
    toggleControl();
  }
}

// 購買物品
const buyItem = async () => {
  if (props.item.Price > player.value.Coin) {
    alert('你沒有足夠的螺絲釘。');
  } else {
    const confirmBox = confirm('確定購買？');
    if (confirmBox) {
      await Sound.playSound(Sound.sounds.coin);
      const updatedShop = [ ...shop.value ];
      updatedShop.splice(props.index!, 1);
      store.dispatch(StoreAction.general.updateShop, updatedShop);
      const updatedPlayer = { ...player.value };
      updatedPlayer.Coin -= props.item.Price;
      updatedPlayer.CardList.push(props.item);
      store.dispatch(StoreAction.player.updatePlayer, { who: 'player', player: updatedPlayer });
      alert('感謝購買！');
      toggleControl();
    }
  }
}

onMounted(() => {
  new Tooltip(document.body, {
    selector: "[data-bs-toggle='tooltip']",
    delay: {
      show: 1000,
      hide: 0
    },
    trigger: 'focus'
  })
})
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  height: 100px;
  width: 100px;
  color: var(--blue);
  background-color: var(--yellow);
  border: 3px solid var(--darkblue);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .icon {
    width: 30px;
    height: 30px;
  }
  &-point {
    gap: 2px;
    .icon {
      width: 15px;
      height: 15px;
    }
  }
  // 價格標
  .price {
    position: absolute;
    top: -10px;
    right: -10px;
    padding: 2px 4px;
    z-index: 1;
    margin: 0;
    text-align: center;
    background-color: var(--blue);
    color: var(--white);
  }
}

// 已裝備
#backpack {
  .item-equiped {
    &::after {
      content: '裝備中';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--darkblue);
      color: var(--white);
      opacity: 0.5;
    }
  }
}
.equipment {
  .item {
    border: none;
    border-radius: none;
  }
}
.control {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1px;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  z-index: 9;
  &-show {
    display: flex;
  }
}
</style>
@/types