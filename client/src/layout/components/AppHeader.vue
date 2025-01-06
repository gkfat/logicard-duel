<template>
    <v-system-bar
        theme="dark"
        window
    >
        <v-col
            cols="auto"
            class="pa-0 mr-auto"
        >
            v {{ appStore.ENV.appVersion }}
        </v-col>

        <v-col
            cols="auto"
            class="pa-0 text-center font-italic"
            :style="{
                letterSpacing: '1px'
            }"
        >
            {{ appStore.ENV.appTitle }}
        </v-col>

        <v-col
            cols="auto"
            class="pa-0 ml-auto"
        >
            <v-btn
                icon="mdi-cog"
                flat
                variant="text"
                :ripple="false"
                @click="toggleDrawer"
            />
        </v-col>
    </v-system-bar>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/store/app';

const appStore = useAppStore();

const toggleDrawer = () => {
    appStore.isSettingDrawerOpen = !appStore.isSettingDrawerOpen;
};
</script>
