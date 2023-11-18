<template>
    <div
        v-if="player && player.Character && player.ItemList && player.CardDataList"
        id="backpack"
        class="frame"
        :class="{ 'frame-show': switchToggleStore.backpackOpen }"
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
            <template v-if="player.ItemList.length === 0">
                <p class="reminder-text">
                    {{ $t('backpack.empty') }}{{ $t('equip') }}。
                </p>
            </template>
            <template v-else>
                <div
                    v-for="(item, i) in player.ItemList"
                    :key="i"
                >
                    <ItemComponent
                        :equiped="isEquiped(i)"
                        :backpack="true"
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
            <template v-if="player.CardDataList.length === 0">
                <p class="reminder-text">
                    {{ $t('backpack.empty') }}{{ $t('tech_card') }}。
                </p>
            </template>
            <template v-else>
                <div
                    v-for="(item, i) in player.CardDataList"
                    :key="i"
                >
                    <ItemComponent
                        :backpack="true"
                        :item="item"
                    />
                </div>
            </template>
        </div>
        <button
            type="button"
            class="w-100 system-btn"
            @click="closeBackpack()"
        >
            {{ $t('button.close_backpack') }}
        </button>
    </div>
</template>

<script setup name="Backpack" lang="ts">
import {
    computed,
    ref,
} from 'vue';

import { DialogDataList } from '@/data';
import Sound from '@/service/sounds';
import {
    usePlayerStore,
    useSwitchToggleStore,
} from '@/store';
import { enumDialog } from '@/types/enums';

import Dialog from './Dialog.vue';
import ItemComponent from './ItemComponent.vue';

const playerStore = usePlayerStore();
const switchToggleStore = useSwitchToggleStore();

const dialogs = DialogDataList[enumDialog.Backpack];
const player = computed(() => playerStore.player);
const displayType = ref(0);

const toggleDisplayType = async (type: number) => {
    await Sound.playSound(Sound.sounds.effect.click);
    displayType.value = type;
};

const isEquiped = (i: number) => {
    if (player.value.WeaponIndex && player.value.WeaponIndex - 1 === i) {
        return true;
    } if (player.value.ArmorIndex && player.value.ArmorIndex - 1 === i) {
        return true;
    }
    return false;
};

// 關上背包
const closeBackpack = async () => {
    switchToggleStore.toggle('backpack');
};
</script>

<style lang="scss" scoped>
#backpack {
    height: 90%;
}
.items-container {
    height: 100%;
    gap: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-grow: 1;
    overflow-y: scroll;
}
</style>
