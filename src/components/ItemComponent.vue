<template>
  <div type="button" class="item p-1"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      :title="`【${item.Name}】${item.Description}`"
      @click="toggleControl()">
      <!-- Item -->
      <template v-if="isItem">
        <div class="item-point w-100 d-flex justify-content-end align-items-center">
          <IconComponent v-if="item.ItemType === enumItemType.Weapon" :icon="`images/card-1`"></IconComponent>
          <IconComponent v-if="item.ItemType === enumItemType.Armor" :icon="`images/card-2`"></IconComponent>
          <p class="m-0">{{ item.Point }}</p>
        </div>
        <IconComponent v-if="isItem" :icon="`images/item-${item.ItemType}`"></IconComponent>
      </template>
      <!-- Card -->
      <template v-if="!isItem">
        <div class="price">$ {{ item.Price }}</div>
        <CardComponent :sm="true" :item="item"></CardComponent>
      </template>
      <p class="m-0 w-100 py-1 text-center">{{ item.Name }}</p>
  </div>
  <!-- Backpack Control -->
  <div class="control" :class="{ 'control-show': isShowBackpackControl }">
    <button class="system-btn w-100" @click="sellItem()">以 $ {{ evaluateSalePrice }} 賣出</button>
    <button class="system-btn w-100">裝備</button>
    <button class="system-btn w-100">脫下</button>
    <button class="system-btn system-btn-skip w-100" @click="toggleControl()">取消</button>
  </div>
  <!-- Shop Control -->
  <div class="control" :class="{ 'control-show': isShowShopControl }">
    <button class="system-btn w-100" @click="buyItem()">以 $ {{ item.Price }} 買入</button>
    <button class="system-btn system-btn-skip w-100" @click="toggleControl()">取消</button>
  </div>
</template>

<script setup name="CardComponent" lang="ts">
import { Item, Player, enumItemType } from '@/types/general';
import { Tooltip } from 'bootstrap';
import Sound from '@/service/sounds';
import { ref, onMounted, computed } from 'vue';
import IconComponent from './IconComponent.vue';
import CardComponent from './CardComponent.vue';
import { useStore } from 'vuex';
import { StoreAction } from '@/store/storeActions';

const store = useStore();
const player = computed(() => store.getters.player as Player);
const shop = computed(() => store.getters.shop as Item[]);

const props = withDefaults(defineProps<{
  item: Item,
  index?: number,
  backpack?: boolean,
  shop?: boolean
}>(), {
  backpack: false,
  shop: false,
})

const isItem = props.item.ItemType === enumItemType.Coin ||
                props.item.ItemType === enumItemType.Weapon || 
                props.item.ItemType === enumItemType.Armor;

const evaluateSalePrice = Math.floor(props.item.Price * 0.5);

const isShowBackpackControl = ref(false);
const isShowShopControl = ref(false);
const toggleControl = () => {
  if (props.backpack) {
    isShowBackpackControl.value = !isShowBackpackControl.value;
  } else if (props.shop) {
    isShowShopControl.value = !isShowShopControl.value;
  }
}

const sellItem = async () => {
  const confirmBox = confirm('確定要賣掉？');
  if (confirmBox) {
    await Sound.playSound(Sound.sounds.coinDrop);
    const updatedPlayer = { ...player.value };
    updatedPlayer.ItemList.splice(props.index!, 1);
    updatedPlayer.Coin += evaluateSalePrice;
    await store.dispatch(StoreAction.player.updatePlayer, { who: 'player', player: updatedPlayer });
    alert(`成功賣出！賺了 ${evaluateSalePrice} 個螺絲釘`);
    toggleControl();
  }
}

const buyItem = async () => {
  if (props.item.Price > player.value.Coin) {
    alert('你沒有足夠的螺絲釘。');
  } else {
    const confirmBox = confirm('確定購買？');
    if (confirmBox) {
      await Sound.playSound(Sound.sounds.coinDrop);
      const updatedShop = [ ...shop.value ];
      updatedShop.splice(props.index!, 1);
      store.dispatch(StoreAction.general.updateShop, updatedShop);
      const updatedPlayer = { ...player.value };
      updatedPlayer.Coin -= props.item.Price;
      updatedPlayer.CardList.push(props.item);
      store.dispatch(StoreAction.player.updatePlayer, { who: 'player', player: updatedPlayer });
      alert('感謝購買！');
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
    top: -5px;
    right: -5px;
    padding: 2px 4px;
    margin: 0;
    text-align: center;
    background-color: var(--blue);
    color: var(--white);
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
