<template>
  <div id="rank" class="frame" :class="{ 'frame-show': isRankOpen }">
    <DialogComponent :dialogs="dialogs"></DialogComponent>
    <table class="table table-sm flex-grow-1">
      <tr>
        <th v-for="rank in rankList[0]">{{ rank }}</th>
      </tr>
      <tr v-for="(rank, i) of rankList.slice(1).reverse()">
        <td v-for="text of rank">{{ text }}</td>
      </tr>
    </table>
    <button type="button" class="system-btn mb-3" @click="closeRank()">收起平板</button>
  </div>
</template>

<script setup name="RankComponent" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { enumSheetName, enumOperation, Player, enumDialog } from '@/types/general';
import { DIALOGS } from '@/data/index';
import { Audios, Sound } from '@/service/sounds';
import DialogComponent from './DialogComponent.vue';
import api from '@/service/api';

const store = useStore();
const dialogs = DIALOGS[enumDialog.Rank];
const isRankOpen = computed(() => store.getters.isRankOpen as boolean);
const rankList = computed(() => store.getters.rankList as string[][]);

// 關閉排行榜
const closeRank = async () => {
  await Sound.playSound(Audios.click);
  store.dispatch(StoreAction.switchRank);
}
</script>

<style lang="scss" scoped>
</style>
