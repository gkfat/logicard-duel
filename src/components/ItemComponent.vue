<template>
    <div
        v-if="!playerStatus"
        type="button"
        class="item p-1"
        :class="{ 'item-equiped': equiped }"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        :title="`【${item.Name}】${item.Description}`"
        @click="toggleControl()"
    >
        <!-- Item -->
        <template v-if="isItem">
            <div class="item-point w-100 d-flex justify-content-end align-items-center">
                <Icon
                    v-if="item.ItemType === enumItemType.Weapon"
                    :url="ImageDataList.icon.attack"
                />
                <Icon
                    v-if="item.ItemType === enumItemType.Armor"
                    :url="ImageDataList.icon.defense"
                />
                <p class="m-0">
                    {{ item.Point }}
                </p>
            </div>
            <Icon
                v-if="isItem"
                :url="item.Icon"
            />
        </template>
        <!-- Card -->
        <Card
            v-if="!isItem"
            :sm="true"
            :item="item"
        />
        <div
            v-if="shop"
            class="price rounded"
        >
            $ {{ item.Price }}
        </div>
        <p class="m-0 w-100 py-1 text-center">
            {{ item.Name }}
        </p>
    </div>
    <!-- 玩家狀態：裝備中 -->
    <div
        v-if="playerStatus"
        class="item"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        :title="`【${item.Name}】${item.Description}`"
    >
        <Icon :url="item.Icon" />
    </div>
    <!-- Backpack Control -->
    <div
        v-if="backpack"
        class="control"
        :class="{ 'control-show': isShowBackpackControl }"
    >
        <Detail :item="item" />
        <button
            v-if="isItem"
            type="button"
            class="system-btn w-100"
            @click="switchEquip()"
        >
            {{ $t('button.equip') }}
        </button>
        <button
            v-if="isHealCard"
            type="button"
            class="system-btn w-100"
            @click="useHealCard()"
        >
            {{ $t('button.use') }}
        </button>
        <button
            type="button"
            class="system-btn w-100"
            @click="sellItem()"
        >
            {{ $t('button.sell') }}（$ {{ evaluateSalePrice }}）
        </button>
        <button
            type="button"
            class="system-btn system-btn-skip w-100"
            @click="toggleControl()"
        >
            {{ $t('button.cancel') }}
        </button>
    </div>
    <!-- Shop Control -->
    <div
        v-if="shop"
        class="control"
        :class="{ 'control-show': isShowShopControl }"
    >
        <Detail :item="item" />
        <button
            type="button"
            class="system-btn w-100"
            @click="buyItem()"
        >
            {{ $t('button.buy') }}（$ {{ item.Price }}）
        </button>
        <button
            type="button"
            class="system-btn system-btn-skip w-100"
            @click="toggleControl()"
        >
            {{ $t('button.cancel') }}
        </button>
    </div>
</template>

<script setup name="ItemComponent" lang="ts">
import {
    computed,
    ref,
    toRefs,
} from 'vue';

import { ImageDataList } from '@/data';
import Sound from '@/service/sounds';
import {
    usePlayerStore,
    useShopStore,
} from '@/store';
import { Item } from '@/types';
import { enumItemType } from '@/types/enums';

import Card from './Card.vue';
import Detail from './Detail.vue';
import Icon from './Icon.vue';

const playerStore = usePlayerStore();
const shopStore = useShopStore();

const player = computed(() => playerStore.player);

const props = withDefaults(defineProps<{
    item: Item,
    index?: number | null,
    backpack?: boolean,
    shop?: boolean,
    equiped?: boolean,
    playerStatus?: boolean
}>(), {
    backpack: false,
    index: null,
    shop: false,
    equiped: false,
    playerStatus: false,
});

const {
    item,
    index,
    backpack,
    shop,
    equiped,
    playerStatus,
} = toRefs(props);

const isItem = item.value.ItemType === enumItemType.Coin
                || item.value.ItemType === enumItemType.Weapon
                || item.value.ItemType === enumItemType.Armor;
const isHealCard = item.value.ItemType === enumItemType.Heal;
const evaluateSalePrice = Math.floor(item.value.Price * 0.5);

const isShowBackpackControl = ref(false);
const isShowShopControl = ref(false);

// 開啟操作選單
const toggleControl = async () => {
    await Sound.playSound(Sound.sounds.effect.click);
    if (backpack.value) {
        isShowBackpackControl.value = !isShowBackpackControl.value;
    } else if (shop.value) {
        isShowShopControl.value = !isShowShopControl.value;
    }
};

