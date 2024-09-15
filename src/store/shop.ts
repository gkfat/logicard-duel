import { ref } from 'vue';

import { defineStore } from 'pinia';

import { Card } from '@/types/card';
import { Equip } from '@/types/equip';

export const useShopStore = defineStore('shop', () => {
    const repository = ref<{
        cards: Card[];
        equips: Equip[];
    }>({
        cards: [],
        equips: [],
    });

    const init = () => {};

    return {
        repository,
        init,
    };
});
