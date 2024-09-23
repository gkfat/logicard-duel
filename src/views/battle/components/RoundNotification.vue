<template>
    <v-card
        v-if="isVisible"
        flat
        class="round-notification bg-transparent"
        :class="{
            'slide-in': slideIn,
            'slide-out': slideOut,
        }"
        :width="150"
    >
        <v-divider
            class="text-white opacity-100 my-1"
            :thickness="1"
        ></v-divider>

        <v-card-text class="text-white text-center text-h5 text-nowrap">{{
            message
        }}</v-card-text>

        <v-divider
            class="text-white opacity-100 my-1"
            :thickness="1"
        ></v-divider>
    </v-card>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

import { enumRoundPhase } from '@/enums/battle';
import { useBattleStore } from '@/store/battle';
import { sleep } from '@/utils/common';

const battleStore = useBattleStore();
const roundPhase = computed(() => battleStore.roundPhase);
const isVisible = ref(true);
const slideIn = ref(false);
const slideOut = ref(false);
const message = ref('');

const resetPosition = () => {
    isVisible.value = false;
    slideOut.value = false;
    slideIn.value = false;
};

watch(
    () => roundPhase,
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

        if (isVisible.value) {
            slideIn.value = true;

            await sleep(2000);

            slideOut.value = true;

            await sleep(600);

            resetPosition();
        }
    }
);
</script>

<style scoped>
.round-notification {
    position: fixed;
    top: 50%;
    left: -120%;
    transform: translateY(-50%);
    transition: left 0.5s ease;
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
