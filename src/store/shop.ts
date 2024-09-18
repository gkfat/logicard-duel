import { ref } from 'vue';

import { defineStore } from 'pinia';

import { CardValues } from '@/enums/card';
import { EquipValues } from '@/enums/equip';
import factory from '@/factory';
import { Card, Equip } from '@/types/core';
import { getRandomInt } from '@/utils/common';

export const useShopStore = defineStore('shop', () => {
    const repository = ref<{
        cards: Card[];
        equips: Equip[];
    }>({
        cards: [],
        equips: [],
    });

    function init() {
        Array.from({ length: 10 }).forEach(() => {
            const randomCardType =
                CardValues[getRandomInt([0, CardValues.length - 1])];
            const card = factory.createCard(randomCardType);
            repository.value.cards.push(card);

            const randomEquipType =
                EquipValues[getRandomInt([0, EquipValues.length - 1])];
            const equip = factory.createEquip(randomEquipType);
            repository.value.equips.push(equip);
        });

        console.log('shop init');
    }

    return {
        repository,
        init,
    };
});
