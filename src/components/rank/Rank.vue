<template>
    <v-bottom-sheet v-model="isOpen" height="90vh">
        <v-card color="skin" class="fill-height rounded-t-xl">
            <v-row class="ma-0 pa-3 ga-3">
                <Dialog :max-height="150" :dialogs="dialogs" />

                <v-col
                    cols="auto"
                    class="pa-0 mx-auto"
                    :style="{
                        width: '100%',
                        maxWidth: '500px',
                    }"
                >
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
                                        <v-col cols="3"> 成佛日期 </v-col>
                                        <v-col cols="9" class="text-primary">
                                            {{ humanReadable(data.endDate) }}
                                        </v-col>

                                        <v-col cols="3"> 玩家名稱 </v-col>
                                        <v-col cols="9" class="text-primary">
                                            {{ data.playerName }}
                                        </v-col>

                                        <v-col cols="3"> 遺言 </v-col>
                                        <v-col cols="9" class="text-primary">
                                            {{ data.lastWords }}
                                        </v-col>

                                        <v-col cols="3"> 角色 </v-col>
                                        <v-col cols="9" class="text-primary">
                                            {{ data.player.character.name }}
                                            <PlayerAvatar
                                                :character="
                                                    data.player.character
                                                "
                                            ></PlayerAvatar>
                                        </v-col>

                                        <v-col cols="3"> 戰鬥場數 </v-col>
                                        <v-col cols="9" class="text-primary">
                                            {{ data.player.records.length }}
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
                <Btn :text="t('button.close_rank')" :func="closeRank" />
            </v-card-actions>
        </v-card>
    </v-bottom-sheet>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useI18n } from 'vue-i18n';

import PlayerAvatar from '@/components/common/PlayerAvatar.vue';
import Btn from '@/components/system/Btn.vue';
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

// 關閉排行榜
const closeRank = async () => {
    appStore.closeDialog();
};
</script>
