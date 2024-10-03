<template>
    <p class="text-white mb-3">背包</p>
    <v-row
        class="ma-0 ga-2 overflow-y-auto"
        :style="{
            maxHeight: '150px',
        }"
    >
        <!-- 卡牌 -->
        <ItemBox v-for="(card, i) in backpack.cards" :key="i" :size="'x-small'">
            <template #item>
                <Card
                    :ref="(el) => /** @ts-ignore */ (cardRefs[i] = el)"
                    :card="card"
                    :size="'x-small'"
                >
                    <template #actions>
                        <Btn :text="'丟棄'" :func="() => dropCard(i)"></Btn>
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
                    :show-is-equiped="true"
                >
                    <template #actions>
                        <Btn :text="'丟棄'" :func="() => dropEquip(i)"></Btn>
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
import ItemBox from '@/components/common/ItemBox.vue';
import Equip from '@/components/equip/Equip.vue';
import Btn from '@/components/system/Btn.vue';
import { useOpponentStore } from '@/store/opponent';
import { usePlayerStore } from '@/store/player';

const playerStore = usePlayerStore();
const opponentStore = useOpponentStore();
const backpack = computed(() => playerStore.currentPlayer!.backpack);

const cardRefs = ref<(InstanceType<typeof Card> | null)[]>([]);
const equipRefs = ref<(InstanceType<typeof Equip> | null)[]>([]);

const dropCard = (index: number) => {
    const getCard = backpack.value.cards[index];
    const getCardComponent = cardRefs.value[index];

    playerStore.dropCard(getCard);
    opponentStore.collectCard(getCard);

    getCardComponent?.toggleDialog(false);
};

const dropEquip = (index: number) => {
    const getEquip = backpack.value.equips[index];
    const getEquipComponent = equipRefs.value[index];

    playerStore.dropEquip(getEquip);
    opponentStore.collectEquip(getEquip);

    getEquipComponent?.toggleDialog(false);
};
</script>
