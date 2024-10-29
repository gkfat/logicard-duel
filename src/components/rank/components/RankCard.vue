<template>
    <v-card
        flat
        class="bg-bluegrey rounded-lg border-white border-lg border-opacity-50 mb-3"
    >
        <v-row class="ma-0">
            <v-col cols="auto" class="ml-auto py-1">
                {{ humanReadable(data.endDate) }}
            </v-col>
        </v-row>

        <v-card-text class="py-1">
            <span>玩家</span>
            <span class="text-body-1 mx-2 text-amber">{{
                data.playerName
            }}</span>
        </v-card-text>

        <v-card-text class="py-1">
            <span>留下了遺言</span>
            <span class="text-body-1 mx-2 text-amber">{{
                data.lastWords
            }}</span>
        </v-card-text>

        <v-card-text class="py-1">
            <v-row class="ma-0 mb-3">
                <v-col cols="auto" class="pa-1">
                    <PlayerAvatar
                        :character="data.player.character"
                    />
                </v-col>

                <v-col cols="auto" class="flex-grow-1 pa-1">
                    <v-row class="ma-0 mb-3">
                        <v-col
                            class="py-0 d-flex align-center ga-1"
                            cols="auto"
                        >
                            <IconHeal/>
                            {{ data.player.status.health }}/{{
                                data.player.status.maxHealth
                            }}
                        </v-col>
                        <v-col
                            class="py-0 d-flex align-center ga-1"
                            cols="auto"
                        >
                            <IconAttack/>
                            {{ data.player.status.attack }}
                            <em
                                class="text-darkamber"
                                v-if="extraStatus.attack"
                            >
                                (+{{ extraStatus.attack }})
                            </em>
                        </v-col>
                        <v-col
                            class="py-0 d-flex align-center ga-1"
                            cols="auto"
                        >
                            <IconDefense/>
                            {{ data.player.status.defense }}
                            <em
                                class="text-darkamber"
                                v-if="extraStatus.defense"
                            >
                                (+{{ extraStatus.defense }})
                            </em>
                        </v-col>
                    </v-row>
                    <v-row class="ma-0">
                        <!-- 錢 -->
                        <v-col
                            class="py-0 d-flex align-center ga-1"
                            cols="auto"
                        >
                            <IconCoin/>
                            {{ thousands(data.player.backpack.coin) }}
                        </v-col>
                        <!-- 背包數量 -->
                        <v-col
                            class="py-0 d-flex align-center ga-1"
                            cols="auto"
                        >
                            <IconBackpack/>
                            {{ currentBackpackItems }}/{{
                                data.player.character.backpackLimit
                            }}
                        </v-col>
                        <!-- 卡牌數量 -->
                        <v-col
                            class="py-0 d-flex align-center ga-1"
                            cols="auto"
                        >
                            <IconPokerCard/>
                            {{ data.player.backpack.cards.length }}
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="ma-0 flex-nowrap overflow-x-auto">
                <v-col cols="auto" class="pa-0">
                    <Equip
                        :equip="data.player.equipment.head"
                        :position="enumEquipPosition.Head"
                        :show-rarity="true"
                        :size="'x-small'"
                    />
                </v-col>
                <v-col cols="auto" class="pa-0">
                    <Equip
                        :equip="equipment.primaryHand"
                        :position="enumEquipPosition.PrimaryHand"
                        :show-rarity="true"
                        :size="'x-small'"
                    />
                </v-col>
                <v-col cols="auto" class="pa-0">
                    <Equip
                        :equip="equipment.secondaryHand"
                        :position="enumEquipPosition.SecondaryHand"
                        :show-rarity="true"
                        :size="'x-small'"
                    />
                </v-col>
                <v-col cols="auto" class="pa-0">
                    <Equip
                        :equip="equipment.body"
                        :position="enumEquipPosition.Body"
                        :show-rarity="true"
                        :size="'x-small'"
                    />
                </v-col>
                <v-col cols="auto" class="pa-0">
                    <Equip
                        :equip="equipment.pants"
                        :position="enumEquipPosition.Pants"
                        :show-rarity="true"
                        :size="'x-small'"
                    />
                </v-col>
                <v-col cols="auto" class="pa-0">
                    <Equip
                        :equip="equipment.shoes"
                        :position="enumEquipPosition.Shoes"
                        :show-rarity="true"
                        :size="'x-small'"
                    />
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-text class="py-1">
            <v-divider/>
            <v-row class="ma-0">
                <v-col
                    v-if="!data.player.records.length"
                    cols="auto"
                    class="pa-0 text-amber"
                >
                    還來不及留下戰績就走了...
                </v-col>

                <!-- summary -->
                <v-col
                    cols="auto"
                    class="pa-0 py-1 flex-grow-1"
                    v-if="data.player.records.length"
                >
                    <Summary :summary="summary"/>
                </v-col>

                <v-col cols="auto" class="pa-0 ml-auto">
                    <v-btn
                        cols="auto"
                        variant="plain"
                        class="d-flex justify-center align-center ga-1 opacity-100"
                        @click="toggleDialog"
                    >
                        <IconScroll/>
                        <span class="text-amber">{{
                            data.player.records.length
                        }}</span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

    <v-dialog v-model="isDialogOpen" :max-width="500" :min-width="300">
        <v-card
            flat
            color="bluegrey"
            class="rounded-xl border-xl border-amber border-opacity-100"
        >
            <v-card-text class="overflow-y-auto">
                <Record
                    v-for="(record, i) in data.player.records"
                    :key="i"
                    :record="record"
                />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import {
    computed,
    ref,
} from 'vue';

