<template>
    <v-col cols="12" class="pa-0 align-self-stretch">
        <Dialog :dialogs="dialog" />
    </v-col>

    <v-col cols="12">
        <v-data-table
            :headers="headers"
            :items="[player]"
            class="rounded-lg mb-3"
        >
            <template #bottom />
        </v-data-table>

        <v-text-field
            v-model="lastWords"
            type="text"
            variant="outlined"
            class="bg-white rounded mb-3"
            hide-details
            :placeholder="t('game_view.game_end.leave_message')"
        />
    </v-col>

    <v-col cols="12" class="align-self-end">
        <BtnText :text="t('game_view.game_end.restart')" :func="restart" />
    </v-col>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

import { useI18n } from 'vue-i18n';

import BtnText from '@/components/system/BtnText.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data';
import { enumDialog, enumOperation, enumSheetName } from '@/enums/game';
import Util from '@/service/util';
import { usePlayerStore, useRankStore, useSwitchToggleStore } from '@/store';
import { Game } from '@/types';

const { t } = useI18n();
const dialog = DialogDataList[enumDialog.GameOver];
const switchToggleStore = useSwitchToggleStore();
const playerStore = usePlayerStore();
const player = computed<Game.Player>(() => playerStore.player);
const rankStore = useRankStore();

const headers = [
    {
        key: 'name',
        title: t('game_view.game_end.name'),
        value: (item: Game.Player) => item.Character?.Name,
    },
    {
        key: 'total_damage',
        title: t('game_view.game_end.total_damage'),
        value: (item: Game.Player) => item.Record.TotalDamage,
    },
    {
        key: 'total_heal',
        title: t('game_view.game_end.total_heal'),
        value: (item: Game.Player) => item.Record.TotalHeal,
    },
    {
        key: 'defeat_bots',
        title: t('game_view.game_end.defeat_bots'),
        value: (item: Game.Player) => item.Record.DefeatBots,
    },
    {
        key: 'survival_time',
        title: t('game_view.game_end.survival_time'),
        value: (item: Game.Player) =>
            `${item.Record.SurvivalTime} ${t('game_view.game_end.hour')}`,
    },
];

/**
 * 玩家留下紀錄
 */
const lastWords = ref('');
watch(lastWords, () => {
    lastWords.value = lastWords.value.trim();
    if (lastWords.value.length > 20) {
        lastWords.value = lastWords.value.substring(0, 20);
    }
});

const restart = async () => {
    const finalLastWords =
        lastWords.value.length === 0
            ? '走的太倉促，沒有留下遺言。'
            : lastWords.value;
    switchToggleStore.switchSpinner(true);
    const data = {
        EndTime: Util.getCurrentDate(),
        Character: player.value.Character!.Name,
        TotalDamage: player.value.Record.TotalDamage,
        TotalHeal: player.value.Record.TotalHeal,
        DefeatBots: player.value.Record.DefeatBots,
        SurvivalTime: `${player.value.Record.SurvivalTime} 小時`,
        LastWords: finalLastWords,
    };
    await rankStore.updateData(
        enumSheetName.Records,
        enumOperation.Update,
        data
    );
    Util.sleep(1000);
    switchToggleStore.switchSpinner(false);
    window.location.reload();
};
</script>
