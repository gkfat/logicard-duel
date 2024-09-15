<template>
    <v-card :height="28" :width="28" color="lightgrey" class="rounded">
        <v-card-text v-if="getItem">
            <Icon :url="getItem.icon" />

            <v-tooltip activator="parent">
                {{ getItem.description }}
            </v-tooltip>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import Icon from '@/components/Icon.vue';
import { ItemDataList } from '@/data/equip-templates';
import { Equip } from '@/types/equip';

const props = defineProps<{
    equip?: Equip;
}>();

const getItem = computed(() => {
    if (!props.equip) {
        return undefined;
    }

    return ItemDataList.find((item) => item.id === props.equip?.itemId);
});
</script>
