<template>
    <v-row class="ma-0 justify-center align-center">
        <v-col cols="12" class="pa-0">
            <v-card
                flat
                rounded="lg"
                class="mx-auto"
                :wdith="50"
                :height="80"
                :class="props.isCardBack ? 'bg-blue' : 'bg-skin'"
                :style="getStyles"
                @click="isDialogOpen = true"
            >
                <v-row class="ma-0 pa-2 fill-height">
                    <!-- 卡背 -->
                    <v-col
                        v-if="props.isCardBack"
                        class="pa-0 fill-height border-md border-skin rounded-lg border-opacity-50"
                    >
                        <v-row
                            class="ma-0 align-center justify-center fill-height"
                        >
                            <v-col cols="auto" class="pa-1">
                                <Icon
                                    :size="props.size === 'small' ? 24 : 36"
                                    :url="ImageDataList.icon.cardbackLogicard"
                                />
                            </v-col>
                        </v-row>
                    </v-col>

                    <!-- 卡面 -->
                    <v-col
                        v-else
                        class="pa-0 fill-height border-md border-blue rounded-lg border-opacity-50"
                    >
                        <v-row
                            class="ma-0 align-center justify-center fill-height ga-1 pa-1"
                        >
                            <v-col cols="auto" class="pa-0">
                                <Icon
                                    :size="props.size === 'small' ? 24 : 36"
                                    :url="props.card.template.icon"
                                ></Icon>
                            </v-col>

                            <v-col cols="auto" class="pa-0">
                                <p class="text-caption">
                                    {{ props.card.template.name }}
                                </p>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>

        <v-col cols="auto" class="pa-0 text-center">
            <Rarity :rarity="props.card.info.rarity"></Rarity>
            <!-- 稀有度 -->
        </v-col>
    </v-row>

    <v-dialog v-model="isDialogOpen">
        <v-card
            flat
            color="bluegrey"
            class="rounded-xl border-xl border-amber border-opacity-100"
        >
            <v-card-text class="pb-0">
                <v-row class="align-center">
                    <!-- 效果 -->
                    <v-col cols="auto" class="ml-auto">
                        <Effect :effect="props.card.template.effect"></Effect>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-text>
                <v-card
                    flat
                    rounded="lg"
                    :width="120"
                    :height="160"
                    class="bg-skin mx-auto"
                >
                    <v-row class="ma-0 pa-1 fill-height">
                        <v-col
                            class="pa-0 fill-height border-md border-blue rounded-lg border-opacity-50 d-flex flex-wrap"
                        >
                            <v-row class="ma-0 justify-center align-center">
                                <v-col cols="12" class="pa-0 text-center">
                                    <Icon
                                        :size="50"
                                        :url="props.card.template.icon"
                                    ></Icon>
                                </v-col>
                                <v-col cols="12" class="pa-0 text-center">
                                    {{ props.card.template.name }}
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-card-text>

            <!-- 稀有度 -->
            <Rarity :rarity="props.card.info.rarity"></Rarity>

            <v-card-title class="text-center">
                {{ props.card.template.name }}
            </v-card-title>

            <v-card-subtitle class="text-center text-wrap">
                {{ props.card.template.description }}
            </v-card-subtitle>

            <v-card-text>
                <!-- 點數 -->
                <v-row class="justify-center">
                    <v-col cols="auto" class="text-h6">
                        {{ t(`effect.${props.card.template.effect}`) }}
                        + {{ props.card.info.point }}
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import {
    computed,
    ref,
} from 'vue';

import { useI18n } from 'vue-i18n';

import Effect from '@/components/common/Effect.vue';
import Icon from '@/components/common/Icon.vue';
import Rarity from '@/components/common/Rarity.vue';
import { CardTemplateList } from '@/data/card-templates';
import { ImageDataList } from '@/data/images';
import { enumCard } from '@/enums/card';
import { Card } from '@/types/core';
import { Player } from '@/types/player';

const isDialogOpen = ref(false);

const { t } = useI18n();
const props = withDefaults(
    defineProps<{
        card: Card;
        isCardBack?: boolean;
        size?: 'small' | 'default';
    }>(),
    {
        isCardBack: false,
    }
);

const getStyles = computed(() => {
    const styles: { [key: string]: string } = {};

    if (props.size === 'small') {
        styles['width'] = '50px';
        styles['max-width'] = '50px';
        styles['height'] = '80px';
        styles['max-height'] = '80px';
    } else {
        styles['width'] = '80px';
        styles['max-width'] = '80px';
        styles['height'] = '120px';
        styles['max-height'] = '120px';
    }

    return styles;
});
</script>
