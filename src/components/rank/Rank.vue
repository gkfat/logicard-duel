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

                <v-col cols="auto" class="py-0 mb-3">
                    <Btn
                        :text="'要不...自盡吧？'"
                        :size="'small'"
                        :func="() => openConfirmBox()"
                    />
                </v-col>

                <v-col
                    cols="auto"
                    class="w-100 py-0 flex-grow-1 overflow-y-auto"
                    :style="{ minHeight: '0', maxHeight: '55%' }"
                >
                    <template v-if="rankData.length">
                        <RankCard
                            v-for="(data, i) in rankData"
                            :key="i"
                            :data="data"
                        />
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

    <ConfirmBox
        ref="confirmBoxRef"
        :message="'確定要自盡？此路一去不回頭'"
        :func="goGameOver"
    />
</template>

<script setup lang="ts">
import {
    computed,
    ref,
} from 'vue';

import { useI18n } from 'vue-i18n';

import Btn from '@/components/system/Btn.vue';
import ConfirmBox from '@/components/system/ConfirmBox.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';
import { useRankStore } from '@/store/rank';

import RankCard from './components/RankCard.vue';

const { t } = useI18n();
const appStore = useAppStore();
const rankStore = useRankStore();
const isOpen = computed(() => appStore.isOpen === 'rank');

const dialogs = DialogDataList[enumDialog.Rank];
const rankData = computed(() => rankStore.rankData);
const confirmBoxRef = ref<typeof ConfirmBox>();

// 關閉排行榜
const closeRank = async() => {
    appStore.closeDialog();
};

const openConfirmBox = () => {
    confirmBoxRef.value?.show();
};

const goGameOver = () => {
    appStore.changeGameState(enumGameState.GameOver);
};
</script>