import PlayerAvatar from '@/components/common/PlayerAvatar.vue';
import Equip from '@/components/equip/Equip.vue';
import IconAttack from '@/components/icons/IconAttack.vue';
import IconBackpack from '@/components/icons/IconBackpack.vue';
import IconCoin from '@/components/icons/IconCoin.vue';
import IconDefense from '@/components/icons/IconDefense.vue';
import IconHeal from '@/components/icons/IconHeal.vue';
import IconPokerCard from '@/components/icons/IconPokerCard.vue';
import IconScroll from '@/components/icons/IconScroll.vue';
import { useSoundEffect } from '@/composable/useSoundEffect';
import { enumEffect } from '@/enums/effect';
import { enumEquipPosition } from '@/enums/equip';
import { Equip as EquipType } from '@/types/core';
import { Rank } from '@/types/rank';
import { thousands } from '@/utils/number';
import { humanReadable } from '@/utils/time';

import Record from './Record.vue';
import Summary from './Summary.vue';

const { soundClick } = useSoundEffect();

const { data } = defineProps<{ data: Rank }>();

const isDialogOpen = ref(false);

const equipment = ref({
    head: data.player.equipment[enumEquipPosition.Head],
    primaryHand: data.player.equipment[enumEquipPosition.PrimaryHand],
    secondaryHand: data.player.equipment[enumEquipPosition.SecondaryHand],
    body: data.player.equipment[enumEquipPosition.Body],
    pants: data.player.equipment[enumEquipPosition.Pants],
    shoes: data.player.equipment[enumEquipPosition.Shoes],
});

const currentBackpackItems = ref(
    data.player.backpack.cards.length + data.player.backpack.equips.length,
);

const extraStatus = computed(() => {
    // 找到已裝備的裝備
    const findEquips = data.player.backpack.equips.filter((v) => v.is_equiped);

    const findWeapons = findEquips.filter(
        (v) => v.template.effect === enumEffect.Harm,
    );
    const findArmors = findEquips.filter(
        (v) => v.template.effect === enumEffect.Defense,
    );

    const calcPoint = (equips: EquipType[]) =>
        equips.reduce((num, equip) => num + equip.info.point, 0);

    return {
        attack: calcPoint(findWeapons),
        defense: calcPoint(findArmors),
    };
});

const summary = computed(() => {
    const { records } = data.player;

    return {
        totalBattles: records.length,
        totalHarm: records.reduce((acc, b) => acc + b.harm, 0),
        totalDamaged: records.reduce((acc, b) => acc + b.damaged, 0),
        totalDefense: records.reduce((acc, b) => acc + b.defense, 0),
        totalHeal: records.reduce((acc, b) => acc + b.heal, 0),
        totalCardsUsed: records.reduce((acc, b) => acc + b.cardsUsed, 0),
    };
});

const toggleDialog = () => {
    if (data.player.records.length) {
        soundClick();
        isDialogOpen.value = true;
    }
};
</script>
