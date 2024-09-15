import { ref } from 'vue';

import { defineStore } from 'pinia';

import { CardTemplateList } from '@/data/card-templates';
import { EquipTemplateList } from '@/data/equip-templates';
import { enumCard } from '@/enums/card';
import { enumEquip } from '@/enums/equip';
import { Card } from '@/types/card';
import { Equip } from '@/types/equip';
import { getRandomInt } from '@/utils/common';
import { createDate } from '@/utils/time';

export const useShareStore = defineStore('share', () => {
    const pool = ref<{
        cards: Card[];
        equips: Equip[];
    }>({
        cards: [],
        equips: [],
    });

    const createCard = (type: enumCard) => {
        const autoIncrementIndex =
            pool.value.cards.length > 0
                ? pool.value.cards[pool.value.cards.length - 1].id
                : 1;
        const template = CardTemplateList.find((c) => c.type === type)!;

        const result: Card = {
            id: autoIncrementIndex,
            createdAt: createDate().toDate(),
            info: template,
            point: getRandomInt(template.pointRange),
        };

        return result;
    };

    const createEquip = (type: enumEquip) => {
        const autoIncrementIndex =
            pool.value.equips.length > 0
                ? pool.value.equips[pool.value.equips.length - 1].id
                : 1;
        const template = EquipTemplateList.find((c) => c.type === type)!;

        const result: Equip = {
            id: autoIncrementIndex,
            createdAt: createDate().toDate(),
            info: template,
            point: getRandomInt(template.pointRange),
        };

        return result;
    };

    /** 初始化 */
    const init = () => {
        Array.from(new Array(50, null)).forEach((i) => {
            pool.value.cards.push(createCard(enumCard.LogiCard1));
            pool.value.cards.push(createCard(enumCard.LogiCard2));
            pool.value.cards.push(createCard(enumCard.LogiCard3));
            pool.value.cards.push(createCard(enumCard.LogiCard4));
            pool.value.cards.push(createCard(enumCard.LogiCard5));
            pool.value.cards.push(createCard(enumCard.LogiCard6));
            pool.value.cards.push(createCard(enumCard.LogiCard7));
        });
    };

    return {
        init,
    };
});
