<template>
    <template
        v-if="enemy.Character"
    >
        <v-col
            cols="12"
            class="pa-0 align-self-stretch"
        >
            <Dialog :dialogs="dialogs" />
        </v-col>

        <v-col
            cols="12"
            class="pa-0 align-self-end"
        >
            <PlayerStatus
                :player="enemy"
                :display="true"
            />

            <v-spacer class="mb-3" />

            <BtnText
                :text="t('button.battle')"
                :func="startBattle"
            />
        </v-col>
    </template>
</template>

<script setup lang="ts">
import {
    computed,
    onMounted,
} from 'vue';

import { useI18n } from 'vue-i18n';

import PlayerStatus from '@/components/player-status/PlayerStatus.vue';
import BtnText from '@/components/system/BtnText.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/index';
import {
    enumCharacter,
    enumDialog,
    enumGameState,
} from '@/enums/game';
import {
    useGameStateStore,
    usePlayerStore,
} from '@/store';
import useSoundStore from '@/store/sound';

const { t } = useI18n();
const soundStore = useSoundStore();
const playerStore = usePlayerStore();
const gameStateStore = useGameStateStore();
const enemy = computed(() => playerStore.enemy);
const dialogs = DialogDataList[enumDialog.BattleStart];

onMounted(() => {
    if (!enemy.value.Character) { // 若敵人是第一次初始化，就產生工作型 GKBot
        playerStore.generateEnemy(enumCharacter.GkbotWorker);
    } else {
        playerStore.generateEnemy();
    }
});

const startBattle = async () => {
    await soundStore.playSound(soundStore.sounds.effect.click);
    gameStateStore.changeGameState(enumGameState.Battle);
};

// 選擇要帶入的技術牌
</script>

<style lang="scss" scoped>

</style>
