<template>
    <div class="rip" />
    <div class="bg" />

    <v-row class="w-100 ma-0 ga-3 flex-column pb-3">
        <v-col
            cols="auto"
            class="pa-0"
        >
            <Dialog :dialogs="dialogs" />
        </v-col>

        <v-col
            cols="auto"
            class="pa-0 mt-auto mb-3"
        >
            <!-- <v-data-table
                :headers="headers"
                :items="[player]"
                class="rounded-lg mb-3"
            >
                <template #bottom />
            </v-data-table> -->

            <p class="text-white mb-3">
                玩家姓名(10 字內)
            </p>
            <v-text-field
                v-model="playerName"
                type="text"
                class="bg-white rounded-xl pb-3 px-3 mb-3"
                variant="plain"
                hide-details
                placeholder="玩家姓名(10 字內)"
                persistent-placeholder
                @change="onPlayerNameChange"
            />

            <p class="text-white mb-3">
                留下遺言(20 字內)
            </p>
            <v-text-field
                v-model="lastWords"
                type="text"
                class="bg-white rounded-xl pb-3 px-3 mb-3"
                variant="plain"
                hide-details
                placeholder="留下遺言(20 字內)"
                @change="onLastWordsChange"
            />
        </v-col>

        <v-col
            cols="auto"
            class="pa-0"
        >
            <Btn
                :text="t('game_view.game_end.restart')"
                :func="restart"
            />
        </v-col>
    </v-row>
</template>
<script lang="ts" setup>
import {
    computed,
    ref,
} from 'vue';

import { useI18n } from 'vue-i18n';

import Btn from '@/components/system/Btn.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { useAppStore } from '@/store/app';
import { usePlayerStore } from '@/store/player';
import { useRankStore } from '@/store/rank';
import { Rank } from '@/types/rank';
import { createDate } from '@/utils/time';

const { t } = useI18n();
const dialogs = DialogDataList[enumDialog.GameOver];
const appStore = useAppStore();
const playerStore = usePlayerStore();
const player = computed(() => playerStore.currentPlayer!);
const rankStore = useRankStore();

// const headers = [
//     {
//         key: 'name',
//         title: t('game_view.game_end.name'),
//         value: (item: Player) => item.character.name,
//     },
// ];

/**
 * 玩家留下紀錄
 */
const playerName = ref('');
const lastWords = ref('');

const onPlayerNameChange = () => {
    const value = playerName.value.trim();

    if (value.length > 10) {
        playerName.value = value.substring(0, 10);
    } else {
        playerName.value = value;
    }
};

const onLastWordsChange = () => {
    const value = lastWords.value.trim();

    if (value.length > 20) {
        lastWords.value = value.substring(0, 20);
    } else {
        lastWords.value = value;
    }
};

const restart = async () => {
    const data: Rank = {
        endDate: createDate().toISOString(),
        playerName: playerName.value.length === 0 ? '匿名玩家' : playerName.value,
        player: player.value,
        lastWords: lastWords.value.length === 0 ? '走的太倉促，沒有留下遺言。' : lastWords.value,
    };

    appStore.switchSpinner(true);

    await rankStore.updateRankData(data);

    appStore.switchSpinner(false);
    window.location.reload();
};
</script>

<style lang="scss" scoped>
.bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #373c4d;
    z-index: -2;
}

.rip {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateY(-40px) scale(0.8);
    background-image: url('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHIyN2d4MDlpMnY4OTk4cjYwZDhneWltdHV0aWxxbXlibHg1endlYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FnhxsYbm63T5POxvTf/giphy.gif');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
}
</style>
