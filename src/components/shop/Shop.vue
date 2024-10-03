<template>
    <v-bottom-sheet v-model="isOpen" height="95vh">
        <v-card color="skin" class="mt-auto rounded-t-xl">
            <v-row
                class="ma-0 fill-height flex-column flex-nowrap mx-auto overflow-hidden"
                :style="{ maxWidth: '500px', maxHeight: '95vh' }"
            >
                <v-col cols="auto" class="w-100">
                    <Dialog :max-height="120" :dialogs="dialogs" />
                </v-col>

                <v-col
                    cols="auto"
                    class="py-0 w-100 d-flex justify-space-between align-center"
                >
                    <p>
                        商店更新：{{
                            humanReadableSeconds(shopStore.remainSeconds)
                        }}
                    </p>
                    <CoinStatus :theme="'dark'"></CoinStatus>
                </v-col>

                <v-col
                    cols="auto"
                    class="w-100 overflow-y-auto flex-grow-1"
                    :style="{ minHeight: '0', maxHeight: '60%' }"
                >
                    <v-tabs-window v-model="displayType">
                        <!-- 裝備 -->
                        <v-tabs-window-item value="0">
                            <v-row class="ma-0 justify-center ga-1">
                                <ItemBox v-for="(equip, i) in equips" :key="i">
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
                                                ></Btn>
                                            </template>
                                        </Equip>
                                    </template>
                                    <template #price>
                                        <PriceTag
                                            :price="equip.info.price"
                                        ></PriceTag>
                                    </template>
                                </ItemBox>
                            </v-row>
                        </v-tabs-window-item>

                        <!-- 卡牌 -->
                        <v-tabs-window-item value="1">
                            <v-row class="ma-0 justify-center ga-1">
                                <ItemBox v-for="(card, i) in cards" :key="i">
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
                                                ></Btn>
                                            </template>
                                        </Card>
                                    </template>
                                    <template #price>
                                        <PriceTag
                                            :price="card.info.price"
                                        ></PriceTag>
                                    </template>
                                </ItemBox>
                            </v-row>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-col>

                <v-col cols="auto" class="w-100 pb-0 mt-auto">
                    <v-tabs v-model="displayType" grow>
                        <v-tab value="0">
                            {{ t('equip') }}
                        </v-tab>
                        <v-tab value="1">
                            {{ t('logicard') }}
                        </v-tab>
                    </v-tabs>
                </v-col>

                <v-col cols="auto" class="w-100 mt-auto">
                    <Btn :text="t('button.leave')" :func="closeBackpack" />
                </v-col>
            </v-row>
        </v-card>
    </v-bottom-sheet>
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
import { useAppStore } from '@/store/app';
import { usePlayerStore } from '@/store/player';
import { useShopStore } from '@/store/shop';
import { humanReadableSeconds } from '@/utils/time';

import PriceTag from './components/PriceTag.vue';

const { t } = useI18n();
const playerStore = usePlayerStore();
const shopStore = useShopStore();
const appStore = useAppStore();

const cardRefs = ref<(InstanceType<typeof Card> | null)[]>([]);
const equipRefs = ref<(InstanceType<typeof Equip> | null)[]>([]);

const isOpen = computed(() => appStore.isOpen === 'shop');
const dialogs = DialogDataList[enumDialog.Shop];
const equips = computed(() => shopStore.repository.equips);
const cards = computed(() => shopStore.repository.cards);

const playerCoin = computed(() => playerStore.currentPlayer!.backpack.coin);
const displayType = ref(0);

const closeBackpack = async () => {
    appStore.closeDialog();
};

const afordable = (price: number) => {
    return playerCoin.value >= price;
};

const buyEquip = async (index: number) => {
    const equip = equips.value[index];
    const getCardComponent = equipRefs.value[index];

    if (playerCoin.value >= equip.info.price) {
        await playerStore.buyEquip(equip);
        getCardComponent?.toggleDialog(false);
    }
};

const buyCard = async (index: number) => {
    const card = cards.value[index];
    const getCardComponent = cardRefs.value[index];

    if (playerCoin.value >= card.info.price) {
        await playerStore.buyCard(card);
        getCardComponent?.toggleDialog(false);
    }
};
</script>

<style lang="scss" scoped></style>
