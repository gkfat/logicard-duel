<template>
    <v-row class="ma-0 justify-center align-center">
        <v-col cols="12" class="pa-0">
            <v-card
                flat
                rounded="lg"
                :class="{
                    [borderColor]: true,
                    'border-opacity-100': displayEquip,
                }"
                :style="getStyles"
                class="bg-bluegrey border-md cursor-pointer mx-auto"
                @click="toggleDialog(true)"
            >
                <v-row
                    class="ma-0 justify-center align-center fill-height position-relative"
                >
                    <v-col cols="auto" class="pa-0">
                        <!-- equip -->
                        <template v-if="displayEquip && getTemplate">
                            <v-row
                                class="ma-0 align-center justify-center fill-height ga-1 pa-1"
                            >
                                <v-col cols="auto" class="pa-0">
                                    <Icon
                                        :size="getIconSize"
                                        :url="getTemplate.icon"
                                    ></Icon>
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
                                </v-col>

                                <v-col
                                    v-if="size !== 'x-small'"
                                    cols="auto"
                                    class="pa-0 text-caption"
                                    :style="{
                                        fontSize: '0.5rem !important',
                                    }"
                                >
                                    {{ getTemplate.name }}
                                </v-col>
                            </v-row>
                        </template>

                        <!-- no equip -->
                        <template v-else>
                            <Icon
                                style="opacity: 0.2"
                                :size="getIconSize"
                                :url="getPositionPlaceholder"
                            ></Icon>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>

        <v-col cols="auto" class="pa-0 text-center" v-if="showRarity">
            <Rarity
                v-if="displayEquip && getTemplate"
                :rarity="displayEquip.info.rarity"
            ></Rarity>
        </v-col>
    </v-row>

    <v-dialog v-model="isDialogOpen" :max-width="500" :min-width="300">
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
                            <Icon
                                :size="getIconSize"
                                :url="getTemplate.icon"
                            ></Icon>
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
                                :text="t(`equip_position.${position}`)"
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

            <v-card-text v-if="isPlayerEquip">
                <p class="mb-1">可裝備列表</p>
                <v-row
                    v-if="getPositionEquips.length"
                    class="ma-0 align-center flex-nowrap overflow-x-auto ga-3"
                >
                    <!-- 脫下裝備 -->
                    <v-col cols="auto" class="pa-0">
                        <RemoveEquipItem :position="position"></RemoveEquipItem>
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
import { useSoundEffect } from '@/composable/useSoundEffect';
import { ImageDataList } from '@/data/images';
import { enumEquipPosition } from '@/enums/equip';
import { enumRarity } from '@/enums/rarity';
import { usePlayerStore } from '@/store/player';
import { Equip } from '@/types/core';

import BackpackEquipItem from './components/BackpackEquipItem.vue';
import RemoveEquipItem from './components/RemoveEquipItem.vue';

const { t } = useI18n();
const { soundClick } = useSoundEffect();
const isDialogOpen = ref(false);
const playerStore = usePlayerStore();

const {
    equip,
    position,
    isPlayerEquip = false,
    showRarity = true,
    size = 'default',
    showDetail = true,
} = defineProps<{
    equip: Equip | null;
    position: enumEquipPosition;
    isPlayerEquip?: boolean;
    showRarity?: boolean;
    size?: 'x-small' | 'small' | 'default';
    showDetail?: boolean;
}>();

const toggleDialog = (target: boolean) => {
    soundClick();
    if (showDetail) {
        isDialogOpen.value = target;
    }
};

const player = computed(() => playerStore.currentPlayer!);

const displayEquip = computed(() => {
    if (isPlayerEquip) {
        if (equip) {
            return player.value.backpack.equips.find((v) => v.id === equip!.id);
        }

        return player.value.equipment[position];
    }

    return equip;
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

const getStyles = computed(() => {
    // default
    const styles: { [key: string]: string } = {
        width: '80px',
        'max-width': '80px',
        height: '80px',
        'max-height': '80px,',
    };

    if (size === 'x-small') {
        styles.width = '30px';
        styles['max-width'] = '30px';
        styles.height = '30px';
        styles['max-height'] = '30px';
    } else if (size === 'small') {
        styles.width = '50px';
        styles['max-width'] = '50px';
        styles.height = '50px';
        styles['max-height'] = '50px';
    }

    return styles;
});

const getIconSize = computed(() => {
    // default
    let iconSize = 36;

    if (size === 'x-small') {
        iconSize = 14;
    } else if (size === 'small') {
        iconSize = 24;
    }
    return iconSize;
});

const getPositionPlaceholder = computed(() => {
    let placeholder = ImageDataList.icon.placeholderHead;

    switch (position) {
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
        .currentPlayer!.backpack.equips.filter((v) => v.position === position)
        .sort((a, b) => b.info.rarity.localeCompare(a.info.rarity))
        .sort((a, b) => Number(b.is_equiped) - Number(a.is_equiped));
});
</script>
