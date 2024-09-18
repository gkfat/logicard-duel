<template>
    <v-row class="ma-0 justify-center align-center">
        <v-col cols="12" class="pa-0">
            <v-card
                flat
                rounded="lg"
                :wdith="frameSize"
                :height="frameSize"
                :min-width="frameSize"
                :max-width="frameSize"
                :max-heiht="frameSize"
                :min-height="frameSize"
                :class="{
                    [borderColor]: true,
                    'border-opacity-100': displayEquip,
                }"
                class="bg-bluegrey border-md cursor-pointer mx-auto"
                @click="isDialogOpen = true"
            >
                <v-row
                    class="ma-0 justify-center align-center fill-height position-relative"
                >
                    <v-col cols="auto">
                        <!-- equip -->
                        <template v-if="displayEquip && getTemplate">
                            <Icon :size="24" :url="getTemplate.icon"></Icon>

                            <div
                                class="position-absolute"
                                style="
                                    top: 0;
                                    right: 5px;
                                    bottom: 0;
                                    z-index: 1;
                                "
                            >
                                +{{ displayEquip.info.point }}
                            </div>
                        </template>

                        <!-- no equip -->
                        <template v-else>
                            <Icon
                                style="opacity: 0.2"
                                :size="24"
                                :url="getPositionPlaceholder"
                            ></Icon>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>

        <v-col cols="auto" class="pa-0 text-center">
            <Rarity
                v-if="displayEquip && getTemplate"
                :rarity="displayEquip.info.rarity"
            ></Rarity>
            <em v-else>None</em>
        </v-col>
    </v-row>

    <v-dialog v-model="isDialogOpen">
        <v-card
            flat
            color="bluegrey"
            class="rounded-xl border-xl border-amber border-opacity-100"
        >
            <!-- 有裝備 -->
            <template v-if="displayEquip && getTemplate">
                <v-card-text>
                    <v-row class="align-center">
                        <!-- 位置 -->
                        <v-col cols="auto">
                            <v-chip
                                label
                                color="amber"
                                :text="
                                    t(`equip_position.${displayEquip.position}`)
                                "
                            ></v-chip>
                        </v-col>

                        <!-- 效果 -->
                        <v-col cols="auto" class="ml-auto">
                            <Effect :effect="getTemplate.effect"></Effect>
                        </v-col>
                    </v-row>

                    <!-- Icon -->
                    <v-row class="justify-center">
                        <v-col cols="auto">
                            <Icon :size="50" :url="getTemplate.icon"></Icon>
                        </v-col>
                    </v-row>
                </v-card-text>

                <!-- 稀有度 -->
                <Rarity :rarity="displayEquip.info.rarity"></Rarity>

                <v-card-title class="text-center">
                    {{ getTemplate.name }}
                </v-card-title>

                <v-card-subtitle class="text-center text-wrap">
                    {{ getTemplate.description }}
                </v-card-subtitle>

                <v-card-text>
                    <!-- 點數 -->
                    <v-row class="justify-center">
                        <v-col cols="auto" class="text-h6">
                            {{ t(`effect.${getTemplate.effect}`) }}
                            + {{ displayEquip.info.point }}
                        </v-col>
                    </v-row>
                </v-card-text>
            </template>

            <!-- 無裝備 -->
            <template v-else>
                <v-card-text>
                    <v-row class="align-center">
                        <!-- 位置 -->
                        <v-col cols="auto">
                            <v-chip
                                label
                                color="amber"
                                :text="t(`equip_position.${props.position}`)"
                            ></v-chip>
                        </v-col>
                    </v-row>

                    <v-row class="justify-center">
                        <v-col cols="auto">
                            <Icon
                                :size="50"
                                :url="getPositionPlaceholder"
                            ></Icon>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-subtitle class="text-center text-wrap">
                    沒穿任何東西。
                </v-card-subtitle>
            </template>

            <v-card-text v-if="props.isPlayerEquip">
                <p class="mb-1">可裝備列表</p>
                <v-row
                    v-if="getPositionEquips.length"
                    class="ma-0 align-center flex-nowrap overflow-x-auto ga-3"
                >
                    <!-- 脫下裝備 -->
                    <v-col cols="auto" class="pa-0">
                        <RemoveEquipItem
                            :position="props.position"
                        ></RemoveEquipItem>
                    </v-col>

                    <v-col
                        v-for="(item, i) in getPositionEquips"
                        :key="i"
                        class="pa-0"
                        cols="auto"
                    >
                        <BackpackEquipItem :equip="item"></BackpackEquipItem>
                    </v-col>
                </v-row>

                <em class="text-secondary" v-else>沒有裝備，真慘。</em>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import {
    computed,
    ref,
} from 'vue';

import { useI18n } from 'vue-i18n';

import Effect from '@/components/common/Effect.vue';
import Icon from '@/components/common/Icon.vue';
import Rarity from '@/components/common/Rarity.vue';
import { ImageDataList } from '@/data/images';
import { enumEquipPosition } from '@/enums/equip';
import { enumRarity } from '@/enums/rarity';
import { usePlayerStore } from '@/store/player';
import { Equip } from '@/types/core';

import BackpackEquipItem from './components/BackpackEquipItem.vue';
import RemoveEquipItem from './components/RemoveEquipItem.vue';

const { t } = useI18n();
const isDialogOpen = ref(false);
const playerStore = usePlayerStore();

const props = withDefaults(
    defineProps<{
        equip: Equip | null;
        position: enumEquipPosition;
        isPlayerEquip?: boolean;
        size?: 'small' | 'default';
    }>(),
    {
        isPlayerEquip: false,
    }
);

const frameSize = computed(() => (props.size === 'small' ? 50 : 80));
const player = computed(() => playerStore.currentPlayer!);

const displayEquip = computed(() => {
    if (props.isPlayerEquip) {
        if (props.equip) {
            return player.value.backpack.equips.find(
                (v) => v.id === props.equip!.id
            );
        }

        return player.value.equipment[props.position];
    }

    return props.equip;
});

const getTemplate = computed(() => displayEquip.value?.template);

const borderColor = computed(() => {
    switch (displayEquip.value?.info.rarity) {
    case enumRarity.Normal:
        return 'border-white';
    case enumRarity.Rare:
        return 'border-secondary';
    case enumRarity.SR:
        return 'border-red';
    case enumRarity.SSR:
        return 'border-darkamber';
    default:
        return 'border-white';
    }
});

const getPositionPlaceholder = computed(() => {
    let placeholder = ImageDataList.icon.placeholderHead;

    switch (props.position) {
    case enumEquipPosition.Head:
        placeholder = ImageDataList.icon.placeholderHead;
        break;
    case enumEquipPosition.PrimaryHand:
    case enumEquipPosition.SecondaryHand:
        placeholder = ImageDataList.icon.placeholderHand;
        break;
    case enumEquipPosition.Body:
        placeholder = ImageDataList.icon.placeholderBody;
        break;
    case enumEquipPosition.Pants:
        placeholder = ImageDataList.icon.placeholderPants;
        break;
    case enumEquipPosition.Shoes:
        placeholder = ImageDataList.icon.placeholderShoes;
        break;
    }

    return placeholder;
});

const getPositionEquips = computed(() => {
    return playerStore
        .currentPlayer!.backpack.equips.filter(
            (v) => v.position === props.position
        )
        .sort((a, b) => b.info.rarity.localeCompare(a.info.rarity))
        .sort((a, b) => Number(b.is_equiped) - Number(a.is_equiped));
});
</script>
<style lang="scss" scoped></style>
