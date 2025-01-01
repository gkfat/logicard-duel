<template>
    <div
        class="fill-height d-flex flex-column align-center mx-auto"
        :style="{
            width: '100%',
            height: '100%',
            maxWidth: '500px',
            maxHeight: '700px',
        }"
    >
        <AppHeader />

        <v-container class="fill-height py-0 d-flex flex-column flex-nowrap">
            <router-view class="flex-grow-1" />
        </v-container>
    </div>

    <Rank />
    <Backpack />
    <Shop />
    <Spinner />
</template>

<script setup>
import Backpack from '@/components/backpack/Backpack.vue';
import Rank from '@/components/rank/Rank.vue';
import Shop from '@/components/shop/Shop.vue';

import AppHeader from './components/AppHeader.vue';
import Spinner from './components/Spinner.vue';
</script>
