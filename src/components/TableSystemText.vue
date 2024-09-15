<template>
    <!-- 局規則 -->
    <template v-if="roundState === enumRoundState.Start && parentProps.rule === -1">
        【{{ t('battle.rule._1') }}】
    </template>

    <template v-if="roundState > enumRoundState.Start">
        <template v-if="parentProps.rule === 0">
            【{{ t('battle.rule.0') }}】
        </template>
        <template v-if="parentProps.rule === 1">
            【{{ t('battle.rule.1') }}】
        </template>
    </template>

    <!-- 局狀態 -->
    <template v-if="roundState === enumRoundState.Start">
        {{ t('battle.round_state.0') }}
    </template>
    <template v-if="roundState === enumRoundState.Counting">
        {{ countDownRemainSec }} {{ t('sec') }}
    </template>
    <template v-if="roundState === enumRoundState.Duel">
        {{ t('battle.round_state.2') }}
    </template>

    <!-- 局結果 -->
    <template v-if="roundState >= enumRoundState.Settle">
        {{ t('battle.result.' + parentProps.result) }}
    </template>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import { enumRoundState } from '@/types/enums';

const { t } = useI18n();

const parentProps = defineProps<{
    rule?: number;
    result: number;
    roundState: enumRoundState;
    countDownRemainSec: number;
}>();
</script>
