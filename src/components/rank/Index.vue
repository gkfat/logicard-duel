<template>
    <BtnIcon
        :icon="'mdi-script-text'"
        :func="openRank"
    />

    <v-bottom-sheet
        v-model="switchToggleStore.rankOpen"
        height="90vh"
    >
        <v-card
            color="skin"
            class="fill-height rounded-t-xl"
        >
            <v-row class="ma-0 pa-3 ga-3">
                <Dialog
                    :max-height="150"
                    :dialogs="dialogs"
                />

                <v-col
                    cols="12"
                    class="pa-0 mx-auto"
                >
                    <v-carousel
                        v-if="rankStore.rankList.length > 0"
                        :height="300"
                        hide-delimiters
                        show-arrows="hover"
                    >
                        <v-carousel-item
                            v-for="(data, i) in rankStore.rankList"
                            :key="i"
                        >
                            <v-card
                                class="rounded"
                                color="darkgrey rounded-lg"
                            >
                                <v-card-text>
                                    <v-row class="ma-0">
                                        <v-col
                                            cols="3"
                                            class="pa-1"
                                        >
                                            成佛日期
                                        </v-col>
                                        <v-col
                                            cols="9"
                                            class="pa-1 text-primary"
                                        >
                                            {{ toDate(data.time) }}
                                        </v-col>

                                        <v-col
                                            cols="3"
                                            class="pa-1"
                                        >
                                            存活時長
                                        </v-col>
                                        <v-col
                                            cols="9"
                                            class="pa-1 text-primary"
                                        >
                                            {{ data.live_time }}
                                        </v-col>

                                        <v-col
                                            cols="3"
                                            class="pa-1"
                                        >
                                            角色
                                        </v-col>
                                        <v-col
                                            cols="9"
                                            class="pa-1 text-primary"
                                        >
                                            {{ data.character }}
                                        </v-col>

                                        <v-col
                                            cols="3"
                                            class="pa-1"
                                        >
                                            總攻擊量
                                        </v-col>
                                        <v-col
                                            cols="9"
                                            class="pa-1 text-primary"
                                        >
                                            {{ data.attack }}
                                        </v-col>
                                        <v-col
                                            cols="3"
                                            class="pa-1"
                                        >
                                            總治療量
                                        </v-col>
                                        <v-col
                                            cols="9"
                                            class="pa-1 text-primary"
                                        >
                                            {{ data.heal }}
                                        </v-col>
                                        <v-col
                                            cols="3"
                                            class="pa-1"
                                        >
                                            總擊殺數
                                        </v-col>
                                        <v-col
                                            cols="9"
                                            class="pa-1 text-primary"
                                        >
                                            {{ data.kill }}
                                        </v-col>
                                        <v-col
                                            cols="3"
                                            class="pa-1"
                                        >
                                            遺言
                                        </v-col>
                                        <v-col
                                            cols="9"
                                            class="pa-1 text-primary"
                                        >
                                            {{ data.comment }}
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-carousel-item>
                    </v-carousel>

                    <p
                        v-else
                        class="text-center"
                    >
                        目前還沒有人留下遺言。
                    </p>
                </v-col>
            </v-row>
            <v-card-actions class="pa-3">
                <BtnText
                    :text="t('button.close_rank')"
                    :func="closeRank"
                />
            </v-card-actions>
        </v-card>
    </v-bottom-sheet>
</template>

<script setup name="Rank" lang="ts">
import moment from 'moment';
import { useI18n } from 'vue-i18n';

import BtnIcon from '@/components/system/BtnIcon.vue';
import BtnText from '@/components/system/BtnText.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/index';
import { enumDialog } from '@/enums/game';
import {
    useRankStore,
    useSwitchToggleStore,
} from '@/store';

const { t } = useI18n();
const switchToggleStore = useSwitchToggleStore();
const rankStore = useRankStore();

const dialogs = DialogDataList[enumDialog.Rank];

const toDate = (val: string | number) => moment(val).locale('zh').format('YYYY-MM-DD HH:mm');

const openRank = async () => {
    switchToggleStore.toggle('rank');
};

// 關閉排行榜
const closeRank = async () => {
    switchToggleStore.toggle('rank');
};
</script>

<style lang="scss" scoped>

</style>
