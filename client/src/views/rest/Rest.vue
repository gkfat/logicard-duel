<template>
    <div
        class="campfire"
        :style="{ opacity: opacity.current }"
    />

    <Status v-if="appStore.viewLocation === enumViewLocation.Status" />
    <Backpack v-if="appStore.viewLocation === enumViewLocation.Backpack" />
    <Shop v-if="appStore.viewLocation === enumViewLocation.Shop" />
    <Rank v-if="appStore.viewLocation === enumViewLocation.Rank" />
</template>
<script lang="ts" setup>
import {
    onBeforeMount,
    onMounted,
    ref,
    watch,
} from 'vue';

import { useSoundEffect } from '@/composable/useSoundEffect';
import { enumViewLocation } from '@/enums/view-location';
import { useAppStore } from '@/store/app';
import { sleepSeconds } from '@/utils/common';

import Backpack from './backpack/Backpack.vue';
import Rank from './rank/Rank.vue';
import Shop from './shop/Shop.vue';
import Status from './status/Status.vue';

const appStore = useAppStore();
const { soundClick } = useSoundEffect();

watch(
    () => appStore.viewLocation,
    () => {
        window.scrollTo({ top: 0 });
        soundClick();
    },
);

const opacity = ref({
    current: 1,
    max: 1,
    min: 0.6,
});

const decreasing = ref(true);
const BREATHE_SECOONDS = 1.5;
const BREATHE_INTERVAL_MILISECONDS = 150;

// eslint-disable-next-line no-undef
const intervalChangingBackground = ref<NodeJS.Timeout>();

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