<template>
    <v-row class="ma-0 justify-center align-center">
        <v-col cols="12" class="pa-0 text-center" :class="textColor">
            <v-icon :size="30" :icon="effectIcon"></v-icon>
        </v-col>
        <v-col cols="12" class="pa-0 text-center">
            {{ t(`effect.${effect}`) }}
        </v-col>
    </v-row>
</template>
<script lang="ts" setup>
import {
    onMounted,
    ref,
} from 'vue';

import { useI18n } from 'vue-i18n';

import { enumEffect } from '@/enums/effect';

const { t } = useI18n();

const props = defineProps<{
    effect: enumEffect;
}>();

const textColor = ref('');
const effectIcon = ref('');

onMounted(() => {
    switch (props.effect) {
        case enumEffect.Harm:
            effectIcon.value = 'mdi-sword-cross';
            textColor.value = 'text-white';
            return;
        case enumEffect.Defense:
            effectIcon.value = 'mdi-shield';
            textColor.value = 'text-info';
            return;
        case enumEffect.Heal:
            effectIcon.value = 'mdi-heart';
            textColor.value = 'text-red';
            return;
        default:
            effectIcon.value = '';
            textColor.value = '';
            return;
    }
});
</script>
