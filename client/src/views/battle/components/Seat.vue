<template>
    <v-card
        flat
        color="bluegrey"
        class="border-white border-lg rounded-lg border-opacity-75 position-relative"
    >
        <v-row class="ma-0 align-center">
            <!-- Avatar -->
            <v-col
                cols="auto"
                class="d-flex justify-center align-center position-relative"
            >
                <v-progress-circular
                    color="red"
                    :model-value="currentHealthPercent"
                    :width="6"
                    :size="70"
                >
                    <template #default>
                        <PlayerAvatar
                            :character="player.character"
                        />
                    </template>
                </v-progress-circular>

                    <!-- 血量變化動畫 -->
                    <div
                        v-if="mutatedHealth !== 0"
                        class="position-absolute"
                        :class="{
                            'health-change': mutatedHealth !== 0,
                            'text-red': mutatedHealth < 0,
                            'text-green': mutatedHealth > 0,
                        }"
                        :style="{
                            top: 0,
                            right: 0,
                        }"
                    >
                        {{ mutatedHealth }}
                    </div>
            </v-col>

            <!-- 狀態值 -->
            <v-col class="d-flex align-center flex-wrap flex-grow-1 ga-3">
                <!-- 攻擊 -->
                <v-col
                    cols="auto"
                    class="pa-0 d-flex align-center ga-1"
                >
                    <IconAttack />
                    {{ player.status.attack }}
                    <em
                        v-if="extraStatus.attack"
                        class="text-darkamber"
                    >
                        (+{{ extraStatus.attack }})
                    </em>
                </v-col>

                <!-- 防禦 -->
                <v-col
                    cols="auto"
                    class="pa-0 d-flex align-center ga-1"
                >
                    <IconDefense />
                    {{ player.status.defense }}
                    <em
                        v-if="extraStatus.defense"
                        class="text-darkamber"
                    >
                        (+{{ extraStatus.defense }})
                    </em>
                </v-col>

                <!-- 背包剩餘牌 -->
                <v-col
                    cols="auto"
                    class="pa-0 d-flex align-center ga-1"
                >
                    <IconPokerCard />
                    {{ player.backpack.cards.length }}
                </v-col>

                <!-- 裝備 -->
                <v-col
                    cols="12"
                    class="pa-0 d-flex align-center ga-1"
                >
                    <!-- 頭 -->
                    <v-col
                        cols="auto"
                        class="pa-0"
                    >
                        <Equip
                            :equip="
                                player.equipment[enumEquipPosition.Head]
                            "
                            :position="enumEquipPosition.Head"
                            :is-player-equip="false"
                            :show-rarity="false"
                            :show-detail="false"
                            :size="'x-small'"
                        />
                    </v-col>

                    <!-- 主武器 -->
                    <v-col
                        cols="auto"
                        class="pa-0"
                    >
                        <Equip
                            :equip="
                                player.equipment[
                                    enumEquipPosition.PrimaryHand
                                ]
                            "
                            :position="enumEquipPosition.PrimaryHand"
                            :is-player-equip="false"
                            :show-rarity="false"
                            :show-detail="false"
                            :size="'x-small'"
                        />
                    </v-col>

                    <!-- 副武器 -->
                    <v-col
                        cols="auto"
                        class="pa-0"
                    >
                        <Equip
                            :equip="
                                player.equipment[
                                    enumEquipPosition.SecondaryHand
                                ]
                            "
                            :position="enumEquipPosition.SecondaryHand"
                            :is-player-equip="false"
                            :show-rarity="false"
                            :show-detail="false"
                            :size="'x-small'"
                        />
                    </v-col>

                    <!-- 身體 -->
                    <v-col
                        cols="auto"
                        class="pa-0"
                    >
                        <Equip
                            :equip="
                                player.equipment[enumEquipPosition.Body]
                            "
                            :position="enumEquipPosition.Body"
                            :is-player-equip="false"
                            :show-rarity="false"
                            :show-detail="false"
                            :size="'x-small'"
                        />
                    </v-col>

                    <!-- 褲子 -->
                    <v-col
                        cols="auto"
                        class="pa-0"
                    >
                        <Equip
                            :equip="
                                player.equipment[
                                    enumEquipPosition.Pants
                                ]
                            "
                            :position="enumEquipPosition.Pants"
                            :is-player-equip="false"
                            :show-rarity="false"
                            :show-detail="false"
                            :size="'x-small'"
                        />
                    </v-col>
                    <!-- 鞋子 -->
                    <v-col
                        cols="auto"
                        class="pa-0"
                    >
                        <Equip
                            :equip="
                                player.equipment[
                                    enumEquipPosition.Shoes
                                ]
                            "
                            :position="enumEquipPosition.Shoes"
                            :is-player-equip="false"
                            :show-rarity="false"
                            :show-detail="false"
                            :size="'x-small'"
                        />
                    </v-col>
                </v-col>
            </v-col>
        </v-row>

        <MumbleBubble :mumble-content="mumbleContent" />
    </v-card>
</template>

<script lang="ts" setup>
import {
  computed,
  ref,
  watch,
} from 'vue';

import PlayerAvatar from '@/components/common/PlayerAvatar.vue';
import Equip from '@/components/equip/Equip.vue';
import IconAttack from '@/components/icons/IconAttack.vue';
import IconDefense from '@/components/icons/IconDefense.vue';
import IconPokerCard from '@/components/icons/IconPokerCard.vue';
import { enumEquipPosition } from '@/enums/equip';
import { Player } from '@/types/player';
import { sleepSeconds } from '@/utils/common';

import MumbleBubble from '../components/MumbleBubble.vue';

const {
    player, mumbleContent, extraStatus, 
} = defineProps<{
    player: Player;
    mumbleContent: string;
    extraStatus: { attack: number; defense: number };
}>();

const currentHealthPercent = computed(() => (player.status.health / player.status.maxHealth) * 100);

/** 上一次變化的後血量 */
const lastHealth = ref(player.status.health);

/** 血量變化 */
const mutatedHealth = ref(0);

/** 播放扣血動畫 */
watch(
    () => player.status.health,
    async () => {
        mutatedHealth.value = player.status.health - lastHealth.value;

        await sleepSeconds(1);

        lastHealth.value = player.status.health;
        mutatedHealth.value = 0;
    },
);
</script>

<style lang="scss" scoped>
.health-change {
    animation: healthChange 1s ease-out;
    animation-delay: 0.3s;
}

@keyframes healthChange {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-20px);
    }
}
</style>
