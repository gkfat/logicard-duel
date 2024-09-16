<template>
    <BtnIcon :icon="'mdi-script-text'" :func="openRank" />

    <v-bottom-sheet v-model="isOpen" height="90vh">
        <v-card color="skin" class="fill-height rounded-t-xl">
            <v-row class="ma-0 pa-3 ga-3">
                <Dialog :max-height="150" :dialogs="dialogs" />

                <v-col cols="12" class="pa-0 mx-auto">
                    <v-carousel
                        v-if="rankStore.rankData.length > 0"
                        :height="300"
                        hide-delimiters
                        show-arrows="hover"
                    >
                        <v-carousel-item
                            v-for="(data, i) in rankStore.rankData"
                            :key="i"
                        >
                            <v-card class="rounded" color="darkgrey rounded-lg">
                                <v-card-text>
                                    <v-row>
                                        <!-- 成佛日期 -->
                                        <v-col cols="3"> 成佛日期 </v-col>
                                        <v-col cols="9" class="text-primary">
                                            {{ humanReadable(data.endDate) }}
                                        </v-col>

                                        <!-- 玩家名稱 -->
                                        <v-col cols="3"> 玩家名稱 </v-col>
                                        <v-col cols="9" class="text-primary">
                                            {{ data.playerName }}
                                        </v-col>

                                        <!-- 遺言 -->
                                        <v-col cols="3"> 遺言 </v-col>
                                        <v-col cols="9" class="text-primary">
                                            {{ data.lastWords }}
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-carousel-item>
                    </v-carousel>

                    <p v-else class="text-center">目前還沒有人留下遺言。</p>
                </v-col>
            </v-row>
            <v-card-actions class="pa-3">
                <BtnText :text="t('button.close_rank')" :func="closeRank" />
            </v-card-actions>
        </v-card>
    </v-bottom-sheet>
</template>

<script setup name="Rank" lang="ts">
import { computed } from 'vue';

import { useI18n } from 'vue-i18n';

import BtnIcon from '@/components/system/BtnIcon.vue';
import BtnText from '@/components/system/BtnText.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { useAppStore } from '@/store/app';
import { useRankStore } from '@/store/rank';
import { humanReadable } from '@/utils/time';

const { t } = useI18n();
const appStore = useAppStore();
const rankStore = useRankStore();
const isOpen = computed(() => appStore.isOpen === 'rank');

const dialogs = DialogDataList[enumDialog.Rank];

const openRank = async () => {
    appStore.openDialog('rank');
};

// 關閉排行榜
const closeRank = async () => {
    appStore.closeDialog();
};
</script>
