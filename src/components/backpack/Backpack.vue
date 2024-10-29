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

                <v-col cols="auto" class="py-0">
                    <CoinStatus :theme="'dark'"></CoinStatus>
                </v-col>

                <!-- 背包道具 -->
                <v-col
                    cols="auto"
                    class="w-100 d-flex justify-center flex-wrap ga-1 overflow-y-auto flex-grow-1"
                    :style="{ minHeight: '0', maxHeight: '60%' }"
                >
                    <ItemBox
                        v-for="(_, index) in player.character.backpackLimit"
                        :key="index"
                        class="bg-bluegrey rounded d-flex justify-center align-center"
                    >
                        <template #item>
                            <Equip
                                v-if="
                                    backpackItems[index] &&
                                    backpackItems[index].type === 'equip'
                                "
                                :equip="(backpackItems[index].item as EquipType)"
                                :ref="(el) => (itemRefs[index] = el)"
                                :size="'small'"
                                :position="(backpackItems[index].item as EquipType).position"
                                :show-is-equiped="true"
                            >
                                <template #actions>
                                    <v-row class="ma-0 ga-1">
                                        <v-col class="pa-0">
                                            <Btn
                                                :text="'裝備'"
                                                :func="() => openConfirmBox('changeEquip', index)"
                                            />
                                        </v-col>
                                        <v-col class="pa-0">
                                            <Btn
                                                :text="`賣出 ($ ${getSalePrice(
                                                    backpackItems[index].item
                                                )})`"
                                                :func="() => openConfirmBox('sell', index)"
                                            />
                                        </v-col>
                                    </v-row>
                                </template>
                            </Equip>
                            <Card
                                v-if="
                                    backpackItems[index] &&
                                    backpackItems[index].type === 'card'
                                "
                                :card="(backpackItems[index].item as CardType)"
                                :ref="(el) => (itemRefs[index] = el)"
                                :size="'small'"
                            >
                                <template #actions>
                                    <Btn
                                        :text="`賣出 ($ ${getSalePrice(
                                            backpackItems[index].item
                                        )})`"
                                        :func=" () => openConfirmBox('sell', index)"
                                    />
                                </template>
                            </Card>
                        </template>
                    </ItemBox>
                </v-col>

                <v-col cols="auto" class="w-100 mt-auto">
                    <Btn
                        :text="t('button.close_backpack')"
                        :func="closeBackpack"
                    />
                </v-col>
            </v-row>
        </v-card>
    </v-bottom-sheet>

    <ConfirmBox
        ref="changeEquipRef"
        :message="'是否更換裝備？'"
        :func="changeEquipment"
    ></ConfirmBox>

    <ConfirmBox
        ref="sellItemRef"
        :message="'是否賣出？'"
        :func="sellItem"
    ></ConfirmBox>
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
import ConfirmBox from '@/components/system/ConfirmBox.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { useAppStore } from '@/store/app';
import { usePlayerStore } from '@/store/player';
import {
    Card as CardType,
    Equip as EquipType,
} from '@/types/core';
import { getSalePrice } from '@/utils/item';

const playerStore = usePlayerStore();
const appStore = useAppStore();
const { t } = useI18n();

const dialogs = DialogDataList[enumDialog.Backpack];
const isOpen = computed(() => appStore.isOpen === 'backpack');

const player = computed(() => playerStore.currentPlayer!);

const itemRefs = ref<(InstanceType<typeof Equip | typeof Card> | null)[]>([]);

const backpackItems = computed(() => {
    const items: { type: 'card' | 'equip'; item: CardType | EquipType }[] = [];

    const equips = player.value.backpack.equips
        .slice()
        .sort((a, b) => b.info.rarity.localeCompare(a.info.rarity));

    equips.map((equip) => {
        items.push({
            type: 'equip',
            item: equip,
        });
    });

    player.value.backpack.cards.map((card) => {
        items.push({
            type: 'card',
            item: card,
        });
    });

    return items;
});

const closeBackpack = async() => {
    appStore.closeDialog();
};

/** 確認視窗選擇的道具 index */
const selectedItemIndex = ref<number>();

/** 變更裝備確認視窗 */
const changeEquipRef = ref<typeof ConfirmBox>();

/** 賣出裝備視窗 */
const sellItemRef = ref<typeof ConfirmBox>();

/** 變更裝備 */
const changeEquipment = () => {
    const findEquip = backpackItems.value[selectedItemIndex.value!];

    if (findEquip) {
        playerStore.changeEquipment(findEquip.item as EquipType);
        const getEquipComponent = itemRefs.value[selectedItemIndex.value!];
        getEquipComponent?.toggleDialog(false);
    }
};

/** 賣出裝備或卡牌 */
const sellItem = async() => {
    const findItem = backpackItems.value[selectedItemIndex.value!];

    const { item, type } = findItem;

    await playerStore.sellItem(type, item);
    const getItemComponent = itemRefs.value[selectedItemIndex.value!];
    getItemComponent?.toggleDialog(false);
};

const openConfirmBox = (type: 'changeEquip' | 'sell', index: number) => {
    selectedItemIndex.value = index;

    if (type === 'changeEquip') {
        changeEquipRef.value?.show();
    } else {
        sellItemRef.value?.show();
    }
};
</script>

<style lang="scss" scoped></style>
