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
            class="py-0"
        >
            <CoinStatus />
        </v-col>

        <!-- 背包道具 -->
        <v-col
            cols="auto"
            class="pa-0 w-100 d-flex justify-center flex-wrap ga-3"
        >
            <v-col
                v-for="(_, index) in player.character.backpackLimit"
                :key="index"
                cols="auto"
                class="pa-0"
            >
                <ItemBox class="bg-bluegrey rounded d-flex justify-center align-center">
                    <template #item>
                        <Equip
                            v-if="
                                backpackItems[index] &&
                                    backpackItems[index].type === 'equip'
                            "
                            :ref="(el) => (itemRefs[index] = el)"
                            :equip="(backpackItems[index].item as EquipType)"
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
                            :ref="(el) => (itemRefs[index] = el)"
                            :card="(backpackItems[index].item as CardType)"
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
        </v-col>
    </v-row>

    <ConfirmBox
        ref="changeEquipRef"
        :message="'是否更換裝備？'"
        :func="changeEquipment"
    />

    <ConfirmBox
        ref="sellItemRef"
        :message="'是否賣出？'"
        :func="sellItem"
    />
</template>

<script setup lang="ts">
import {
    computed,
    ref,
} from 'vue';

import Card from '@/components/card/Card.vue';
import CoinStatus from '@/components/common/CoinStatus.vue';
import ItemBox from '@/components/common/ItemBox.vue';
import Equip from '@/components/equip/Equip.vue';
import Btn from '@/components/system/Btn.vue';
import ConfirmBox from '@/components/system/ConfirmBox.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { usePlayerStore } from '@/store/player';
import {
    Card as CardType,
    Equip as EquipType,
} from '@/types/core';
import { getSalePrice } from '@/utils/item';

const playerStore = usePlayerStore();

const dialogs = DialogDataList[enumDialog.Backpack];

const player = computed(() => playerStore.currentPlayer!);

const itemRefs = ref<(InstanceType<typeof Equip | typeof Card> | null)[]>([]);

const sortFunc = (a: EquipType | CardType, b: EquipType | CardType) => {
    const rarityCompare = b.info.rarity.localeCompare(a.info.rarity);
    const typeCompare = b.template.type.localeCompare(a.template.type);

    if (rarityCompare !== 0) {
        return rarityCompare;
    }

    if (typeCompare !== 0) {
        return typeCompare;
    }

    return b.info.point - a.info.point;
};

const backpackItems = computed(() => {
    const items = [
        ...player.value.backpack.equips
            .slice()
            .sort(sortFunc)
            .map((equip) => ({
                type: 'equip',
                item: equip,
            })), ...player.value.backpack.cards
            .slice()
            .sort(sortFunc)
            .map((card) => ({
                type: 'card',
                item: card,
            })),
    ];

    return items;
});

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
const sellItem = async () => {
    const findItem = backpackItems.value[selectedItemIndex.value!];

    const {
        item, type, 
    } = findItem;

    await playerStore.sellItem(type as 'card' | 'equip', item);
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
