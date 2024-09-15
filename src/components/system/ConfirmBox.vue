<template>
    <v-dialog v-model="openDialog">
        <v-card
            color="white"
            class="rounded-xl"
            variant="flat"
        >
            <v-card-text>
                <slot />
                <v-row class="ma-0 ga-3">
                    <v-col class="pa-0">
                        <BtnText
                            :text="t('button.confirm')"
                            :func="executeFunction"
                        />
                    </v-col>
                    <v-col class="pa-0">
                        <BtnText
                            :text="t('button.cancel')"
                            :func="() => openDialog = false"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
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
};

const show = () => {
    openDialog.value = true;
};

defineExpose({
    show,
});
</script>
