<template>
    <v-card
        class="w-100 rounded-xl fill-height border-xl overflow-y-auto"
        :max-height="parentProps.maxHeight ? parentProps.maxHeight : undefined"
    >
        <v-card-title>{{ t('system.dialog') }}</v-card-title>
        <v-card-text>
            <p
                v-for="(dialog, i) in parentProps.dialogs"
                :key="i"
                class="m-0"
                :class="{ 'mb-3': i !== parentProps.dialogs.length - 1 }"
            >
                {{ dialog }}
            </p>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const parentProps = defineProps<{
    maxHeight?: number;
    dialogs: string[];
}>();
</script>

<style lang="scss" scoped>

</style>
