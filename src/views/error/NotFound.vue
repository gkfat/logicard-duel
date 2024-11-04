<template>
    <v-row class="w-100 ma-0 ga-3 flex-column">
        <v-col
            cols="auto"
            class="pa-0"
        >
            <Dialog :dialogs="dialogs" />
        </v-col>

        <v-col
            cols="auto"
            class="pa-0 mt-auto"
        >
            <Btn
                :text="t('button.restart')"
                :func="restart"
            />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import Btn from '@/components/system/Btn.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';
import { useAppStore } from '@/store/app';

const { t } = useI18n();
const router = useRouter();
const appStore = useAppStore();

const dialogs = DialogDataList[enumDialog.Restart];

const restart = () => {
    router.push('/');
};

onMounted(async () => {
    appStore.switchSpinner(false);
});
</script>
