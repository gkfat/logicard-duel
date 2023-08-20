<template>
  <div class="detail">
    <Icon v-if="isItem" :url="item.Icon"></Icon>
    <Card v-if="!isItem" :item="item"></Card>
    <p class="h5 w-100 text-center m-0">{{ item.Name }}</p>
    <p class="w-100 text-center m-0">【{{ Util.getItemType(item.ItemType) }}】</p>
    <p class="w-100 text-center m-0 detail-extra" v-if="item.ItemType === enumItemType.Attack || item.ItemType === enumItemType.Weapon">攻擊力 + {{ item.Point }}</p>
    <p class="w-100 text-center m-0 detail-extra" v-if="item.ItemType === enumItemType.Defense || item.ItemType === enumItemType.Armor">防禦力 + {{ item.Point }}</p>
    <p class="w-100 text-center m-0 detail-extra" v-if="item.ItemType === enumItemType.Heal">生命值 + {{ item.Point }}</p>
    <p class="w-100 text-center m-0">{{ item.Description }}</p>
  </div>
</template>

<script setup name="Detail" lang="ts">
import { Item, Player } from '@/types';
import { enumItemType } from '@/types/enums';
import { Tooltip } from 'bootstrap';
import Sound from '@/service/sounds';
import Util from '@/service/util';
import { IMAGES } from '@/data';
import { ref, onMounted, computed } from 'vue';
import Icon from './Icon.vue';
import Card from './Card.vue';
import { useStore } from 'vuex';
import { StoreAction } from '@/store/storeActions';

const store = useStore();

const props = defineProps<{ item: Item }>();

const isItem = props.item.ItemType === enumItemType.Coin ||
                props.item.ItemType === enumItemType.Weapon || 
                props.item.ItemType === enumItemType.Armor;
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  height: 50%;
  background-color: var(--darkblue);
  border: 5px solid var(--green);
  border-radius: 15px;
  padding: 15px;
  gap: 10px;
  color: var(--green);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  .icon {
    width: 100px;
    height: 100px;
  }
  &-extra {
    color: var(--skin);
  }
}
</style>