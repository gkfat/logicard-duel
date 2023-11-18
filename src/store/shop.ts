import { ref } from 'vue';

import { defineStore } from 'pinia';

import {
    CardDataList,
    ItemDataList,
    ShopLimit,
} from '@/data';
import Util from '@/service/util';
import { Shop } from '@/types';

const useShopStore = defineStore('shop', () => {
    const shop = ref({
        CardDataList: [],
        ItemList: [],
    } as Shop);

    /** 更新商店 */
    const refreshShop = () => {
        // 商店增加裝備
        const itemIdsPool = Util.makePool(ItemDataList);

        for (let j = 0; j < ShopLimit.Item; j += 1) {
            if (shop.value.ItemList.length < ShopLimit.Item) {
                const i = Util.getRandomInt(0, itemIdsPool.length);
                const id = itemIdsPool[i];
                const item = ItemDataList.find((x) => x.ID === id)!;
                shop.value.ItemList.push(item);
            }
        }

        // 商店增加技術牌
        const techCardsPool = Util.makePool(CardDataList);

        for (let j = 0; j < ShopLimit.Card; j += 1) {
            if (shop.value.CardDataList.length < ShopLimit.Card) {
                const i = Util.getRandomInt(0, techCardsPool.length);
                const id = techCardsPool[i];
                const card = CardDataList.find((x) => x.ID === id)!;
                shop.value.CardDataList.push(card);
            }
        }

        shop.value.ItemList = Util.sortItemList(shop.value.ItemList);
        shop.value.CardDataList = Util.sortCardList(shop.value.CardDataList);
    };

    return {
        shop,
        refreshShop,
    };
});

export default useShopStore;
