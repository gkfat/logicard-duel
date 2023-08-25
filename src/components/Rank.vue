<template>
  <div id="rank" class="frame" :class="{ 'frame-show': switchToggleStore.rankOpen }">
    <Dialog :dialogs="dialogs" />
    <div class="rank-list flex-grow-1">
      <table v-for="(rank, i) of rankList.slice(1).reverse()" class="table table-sm shadow-sm rounded" :key="i">
        <tr v-for="(text, ti) of rank" :key="ti">
          <td class="px-1 w-25">{{ rankList[0][ti] }}</td>
          <td class="px-1">{{ text }}</td>
        </tr>
      </table>
    </div>
    <button type="button" class="system-btn" @click="closeRank()">收起平板</button>
  </div>
</template>

<script setup name="Rank" lang="ts">
import { computed } from 'vue';
import { enumDialog } from '@/types/enums';
import { DIALOGS } from '@/data/index';
import { useRankStore, useSwitchToggleStore } from '@/store';

const switchToggleStore = useSwitchToggleStore();
const rankStore = useRankStore();

const dialogs = DIALOGS[enumDialog.Rank];
const rankList = computed(() => rankStore.rankList as string[][]);

// 關閉排行榜
const closeRank = async () => {
	switchToggleStore.toggle('rank');
};
</script>

<style lang="scss" scoped>
#rank {
  height: 90%;
}
.table {
  background-color: var(--white);
}
.rank-list {
  overflow: scroll;
}
</style>
