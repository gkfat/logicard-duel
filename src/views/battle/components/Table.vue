<template>
    <div class="position-relative fill-height">
        <v-card
            flat
            color="darkgreen"
            class="rounded-lg border-white border-lg border-opacity-50 fill-height mx-auto"
            :max-width="350"
        >
            <v-row class="ma-0 pa-1 align-center">
                <v-col cols="auto" class="pa-1">
                    {{ t(`battle.round_state.${roundPhase}`) }}
                </v-col>

                <!-- Clock -->
                <v-col cols="auto" class="pa-1 ml-auto">
                    <Countdown
                        v-if="isShowCountdown"
                        :remain-seconds="remainSeconds"
                    ></Countdown>
                </v-col>
            </v-row>

            <!-- 牌 -->
            <v-row class="ma-0 justify-center ga-3">
                <v-col cols="auto" class="pa-0">
                    <template v-if="table.opponentCard">
                        <Card
                            :card="table.opponentCard"
                            :is-card-back="!shouldOpenCard"
                            :show-detail="false"
                            :show-rarity="false"
                        ></Card>
                    </template>
                </v-col>

                <v-col cols="auto" class="pa-0">
                    <v-btn
                        flat
                        class="fill-height pa-0"
                        v-if="table.playerCard"
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
        </v-card>

        <!-- 牌堆 -->
        <div
            class="position-absolute"
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

/** 是否顯示倒數計時器 */
const isShowCountdown = computed(
    () => roundPhase.value === enumRoundPhase.Main
);
const remainSeconds = computed(() => battleStore.remainSeconds);
const shouldOpenCard = ref(false);

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
            await sleep(1000);
            shouldOpenCard.value = true;
        }

        if (roundPhase.value === enumRoundPhase.RoundEnd) {
            await sleep(1000);
            shouldOpenCard.value = false;
        }
    }
);
</script>
