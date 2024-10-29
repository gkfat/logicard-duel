<template>
    <v-dialog v-model="openDialog">
        <v-card
            color="bluegrey"
            class="rounded-xl border-white border-xl border-opacity-75 py-3"
            variant="flat"
        >
            <v-card-subtitle>
                {{ t('system.dialog') }}
            </v-card-subtitle>

            <v-card-title class="text-center py-5">
                {{ message }}
            </v-card-title>

            <v-row class="ma-0">
                <v-col class="pa-1 px-3">
                    <Btn :icon="'mdi-close'" :func="closeDialog" />
                </v-col>
                <v-col class="pa-1 px-3">
                    <Btn :icon="'mdi-circle-outline'" :func="executeFunction" />
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import { useI18n } from 'vue-i18n';

import Btn from '@/components/system/Btn.vue';
import { useSoundEffect } from '@/composable/useSoundEffect';

const { message, func } = defineProps<{
    message: string;
    func: Function;
}>();

const openDialog = ref(false);

const { t } = useI18n();
const { soundClick } = useSoundEffect();

const closeDialog = () => {
    soundClick();
    openDialog.value = false;
};

const executeFunction = async() => {
    await soundClick();
    func();
    openDialog.value = false;
};

const show = () => {
    openDialog.value = true;
};

defineExpose({
    show,
});
</script>
