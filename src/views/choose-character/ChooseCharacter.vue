<template>
    <v-row class="w-100 ma-0 ga-3 flex-column pb-3">
        <v-col cols="auto" class="pa-0 flex-grow-1">
            <Dialog :dialogs="dialogs[currentIndex]" />
        </v-col>

        <v-col v-if="!isDialogEnd" cols="auto" class="pa-0 mt-auto">
            <Btn :text="t('button.skip')" :func="dialogNextToEnd" />
            <v-spacer class="mb-3" />
            <Btn :text="t('button.next')" :func="dialogNext" />
        </v-col>

        <!-- 選擇角色 -->
        <v-col v-if="isDialogEnd" cols="auto" class="pa-0">
            <v-row class="ma-0">
                <v-col
                    v-for="(character, index) in characterList"
                    :key="index"
                    cols="12"
                    class="pa-0 mb-1"
                    @click="onCharacterSelected(index)"
                >
                    <CharacterCard
                        :is-selected="currentCharacterIndex === index"
                        :character="character"
                    />
                </v-col>
            </v-row>
        </v-col>

        <v-col v-if="isDialogEnd" cols="auto" class="pa-0 mt-auto">
            <v-spacer class="mb-3" />
            <Btn :text="t('button.confirm')" :func="confirmCharacter" />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useI18n } from 'vue-i18n';

import Btn from '@/components/system/Btn.vue';
import Dialog from '@/components/system/Dialog.vue';
import { useSoundEffect } from '@/composable/useSoundEffect';
import { CharacterTemplateList } from '@/data/character-templates';
import { DialogDataList } from '@/data/dialogs';
import { enumCharacter } from '@/enums/character';
import { enumDialog } from '@/enums/dialog';
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';
import { usePlayerStore } from '@/store/player';
import { sleepSeconds } from '@/utils/common';

import CharacterCard from './components/CharacterCard.vue';

const playerStore = usePlayerStore();
const appStore = useAppStore();
const { soundClick } = useSoundEffect();
const { t } = useI18n();

const dialogs = [DialogDataList[enumDialog.Opening], ...DialogDataList[enumDialog.GameStart]];
const lastIndex = dialogs.length - 1;
const currentIndex = ref(0);
const isDialogEnd = computed(() => currentIndex.value === lastIndex);

/** 下一頁 */
const dialogNext = async() => {
    if (currentIndex.value < lastIndex) {
        await soundClick();
        currentIndex.value += 1;
    }
};

/** 跳過 */
const dialogNextToEnd = async() => {
    await soundClick();
    currentIndex.value = lastIndex;
};

const availableCharacterTypes = [
    enumCharacter.Man,
    enumCharacter.Nerd,
    enumCharacter.Broker,
    enumCharacter.Artist,
    enumCharacter.Grandma,
];

/** 可選角色清單 */
const characterList = CharacterTemplateList.filter((c) =>
    availableCharacterTypes.includes(c.type),
);

/** 選擇的角色 index */
const currentCharacterIndex = ref(0);

const onCharacterSelected = async(index: number) => {
    await soundClick();

    currentCharacterIndex.value = index;
};

const confirmCharacter = async() => {
    await soundClick();

    const character = characterList[currentCharacterIndex.value];
    playerStore.selectCharacter(character.type);

    appStore.switchSpinner(true);

    await sleepSeconds(0.3);

    appStore.switchSpinner(false);

    appStore.changeGameState(enumGameState.Rest);
};
</script>
