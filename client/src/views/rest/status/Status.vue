<template>
    <v-row class="w-100 ma-0 ga-3 flex-column pb-3">
        <v-col
            cols="auto"
            class="pa-0"
        >
            <Dialog
                :dialogs="dialogs"
                :max-height="150"
            />
        </v-col>

        <!-- 角色 -->
        <v-col
            cols="auto"
            class="pa-0 flex-grow-1"
        >
            <Status />
            <Equipment />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList } from '@/data/dialogs';
import { enumDialog } from '@/enums/dialog';

import Equipment from './components/Equipment.vue';
import Status from './components/Status.vue';

const dialogs = DialogDataList[enumDialog.Rest];

</script>

<style lang="scss" scoped>

</style>
