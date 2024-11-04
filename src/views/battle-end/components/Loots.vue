<template>
    <p class="text-white mb-3">
        搜集戰利品
    </p>
    <v-row
        class="ma-0 ga-2 overflow-y-auto"
        :style="{
            maxHeight: '150px',
        }"
    >
        <!-- 經驗值 -->
        <ItemBox :size="'x-small'">
            <template #item>
                <p class="text-center">
                    Exp. {{ gainExp }}
                </p>
            </template>
        </ItemBox>

        <!-- 螺絲釘 -->
        <ItemBox :size="'x-small'">
            <template #item>
                <Coin
                    :point="backpack.coin"
                    :size="'x-small'"
                />
            </template>
        </ItemBox>

        <!-- 卡牌 -->
        <ItemBox
            v-for="(card, i) in backpack.cards"
            :key="i"
            :size="'x-small'"
        >
            <template #item>
                <Card
                    :ref="(el) => /** @ts-ignore */ (cardRefs[i] = el)"
                    :card="card"
                    :size="'x-small'"
                >
                    <template #actions>
                        <Btn
                            :text="'搜集'"
                            :func="() => collectCard(i)"
                        />
                    </template>
                </Card>
            </template>
        </ItemBox>

        <!-- 裝備 -->
        <ItemBox
            v-for="(equip, i) in backpack.equips"
            :key="i"
            :size="'x-small'"
        >
            <template #item>
                <Equip
                    :ref="(el) => /** @ts-ignore */ (equipRefs[i] = el)"
                    :equip="equip"
                    :position="equip.position"
                    :size="'x-small'"
                >
                    <template #actions>
                        <Btn
                            :text="'搜集'"
                            :func="() => collectEquip(i)"
                        />
                    </template>
                </Equip>
            </template>
        </ItemBox>
    </v-row>
</template>
<script lang="ts" setup>
import {
    computed,
    ref,
} from 'vue';

import Card from '@/components/card/Card.vue';
import Coin from '@/components/coin/Coin.vue';
import ItemBox from '@/components/common/ItemBox.vue';
import Equip from '@/components/equip/Equip.vue';
import Btn from '@/components/system/Btn.vue';
import { useOpponentStore } from '@/store/opponent';
import { usePlayerStore } from '@/store/player';
import { calcGainExp } from '@/utils/common';

const opponentStore = useOpponentStore();
const playerStore = usePlayerStore();
const backpack = computed(() => opponentStore.currentOpponent!.backpack);

const cardRefs = ref<(InstanceType<typeof Card> | null)[]>([]);
const equipRefs = ref<(InstanceType<typeof Equip> | null)[]>([]);

const gainExp = computed(() => calcGainExp(opponentStore.currentOpponent!));

const collectCard = (index: number) => {
    const getCard = backpack.value.cards[index];
    const getCardComponent = cardRefs.value[index];

    playerStore.collectCard(getCard);
    opponentStore.dropCard(getCard);

    getCardComponent?.toggleDialog(false);
};

const collectEquip = (index: number) => {
    const getEquip = backpack.value.equips[index];
    const getEquipComponent = equipRefs.value[index];

    playerStore.collectEquip(getEquip);
    opponentStore.dropEquip(getEquip);

    getEquipComponent?.toggleDialog(false);
};
</script>
