<template>
    <div class="detail">
        <Icon
            v-if="isItem"
            :url="item.Icon"
        />
        <Card
            v-if="!isItem"
            :item="item"
        />
        <p class="h5 w-100 text-center m-0">
            {{ item.Name }}
        </p>
        <p
            v-if="item.Rarity !== enumRarity.None"
            class="rarity"
        >
            {{ Util.getRarityType(item.Rarity) }}
        </p>
        <p class="w-100 text-center m-0">
            【{{ $t('item_type.' + item.ItemType) }}】
        </p>
        <p
            v-if="item.ItemType === enumItemType.Attack
                || item.ItemType === enumItemType.Weapon"
            class="w-100 text-center m-0 detail-extra"
        >
            {{ $t('attack') }} + {{ item.Point }}
        </p>
        <p
            v-if="item.ItemType === enumItemType.Defense
                || item.ItemType === enumItemType.Armor"
            class="w-100 text-center m-0 detail-extra"
        >
            {{ $t('defense') }} + {{ item.Point }}
        </p>
        <p
            v-if="item.ItemType === enumItemType.Heal"
            class="w-100 text-center m-0 detail-extra"
        >
            {{ $t('health') }} + {{ item.Point }}
        </p>
        <p class="w-100 text-center m-0">
            {{ item.Description }}
        </p>
    </div>
</template>

<script setup name="Detail" lang="ts">
import Util from '@/service/util';
import { Item } from '@/types';
import {
    enumItemType,
    enumRarity,
} from '@/types/enums';

import Card from './Card.vue';
import Icon from './Icon.vue';

const props = defineProps<{ item: Item }>();

const isItem = props.item.ItemType === enumItemType.Coin
                || props.item.ItemType === enumItemType.Weapon
                || props.item.ItemType === enumItemType.Armor;
</script>

<style lang="scss" scoped>
.detail {
    position: relative;
    width: 100%;
    height: 50%;
    background-color: var(--darkblue);
    border: 5px solid var(--green);
    border-radius: 15px;
    padding: 15px;
    gap: 10px;
    color: var(--green);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
        width: 100px;
        height: 100px;
    }
    &-extra {
        color: var(--skin);
    }
    .rarity {
        position: absolute;
        left: 10px;
        top: 10px;
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--red);
    }
}
</style>
