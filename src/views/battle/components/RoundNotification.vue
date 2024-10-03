<template>
    <div
        v-if="isShow"
        :class="{
            'opacity-0': !isVisible,
            'opacity-75': isVisible,
        }"
        class="border position-absolute bg-primary d-flex justify-center align-center"
        :style="{
            top: '40%',
            left: 0,
            right: 0,
            height: '100px',
            transition: 'all 0.3s',
        }"
    >
        <v-card
            flat
            class="round-notification bg-transparent"
            :class="{
                'slide-in': slideIn,
                'slide-out': slideOut,
            }"
            :width="200"
        >
            <v-card-title
                class="text-darkgrey font-italic text-center text-h4 text-nowrap"
                >{{ message }}</v-card-title
            >
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

import { enumRoundPhase } from '@/enums/battle';
import { useBattleStore } from '@/store/battle';
import { sleepSeconds } from '@/utils/common';

const battleStore = useBattleStore();
const roundPhase = computed(() => battleStore.roundPhase);
const isShow = ref(false);
const isVisible = ref(false);
const slideIn = ref(false);
const slideOut = ref(false);
const message = ref('');

const resetPosition = () => {
    slideOut.value = false;
    slideIn.value = false;
};

watch(
    () => roundPhase.value,
    async () => {
        switch (roundPhase.value) {
            case enumRoundPhase.RoundStart: // 開始
                message.value = '回合開始';
                isVisible.value = true;
                break;
            case enumRoundPhase.Main: // 出牌
                message.value = '開始出牌';
                isVisible.value = true;
                // 倒數計時
                break;
            case enumRoundPhase.Duel: // 開牌
                message.value = '停止出牌';
                isVisible.value = true;
                break;
            default:
                message.value = '';
                break;
        }

        isShow.value = true;

        await sleepSeconds(0.3);

        if (isVisible.value) {
            slideIn.value = true;

            await sleepSeconds(1);

            slideOut.value = true;

            await sleepSeconds(0.5);

            isVisible.value = false;

            await sleepSeconds(0.5);

            isShow.value = false;

            setTimeout(() => {
                resetPosition();
            }, 2000);
        }
    }
);
</script>

<style scoped>
.round-notification {
    position: absolute;
    top: 50%;
    left: -120%;
    transform: translateY(-50%);
    transition: left 0.5s ease;
    z-index: 2;
}

/* 當顯示時，將其移動到中間 */
.round-notification.slide-in {
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.round-notification.slide-out {
    left: 120%;
}
</style>
