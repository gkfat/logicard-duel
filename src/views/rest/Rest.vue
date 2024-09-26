<template>
    <div class="campfire" :style="{ opacity: opacity.current }" />

    <v-row class="w-100 ma-0 ga-3 flex-column pb-3">
        <v-col cols="auto" class="pa-0">
            <Dialog :dialogs="dialogs" :max-height="150" />
        </v-col>

        <!-- 角色 -->
        <v-col cols="auto" class="pa-0 flex-grow-1">
            <Status></Status>
        </v-col>

        <!-- 功能列 -->
        <v-col cols="auto" class="pa-0 mt-auto">
            <v-row class="ma-0 ga-3 justify-center mt-auto">
                <!-- 背包 -->
                <v-col class="pa-0">
                    <Btn
                        :icon="'mdi-bag-personal'"
                        :func="() => appStore.openDialog('backpack')"
                    ></Btn>
                </v-col>
                <!-- 排行榜 -->
                <v-col class="pa-0">
                    <Btn
                        :icon="'mdi-script-text'"
                        :func="() => appStore.openDialog('rank')"
                    ></Btn>
                </v-col>
                <!-- 商店 -->
                <v-col class="pa-0">
                    <Btn
                        :icon="'mdi-cart'"
                        :func="() => appStore.openDialog('shop')"
                    ></Btn>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="auto" class="pa-0">
            <Btn :text="t('button.next_battle')" :func="goOut" />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';

import { useI18n } from 'vue-i18n';

import Btn from '@/components/system/Btn.vue';
import Dialog from '@/components/system/Dialog.vue';
import { useSoundEffect } from '@/composable/useSoundEffect';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';
import { sleepSeconds } from '@/utils/common';

import Status from './components/Status.vue';

const appStore = useAppStore();
const { t } = useI18n();
const { soundClick } = useSoundEffect();

const dialogs = DialogDataList[enumDialog.Rest];

let opacity = ref({
    current: 1,
    max: 1,
    min: 0.6,
});

let decreasing = ref(true);
const BREATHE_SECOONDS = 1.5;
const BREATHE_INTERVAL_MILISECONDS = 150;

// eslint-disable-next-line no-undef
const intervalChangingBackground = ref<NodeJS.Timeout>();

const goOut = async () => {
    await soundClick(() =>
        appStore.changeGameState(enumGameState.ChooseOpponent)
    );
};

const increaseOpacity = () => {
    intervalChangingBackground.value = setInterval(async () => {
        if (!decreasing.value) {
            opacity.value.current += 0.1;

            if (opacity.value.current >= opacity.value.max) {
                opacity.value.current = opacity.value.max;
                clearInterval(intervalChangingBackground.value);

                await sleepSeconds(BREATHE_SECOONDS);

                // 轉向
                decreasing.value = true;
                decreaseOpacity();
            }
        }
    }, BREATHE_INTERVAL_MILISECONDS);
};

const decreaseOpacity = () => {
    intervalChangingBackground.value = setInterval(async () => {
        if (decreasing.value) {
            opacity.value.current -= 0.1;

            if (opacity.value.current <= opacity.value.min) {
                opacity.value.current = opacity.value.min;
                clearInterval(intervalChangingBackground.value);

                await sleepSeconds(BREATHE_SECOONDS);

                // 轉向
                decreasing.value = false;
                increaseOpacity();
            }
        }
    }, BREATHE_INTERVAL_MILISECONDS);
};

onMounted(async () => {
    await sleepSeconds(3);

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
