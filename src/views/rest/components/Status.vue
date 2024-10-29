<template>
    <v-card
        flat
        color="bluegrey"
        class="border-white border-lg rounded-lg border-opacity-75 overflow-y-auto fill-height"
    >
        <v-card-text class="px-0">
            <v-row class="ma-0 ga-1 px-3 mb-3">
                <v-col cols="auto" class="pa-0 d-flex align-center">
                    <PlayerAvatar :character="player.character"></PlayerAvatar>
                </v-col>

                <v-col
                    cols="auto"
                    class="pa-0 d-flex flex-grow-1 align-center"
                    :style="{ maxWidth: '150px' }"
                >
                    <div>
                        <p class="text-subtitle-1 text-green font-weight-bold">
                            {{ player.character.name }}
                        </p>
                        <em class="text-caption text-wrap">
                            {{ player.character.description }}
                        </em>
                    </div>
                </v-col>

                <v-col cols="auto" class="pa-0 ml-auto">
                    <!-- 錢 -->
                    <div class="d-flex align-center ga-1 mb-1">
                        <IconCoin></IconCoin>
                        {{ thousands(player.backpack.coin) }}
                    </div>
                    <!-- 背包數量 -->
                    <div class="d-flex align-center ga-1 mb-1">
                        <IconBackpack></IconBackpack>
                        {{ currentBackpackItems }}/{{
                            player.character.backpackLimit
                        }}
                    </div>
                    <!-- 卡牌數量 -->
                    <div class="d-flex align-center ga-1">
                        <IconPokerCard></IconPokerCard>
                        {{ player.backpack.cards.length }}
                    </div>
                </v-col>
            </v-row>

            <!-- 狀態值 -->
            <v-row class="ma-0 mb-3">
                <v-col class="py-0 d-flex align-center ga-1" cols="auto">
                    <IconHeal></IconHeal>
                    {{ player.status.health }}/{{ player.status.maxHealth }}
                </v-col>
                <v-col class="py-0 d-flex align-center ga-1" cols="auto">
                    <IconAttack></IconAttack>
                    {{ player.status.attack }}
                    <em class="text-darkamber" v-if="extraStatus.attack">
                        (+{{ extraStatus.attack }})
                    </em>
                </v-col>
                <v-col class="py-0 d-flex align-center ga-1" cols="auto">
                    <IconDefense></IconDefense>
                    {{ player.status.defense }}
                    <em class="text-darkamber" v-if="extraStatus.defense">
                        (+{{ extraStatus.defense }})
                    </em>
                </v-col>
            </v-row>

            <!-- 裝備 -->
            <v-row
                class="align-center px-3 ma-0 ga-2 flex-nowrap overflow-x-auto"
            >
                <v-col class="pa-0">
                    <Equip
                        :equip="equipment.head"
                        :position="enumEquipPosition.Head"
                        :is-player-equip="true"
                        :show-rarity="true"
                        :size="'small'"
                    ></Equip>
                </v-col>
                <v-col class="pa-0">
                    <Equip
                        :equip="equipment.primaryHand"
                        :position="enumEquipPosition.PrimaryHand"
                        :is-player-equip="true"
                        :show-rarity="true"
                        :size="'small'"
                    ></Equip>
                </v-col>
                <v-col class="pa-0">
                    <Equip
                        :equip="equipment.secondaryHand"
                        :position="enumEquipPosition.SecondaryHand"
                        :is-player-equip="true"
                        :show-rarity="true"
                        :size="'small'"
                    ></Equip>
                </v-col>
                <v-col class="pa-0">
                    <Equip
                        :equip="equipment.body"
                        :position="enumEquipPosition.Body"
                        :is-player-equip="true"
                        :show-rarity="true"
                        :size="'small'"
                    ></Equip>
                </v-col>
                <v-col class="pa-0">
                    <Equip
                        :equip="equipment.pants"
                        :position="enumEquipPosition.Pants"
                        :is-player-equip="true"
                        :show-rarity="true"
                        :size="'small'"
                    ></Equip>
                </v-col>
                <v-col class="pa-0">
                    <Equip
                        :equip="equipment.shoes"
                        :position="enumEquipPosition.Shoes"
                        :is-player-equip="true"
                        :show-rarity="true"
                        :size="'small'"
                    ></Equip>
                </v-col>
            </v-row>

            <v-row class="align-center px-3 pt-3 ma-0">
                <v-col cols="12" class="pa-0">
                    <Btn
                        :text="'自盡'"
                        :size="'small'"
                        :func="() => openConfirmBox"
                    ></Btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

    <ConfirmBox
        ref="confirmBoxRef"
        :message="'確定要自盡？此路一去不回頭'"
        :func="goGameOver"
    ></ConfirmBox>
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
import Btn from '@/components/system/Btn.vue';
import ConfirmBox from '@/components/system/ConfirmBox.vue';
import { enumEquipPosition } from '@/enums/equip';
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';
import { usePlayerStore } from '@/store/player';
import { thousands } from '@/utils/number';

const playerStore = usePlayerStore();
const appStore = useAppStore();
const player = computed(() => playerStore.currentPlayer!);
const extraStatus = computed(() => playerStore.extraStatus);

const confirmBoxRef = ref<typeof ConfirmBox>();

const equipment = computed(() => ({
    head: player.value.equipment[enumEquipPosition.Head],
    primaryHand: player.value.equipment[enumEquipPosition.PrimaryHand],
    secondaryHand: player.value.equipment[enumEquipPosition.SecondaryHand],
    body: player.value.equipment[enumEquipPosition.Body],
    pants: player.value.equipment[enumEquipPosition.Pants],
    shoes: player.value.equipment[enumEquipPosition.Shoes]
}));

const currentBackpackItems = computed(() => {
    const result =
        player.value.backpack.cards.length +
        player.value.backpack.equips.length;

    return result;
});

const openConfirmBox = () => {
    confirmBoxRef.value?.show();
};

const goGameOver = () => {
    appStore.changeGameState(enumGameState.GameOver);
};
</script>
