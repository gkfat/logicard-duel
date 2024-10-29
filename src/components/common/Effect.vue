<template>
    <v-row class="ma-0 justify-center align-center ga-1">
        <v-col cols="12" class="pa-0 text-center">
            <IconAttack v-if="effect === enumEffect.Harm"/>
            <IconDefense v-if="effect === enumEffect.Defense"/>
            <IconHeal v-if="effect === enumEffect.Heal"/>
        </v-col>
        <v-col cols="12" class="pa-0 text-center">
            {{ t(`effect.${effect}`) }}
        </v-col>
    </v-row>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import IconAttack from '@/components/icons/IconAttack.vue';
import IconDefense from '@/components/icons/IconDefense.vue';
import IconHeal from '@/components/icons/IconHeal.vue';
import { enumEffect } from '@/enums/effect';

const { t } = useI18n();

const { effect } = defineProps<{
    effect: enumEffect;
}>();
</script>
