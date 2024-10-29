<template>
    <v-bottom-sheet v-model="isOpen" height="90vh">
        <v-card color="skin" class="fill-height rounded-t-xl">
            <v-row
                class="ma-0 fill-height flex-column flex-nowrap mx-auto overflow-hidden"
                :style="{ maxWidth: '500px', maxHeight: '95vh' }"
            >
                <v-col cols="auto" class="w-100">
                    <Dialog :max-height="120" :dialogs="dialogs" />
                </v-col>

                <v-col
                    cols="auto"
                    class="w-100 py-0 flex-grow-1 overflow-y-auto"
                    :style="{ minHeight: '0', maxHeight: '60%' }"
                >
                    <template v-if="rankData.length">
                        <RankCard
                            v-for="(data, i) in rankData"
                            :key="i"
                            :data="data"
                        ></RankCard>
                    </template>

                    <template v-else>
                        <p class="text-center">目前還沒有人留下遺言。</p>
                    </template>
                </v-col>

                <v-col cols="auto" class="w-100 mt-auto">
                    <Btn :text="t('button.close_rank')" :func="closeRank" />
                </v-col>
            </v-row>
        </v-card>
    </v-bottom-sheet>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useI18n } from 'vue-i18n';

import Btn from '@/components/system/Btn.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { useAppStore } from '@/store/app';
import { useRankStore } from '@/store/rank';

import RankCard from './components/RankCard.vue';

const { t } = useI18n();
const appStore = useAppStore();
const rankStore = useRankStore();
const isOpen = computed(() => appStore.isOpen === 'rank');

const dialogs = DialogDataList[enumDialog.Rank];
const rankData = computed(() => rankStore.rankData);

// 關閉排行榜
const closeRank = async() => {
    appStore.closeDialog();
};
</script>
