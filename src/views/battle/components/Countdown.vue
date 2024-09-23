<template>
    <v-progress-circular
        :model-value="percent"
        theme="red"
        color="red"
        :width="3"
        :size="20"
    >
        <!-- <template #default>
            <p>{{ remainSeconds }}</p>
        </template> -->
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
    Math.floor((remainSeconds / appStore.ENV.countdownSeconds) * 100)
);
</script>
