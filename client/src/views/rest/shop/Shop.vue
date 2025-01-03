<template>
    <v-row class="w-100 ma-0 ga-3 flex-column pb-3">
        <v-col
            cols="auto"
            class="pa-0 w-100"
        >
            <Dialog
                :max-height="120"
                :dialogs="dialogs"
            />
        </v-col>

        <v-col
            cols="auto"
            class="pa-0 w-100 d-flex justify-space-between align-center"
        >
            <p class="text-white">
                商店更新：{{
                    humanReadableSeconds(shopStore.remainSeconds)
                }}
            </p>
            <CoinStatus />
        </v-col>

        <v-col
            cols="auto"
            class="pa-0 w-100 overflow-y-auto flex-grow-1"
            :style="{
                height: getHeight
            }"
        >
            <v-tabs-window v-model="displayType">
                <!-- 裝備 -->
                <v-tabs-window-item value="0">
                    <v-row class="ma-0 justify-center flex-wrap ga-3">
                        <v-col
                            v-for="(equip, i) in equips"
                            :key="i"
                            cols="auto"
                            class="pa-0"
                        >
                            <ItemBox>
                                <template #item>
                                    <Equip
                                        :ref="(el) => (equipRefs[i] = el)"
                                        :equip="equip"
                                        :position="equip.position"
                                        :size="'small'"
                                    >
                                        <template #actions>
                                            <Btn
                                                :text="
                                                    afordable(
                                                        equip.info.price
                                                    )
                                                        ? '買入'
                                                        : '付不起...'
                                                "
                                                :disabled="
                                                    !afordable(
                                                        equip.info.price
                                                    )
                                                "
                                                :func="() => buyEquip(i)"
                                            />
                                        </template>
                                    </Equip>
                                </template>
                                <template #price>
                                    <PriceTag
                                        :price="equip.info.price"
                                    />
                                </template>
                            </ItemBox>
                        </v-col>
                    </v-row>
                </v-tabs-window-item>

                <!-- 卡牌 -->
                <v-tabs-window-item value="1">
                    <v-row class="ma-0 justify-center flex-wrap ga-3">
                        <v-col
                            v-for="(card, i) in cards"
                            :key="i"
                            cols="auto"
                            class="pa-0"
                        >
                            <ItemBox>
                                <template #item>
                                    <Card
                                        :ref="(el) => (cardRefs[i] = el)"
                                        :card="card"
                                        :size="'small'"
                                    >
                                        <template #actions>
                                            <Btn
                                                :text="
                                                    afordable(
                                                        card.info.price
                                                    )
                                                        ? '買入'
                                                        : '付不起...'
                                                "
                                                :disabled="
                                                    !afordable(
                                                        card.info.price
                                                    )
                                                "
                                                :func="() => buyCard(i)"
                                            />
                                        </template>
                                    </Card>
                                </template>
                                <template #price>
                                    <PriceTag
                                        :price="card.info.price"
                                    />
                                </template>
                            </ItemBox>
                        </v-col>
                    </v-row>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-col>

        <v-col
            cols="auto"
            class="pa-0 w-100 pb-0 mt-auto"
        >
            <v-tabs
                v-model="displayType"
                class="text-white"
                hide-slider
                grow
            >
                <v-tab
                    variant="outlined"
                    value="0"
                    rounded="lg"
                    class="mr-3"
                    selected-class="bg-skin"
                >
                    {{ t('equip') }}
                </v-tab>
                <v-tab
                    variant="outlined"
                    value="1"
                    rounded="lg"
                    selected-class="bg-skin"
                >
                    {{ t('logicard') }}
                </v-tab>
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import {
    computed,
    ref,
} from 'vue';

import { useI18n } from 'vue-i18n';

import Card from '@/components/card/Card.vue';
import CoinStatus from '@/components/common/CoinStatus.vue';
import ItemBox from '@/components/common/ItemBox.vue';
import Equip from '@/components/equip/Equip.vue';
import Btn from '@/components/system/Btn.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { usePlayerStore } from '@/store/player';
import { useShopStore } from '@/store/shop';
import { humanReadableSeconds } from '@/utils/time';
import { useWindowSize } from '@vueuse/core';

import PriceTag from './components/PriceTag.vue';

const { t } = useI18n();
const { height } = useWindowSize();
const playerStore = usePlayerStore();
const shopStore = useShopStore();

const cardRefs = ref<(InstanceType<typeof Card> | null)[]>([]);
const equipRefs = ref<(InstanceType<typeof Equip> | null)[]>([]);

const dialogs = DialogDataList[enumDialog.Shop];
const equips = computed(() => shopStore.repository.equips);
const cards = computed(() => shopStore.repository.cards);

const getHeight = computed(() => `${height.value * 0.5}px`);

const playerCoin = computed(() => playerStore.currentPlayer!.backpack.coin);
const displayType = ref(0);

const afordable = (price: number) => {
    return playerCoin.value >= price;
};

const buyEquip = async (index: number) => {
    const equip = equips.value[index];
    const getCardComponent = equipRefs.value[index];

    if (playerCoin.value >= equip.info.price) {
        await shopStore.soldEquip(equip);
        await playerStore.buyEquip(equip);
        getCardComponent?.toggleDialog(false);
    }
};

const buyCard = async (index: number) => {
    const card = cards.value[index];
    const getCardComponent = cardRefs.value[index];

    if (playerCoin.value >= card.info.price) {
        await shopStore.soldCard(card);
        await playerStore.buyCard(card);
        getCardComponent?.toggleDialog(false);
    }
};
</script>

<style lang="scss" scoped></style>
