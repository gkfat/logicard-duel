<template>
    <v-card flat color="bluegrey" class="rounded-lg border-lg w-100">
        <v-card-title class="text-center">
            <v-avatar size="60" :image="character.avatar"></v-avatar>
        </v-card-title>

        <v-card-title class="text-center">
            {{ character.name }}
        </v-card-title>

        <v-card-subtitle class="text-wrap">
            {{ character.description }}
        </v-card-subtitle>

        <v-card-text>
            <v-row>
                <v-col cols="4">
                    <v-icon color="red" icon="mdi-heart"></v-icon>
                    {{ rangeToText(character.init.healthRange) }}
                </v-col>
                <v-col cols="4">
                    <v-icon color="skin" icon="mdi-sword-cross"></v-icon>
                    {{ rangeToText(character.init.attackRange) }}
                </v-col>
                <v-col cols="4">
                    <v-icon color="skin" icon="mdi-shield"></v-icon>
                    {{ rangeToText(character.init.defenseRange) }}
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-icon color="skin" icon="mdi-screw-round-top"></v-icon>
                    {{ character.init.coin }}
                </v-col>
                <v-col cols="4">
                    <v-icon color="skin" icon="mdi-bag-personal"></v-icon>
                    {{ character.backpackLimit }}
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-text>
            <p class="text-caption">初始卡牌</p>

            <v-row
                v-if="character.init.cards.length"
                class="ma-0 flex-nowrap overflow-x-auto"
            >
                <v-col class="pa-1" v-for="cardType in character.init.cards">
                    <Card :card-type="cardType"></Card>
                </v-col>
            </v-row>

            <em class="text-secondary" v-else>沒有初始卡牌，真可憐。</em>
        </v-card-text>

        <v-card-text>
            <p class="text-caption">初始裝備</p>

            <div v-if="character.init.equips.length">
                <Equip
                    v-for="equipType in character.init.equips"
                    :equip-type="equipType"
                ></Equip>
            </div>

            <em class="text-secondary" v-else>沒有初始裝備，真慘。</em>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { CardTemplateList } from '@/data/card-templates';
import { EquipTemplateList } from '@/data/equip-templates';
import { enumCard } from '@/enums/card';
import { enumEquip } from '@/enums/equip';
import { CharacterTemplate } from '@/types/character';

import Card from './Card.vue';
import Equip from './Equip.vue';

const props = defineProps<{
    character: CharacterTemplate;
}>();

const rangeToText = (range: [number, number]) => {
    const [min, max] = range;

    return `${min} ~ ${max}`;
};

console.log(props.character);
</script>
