<template>
    <v-col cols="12" class="pa-0 align-self-stretch">
        <Dialog :dialogs="dialogs[currentIndex]" />
    </v-col>

    <v-col v-if="!isDialogEnd" cols="12" class="pa-0 mt-auto">
        <BtnText :text="t('button.skip')" :func="dialogNextToEnd" />
        <v-spacer class="mb-3" />
        <BtnText :text="t('button.next')" :func="dialogNext" />
    </v-col>

    <!-- 選擇角色 -->
    <v-col v-if="isDialogEnd" class="pa-0 mt-auto">
        <v-container class="fill-height px-0">
            <v-carousel
                v-model="characterIndex"
                hide-delimiters
                height="auto"
                class="mb-10"
                :show-arrows="false"
                :delimiter-icon="'mdi-face-man'"
                style="height: 300px"
            >
                <v-carousel-item
                    v-for="(character, index) in characterList"
                    :key="index"
                    :value="index"
                    class="overflow-y-auto"
                >
                    <div class="d-flex justify-center align-center">
                        <CharacterCard :character="character" />
                    </div>
                </v-carousel-item>
            </v-carousel>

            <BtnText :text="'下一位'" :func="nextCharacter" class="mb-3" />
            <BtnText :text="t('button.confirm')" :func="confirmCharacter" />
        </v-container>
    </v-col>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useI18n } from 'vue-i18n';

import BtnText from '@/components/system/BtnText.vue';
import Dialog from '@/components/system/Dialog.vue';
import { CharacterTemplateList } from '@/data/character-templates';
import { DialogDataList } from '@/data/dialogs';
import { enumCharacter } from '@/enums/character';
import { enumDialog } from '@/enums/dialog';
import { enumGameState } from '@/enums/game';
import { useAppStore } from '@/store/app';
import { usePlayerStore } from '@/store/player';
import { useSoundStore } from '@/store/sound';
import { sleep } from '@/utils/common';

import CharacterCard from './components/CharacterCard.vue';

const playerStore = usePlayerStore();
const appStore = useAppStore();
const soundStore = useSoundStore();
const { t } = useI18n();

const dialogs = DialogDataList[enumDialog.GameStart];
const lastIndex = dialogs.length - 1;
const currentIndex = ref(0);
const isDialogEnd = computed(() => currentIndex.value === lastIndex);

/** 下一頁 */
const dialogNext = async () => {
    if (currentIndex.value < lastIndex) {
        await soundStore.playSound(soundStore.sounds.effect.click);
        currentIndex.value += 1;
    }
};

/** 跳過 */
const dialogNextToEnd = async () => {
    await soundStore.playSound(soundStore.sounds.effect.click);
    currentIndex.value = lastIndex;
};

/** 選擇的角色 index */
const characterIndex = ref(0);

const availableCharacterTypes = [
    enumCharacter.Man,
    enumCharacter.Nerd,
    enumCharacter.Broker,
    enumCharacter.Artist,
    enumCharacter.Grandma,
];

/** 可選角色清單 */
const characterList = CharacterTemplateList.filter((c) =>
    availableCharacterTypes.includes(c.type)
);

const nextCharacter = () => {
    if (characterIndex.value === characterList.length - 1) {
        characterIndex.value = 0;
    } else {
        characterIndex.value += 1;
    }
};

const confirmCharacter = async () => {
    await soundStore.playSound(soundStore.sounds.effect.click);

    const character = characterList[characterIndex.value];
    playerStore.selectCharacter(character.type);

    appStore.switchSpinner(true);

    await sleep(300);

    appStore.switchSpinner(false);

    appStore.changeGameState(enumGameState.Rest);
};
</script>
