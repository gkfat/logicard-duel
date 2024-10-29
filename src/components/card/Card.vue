<template>
    <v-row class="ma-0 justify-center align-center">
        <v-col cols="12" class="pa-0">
            <v-card
                flat
                rounded="md"
                class="mx-auto border-thin border-opacity-75"
                :class="{
                    'border-darkgrey': !isCardBack,
                    'border-white': isCardBack,
                }"
                :color="isCardBack ? 'bluegrey' : 'skin'"
                :style="getStyles"
                @click="toggleDialog(true)"
            >
                <v-row class="ma-0 pa-1 fill-height">
                    <!-- 卡背 -->
                    <v-col v-if="isCardBack" class="pa-0 fill-height">
                        <v-row
                            class="ma-0 align-center justify-center fill-height"
                        >
                            <Icon
                                :size="getIconSize"
                                :url="ImageDataList.icon.cardbackLogicard"
                            />
                        </v-row>
                    </v-col>

                    <!-- 卡面 -->
                    <v-col
                        v-else
                        class="pa-0 fill-height border-md rounded border-opacity-50"
                        :class="`border-${theme}`"
                    >
                        <v-row
                            class="ma-0 align-center justify-center fill-height ga-1 pa-1"
                        >
                            <v-col cols="auto" class="pa-0">
                                <Icon
                                    :size="getIconSize"
                                    :url="card.template.icon"
                                ></Icon>
                                <div
                                    class="position-absolute"
                                    style="
                                        top: 0;
                                        right: 5px;
                                        bottom: 0;
                                        z-index: 1;
                                    "
                                >
                                    +{{ card.info.point }}
                                </div>
                            </v-col>

                            <v-col
                                v-if="size !== 'x-small'"
                                cols="auto"
                                class="pa-0 text-caption"
                                :style="{
                                    fontSize: '0.5rem !important',
                                }"
                            >
                                {{ card.template.name }}
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>

        <v-col cols="auto" class="pa-0 text-center" v-if="showRarity">
            <Rarity :rarity="card.info.rarity"></Rarity>
            <!-- 稀有度 -->
        </v-col>
    </v-row>

    <!-- Detail -->
    <v-dialog v-model="isDialogOpen" :max-width="500" :min-width="300">
        <v-card
            flat
            color="bluegrey"
            class="rounded-xl border-xl border-amber border-opacity-100"
        >
            <v-card-text class="pb-0">
                <v-row class="align-center">
                    <!-- 效果 -->
                    <v-col cols="auto" class="ml-auto">
                        <Effect :effect="card.template.effect"></Effect>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-text>
                <v-card
                    flat
                    rounded="lg"
                    :width="120"
                    :height="160"
                    color="skin"
                    :class="`border-${theme}`"
                    class="mx-auto"
                >
                    <v-row class="ma-0 pa-1 fill-height">
                        <v-col
                            class="pa-0 fill-height border-md rounded-lg border-opacity-50 d-flex flex-wrap"
                        >
                            <v-row class="ma-0 justify-center align-center">
                                <v-col cols="12" class="pa-0 text-center">
                                    <Icon
                                        :size="50"
                                        :url="card.template.icon"
                                    ></Icon>
                                </v-col>
                                <v-col cols="12" class="pa-0 text-center">
                                    {{ card.template.name }}
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-card-text>

            <!-- 稀有度 -->
            <Rarity :rarity="card.info.rarity"></Rarity>

            <v-card-title class="text-center">
                {{ card.template.name }}
            </v-card-title>

            <v-card-subtitle class="text-center text-wrap">
                {{ card.template.description }}
            </v-card-subtitle>

            <v-card-text>
                <!-- 點數 -->
                <v-row class="justify-center">
                    <v-col cols="auto" class="text-h6">
                        {{ t(`effect.${card.template.effect}`) }}
                        + {{ card.info.point }}
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions v-if="$slots.actions">
                <slot name="actions"></slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useI18n } from 'vue-i18n';

import Effect from '@/components/common/Effect.vue';
import Icon from '@/components/common/Icon.vue';
import Rarity from '@/components/common/Rarity.vue';
import { useSoundEffect } from '@/composable/useSoundEffect';
import { ImageDataList } from '@/data/images';
import { enumEffect } from '@/enums/effect';
import { Card } from '@/types/core';

const isDialogOpen = ref(false);
const { soundClick } = useSoundEffect();

const { t } = useI18n();

const {
    card,
    size = 'default',
    isCardBack = false,
    showRarity = false,
    showDetail = true,
} = defineProps<{
    card: Card;
    isCardBack?: boolean;
    size?: 'x-small' | 'small' | 'default';
    showRarity?: boolean;
    showDetail?: boolean;
}>();

const theme = computed(() =>
    card.template.effect === enumEffect.Harm ? 'red' : 'blue',
);

const toggleDialog = (target: boolean) => {
    soundClick();
    if (showDetail) {
        isDialogOpen.value = target;
    }
};

const getStyles = computed(() => {
    // default
    const styles: { [key: string]: string } = {
        width: '80px',
        'max-width': '80px',
        height: '120px',
        'max-height': '120px,',
    };

    if (size === 'x-small') {
        styles.width = '30px';
        styles['max-width'] = '30px';
        styles.height = '40px';
        styles['max-height'] = '40px';
    } else if (size === 'small') {
        styles.width = '60px';
        styles['max-width'] = '60px';
        styles.height = '80px';
        styles['max-height'] = '80px';
    }

    return styles;
});

const getIconSize = computed(() => {
    // default
    let iconSize = 36;

    if (size === 'x-small') {
        iconSize = 14;
    } else if (size === 'small') {
        iconSize = 24;
    }
    return iconSize;
});

defineExpose({
    toggleDialog,
});
</script>
