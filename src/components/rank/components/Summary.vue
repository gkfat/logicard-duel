<template>
    <v-row class="ma-0">
        <v-col
            cols="4"
            class="pa-0"
        >
            總使用卡牌
        </v-col>
        <v-col
            cols="auto"
            class="pa-0 text-amber"
        >
            {{
                thousands(summary.totalCardsUsed)
            }}
        </v-col>
    </v-row>
    <v-row class="ma-0">
        <v-col
            cols="4"
            class="pa-0"
        >
            總擊敗對手
        </v-col>
        <v-col
            cols="auto"
            class="pa-0 text-amber"
        >
            {{
                thousands(summary.totalBattles)
            }}
        </v-col>
    </v-row>
    <v-row class="ma-0">
        <v-col
            cols="4"
            class="pa-0"
        >
            總傷害量
        </v-col>
        <v-col
            cols="auto"
            class="pa-0 text-amber"
        >
            {{
                thousands(summary.totalHarm)
            }}
        </v-col>
    </v-row>
    <v-row class="ma-0">
        <v-col
            cols="4"
            class="pa-0"
        >
            總防禦量
        </v-col>
        <v-col
            cols="auto"
            class="pa-0 text-amber"
        >
            {{
                thousands(summary.totalDefense)
            }}
        </v-col>
    </v-row>
    <v-row class="ma-0">
        <v-col
            cols="4"
            class="pa-0"
        >
            總受傷害量
        </v-col>
        <v-col
            cols="auto"
            class="pa-0 text-amber"
        >
            {{
                thousands(summary.totalDamaged)
            }}
        </v-col>
    </v-row>
    <v-row class="ma-0">
        <v-col
            cols="4"
            class="pa-0"
        >
            總治療量
        </v-col>
        <v-col
            cols="auto"
            class="pa-0 text-amber"
        >
            {{
                thousands(summary.totalHeal)
            }}
        </v-col>
    </v-row>
</template>
<script lang="ts" setup>
import { thousands } from '@/utils/number';

const { summary } = defineProps<{
    summary: {
        totalBattles: number;
        totalHarm: number;
        totalDamaged: number;
        totalDefense: number;
        totalHeal: number;
        totalCardsUsed: number;
    };
}>();
</script>
