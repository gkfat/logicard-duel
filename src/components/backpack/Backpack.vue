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

                <!-- 背包道具 -->
                <v-col
                    cols="auto"
                    class="w-100 overflow-y-auto flex-grow-1"
                    :style="{ minHeight: '0', maxHeight: '60%' }"
                >
                    <div
                        :style="{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fill, minmax(100px, 1fr))',
                            gap: '5px',
                        }"
                    >
                        <v-col
                            v-for="(, index) in player.character.backpackLimit"
                            :key="index"
                            class="bg-bluegrey rounded d-flex justify-center align-center"
                            :style="{
                                height: '120px',
                            }"
                        >
                            <template
                                v-if="
                                    backpackItems[index] &&
                                    backpackItems[index].type === 'equip'
                                "
                            >
                                <Equip
                                    :equip="(backpackItems[index].item as EquipType)"
                                    :size="'small'"
                                    :position="(backpackItems[index].item as EquipType).position"
                                ></Equip>
                            </template>
                            <template
                                v-if="
                                    backpackItems[index] &&
                                    backpackItems[index].type === 'card'
                                "
                            >
                                <Card
                                    :card="(backpackItems[index].item as CardType)"
                                    :size="'small'"
                                ></Card>
                            </template>
                        </v-col>
                    </div>
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
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useI18n } from 'vue-i18n';

import Card from '@/components/card/Card.vue';
import Equip from '@/components/equip/Equip.vue';
import Btn from '@/components/system/Btn.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { useAppStore } from '@/store/app';
import { usePlayerStore } from '@/store/player';
import { Card as CardType, Equip as EquipType } from '@/types/core';

const playerStore = usePlayerStore();
const appStore = useAppStore();
const { t } = useI18n();

const dialogs = DialogDataList[enumDialog.Backpack];
const isOpen = computed(() => appStore.isOpen === 'backpack');

const player = computed(() => playerStore.currentPlayer!);

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

const closeBackpack = async () => {
    appStore.closeDialog();
};
</script>

<style lang="scss" scoped></style>
