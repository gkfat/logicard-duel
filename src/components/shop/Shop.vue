<template>
    <v-bottom-sheet v-model="isOpen" height="95vh">
        <v-card color="skin" class="rounded-t-xl">
            <v-row
                class="ma-0 fill-height flex-column flex-nowrap mx-auto overflow-hidden"
                :style="{ maxWidth: '500px', maxHeight: '95vh' }"
            >
                <v-col cols="auto" class="w-100">
                    <Dialog :max-height="120" :dialogs="dialogs" />
                </v-col>

                <v-col cols="auto" class="py-0 w-100">
                    <CoinStatus></CoinStatus>
                </v-col>

                <v-col
                    cols="auto"
                    class="w-100 overflow-y-auto flex-grow-1"
                    :style="{ minHeight: '0', maxHeight: '50%' }"
                >
                    <v-tabs-window v-model="displayType">
                        <!-- 裝備 -->
                        <v-tabs-window-item value="0">
                            <v-row class="ma-0 ga-1">
                                <v-col
                                    v-for="(equip, i) in shop.equips"
                                    :key="i"
                                    class="bg-bluegrey rounded d-flex justify-center align-center"
                                >
                                    <div
                                        class="d-flex justify-center align-center ga-1 flex-wrap"
                                    >
                                        <v-col cols="12" class="pa-0">
                                            <Equip
                                                :equip="equip"
                                                :position="equip.position"
                                            ></Equip>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            class="pa-0 text-center"
                                        >
                                            <PriceTag
                                                :price="equip.info.price"
                                            ></PriceTag>
                                        </v-col>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-tabs-window-item>

                        <!-- 卡牌 -->
                        <v-tabs-window-item value="1">
                            <v-row class="ma-0 justify-center ga-1">
                                <v-col
                                    v-for="(card, i) in shop.cards"
                                    :key="i"
                                    class="bg-bluegrey rounded d-flex justify-center align-center"
                                >
                                    <div
                                        class="d-flex justify-center align-center ga-1 flex-wrap"
                                    >
                                        <v-col cols="12" class="pa-0">
                                            <Card :card="card"></Card>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            class="pa-0 text-center"
                                        >
                                            <PriceTag
                                                :price="card.info.price"
                                            ></PriceTag>
                                        </v-col>
                                    </div>
                                </v-col>
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
import { computed, ref } from 'vue';

import { useI18n } from 'vue-i18n';

import Card from '@/components/card/Card.vue';
import Equip from '@/components/equip/Equip.vue';
import Btn from '@/components/system/Btn.vue';
import ConfirmBox from '@/components/system/ConfirmBox.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { useAppStore } from '@/store/app';
import { usePlayerStore } from '@/store/player';
import { useShopStore } from '@/store/shop';

import CoinStatus from './components/CoinStatus.vue';
import PriceTag from './components/PriceTag.vue';

const { t } = useI18n();
const playerStore = usePlayerStore();
const shopStore = useShopStore();
const appStore = useAppStore();

const confirmBoxRef = ref<typeof ConfirmBox>();

const isOpen = computed(() => appStore.isOpen === 'shop');
const dialogs = DialogDataList[enumDialog.Shop];
const shop = computed(() => shopStore.repository);

const displayType = ref(0);

const closeBackpack = async () => {
    appStore.closeDialog();
};
</script>

<style lang="scss" scoped></style>
