<template>
    <div
        class="fill-height d-flex flex-column mx-auto"
        :style="{
            width: '100%',
            maxWidth: '500px',
            maxHeight: '100%'
        }"
    >
        <AppHeader></AppHeader>

        <v-container
            class="fill-height py-0 d-flex flex-column flex-nowrap"
            :style="{
                maxHeight: 'calc(100% - 50px)',
            }"
        >
            <router-view class="flex-grow-1" />
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
