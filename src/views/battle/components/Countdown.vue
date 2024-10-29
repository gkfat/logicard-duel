<template>
    <v-progress-circular
        :model-value="percent"
        color="amber"
        :width="3"
        :size="30"
    >
    </v-progress-circular>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import { useAppStore } from '@/store/app';

const appStore = useAppStore();

const { remainSeconds } = defineProps<{
    remainSeconds: number;
}>();

const percent = computed(() =>
    Math.floor((remainSeconds / appStore.ENV.countdownSeconds) * 100),
);
</script>
