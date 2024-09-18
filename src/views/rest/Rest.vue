<template>
    <div class="campfire" :style="{ opacity: opacity.current }" />

    <v-card flat class="bg-transparent fill-height">
        <v-card-text class="pa-0 mb-3">
            <Dialog :dialogs="dialogs" :max-height="150" />
        </v-card-text>

        <!-- 角色 -->
        <v-card-text class="pa-0 overflow-y-auto mb-3">
            <Status></Status>
        </v-card-text>

        <!-- 功能列 -->
        <v-card-text class="pa-0 mb-3">
            <v-row class="ma-0 ga-3 justify-center mt-auto">
                <!-- 背包 -->
                <v-col class="pa-0">
                    <BtnIcon
                        :block="true"
                        :icon="'mdi-bag-personal'"
                        :func="() => appStore.openDialog('backpack')"
                    ></BtnIcon>
                </v-col>
                <!-- 排行榜 -->
                <v-col class="pa-0">
                    <BtnIcon
                        :block="true"
                        :icon="'mdi-script-text'"
                        :func="() => appStore.openDialog('rank')"
                    ></BtnIcon>
                </v-col>
                <!-- 商店 -->
                <v-col class="pa-0">
                    <BtnIcon
                        :block="true"
                        :icon="'mdi-cart'"
                        :func="() => appStore.openDialog('shop')"
                    ></BtnIcon>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-actions class="pa-0">
            <BtnText :text="t('button.next_battle')" :func="battleStart" />
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import {
    onBeforeMount,
    onMounted,
    ref,
} from 'vue';

import { useI18n } from 'vue-i18n';

import BtnIcon from '@/components/system/BtnIcon.vue';
// import Backpack from '@/components/backpack/Backpack.vue';
// import Rank from '@/components/rank/Rank.vue';
// import Shop from '@/components/shop/Shop.vue';
import BtnText from '@/components/system/BtnText.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';
import { useSoundStore } from '@/store/sound';
import { sleep } from '@/utils/common';

import Status from './components/Status.vue';

const appStore = useAppStore();
const soundStore = useSoundStore();
const { t } = useI18n();

const dialogs = DialogDataList[enumDialog.Rest];

let opacity = ref({
    current: 1,
    max: 1,
    min: 0.6,
});

let decreasing = ref(true);
const BREATHE_TIME = 170;

// eslint-disable-next-line no-undef
const intervalChangingBackground = ref<NodeJS.Timeout>();

const battleStart = async () => {
    await soundStore.playSound(soundStore.sounds.effect.click);
    appStore.changeGameState(enumGameState.BattleStart);
};

const increaseOpacity = () => {
    intervalChangingBackground.value = setInterval(async () => {
        if (!decreasing.value) {
            opacity.value.current += 0.1;

            if (opacity.value.current >= opacity.value.max) {
                opacity.value.current = opacity.value.max;
                clearInterval(intervalChangingBackground.value);

                await sleep(BREATHE_TIME * 10);

                // 轉向
                decreasing.value = true;
                decreaseOpacity();
            }
        }
    }, BREATHE_TIME);
};

const decreaseOpacity = () => {
    intervalChangingBackground.value = setInterval(async () => {
        if (decreasing.value) {
            opacity.value.current -= 0.1;

            if (opacity.value.current <= opacity.value.min) {
                opacity.value.current = opacity.value.min;
                clearInterval(intervalChangingBackground.value);

                await sleep(BREATHE_TIME * 10);

                // 轉向
                decreasing.value = false;
                increaseOpacity();
            }
        }
    }, BREATHE_TIME);
};

onMounted(async () => {
    await sleep(3000);

    decreaseOpacity();
});

onBeforeMount(() => {
    clearInterval(intervalChangingBackground.value);
});
</script>

<style lang="scss" scoped>
.campfire {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://storage.googleapis.com/logicard_duel/gifs/rest.gif');
    background-size: cover;
    background-position-y: 70%;
    background-repeat: no-repeat;
    z-index: -1;
    opacity: 0.8;
}
</style>
