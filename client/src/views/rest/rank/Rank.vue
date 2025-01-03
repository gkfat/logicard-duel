<template>
    <v-row class="w-100 ma-0 ga-3 flex-column pb-3">
        <v-col
            cols="auto"
            class="pa-0 w-100"
        >
            <Dialog
                :max-height="120"
                :dialogs="dialogs"
            />
        </v-col>

        <v-col
            cols="auto"
            class="w-100 pa-0 flex-grow-1 overflow-y-auto"
        >
            <template v-if="rankData.length">
                <RankCard
                    v-for="(data, i) in rankData"
                    :key="i"
                    :data="data"
                />
            </template>

            <template v-else>
                <p class="text-center">
                    目前還沒有人留下遺言。
                </p>
            </template>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { useRankStore } from '@/store/rank';

import RankCard from './components/RankCard.vue';

const rankStore = useRankStore();

const dialogs = DialogDataList[enumDialog.Rank];
const rankData = computed(() => rankStore.rankData);
</script>
