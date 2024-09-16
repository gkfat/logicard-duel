<template>
    <v-card
        flat
        rounded="lg"
        :wdith="50"
        :height="80"
        style="max-width: 50px; max-height: 80px"
    >
        <v-card-text>
            {{ card.name }}
        </v-card-text>
    </v-card>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import { CardTemplateList } from '@/data/card-templates';
import { enumCard } from '@/enums/card';

const props = defineProps<{
    cardType: enumCard;
}>();

const card = computed(
    () => CardTemplateList.find((v) => v.type === props.cardType)!
);
</script>