// 穿脫裝備
const switchEquip = async () => {
    await Sound.playSound(Sound.sounds.effect.equip);
    const updatedPlayer = { ...player.value };
    const newItemIndex = index.value! + 1;
    switch (item.value.ItemType) {
    case enumItemType.Weapon:
        if (updatedPlayer.WeaponIndex) {
            updatedPlayer.WeaponIndex = updatedPlayer.WeaponIndex === newItemIndex
                ? null
                : newItemIndex;
        } else {
            updatedPlayer.WeaponIndex = newItemIndex;
        }
        // 調整攻擊力
        if (updatedPlayer.WeaponIndex) {
            updatedPlayer.ExtraAttack = item.value.Point;
        } else {
            updatedPlayer.ExtraAttack = 0;
        }
        break;
    case enumItemType.Armor:
        if (updatedPlayer.ArmorIndex) {
            updatedPlayer.ArmorIndex = updatedPlayer.ArmorIndex === newItemIndex
                ? null
                : newItemIndex;
        } else {
            updatedPlayer.ArmorIndex = newItemIndex;
        }
        // 調整防禦力
        if (updatedPlayer.ArmorIndex) {
            updatedPlayer.ExtraDefense = item.value.Point;
        } else {
            updatedPlayer.ExtraDefense = 0;
        }
        break;
    default:
        break;
    }
    playerStore.updatePlayer('player', updatedPlayer);
    toggleControl();
};

// 使用治療牌
const useHealCard = async () => {
    const playerHealth = player.value.Character!.Health;
    if (player.value.CurrentHealth === playerHealth) {
        alert('你覺得無病無痛，應該不需要使用這東西。');
    } else {
        const confirmBox = confirm(`你目前的生命值為 ${player.value.CurrentHealth} / ${playerHealth}，確定要使用？`);
        if (confirmBox) {
            const updatedPlayer = { ...player.value };
            await Sound.playSound(Sound.sounds.effect.heal);
            playerStore.heal('player', item.value.Point);
            // 檢查裝備 index
            if (updatedPlayer.WeaponIndex && props.index! < updatedPlayer.WeaponIndex) {
                updatedPlayer.WeaponIndex -= 1;
            }
            if (updatedPlayer.ArmorIndex && props.index! < updatedPlayer.ArmorIndex) {
                updatedPlayer.ArmorIndex -= 1;
            }
            updatedPlayer.CardDataList.splice(props.index!, 1);
            playerStore.updatePlayer('player', updatedPlayer);
            toggleControl();
        }
    }
};

// 賣出物品
const sellItem = async () => {
    const updatedPlayer = { ...player.value };
    let proceed = false;

    if (equiped.value) {
        const confirmBox = confirm('你正穿著這件裝備，確定賣出？');
        if (confirmBox) {
            switch (item.value.ItemType) {
            case enumItemType.Weapon:
                updatedPlayer.WeaponIndex = null;
                break;
            case enumItemType.Armor:
                updatedPlayer.ArmorIndex = null;
                break;
            default:
                break;
            }
            proceed = true;
        }
    } else {
        const confirmBox = confirm('確定要賣掉？');
        if (confirmBox) {
            proceed = true;
        }
    }
    if (proceed) {
        switch (item.value.ItemType) {
        case enumItemType.Weapon:
        case enumItemType.Armor:
            if (updatedPlayer.WeaponIndex && props.index! < updatedPlayer.WeaponIndex) {
                updatedPlayer.WeaponIndex -= 1;
            }
            if (updatedPlayer.ArmorIndex && props.index! < updatedPlayer.ArmorIndex) {
                updatedPlayer.ArmorIndex -= 1;
            }
            updatedPlayer.ItemList.splice(props.index!, 1);
            break;
        case enumItemType.Attack:
        case enumItemType.Defense:
        case enumItemType.Heal:
            updatedPlayer.CardDataList.splice(props.index!, 1);
            break;
        default:
            break;
        }

        await Sound.playSound(Sound.sounds.effect.coin);
        updatedPlayer.Coin += evaluateSalePrice;
        playerStore.updatePlayer('player', updatedPlayer);
        alert(`成功賣出！賺了 ${evaluateSalePrice} 個螺絲釘`);
        toggleControl();
    }
};

// 購買物品
const buyItem = async () => {
    if (item.value.Price > player.value.Coin) {
        alert('你沒有足夠的螺絲釘。');
    } else {
        const confirmBox = confirm('確定購買？');
        if (confirmBox) {
            await Sound.playSound(Sound.sounds.effect.coin);
            const updatedPlayer = { ...player.value };
            updatedPlayer.Coin -= item.value.Price;

            if (isItem) {
                shopStore.shop.ItemList.splice(props.index!, 1);
                updatedPlayer.ItemList.push(item.value);
            } else {
                shopStore.shop.CardDataList.splice(props.index!, 1);
                updatedPlayer.CardDataList.push(item.value);
            }

            playerStore.updatePlayer('player', updatedPlayer);
            alert('感謝購買！');
            toggleControl();
        }
    }
};

</script>

<style lang="scss" scoped>
.item {
  position: relative;
  height: 120px;
  width: 120px;
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
    left: -10px;
    padding: 2px 5px;
    width: 60px;
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
  padding: 10px;
  &-show {
    display: flex;
  }
}
</style>
