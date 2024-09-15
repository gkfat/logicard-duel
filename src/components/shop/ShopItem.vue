<template>
    <v-card
        class="bg-amber border-lg pa-0 rounded-lg pa-2"
        :width="100"
        :height="type === 'equip' ? 100 : 130"
        @click="confirmBuyItem(item)"
    >
        <v-row class="ma-0 ga-3">
            <!-- 裝備 -->
            <v-col
                v-if="type === 'equip'"
                cols="12"
                class="pa-0 text-center"
            >
                <Icon
                    :size="'36'"
                    :url="item.Icon"
                />
            </v-col>

            <!-- 技術牌 -->
            <v-col
                v-if="type === 'card'"
                cols="12"
                class="pa-0 d-flex justify-center"
            >
                <Card :item="item" />
            </v-col>

            <!-- 售價 -->
            <v-col
                cols="12"
                class="pa-0 text-center d-flex align-center justify-center"
            >
                <v-icon
                    size="16"
                    icon="mdi-screw-lag"
                />
                <span class="text-subtitle-1">{{ item.Price }}</span>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="ts">
import {
    computed,
    ref,
    toRefs,
} from 'vue';

import Card from '@/components/Card.vue';
import Icon from '@/components/Icon.vue';
import { enumItemType } from '@/enums/game';
import {
    usePlayerStore,
    useShopStore,
} from '@/store';
import useSoundStore from '@/store/sound';
import { Game } from '@/types';

const playerStore = usePlayerStore();
const shopStore = useShopStore();
const soundStore = useSoundStore();
const player = computed(() => playerStore.player);

const props = withDefaults(defineProps<{
    item: Game.Item,
    type: 'equip' | 'card',
    index?: number | null,
}>(), {
    backpack: false,
    type: 'equip',
    index: null,
});

const {
    item,
    type,
} = toRefs(props);

const notAffordable = computed(() => item.value.Price > player.value.Coin);

const askingItem = ref<Game.Item>();
const confirmBuyItem = (item: Game.Item) => {
    askingItem.value = item;
    confirmBoxRef.value!.show();
};

// 購買物品
const buyItem = async () => {
    if (item.value.Price > player.value.Coin) {
        alert('你沒有足夠的螺絲釘。');
    } else {
        const confirmBox = confirm('確定購買？');
        if (confirmBox) {
            await soundStore.playSound(soundStore.sounds.effect.coin);
            const updatedPlayer = { ...player.value };
            updatedPlayer.Coin -= item.value.Price;

            if (isItem) {
                shopStore.shop.ItemList.splice(props.index!, 1);
                updatedPlayer.ItemList.push(item.value);
            } else {
                shopStore.shop.CardDataList.splice(props.index!, 1);
                updatedPlayer.CardDataList.push(item.value);
            }

            playerStore.updatePlayer('player', updatedPlayer);
            alert('感謝購買！');
            toggleControl();
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
