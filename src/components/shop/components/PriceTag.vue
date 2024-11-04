<template>
    <v-chip
        color="amber"
        variant="flat"
        :size="'x-small'"
        class="px-3"
        label
    >
        <template #prepend>
            <IconCoin />
        </template>
        {{ thousands(price) }}
    </v-chip>
</template>
<script lang="ts" setup>
import IconCoin from '@/components/icons/IconCoin.vue';
import { thousands } from '@/utils/number';

const { price } = defineProps<{
    price: number;
}>();
</script>
