<template>
    <div
        class="fill-height mx-auto"
        style="width: 100%; max-width: 500px; max-height: 95vh"
    >
        <AppHeader></AppHeader>

        <v-container class="fill-height py-0" style="max-height: 95%">
            <router-view />
        </v-container>
    </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue';
</script>
