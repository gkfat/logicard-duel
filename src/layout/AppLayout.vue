<template>
    <div
        class="fill-height d-flex flex-column mx-auto"
        style="width: 100%; max-width: 500px; max-height: 100vh"
    >
        <AppHeader></AppHeader>

        <v-container
            class="fill-height py-0 pb-3 align-start"
            style="max-height: 100%"
        >
            <router-view />
        </v-container>

        <Rank></Rank>
        <Backpack></Backpack>
        <Shop></Shop>
        <Spinner />
    </div>
</template>

<script setup>
import Backpack from '@/components/backpack/Backpack.vue';
import Rank from '@/components/rank/Rank.vue';
import Shop from '@/components/shop/Shop.vue';

import AppHeader from './components/AppHeader.vue';
import Spinner from './components/Spinner.vue';
</script>
