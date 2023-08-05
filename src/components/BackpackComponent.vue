<template>
  <div id="backpack" class="frame" :class="{ 'frame-show': isBackpackOpen }">
    <DialogComponent :dialogs="dialogs"></DialogComponent>
    <div class="item-list flex-grow-1">
      <template v-for="item in player.ItemList">
        <div class="item">
          <CardComponent :item="item"></CardComponent>
          <div class="item-description">
            <p class="h6 text-center m-0 mb-1">{{ item.Name }}</p>
            <p class="m-0">{{ item.Description }}</p>
          </div>
        </div>
      </template>
    </div>
    <button type="button" class="system-btn mb-3" @click="closeBackpack()">關上背包</button>
  </div>
</template>

<script setup name="BackpackComponent" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { computed, watch, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Player, enumDialog } from '@/types/general';
import DialogComponent from './DialogComponent.vue';
import CardComponent from './CardComponent.vue';
import { Audios, Sound } from '@/service/sounds';
import { DIALOGS } from '@/data';

const store = useStore();
const isBackpackOpen = computed(() => store.getters.isBackpackOpen);
const dialogs = DIALOGS[enumDialog.Backpack];
const player = computed(() => store.getters.player as Player);

// 關上背包
const closeBackpack = async () => {
  await Sound.playSound(Audios.click);
  store.dispatch(StoreAction.switchBackpack);
}
</script>

<style lang="scss" scoped>
#backpack {
  .item-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow-y: scroll;
    padding: 5px;
    background-color: var(--darkblue);
    border-radius: 10px;
    .item {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      background-color: var(--blue);
      border: 6px solid var(--darkblue);
      border-radius: 10px;
      max-width: 50%;
      padding-top: 5px;
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
    }
  }
}
</style>
