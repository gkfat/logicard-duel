<template>
    <div
        id="rank"
        class="frame"
        :class="{ 'frame-show': switchToggleStore.rankOpen }"
    >
        <Dialog :dialogs="dialogs" />
        <div class="rank-list flex-grow-1">
            <table
                v-for="(rank, i) of rankList.slice(1).reverse()"
                :key="i"
                class="table table-sm shadow-sm rounded"
            >
                <tr
                    v-for="(text, ti) of rank"
                    :key="ti"
                >
                    <td class="px-1 w-25">
                        {{ rankList[0][ti] }}
                    </td>
                    <td class="px-1">
                        {{ text }}
                    </td>
                </tr>
            </table>
        </div>
        <button
            type="button"
            class="system-btn"
            @click="closeRank()"
        >
            {{ $t('button.close_rank') }}
        </button>
    </div>
</template>

<script setup name="Rank" lang="ts">
import { computed } from 'vue';

import { DialogDataList } from '@/data/index';
import {
    useRankStore,
    useSwitchToggleStore,
} from '@/store';
import { enumDialog } from '@/types/enums';

import Dialog from './Dialog.vue';

const switchToggleStore = useSwitchToggleStore();
const rankStore = useRankStore();

const dialogs = DialogDataList[enumDialog.Rank];
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
