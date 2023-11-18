<template>
    <div
        v-if="player && player.ItemList && player.Character"
        id="shop"
        class="frame"
        :class="{ 'frame-show': switchToggleStore.shopOpen }"
    >
        <Dialog :dialogs="dialogs" />
        <p class="w-100 text-center m-0">
            {{ $t('coin') }}：{{ player.Coin }}｜
            {{ $t('item') }}：{{ player.ItemList.length + '／' + player.Character.ItemLimit }}
        </p>
        <div class="nav-container">
            <button
                type="button"
                class="nav-btn"
                :class="{ 'nav-btn-active': displayType === 0 }"
                @click="toggleDisplayType(0)"
            >
                {{ $t('equip') }}
            </button>
            <button
                type="button"
                class="nav-btn"
                :class="{ 'nav-btn-active': displayType === 1 }"
                @click="toggleDisplayType(1)"
            >
                {{ $t('tech_card') }}
            </button>
        </div>
        <div
            v-if="displayType === 0"
            class="items-container"
        >
            <template v-if="shop.ItemList.length === 0">
                <p class="reminder-text">
                    {{ $t('shop.empty') }}{{ $t('equip') }}。
                </p>
            </template>
            <template v-else>
                <div
                    v-for="(item, i) in shop.ItemList"
                    :key="i"
                >
                    <ItemComponent
                        :shop="true"
                        :item="item"
                        :index="i"
                    />
                </div>
            </template>
        </div>
        <div
            v-if="displayType === 1"
            class="items-container"
        >
            <template v-if="shop.CardDataList.length === 0">
                <p class="reminder-text">
                    {{ $t('shop.empty') }}{{ $t('tech_card') }}。
                </p>
            </template>
            <template v-else>
                <div
                    v-for="(item, i) in shop.CardDataList"
                    :key="i"
                >
                    <ItemComponent
                        :shop="true"
                        :item="item"
                        :index="i"
                    />
                </div>
            </template>
        </div>
        <button
            type="button"
            class="system-btn"
            @click="closeShop()"
        >
            {{ $t('button.leave') }}{{ $t('button.shop') }}
        </button>
    </div>
</template>

<script setup name="Shop" lang="ts">
import {
    computed,
    ref,
} from 'vue';

import { DialogDataList } from '@/data/index';
import Sound from '@/service/sounds';
import {
    usePlayerStore,
    useShopStore,
    useSwitchToggleStore,
} from '@/store';
import { enumDialog } from '@/types/enums';

import Dialog from './Dialog.vue';
import ItemComponent from './ItemComponent.vue';

const switchToggleStore = useSwitchToggleStore();
const playerStore = usePlayerStore();
const shopStore = useShopStore();

const dialogs = DialogDataList[enumDialog.Shop];
const player = computed(() => playerStore.player);
const shop = computed(() => shopStore.shop);

const displayType = ref(0);

const toggleDisplayType = async (type: number) => {
    await Sound.playSound(Sound.sounds.effect.click);
    displayType.value = type;
};

const closeShop = async () => {
    switchToggleStore.toggle('shop');
};
</script>

<style lang="scss" scoped>
#shop {
    height: 90%;
}
.items-container {
    padding-top: 10px;
    height: 100%;
    gap: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-grow: 1;
    overflow-y: scroll;
}
</style>
