<template>
    <v-hover>
        <template #default="{ props: hoverProps, isHovering }">
            <v-card
                v-bind="hoverProps"
                :class="{ floating: isHovering }"
                flat
                rounded="md"
                :wdith="60"
                :height="80"
                :min-width="60"
                :max-width="60"
                style="transition: all 0.3s"
                color="skin"
                @click="openDialog"
            >
                <v-row class="ma-0 pa-1 fill-height">
                    <v-col
                        class="pa-0 fill-height border-md rounded-md border-opacity-50"
                        :class="`border-${theme}`"
                    >
                        <v-row
                            class="ma-0 align-center justify-center fill-height ga-1 pa-1"
                        >
                            <v-col cols="auto" class="pa-0">
                                <Icon :size="24" :url="card.icon"/>
                            </v-col>

                            <v-col
                                cols="auto"
                                class="pa-0 text-caption"
                                :style="{
                                    fontSize: '0.5rem !important',
                                }"
                            >
                                {{ card.name }}
                            </v-col>
                        </v-row>
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
                <v-row class="justify-end">
                    <v-col cols="auto">
                        <Effect :effect="card.effect"/>
                    </v-col>
                </v-row>
                <v-row class="justify-center">
                    <v-col cols="auto">
                        <v-card
                            flat
                            rounded="lg"
                            :width="120"
                            :height="160"
                            color="skin"
                        >
                            <v-row class="ma-0 pa-1 fill-height">
                                <v-col
                                    class="pa-0 fill-height border-md rounded-lg border-opacity-50 d-flex flex-wrap"
                                    :class="`border-${theme}`"
                                >
                                    <v-row
                                        class="ma-0 justify-center align-center"
                                    >
                                        <v-col
                                            cols="12"
                                            class="pa-0 text-center"
                                        >
                                            <Icon
                                                :size="50"
                                                :url="card.icon"
                                            />
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            class="pa-0 text-center"
                                        >
                                            {{ card.name }}
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-title class="text-center">
                {{ card.name }}
            </v-card-title>

            <v-card-subtitle class="text-center text-wrap">
                {{ card.description }}
            </v-card-subtitle>

            <v-card-text>
                <v-row v-for="(rarity, i) in rarityValues" :key="i">
                    <v-col>
                        <Rarity :rarity="rarity"/>
                    </v-col>
                    <v-col>
                        {{ rangeToText(card.potentials[rarity]!.pointRange) }}
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';

import Effect from '@/components/common/Effect.vue';
import Icon from '@/components/common/Icon.vue';
import Rarity from '@/components/common/Rarity.vue';
import { useSoundEffect } from '@/composable/useSoundEffect';
import { CardTemplateList } from '@/data/card-templates';
import { enumCard } from '@/enums/card';
import { enumEffect } from '@/enums/effect';
import { RarityValue } from '@/enums/rarity';
import { rangeToText } from '@/utils/common';

const { soundClick } = useSoundEffect();
const isDialogOpen = ref(false);

const props = defineProps<{
    cardType: enumCard;
}>();

const card = computed(
    () => CardTemplateList.find((v) => v.type === props.cardType)!,
);

const theme = computed(() =>
    card.value.effect === enumEffect.Harm ? 'red' : 'blue',
);

const rarityValues = computed(
    () => Object.keys(card.value.potentials) as RarityValue[],
);

const openDialog = async() => {
    await soundClick();
    isDialogOpen.value = true;
};
</script>
<style lang="scss" scoped>
.floating {
    transform: scale(1.1);
}
</style>
