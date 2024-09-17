<template>
    <v-hover>
        <template #default="{ props: hoverProps, isHovering }">
            <v-card
                v-bind="hoverProps"
                :class="{ floating: isHovering }"
                flat
                rounded="lg"
                :wdith="80"
                :height="80"
                :min-width="80"
                :max-width="80"
                :max-heiht="80"
                :min-height="80"
                style="transition: all 0.3s"
                class="bg-bluegrey border-amber border-lg border-opacity-100 cursor-pointer"
                @click="isDialogOpen = true"
            >
                <v-row class="ma-0 justify-center align-center fill-height">
                    <v-col cols="auto">
                        <Icon :size="40" :url="getTemplate.icon"></Icon>
                    </v-col>
                </v-row>
            </v-card>
        </template>
    </v-hover>

    <v-dialog v-model="isDialogOpen">
        <v-card
            flat
            color="bluegrey"
            class="rounded-xl border-xl border-amber border-opacity-100"
        >
            <v-card-text>
                <v-row class="align-center">
                    <!-- 位置 -->
                    <v-col cols="auto">
                        <v-chip
                            label
                            color="amber"
                            :text="t(`equip_position.${getTemplate.position}`)"
                        ></v-chip>
                    </v-col>

                    <!-- 效果 -->
                    <v-col cols="auto" class="ml-auto">
                        <Effect :effect="getTemplate.effect"></Effect>
                    </v-col>
                </v-row>

                <v-row class="justify-center">
                    <v-col cols="auto">
                        <Icon :size="60" :url="getTemplate.icon"></Icon>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-title class="text-center">
                {{ getTemplate.name }}
            </v-card-title>

            <v-card-subtitle class="text-center text-wrap">
                {{ getTemplate.description }}
            </v-card-subtitle>

            <v-card-text>
                <v-row v-for="rarity in rarityValues">
                    <v-col>
                        <Rarity :rarity="rarity"></Rarity>
                    </v-col>
                    <v-col>
                        {{
                            rangeToText(
                                getTemplate.potentials[rarity]!.pointRange
                            )
                        }}
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useI18n } from 'vue-i18n';

import Effect from '@/components/common/Effect.vue';
import Rarity from '@/components/common/Rarity.vue';
import { EquipTemplateList } from '@/data/equip-templates';
import { enumEquip } from '@/enums/equip';
import { RarityValue } from '@/enums/rarity';
import { rangeToText } from '@/utils/common';

import Icon from './Icon.vue';

const { t } = useI18n();
const isDialogOpen = ref(false);

const props = defineProps<{
    equipType: enumEquip;
}>();

const getTemplate = computed(
    () => EquipTemplateList.find((v) => v.type === props.equipType)!
);

const rarityValues = computed(
    () => Object.keys(getTemplate.value.potentials) as RarityValue[]
);
</script>
<style lang="scss" scoped>
.floating {
    transform: scale(1.1);
}
</style>
