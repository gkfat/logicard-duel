<template>
    <BtnIcon
        :icon="'mdi-bag-personal'"
        :func="openBackpack"
    />

    <v-bottom-sheet
        v-model="switchToggleStore.backpackOpen"
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
                    cols="12"
                    class="pa-0"
                >
                    <v-window v-model="displayType">
                        <!-- 裝備 -->
                        <v-window-item value="0">
                            <p
                                v-if="player.ItemList.length === 0"
                                class="text-center"
                            >
                                {{ t('backpack.empty') }}{{ t('equip') }}。
                            </p>

                            <template v-else>
                                <Item
                                    v-for="(item, i) in player.ItemList"
                                    :key="i"
                                    :equiped="isEquiped(i)"
                                    :backpack="true"
                                    :item="item"
                                    :index="i"
                                />
                            </template>
                        </v-window-item>

                        <!-- 技術牌 -->
                        <v-window-item value="1">
                            <p
                                v-if="player.CardDataList.length === 0"
                                class="text-center"
                            >
                                {{ t('backpack.empty') }}{{ t('tech_card') }}。
                            </p>
                            <template v-else>
                                <Item
                                    v-for="(item, i) in player.CardDataList"
                                    :key="i"
                                    :backpack="true"
                                    :item="item"
                                />
                            </template>
                        </v-window-item>
                    </v-window>
                </v-col>
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
                    :text="t('button.close_backpack')"
                    :func="closeBackpack"
                />
            </v-card-actions>
        </v-card>
    </v-bottom-sheet>

    <!--<p class="w-100 text-center m-0">
        {{ $t('coin') }}：{{ player.Coin }}｜
        {{ $t('item') }}：{{ player.ItemList.length + '／' + player.Character.ItemLimit }}
    </p>-->
</template>

<script setup lang="ts">
import {
    computed,
    ref,
} from 'vue';

import { useI18n } from 'vue-i18n';

import Item from '@/components/Item.vue';
import BtnIcon from '@/components/system/BtnIcon.vue';
import BtnText from '@/components/system/BtnText.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data';
import { enumDialog } from '@/enums/game';
import {
    usePlayerStore,
    useSwitchToggleStore,
} from '@/store';
import useSoundStore from '@/store/sound';

const playerStore = usePlayerStore();
const switchToggleStore = useSwitchToggleStore();
const soundStore = useSoundStore();
const { t } = useI18n();
const dialogs = DialogDataList[enumDialog.Backpack];
const player = computed(() => playerStore.player);
const displayType = ref(0);

const toggleDisplayType = async (type: number) => {
    await soundStore.playSound(soundStore.sounds.effect.click);
    displayType.value = type;
};

const isEquiped = (i: number) => {
    if (player.value.WeaponIndex && player.value.WeaponIndex - 1 === i) {
        return true;
    } if (player.value.ArmorIndex && player.value.ArmorIndex - 1 === i) {
        return true;
    }
    return false;
};

const openBackpack = () => {
    switchToggleStore.toggle('backpack');
};

// 關上背包
const closeBackpack = async () => {
    switchToggleStore.toggle('backpack');
};
</script>

<style lang="scss" scoped>

</style>
