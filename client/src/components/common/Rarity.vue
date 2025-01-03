<template>
    <v-row class="ma-0 justify-center align-center">
        <v-col
            cols="auto"
            class="pa-0 font-italic font-weight-bold"
            :class="textColor"
        >
            {{ t(`rarity.${props.rarity}`) }}
        </v-col>
    </v-row>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import { useI18n } from 'vue-i18n';

import { enumRarity } from '@/enums/rarity';

const { t } = useI18n();

const props = defineProps<{
    rarity: enumRarity;
}>();

const textColor = computed(() => {
    switch (props.rarity) {
    case enumRarity.Normal:
        return 'text-white';
    case enumRarity.Rare:
        return 'text-secondary';
    case enumRarity.SR:
        return 'text-red';
    case enumRarity.SSR:
        return 'text-darkamber';
    default:
        return 'text-white';
    }
});
</script>
