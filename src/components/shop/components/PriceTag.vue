<template>
    <v-chip
        prepend-icon="mdi-screw-round-top"
        color="amber"
        variant="flat"
        :size="'x-small'"
        class="px-3"
    >
        {{ thousands(price) }}
    </v-chip>
</template>
<script lang="ts" setup>
import { thousands } from '@/utils/number';

const { price } = defineProps<{
    price: number;
}>();
</script>
