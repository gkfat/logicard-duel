<template>
    <AppHeader />
    <AppSettingDrawer />
    
    <v-main
        :style="{
            width: '100%',
            maxWidth: '500px'
        }"
        class="overflow-hidden mx-auto"
    >
        <v-container
            class="fill-height d-flex flex-column flex-nowrap overflow-y-auto"
            fluid
        >
            <router-view />
        </v-container>

        <AppControlPanel />
    </v-main>

    <Spinner />
</template>

<script setup lang="ts">
import AppControlPanel from './AppControlPanel/AppControlPanel.vue';
import AppSettingDrawer from './AppSettingDrawer/AppSettingDrawer.vue';
import AppHeader from './components/AppHeader.vue';
import Spinner from './components/Spinner.vue';
</script>
