<template>
    <v-card
        flat
        color="bluegrey"
        class="border-white border-lg rounded-lg border-opacity-75 mb-3"
    >
        <v-card-text class="pa-3">
            <v-row class="ma-0 ga-3 mb-3">
                <v-col
                    cols="auto"
                    class="pa-0"
                >
                    <PlayerAvatar :character="player.character" />
                </v-col>

                <v-col
                    cols="auto"
                    class="flex-grow-1 pa-0"
                >
                    <p>Lv. <span class="text-darkamber text-h6">{{ player.status.level }}</span></p>
                    <div class="d-flex align-center ga-3">
                        Exp. <ProgressExp :player="player" />
                    </div>
                </v-col>
            </v-row>

            <v-row>
                <v-col class="d-flex flex-wrap ga-3">
                    <!-- 錢 -->
                    <v-col
                        cols="12"
                        class="pa-0 d-flex align-center ga-3"
                    >
                        <IconCoin />
                        {{ thousands(player.backpack.coin) }}
                    </v-col>
                    <!-- 生命值 -->
                    <v-col
                        cols="12"
                        class="pa-0 d-flex align-center ga-3"
                    >
                        <IconHeal />
                        {{ thousands(player.status.health) }}/{{ thousands(player.status.maxHealth) }}
                    </v-col>
                </v-col>

                <v-col class="d-flex flex-wrap ga-3">
                    <!-- 背包 -->
                    <v-col
                        cols="12"
                        class="pa-0 d-flex align-center ga-3"
                    >
                        <IconBackpack />
                        {{ currentBackpackItems }}/{{ player.character.backpackLimit }}
                    </v-col>
                    <!-- 攻擊力 -->
                    <v-col
                        cols="12"
                        class="pa-0 d-flex align-center ga-3"
                    >
                        <IconAttack />
                        {{ player.status.attack }}
                        <em
                            v-if="extraStatus.attack"
                            class="text-darkamber"
                        >
                            (+{{ extraStatus.attack }})
                        </em>
                    </v-col>
                </v-col>

                <v-col class="d-flex flex-wrap ga-3">
                    <!-- 卡牌數量 -->
                    <v-col
                        cols="12"
                        class="pa-0 d-flex align-center ga-3"
                    >
                        <IconPokerCard />
                        {{ player.backpack.cards.length }}
                    </v-col>
                    <!-- 防禦力 -->
                    <v-col
                        cols="12"
                        class="pa-0 d-flex align-center ga-3"
                    >
                        <IconDefense />
                        {{ player.status.defense }}
                        <em
                            v-if="extraStatus.defense"
                            class="text-darkamber"
                        >
                            (+{{ extraStatus.defense }})
                        </em>
                    </v-col>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import {
    computed,
    onMounted,
} from 'vue';

import PlayerAvatar from '@/components/common/PlayerAvatar.vue';
import IconAttack from '@/components/icons/IconAttack.vue';
import IconBackpack from '@/components/icons/IconBackpack.vue';
import IconCoin from '@/components/icons/IconCoin.vue';
import IconDefense from '@/components/icons/IconDefense.vue';
import IconHeal from '@/components/icons/IconHeal.vue';
import IconPokerCard from '@/components/icons/IconPokerCard.vue';
import { useOpponentStore } from '@/store/opponent';
import { usePlayerStore } from '@/store/player';
import { calcGainExp } from '@/utils/common';
import { thousands } from '@/utils/number';

import ProgressExp from './ProgressExp.vue';

const playerStore = usePlayerStore();
const opponentStore = useOpponentStore();

const player = computed(() => playerStore.currentPlayer!);
const extraStatus = computed(() => playerStore.extraStatus);

const currentBackpackItems = computed(() => {
    const result = player.value.backpack.cards.length + player.value.backpack.equips.length;

    return result;
});

onMounted(async () => {
    const getOpponent = opponentStore.currentOpponent;

    if (getOpponent) {
        const exp = calcGainExp(getOpponent);
        await playerStore.gainExp(exp);
    }
});
</script>
