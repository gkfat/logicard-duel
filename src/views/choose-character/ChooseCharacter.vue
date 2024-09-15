<template>
    <v-col
        cols="12"
        class="pa-0 align-self-stretch"
    >
        <Dialog :dialogs="dialogs[dialogIndex]" />
    </v-col>

    <v-col
        v-if="!dialogEnd"
        cols="12"
        class="pa-0 mt-auto"
    >
        <BtnText
            :text="t('button.skip')"
            :func="dialogNextToEnd"
        />
        <v-spacer class="mb-3" />
        <BtnText
            :text="t('button.next')"
            :func="dialogNext"
        />
    </v-col>

    <!-- 選擇角色 -->
    <v-col
        v-if="dialogEnd"
        class="pa-0 mt-auto"
    >
        <v-carousel
            v-model="characterIndex"
            hide-delimiters
            height="auto"
            class="mb-10"
            show-arrows="hover"
            :delimiter-icon="'mdi-face-man'"
        >
            <v-carousel-item
                v-for="(character, index) in characterList"
                :key="index"
                :value="index"
            >
                <div
                    class="d-flex justify-center align-center"
                    style="height: 100%; max-height: 400px;"
                >
                    <CharacterCard :character="character" />
                </div>
            </v-carousel-item>
        </v-carousel>

        <BtnText
            :text="t('button.confirm')"
            :func="confirmCharacter"
        />
    </v-col>
</template>

<script setup lang="ts">
import {
    computed,
    ref,
} from 'vue';

import { useI18n } from 'vue-i18n';

import BtnText from '@/components/system/BtnText.vue';
import Dialog from '@/components/system/Dialog.vue';
import { CharacterDataList } from '@/data/characters';
import { DialogDataList } from '@/data/dialogs';
import {
    enumDialog,
    enumGameState,
} from '@/enums/game';
import Util from '@/service/util';
import {
    useGameStateStore,
    usePlayerStore,
    useSwitchToggleStore,
} from '@/store';
import useSoundStore from '@/store/sound';

import CharacterCard from './components/CharacterCard.vue';

const playerStore = usePlayerStore();
const switchToggleStore = useSwitchToggleStore();
const gameStateStore = useGameStateStore();
const soundStore = useSoundStore();
const { t } = useI18n();

const dialogs = DialogDataList[enumDialog.GameStart];
const dialogEndIndex = dialogs.length - 1;
const dialogIndex = ref(0);
const dialogEnd = computed(() => dialogIndex.value === dialogEndIndex);

const dialogNext = async () => {
    if (dialogIndex.value < dialogEndIndex) {
        await soundStore.playSound(soundStore.sounds.effect.click);
        dialogIndex.value += 1;
    }
};

const dialogNextToEnd = async () => {
    await soundStore.playSound(soundStore.sounds.effect.click);
    dialogIndex.value = dialogEndIndex;
};

/** 選擇的角色 index */
const characterIndex = ref(0);

// 選擇角色
const characterList = CharacterDataList.filter((c) => c.type === 'player');

const confirmCharacter = async () => {
    await soundStore.playSound(soundStore.sounds.effect.click);
    const character = characterList[characterIndex.value];
    playerStore.selectCharacter(character);
    switchToggleStore.switchSpinner(true);
    await Util.sleep(300);
    gameStateStore.changeGameState(enumGameState.BattleStart);
    switchToggleStore.switchSpinner(false);

    gameStateStore.changeGameState(enumGameState.Rest);
};
</script>
