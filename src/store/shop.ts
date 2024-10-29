import { ref } from 'vue';

import { defineStore } from 'pinia';

import { CardValues } from '@/enums/card';
import { EquipValues } from '@/enums/equip';
import factory from '@/factory';
import {
    Card,
    Equip,
} from '@/types/core';
import { getRandomInt } from '@/utils/common';

import { useAppStore } from './app';

export const useShopStore = defineStore('shop', () => {
    const appStore = useAppStore();
    /** 商店重置倒數時間 */
    const remainSeconds = ref(0);

    const repository = ref<{
        cards: Card[];
        equips: Equip[];
    }>({
        cards: [],
        equips: [],
    });

    /** 清空商店 */
    function clearShop() {
        repository.value.cards = [];
        repository.value.equips = [];
    }

    /** 更新商店 */
    function refreshShop() {
        const shopMaxLength = 5;
        const shouldRefillCardsLength =
            shopMaxLength - repository.value.cards.length;
        const shouldRefillEquipsLength =
            shopMaxLength - repository.value.equips.length;

        // 補充卡牌
        Array.from({ length: shouldRefillCardsLength }).forEach(() => {
            const randomCardType =
                CardValues[getRandomInt([0, CardValues.length - 1])];
            const card = factory.createCard(randomCardType);

            repository.value.cards.push(card);
        });

        // 補充裝備
        Array.from({ length: shouldRefillEquipsLength }).forEach(() => {
            const randomEquipType =
                EquipValues[getRandomInt([0, EquipValues.length - 1])];
            const equip = factory.createEquip(randomEquipType);

            repository.value.equips.push(equip);
        });

        // 價格低至高排序
        repository.value.cards.sort((a, b) => a.info.price - b.info.price);
        repository.value.equips.sort((a, b) => a.info.price - b.info.price);

        console.log('shop refreshed');
    }

    /**
     * 賣出道具
     */
    async function soldEquip(equip: Equip) {
        const findIndex = repository.value.equips.findIndex((v) => v.id === equip.id);

        if (findIndex) {
            repository.value.equips.splice(findIndex, 1);
        }
    }

    /**
     * 賣出道具
     */
    async function soldCard(card: Card) {
        const findIndex = repository.value.cards.findIndex((v) => v.id === card.id);

        if (findIndex) {
            repository.value.cards.splice(findIndex, 1);
        }
    }

    /** 重置倒數時間 */
    function resetRemainSeconds() {
        remainSeconds.value = appStore.ENV.shopRefreshMinutes * 60;
    }

    /** 商店更新倒數計時器 */
    async function startRefreshingCountDown() {
        // 重置倒數計時
        resetRemainSeconds();

        const countdownInterval = setInterval(async () => {
            if (remainSeconds.value > 0) {
                remainSeconds.value -= 1;
            } else {
                clearInterval(countdownInterval);
                clearShop();
                refreshShop();
                startRefreshingCountDown();
            }
        }, 1000);
    }

    function init() {
        refreshShop();

        startRefreshingCountDown();

        console.log('shop init');
    }

    return {
        repository,
        remainSeconds,
        init,
        soldCard,
        soldEquip
    };
});
