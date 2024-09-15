<template>
    <div
        class="card"
        :style="parentProps.styles"
        :class="parentProps.klass ? parentProps.klass : ''"
    >
        <!-- 卡背 -->
        <template v-if="isCardBack">
            <v-card
                :height="cardSize.height"
                :width="cardSize.width"
                :class="isLogiCard ? 'bg-blue' : 'bg-skin'"
            >
                <v-row class="justify-center align-center ma-0 fill-height">
                    <v-col class="pa-0 text-center">
                        <Icon
                            v-if="isLogiCard"
                            :url="ImageDataList.icon.cardbackLogicard"
                        />
                        <Icon
                            v-else
                            :url="ImageDataList.icon.cardbackTech"
                        />
                    </v-col>
                </v-row>
            </v-card>
        </template>

        <!-- 卡面 -->
        <template v-if="!isCardBack">
            <v-hover>
                <template #default="{ isHovering, props }">
                    <v-card
                        v-if="!isCardBack"
                        v-bind="props"
                        :height="cardSize.height"
                        :width="cardSize.width"
                        :class="[
                            isLogiCard ? 'bg-white' : 'bg-skin',
                            isHovering && parentProps.hoverEffect ? 'card-floating' : '',
                        ]"
                    >
                        <v-card-text class="pa-1">
                            <v-row class="justify-center ma-0">
                                <v-col class="text-center pa-1">
                                    <Icon :url="item.Icon" />
                                    <p class="text-h6">
                                        {{ item.Point }}
                                    </p>
                                </v-col>
                            </v-row>

                            <v-tooltip activator="parent">
                                {{ item.Name }}<br>
                                {{ item.Description }}
                            </v-tooltip>
                        </v-card-text>
                    </v-card>
                </template>
            </v-hover>
        </template>
    </div>
</template>

<script setup name="Card" lang="ts">
import { computed } from 'vue';

import { ImageDataList } from '@/data';
import { enumItemType } from '@/enums/game';
import { Game } from '@/types';

import Icon from './Icon.vue';

const parentProps = withDefaults(defineProps<{
    klass?: string;
    styles?: any;
    item: Game.Item;
    isCardBack?: boolean;
    hoverEffect: boolean;
}>(), {
    klass: '',
    styles: null,
    isCardBack: false,
    hoverEffect: false,
});

const cardSize = {
    width: 56,
    height: 72,
};

const isLogiCard = computed(() => parentProps.item.ItemType === enumItemType.LogiCard);
</script>

<style lang="scss" scoped>
.card-floating {
    transform: scale(1.2) translateY(-10px);
}

// 丟掉牌動畫
.card-tossing {
  animation-name: tossCard;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  transform: translateX(100px) translateY(-30px);
  opacity: 0;
}

@keyframes tossCard {
  0% {
    transform: none;
    opacity: 100;
  }
  50% {
    opacity: 80;
  }
  to {
    opacity: 0;
  }
}

</style>
