<template>
    <v-card flat class="bg-transparent mb-3">
        <PlayerAvatar :character="record.opponent.character"/>
        <p class="my-3">
            對手 {{ record.id }}
            <span class="text-amber mx-1">
                {{ record.opponent.character.name }}
            </span>
        </p>
        <v-row class="ma-0 mb-3">
            <v-col cols="12" class="pa-0">
                <span>戰鬥時長</span>
                <span class="text-amber mx-1">{{ getDurationTime }}</span>
            </v-col>
            <v-col cols="12" class="pa-0">
                <span>使用卡牌</span>
                <span class="text-amber mx-1">{{ record.cardsUsed }}</span>
                <span>，總傷害</span>
                <span class="text-amber mx-1">{{ record.harm }}</span>
            </v-col>
            <v-col cols="12" class="pa-0">
                <span>總防禦</span>
                <span class="text-amber mx-1">{{ record.defense }}</span>
                <span>，總受到傷害</span>
                <span class="text-amber mx-1">{{ record.damaged }}</span>
            </v-col>
        </v-row>

        <v-divider/>
    </v-card>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import PlayerAvatar from '@/components/common/PlayerAvatar.vue';
import { GameRecord } from '@/types/player';
import { createDate, humanReadableSeconds } from '@/utils/time';

const { record } = defineProps<{
    record: GameRecord;
}>();

const getDurationTime = computed(() => {
    const startDate = createDate(record.battleStartAt);
    const endDate = createDate(record.battleEndAt);
    const diffSeconds = endDate.diff(startDate, 'seconds');
    return humanReadableSeconds(diffSeconds);
});
</script>
