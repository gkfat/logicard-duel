<template>
    <v-card
        flat
        :color="isSelected ? 'darkgreen' : 'bluegrey'"
        class="rounded-lg border-xl cursor-pointer"
    >
        <v-row class="ma-0">
            <v-col cols="auto" class="py-1 d-flex align-center">
                <PlayerAvatar :character="character"></PlayerAvatar>
            </v-col>

            <v-col class="py-1 d-flex align-center">
                <p class="text-body-1">{{ character.name }}</p>
            </v-col>

            <v-col cols="auto" class="pa-1 px-3 d-flex align-center">
                <Btn
                    :icon="'mdi-eye-circle'"
                    :size="'small'"
                    :func="() => toggleDialog(true)"
                ></Btn>
            </v-col>
        </v-row>
    </v-card>

    <v-dialog v-model="isOpenDialog">
        <v-card
            flat
            color="bluegrey"
            class="rounded-lg border-lg w-100 overflow-y-auto"
        >
            <v-card-title class="text-center">
                <PlayerAvatar :character="character"></PlayerAvatar>
            </v-card-title>

            <v-card-title class="text-center">
                {{ character.name }}
            </v-card-title>

            <v-card-subtitle class="text-wrap">
                {{ character.description }}
            </v-card-subtitle>

            <v-card-text class="overflow-y-auto">
                <p class="text-caption">能力值範圍</p>

                <v-row class="ma-0">
                    <v-col class="pa-1" cols="12">
                        <v-icon color="red" icon="mdi-heart"></v-icon>
                        {{ rangeToText(character.init.healthRange) }}
                    </v-col>
                    <v-col class="pa-1" cols="6">
                        <v-icon color="skin" icon="mdi-sword-cross"></v-icon>
                        {{ rangeToText(character.init.attackRange) }}
                    </v-col>
                    <v-col class="pa-1" cols="6">
                        <v-icon color="skin" icon="mdi-shield"></v-icon>
                        {{ rangeToText(character.init.defenseRange) }}
                    </v-col>
                </v-row>
                <v-row class="ma-0">
                    <v-col class="pa-1" cols="6">
                        <v-icon
                            color="skin"
                            icon="mdi-screw-round-top"
                        ></v-icon>
                        {{ character.init.coin }}
                    </v-col>
                    <v-col class="pa-1" cols="6">
                        <v-icon color="skin" icon="mdi-bag-personal"></v-icon>
                        {{ character.backpackLimit }}
                    </v-col>
                </v-row>

                <v-divider class="my-3"></v-divider>

                <p class="text-caption">初始卡牌</p>

                <v-row
                    v-if="character.init.cards.length"
                    class="ma-0 flex-nowrap overflow-x-auto"
                >
                    <v-col
                        cols="auto"
                        class="pa-1"
                        v-for="(cardType, i) in character.init.cards"
                        :key="i"
                    >
                        <CardTemplate :card-type="cardType"></CardTemplate>
                    </v-col>
                </v-row>

                <em class="text-secondary" v-else>沒有初始卡牌，真可憐。</em>

                <v-divider class="my-3"></v-divider>

                <p class="text-caption">初始裝備</p>

                <v-row
                    v-if="character.init.equips.length"
                    class="ma-0 flex-nowrap overflow-x-auto"
                >
                    <v-col
                        cols="auto"
                        class="pa-1"
                        v-for="(equipType, i) in character.init.equips"
                        :key="i"
                    >
                        <EquipTemplate :equip-type="equipType"></EquipTemplate>
                    </v-col>
                </v-row>

                <em class="text-secondary" v-else>沒有初始裝備，真慘。</em>
            </v-card-text>

            <v-card-actions>
                <Btn
                    :text="t('button.cancel')"
                    :func="() => toggleDialog(false)"
                ></Btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useI18n } from 'vue-i18n';

import PlayerAvatar from '@/components/common/PlayerAvatar.vue';
import Btn from '@/components/system/Btn.vue';
import { useSoundEffect } from '@/composable/useSoundEffect';
import { CharacterTemplate } from '@/types/character';
import { rangeToText } from '@/utils/common';

import CardTemplate from './CardTemplate.vue';
import EquipTemplate from './EquipTemplate.vue';

const { t } = useI18n();
const { soundClick } = useSoundEffect();
const isOpenDialog = ref(false);

const toggleDialog = (target: boolean) => {
    soundClick();
    isOpenDialog.value = target;
};

const { character, isSelected = false } = defineProps<{
    character: CharacterTemplate;
    isSelected: boolean;
}>();
</script>
