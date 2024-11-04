<template>
    <div class="position-relative">
        <v-card
            flat
            color="darkgreen"
            class="rounded-lg border-white border-lg border-opacity-50 fill-height mx-auto"
        >
            <v-card-text
                class="d-flex align-center justify-space-between"
                :style="{ height: '60px' }"
            >
                <p class="text-h6 text-skin">
                    {{ t(`battle.round_state.${roundPhase}`) }}
                </p>
                <Countdown
                    v-if="isShowCountdown"
                    :remain-seconds="remainSeconds"
                />
            </v-card-text>

            <!-- 牌 -->
            <v-card-text
                class="py-1"
                :style="{ height: '130px' }"
            >
                <v-row class="ma-0 justify-center">
                    <v-col
                        cols="5"
                        class="pa-0 d-flex justify-center"
                    >
                        <Card
                            v-if="table.opponentCard"
                            :card="table.opponentCard"
                            :is-card-back="!shouldDuel"
                            :show-detail="false"
                            :show-rarity="false"
                        />

                        <v-card
                            v-else
                            flat
                            class="bg-transparent"
                            :width="80"
                            :height="120"
                        >
                            <v-card-title class="text-wrap">
                                赤手空拳
                            </v-card-title>
                        </v-card>
                    </v-col>

                    <v-col
                        cols="5"
                        class="pa-0 d-flex justify-center"
                    >
                        <v-btn
                            v-if="table.playerCard"
                            flat
                            class="pa-0 bg-transparent fill-height d-flex justify-center"
                            @click="playerStore.recallCard"
                        >
                            <Card
                                :card="table.playerCard"
                                :show-detail="false"
                                :show-rarity="false"
                            />
                        </v-btn>

                        <v-card
                            v-else
                            flat
                            class="bg-transparent"
                            :width="80"
                            :height="120"
                        >
                            <v-card-title class="text-wrap">
                                赤手空拳
                            </v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>

            <!-- 局系統文字 -->
            <v-card-text
                class="py-1"
                :style="{ height: '70px', minHeight: '70px' }"
            >
                <!-- 無牌可發 -->
                <template v-if="emptyBackpack">
                    <p>背包沒有牌了。接下來用拳頭吧。</p>
                </template>

                <!-- 決鬥 -->
                <template v-if="shouldDuel">
                    <p v-if="playerAttempt === enumEffect.Harm">
                        你發起
                        <em class="text-amber">{{
                            playerRoundStatus.attack
                        }}</em>
                        的攻擊！敵人受到了
                        <em class="text-amber">{{ opponentDeduction }}</em>
                        點傷害。
                    </p>
                    <p v-if="opponentAttempt === enumEffect.Defense">
                        敵人採取防禦。
                    </p>

                    <p v-if="opponentAttempt === enumEffect.Harm">
                        敵人發起
                        <em class="text-amber">{{
                            opponentRoundStatus.attack
                        }}</em>
                        的攻擊！你受到了
                        <em class="text-amber">{{ playerDeduction }}</em>
                        點傷害。
                    </p>
                    <p v-if="playerAttempt === enumEffect.Defense">
                        你採取防禦。
                    </p>

                    <p
                        v-if="
                            playerAttempt === enumEffect.Defense &&
                                opponentAttempt === enumEffect.Defense
                        "
                    >
                        本回合沒有任何人類或機器人受到傷害。
                    </p>
                </template>
            </v-card-text>
        </v-card>

        <!-- 倒數計時 -->
        <div
            class="position-absolute"
            :style="{
                right: '10px',
                top: '10px',
            }"
        />

        <!-- 牌堆 -->
        <div
            class="position-absolute d-flex justify-center align-center"
            :style="{
                right: '-10px',
                bottom: '-15px',
            }"
        >
            <CardStack />
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    computed, ref, watch, 
} from 'vue';

import { useI18n } from 'vue-i18n';

import Card from '@/components/card/Card.vue';
import { enumRoundPhase } from '@/enums/battle';
import { enumEffect } from '@/enums/effect';
import { useBattleStore } from '@/store/battle';
import { useOpponentStore } from '@/store/opponent';
import { usePlayerStore } from '@/store/player';
import { sleepSeconds } from '@/utils/common';

import CardStack from './CardStack.vue';
import Countdown from './Countdown.vue';

const { t } = useI18n();
const battleStore = useBattleStore();
const playerStore = usePlayerStore();
const opponentStroe = useOpponentStore();

const roundPhase = computed(() => battleStore.roundPhase);

interface RoundStatus {
    attack: number;
    defense: number;
}

const {
    playerRoundStatus, opponentRoundStatus, 
} = defineProps<{
    playerRoundStatus: RoundStatus;
    opponentRoundStatus: RoundStatus;
}>();

const playerAttempt = computed(() => battleStore.playerAttempt);
const opponentAttempt = computed(() => battleStore.opponentAttempt);

const playerDeduction = computed(() => opponentRoundStatus.attack - playerRoundStatus.defense);

const opponentDeduction = computed(() => playerRoundStatus.attack - opponentRoundStatus.defense);

/** 是否顯示倒數計時器 */
const isShowCountdown = computed(() => roundPhase.value === enumRoundPhase.Main);
const remainSeconds = computed(() => battleStore.remainSeconds);

/** 是否對決 */
const shouldDuel = ref(false);

const emptyBackpack = computed(() => {
    return roundPhase.value === enumRoundPhase.Draw && playerStore.currentPlayer?.backpack.cards.length === 0;
});

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
            await sleepSeconds(2.5);
            shouldDuel.value = true;
        }

        if (roundPhase.value === enumRoundPhase.Settle) {
            shouldDuel.value = false;
        }
    },
);
</script>
