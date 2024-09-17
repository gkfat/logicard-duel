<template>
    <v-dialog v-model="openDialog">
        <v-card
            color="bluegrey border-white border-lg border-opacity-100 py-3"
            class="rounded-xl"
            variant="flat"
        >
            <v-card-subtitle>
                {{ t('system.dialog') }}
            </v-card-subtitle>

            <v-card-title class="text-center py-5">
                {{ parentProps.message }}
            </v-card-title>

            <v-row class="ma-0">
                <v-col cols="12" sm="6" class="pa-1 px-3">
                    <BtnText
                        :text="t('button.confirm')"
                        :func="executeFunction"
                    />
                </v-col>
                <v-col cols="12" sm="6" class="pa-1 px-3">
                    <BtnText
                        :text="t('button.cancel')"
                        :func="() => (openDialog = false)"
                    />
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import { useI18n } from 'vue-i18n';

import BtnText from '@/components/system/BtnText.vue';

const parentProps = defineProps<{
    message: string;
    func: Function;
}>();

const openDialog = ref(false);

const { t } = useI18n();

const executeFunction = () => {
    parentProps.func();
    openDialog.value = false;
};

const show = () => {
    openDialog.value = true;
};

defineExpose({
    show,
});
</script>
