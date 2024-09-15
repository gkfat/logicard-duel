<template>
    <div style="position: relative;">
        <!-- 喃喃自語 -->
        <div style="position: absolute; top: -20px; left: 10px; z-index: 1;">
            <Mumble :who-is-mumbling="whoIsMumbling" />
        </div>

        <v-card
            v-if="player.Character"
            flat
            color="bluegrey"
            class="rounded-lg border-lg"
            style="overflow: none;"
        >
            <v-row class="ma-0 justify-center">
                <!-- 頭像 -->
                <v-col
                    cols="12"
                    class="pb-0"
                >
                    <v-row class="ma-0">
                        <v-col
                            :cols="display ? 12 : 3"
                            class="text-center pa-0"
                        >
                            <v-avatar
                                :image="player.Character.Avatar"
                                class="border"
                                :size="50"
                            />
                        </v-col>
                        <v-col
                            :cols="display ? 12 : 9"
                            class="pa-0"
                            :class="{ 'text-center': display }"
                        >
                            <p class="text-h6">
                                {{ player.Character.Name }}
                            </p>
                            <p
                                v-if="display"
                                class="text-caption"
                            >
                                {{ player.Character.Description }}
                            </p>
                        </v-col>
                    </v-row>
                </v-col>

                <!-- 血條 -->
                <v-col
                    cols="12"
                    class="py-0 my-2"
                    style="position: relative;"
                >
                    <v-progress-linear
                        v-model="healthPercent"
                        class="rounded-xl"
                        color="red"
                        height="20"
                    >
                        <template #default>
                            <strong class="text-white">
                                {{ player.CurrentHealth }} / {{ player.Character.Health }}
                            </strong>
                        </template>
                    </v-progress-linear>
                    <!-- 扣血動畫 -->
                    <p
                        v-if="healthChange !== 0"
                        class="text-red font-weight-bold text-h6 flow-up"
                        style="position: absolute; right: 0; bottom: 0;"
                    >
                        {{ healthChange }}
                    </p>
                </v-col>

                <!-- 屬性 -->
                <v-col
                    cols="12"
                    class="pa-0 pb-3"
                >
                    <v-row
                        class="ma-0 px-3 ga-3"
                        :class="{ 'justify-center': display }"
                    >
                        <!-- 攻擊力 -->
                        <v-col
                            cols="auto"
                            class="pa-0 d-flex justify-center align-center ga-1"
                        >
                            <!-- 裝備欄 -->
                            <Equip
                                :type="'weapon'"
                                :player="player"
                            />

                            <v-icon color="skin">
                                mdi-sword-cross
                            </v-icon>
                            <span class="text-h6">{{ player.CurrentAttack }}</span>
                            <span
                                v-if="player.ExtraAttack > 0"
                                class="text-h6"
                            >
                                (+ {{ player.ExtraAttack }})
                            </span>
                        </v-col>

                        <!-- 防禦力 -->
                        <v-col
                            cols="auto"
                            class="pa-0 d-flex justify-center align-center ga-1"
                        >
                            <!-- 裝備欄 -->
                            <Equip
                                :type="'armor'"
                                :player="player"
                            />
                            <v-icon color="skin">
                                mdi-shield
                            </v-icon>
                            <span class="text-h6">{{ player.CurrentDefense }}</span>
                            <span
                                v-if="player.ExtraDefense > 0"
                                class="text-h6"
                            >(+ {{ player.ExtraDefense }})</span>
                        </v-col>
                        <!-- 螺絲釘 -->
                        <v-col
                            v-if="player.Character.Type === 'P'"
                            cols="auto"
                            class="ml-auto pa-0 me-5 d-flex justify-center align-center"
                            style="position: relative;"
                        >
                            <v-icon color="skin">
                                mdi-screw-round-top
                            </v-icon>
                            <span class="text-h6 text-yellow mx-1">{{ player.Coin }}</span>
                            <!-- 獲得螺絲釘動畫 -->
                            <p
                                v-if="coinChange > 0"
                                class="text-yellow font-weight-bold text-h6"
                                style="position: absolute; right: -20px; bottom: 0;"
                            >
                                +{{ coinChange }}
                            </p>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import {
    computed,
    onMounted,
    ref,
    toRefs,
    watch,
} from 'vue';

import Util from '@/service/util';
import { Game } from '@/types';

import Equip from './Equip.vue';
import Mumble from './Mumble.vue';

const props = withDefaults(defineProps<{
    player: Game.Player,
    whoIsMumbling?: 'player' | 'enemy',
    display?: boolean,
}>(), {
    whoIsMumbling: 'player',
    display: false,
});

const { player, display } = toRefs(props);

// 生命值變化
const healthPercent = computed(
    () => (player.value.CurrentHealth / player.value.Character!.Health) * 100,
);
const healthChange = ref(0);
const lastHealth = ref(0);

// 螺絲釘變化
const coinChange = ref(0);
const lastCoin = ref(0);

const weaponItem = ref(null as Game.Item | null);
const armorItem = ref(null as Game.Item | null);

// 更新角色裝備
const updateWearingItem = () => {
    weaponItem.value = player.value.WeaponIndex
        ? player.value.ItemList[player.value.WeaponIndex - 1]
        : null;
    armorItem.value = player.value.ArmorIndex
        ? player.value.ItemList[player.value.ArmorIndex - 1]
        : null;
};

watch((player.value), async () => {
    // 監聽生命值變化
    if (player.value.CurrentHealth !== lastHealth.value) {
        healthChange.value = player.value.CurrentHealth - lastHealth.value;
        await Util.sleep(1000);
        lastHealth.value = player.value.CurrentHealth;
        healthChange.value = 0;
    }
    // 監聽螺絲釘變化
    if (player.value.Coin !== lastCoin.value) {
        coinChange.value = player.value.Coin - lastCoin.value;
        await Util.sleep(1000);
        lastCoin.value = player.value.Coin;
        coinChange.value = 0;
    }
    // 裝備變化
    updateWearingItem();
});

onMounted(() => {
    updateWearingItem();
    lastHealth.value = player.value.CurrentHealth;
    lastCoin.value = player.value.Coin;
});

</script>

<style lang="scss" scoped>

.flow-up {
  animation-name: flowUp;
  animation-duration: 1s;
}

@keyframes flowUp {
  0% {
    transform: none;
    opacity: 100;
  }
  50% {
    opacity: 80;
  }
  to {
    transform: translateY(-20px);
  }
}
</style>
