<template>
    <v-card
        class="w-100 rounded-lg fill-height border-lg py-3"
        :max-height="props.maxHeight"
    >
        <v-card-text class="text-info py-1">
            {{ t('system.dialog') }}
        </v-card-text>

        <v-card-text class="overflow-y-auto py-0">
            <p
                v-for="(dialog, i) in props.dialogs"
                :key="i"
                class="m-0"
                :class="{ 'mb-3': i !== props.dialogs.length - 1 }"
            >
                {{ dialog }}
            </p>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
    maxHeight?: number;
    dialogs: string[];
}>();
</script>

<style lang="scss" scoped></style>
