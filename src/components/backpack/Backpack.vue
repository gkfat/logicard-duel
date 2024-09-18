<template>
    <v-bottom-sheet v-model="isOpen" height="90vh">
        <v-card color="skin" class="fill-height rounded-t-xl">
            <v-card-text>
                <Dialog :max-height="120" :dialogs="dialogs" />
            </v-card-text>

            <v-card-text class="fill-height overflow-y-auto">
                <v-tabs-window v-model="displayType">
                    <!-- 裝備 -->
                    <v-tabs-window-item value="0">
                        <v-row class="ma-0 ga-1">
                            <v-col
                                v-for="(equip, i) in equips"
                                :key="i"
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
                                v-for="(card, i) in cards"
                                :key="i"
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
                <BtnText
                    :text="t('button.close_backpack')"
                    :func="closeBackpack"
                />
            </v-card-actions>
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
import Equip from '@/components/equip/Equip.vue';
import BtnText from '@/components/system/BtnText.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { useAppStore } from '@/store/app';
import { usePlayerStore } from '@/store/player';
import { useSoundStore } from '@/store/sound';

const playerStore = usePlayerStore();
const appStore = useAppStore();
const soundStore = useSoundStore();
const { t } = useI18n();

const dialogs = DialogDataList[enumDialog.Backpack];
const isOpen = computed(() => appStore.isOpen === 'backpack');
const displayType = ref(0);

const player = computed(() => playerStore.currentPlayer!);
const equips = computed(() => player.value.backpack.equips);
const cards = computed(() => player.value.backpack.cards);

const closeBackpack = async () => {
    appStore.closeDialog();
};
</script>

<style lang="scss" scoped></style>
