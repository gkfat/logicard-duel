<template>
    <v-container>
        <v-row class="flex-nowrap align-cetner">
            <v-col>
                <Btn
                    :text="'自盡'"
                    :func="() => openConfirmBox()"
                />
            </v-col>
        </v-row>
    </v-container>

    <ConfirmBox
        ref="confirmBoxRef"
        :message="'確定要自盡？此路一去不回頭'"
        :func="goGameOver"
    />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import Btn from '@/components/system/Btn.vue';
import ConfirmBox from '@/components/system/ConfirmBox.vue';
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();

const confirmBoxRef = ref<typeof ConfirmBox>();

const openConfirmBox = () => {
    confirmBoxRef.value?.show();
};

const goGameOver = () => {
    appStore.isSettingDrawerOpen = false;
    appStore.changeGameState(enumGameState.GameOver);
};

</script>
