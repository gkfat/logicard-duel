<template>
    <v-bottom-sheet v-model="isOpen" height="90vh">
        <v-card color="skin" class="fill-height rounded-t-xl">
            <v-card-text class="pb-0">
                <Dialog :max-height="120" :dialogs="dialogs" />

                <v-row class="ma-0 justify-end">
                    <v-col class="pa-1 d-flex align-center ga-1" cols="auto">
                        <v-icon
                            color="bluegrey"
                            icon="mdi-screw-round-top"
                        ></v-icon>
                        {{ player.backpack.coin }}
                    </v-col>
                    <v-col class="pa-1 d-flex align-center ga-1" cols="auto">
                        <v-icon
                            color="bluegrey"
                            icon="mdi-bag-personal"
                        ></v-icon>
                        {{ currentBackpackItems }}/{{
                            player.character.backpackLimit
                        }}
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-text class="fill-height overflow-y-auto">
                <v-tabs-window v-model="displayType">
                    <!-- 裝備 -->
                    <v-tabs-window-item value="0">
                        <v-row class="ma-0 ga-1">
                            <v-col
                                v-for="equip in shop.equips"
                                class="bg-bluegrey rounded d-flex justify-center align-center"
                            >
                                <Equip
                                    :equip="equip"
                                    :position="equip.position"
                                ></Equip>
                            </v-col>
                        </v-row>
                    </v-tabs-window-item>

                    <!-- 卡牌 -->
                    <v-tabs-window-item value="1">
                        <v-row class="ma-0 justify-center ga-1">
                            <v-col
                                v-for="card in shop.cards"
                                class="bg-bluegrey rounded d-flex justify-center align-center"
                            >
                                <Card :card="card"></Card>
                            </v-col>
                        </v-row>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>

            <v-card-text class="py-0">
                <v-tabs v-model="displayType" grow>
                    <v-tab value="0">
                        {{ t('equip') }}
                    </v-tab>
                    <v-tab value="1">
                        {{ t('logicard') }}
                    </v-tab>
                </v-tabs>
            </v-card-text>

            <v-card-actions class="pa-3">
                <BtnText :text="t('button.leave')" :func="closeBackpack" />
            </v-card-actions>
        </v-card>
    </v-bottom-sheet>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useI18n } from 'vue-i18n';

import Card from '@/components/card/Card.vue';
import Equip from '@/components/equip/Equip.vue';
import BtnText from '@/components/system/BtnText.vue';
import ConfirmBox from '@/components/system/ConfirmBox.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { useAppStore } from '@/store/app';
import { usePlayerStore } from '@/store/player';
import { useShopStore } from '@/store/shop';

const { t } = useI18n();
const playerStore = usePlayerStore();
const shopStore = useShopStore();
const appStore = useAppStore();

const confirmBoxRef = ref<typeof ConfirmBox>();

const isOpen = computed(() => appStore.isOpen === 'shop');
const dialogs = DialogDataList[enumDialog.Shop];
const player = computed(() => playerStore.currentPlayer!);
const shop = computed(() => shopStore.repository);

const currentBackpackItems = computed(() => {
    const result =
        player.value.backpack.cards.length +
        player.value.backpack.equips.length;

    return result;
});

const displayType = ref(0);

const closeBackpack = async () => {
    appStore.closeDialog();
};
</script>

<style lang="scss" scoped></style>
