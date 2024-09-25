<template>
    <div class="position-relative fill-height">
        <v-card
            flat
            color="darkgreen"
            class="rounded-lg border-white border-lg border-opacity-50 fill-height mx-auto"
        >
            <v-card-text class="py-1">
                {{ t(`battle.round_state.${roundPhase}`) }}
            </v-card-text>

            <!-- 數值計算 -->
            <v-card-text class="py-0" v-if="shouldDuel">
                <em class="text-caption">{{
                    `玩家攻擊力(${playerRoundStatus.attack}) - 敵人防禦力(${opponentRoundStatus.defense}) = `
                }}</em>
                <em class="text-skin">{{ playerDeduction }}</em>
                <br />
                <em class="text-caption">{{
                    `敵人攻擊力(${opponentRoundStatus.attack}) - 玩家防禦力(${playerRoundStatus.defense}) = `
                }}</em>
                <em class="text-red">{{ opponentDeduction }}</em>
            </v-card-text>

            <!-- 牌 -->
            <v-card-text>
                <v-row class="ma-0 justify-center">
                    <v-col
                        cols="5"
                        class="pa-0 d-flex justify-center align-center"
                    >
                        <Card
                            v-if="table.opponentCard"
                            :card="table.opponentCard"
                            :is-card-back="!shouldDuel"
                            :show-detail="false"
                            :show-rarity="false"
                        ></Card>
                    </v-col>

                    <v-col
                        cols="5"
                        class="pa-0 d-flex justify-center align-center"
                    >
                        <v-btn
                            v-if="table.playerCard"
                            flat
                            class="pa-0 bg-transparent fill-height d-flex justify-center align-center"
                            @click="playerStore.recallCard"
                        >
                            <Card
                                :card="table.playerCard"
                                :show-detail="false"
                                :show-rarity="false"
                            ></Card>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!-- 倒數計時 -->
        <div
            class="position-absolute"
            :style="{
                right: '10px',
                top: '10px',
            }"
        >
            <Countdown
                v-if="isShowCountdown"
                :remain-seconds="remainSeconds"
            ></Countdown>
        </div>

        <!-- 牌堆 -->
        <div
            class="position-absolute d-flex justify-center align-center"
            :style="{
                right: 0,
                bottom: '-15px',
            }"
        >
            <CardStack></CardStack>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

import { useI18n } from 'vue-i18n';

import Card from '@/components/card/Card.vue';
import { enumRoundPhase } from '@/enums/battle';
import { useBattleStore } from '@/store/battle';
import { useOpponentStore } from '@/store/opponent';
import { usePlayerStore } from '@/store/player';
import { sleep } from '@/utils/common';

import CardStack from './CardStack.vue';
import Countdown from './Countdown.vue';

const { t } = useI18n();
const battleStore = useBattleStore();

const roundPhase = computed(() => battleStore.roundPhase);

interface RoundStatus {
    attack: number;
    defense: number;
}

const { playerRoundStatus, opponentRoundStatus } = defineProps<{
    playerRoundStatus: RoundStatus;
    opponentRoundStatus: RoundStatus;
}>();

const playerDeduction = computed(
    () => playerRoundStatus.attack - opponentRoundStatus.defense
);

const opponentDeduction = computed(
    () => opponentRoundStatus.attack - playerRoundStatus.defense
);

/** 是否顯示倒數計時器 */
const isShowCountdown = computed(
    () => roundPhase.value === enumRoundPhase.Main
);
const remainSeconds = computed(() => battleStore.remainSeconds);

/** 是否對決 */
const shouldDuel = ref(false);

const playerStore = usePlayerStore();
const opponentStroe = useOpponentStore();

const table = computed(() => {
    const playerCard = playerStore.tableCard;
    const opponentCard = opponentStroe.tableCard;

    return {
        playerCard,
        opponentCard,
    };
});

watch(
    () => roundPhase.value,
    async () => {
        if (roundPhase.value === enumRoundPhase.Duel) {
            await sleep(1500);
            shouldDuel.value = true;
        }

        if (roundPhase.value === enumRoundPhase.RoundEnd) {
            await sleep(500);
            shouldDuel.value = false;
        }
    }
);
</script>
