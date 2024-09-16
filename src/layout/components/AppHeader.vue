<template>
    <v-row class="w-100 ma-0 d-flex align-center justify-center">
        <v-col class="py-1">version {{ appVersion }}</v-col>
        <v-col class="py-1 text-center font-weight-bold">{{ appTtile }}</v-col>
        <v-col class="py-1 text-right"><VolumeControl /></v-col>
    </v-row>
</template>
<script lang="ts" setup>
import VolumeControl from './VolumeControl.vue';

const appTtile = import.meta.env.VITE_APP_TITLE;
const appVersion = import.meta.env.VITE_APP_VERSION;
</script>
