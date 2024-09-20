<template>
    <div>
        <v-chip
            prepend-icon="mdi-screw-round-top"
            class="text-amber py-1"
            label
        >
            {{ thousands(price) }}
        </v-chip>
    </div>
</template>
<script lang="ts" setup>
import { thousands } from '@/utils/number';

const { price } = defineProps<{
    price: number;
}>();
</script>
