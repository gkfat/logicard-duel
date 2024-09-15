<template>
    <BtnIcon
        :icon="'mdi-cart'"
        :func="openShop"
    />

    <v-bottom-sheet
        v-model="switchToggleStore.shopOpen"
        height="90vh"
    >
        <v-card
            color="skin"
            class="fill-height rounded-t-xl"
        >
            <v-row class="ma-0 pa-3">
                <Dialog
                    :max-height="120"
                    :dialogs="dialogs"
                />

                <v-col
                    cols="auto"
                    class="ml-auto"
                >
                    <v-chip prepend-icon="mdi-screw-lag">
                        {{ player.Coin }}
                    </v-chip>
                </v-col>

                <v-col
                    cols="12"
                    class="pa-0"
                >
                    <v-window v-model="displayType">
                        <!-- 裝備 -->
                        <v-window-item value="0">
                            <p
                                v-if="shop.ItemList.length === 0"
                                class="text-center"
                            >
                                {{ t('shop.empty') }}{{ t('equip') }}。
                            </p>

                            <v-row
                                v-else
                                class="ma-0 ga-3 justify-space-between overflow-y-auto"
                                style="height: 240px;"
                            >
                                <v-col
                                    v-for="(item, i) in shop.ItemList"
                                    :key="i"
                                    cols="auto"
                                    class="pa-0"
                                >
                                    <ShopItem
                                        :item="item"
                                        :index="i"
                                        :type="'equip'"
                                    />
                                </v-col>
                            </v-row>
                        </v-window-item>

                        <!-- 技術牌 -->
                        <v-window-item value="1">
                            <p
                                v-if="shop.CardDataList.length === 0"
                                class="text-center"
                            >
                                {{ t('shop.empty') }}{{ t('tech_card') }}。
                            </p>

                            <v-row
                                v-else
                                class="ma-0 ga-3 overflow-y-auto"
                                style="height: 270px;"
                            >
                                <v-col
                                    v-for="(item, i) in shop.CardDataList"
                                    :key="i"
                                    cols="auto"
                                    class="pa-0"
                                >
                                    <ShopItem
                                        :item="item"
                                        :index="i"
                                        :type="'card'"
                                    />
                                </v-col>
                            </v-row>
                        </v-window-item>
                    </v-window>
                </v-col>

                <!-- Tab -->
                <v-col
                    cols="12"
                    class="pa-0  mt-auto"
                >
                    <v-tabs
                        v-model="displayType"
                        grow
                    >
                        <v-tab value="0">
                            {{ t('equip') }}
                        </v-tab>
                        <v-tab value="1">
                            {{ t('tech_card') }}
                        </v-tab>
                    </v-tabs>
                </v-col>
            </v-row>

            <v-card-actions class="pa-3">
                <BtnText
                    :text="t('button.leave')"
                    :func="closeShop"
                />
            </v-card-actions>
        </v-card>
    </v-bottom-sheet>

    <ConfirmBox
        ref="confirmBoxRef"
        :func="buyItem"
        :message="t('button.buy')"
    >
        haeraewr
    </ConfirmBox>
</template>

<script setup lang="ts">
import {
    computed,
    ref,
} from 'vue';

import { useI18n } from 'vue-i18n';

import BtnIcon from '@/components/system/BtnIcon.vue';
import BtnText from '@/components/system/BtnText.vue';
import ConfirmBox from '@/components/system/ConfirmBox.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/index';
import { enumDialog } from '@/enums/game';
import {
    usePlayerStore,
    useShopStore,
    useSwitchToggleStore,
} from '@/store';

import ShopItem from './ShopItem.vue';

const { t } = useI18n();
const switchToggleStore = useSwitchToggleStore();
const playerStore = usePlayerStore();
const shopStore = useShopStore();

const confirmBoxRef = ref<typeof ConfirmBox>();

const dialogs = DialogDataList[enumDialog.Shop];
const player = computed(() => playerStore.player);
const shop = computed(() => shopStore.shop);

const displayType = ref(0);

// 打開商店
const openShop = async () => {
    shopStore.refreshShop();
    switchToggleStore.toggle('shop');
};

const closeShop = async () => {
    switchToggleStore.toggle('shop');
};
</script>

<style lang="scss" scoped>

</style>
