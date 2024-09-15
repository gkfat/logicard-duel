<template>
    <div
        v-for="(item, i) of parentProps.cardList"
        :key="i"
        :style="{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: calcTransform(i)
        }"
    >
        <Card
            :item="item"
        />
    </div>
</template>
<script lang="ts" setup>
import Card from '@/components/Card.vue';
import { Game } from '@/types';

const parentProps = defineProps<{
    cardList: Game.Item[],
}>();

const calcTransform = (i: number) => `translateX(${i}px) translateY(-${i + 2}px)`;
</script>
