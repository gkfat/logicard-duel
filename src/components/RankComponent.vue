<template>
  <div id="rank" class="frame" :class="{ 'frame-show': isRankOpen }">
    <DialogComponent :dialogs="dialogs"></DialogComponent>
    <div class="rank-list flex-grow-1">
      <table v-for="rank of rankList.slice(1).reverse()" class="table table-sm shadow-sm rounded">
        <tr v-for="(text, i) of rank">
          <td class="px-1 w-25">{{ rankList[0][i] }}</td>
          <td class="px-1">{{ text }}</td>
        </tr>
      </table>
    </div>
    <button type="button" class="system-btn mb-3" @click="closeRank()">收起平板</button>
  </div>
</template>

<script setup name="RankComponent" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { enumSheetName, enumOperation, Player, enumDialog } from '@/types/general';
import { DIALOGS } from '@/data/index';
import Sound from '@/service/sounds';
import DialogComponent from './DialogComponent.vue';
import api from '@/service/api';

const store = useStore();
const dialogs = DIALOGS[enumDialog.Rank];
const isRankOpen = computed(() => store.getters.isRankOpen as boolean);
const rankList = computed(() => store.getters.rankList as string[][]);

// 關閉排行榜
const closeRank = async () => {
  await Sound.playSound(Sound.sounds.click);
  store.dispatch(StoreAction.switch.switchRank);
}
</script>

<style lang="scss" scoped>
.table {
  background-color: var(--white);
}
.rank-list {
  overflow: scroll;
}
</style>
