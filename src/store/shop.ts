import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Shop } from '@/types';
import Util from '@/service/util';
import { CARDS, ITEMS, ShopLimit } from '@/data';

const useShopStore = defineStore('shop', () => {
	const shop = ref({
		CardList: [],
		ItemList: [],
	} as Shop);

	/** 更新商店 */
	const refreshShop = () => {
		// 商店增加裝備
		const itemIdsPool = Util.makePool(ITEMS);

		for (let j = 0; j < ShopLimit.Item; j += 1) {
			if (shop.value.ItemList.length < ShopLimit.Item) {
				const i = Util.getRandomInt(0, itemIdsPool.length);
				const id = itemIdsPool[i];
				const item = ITEMS.find((x) => x.ID === id)!;
				shop.value.ItemList.push(item);
			}
		}

		// 商店增加技術牌
		const techCardsPool = Util.makePool(CARDS);

		for (let j = 0; j < ShopLimit.Card; j += 1) {
			if (shop.value.CardList.length < ShopLimit.Card) {
				const i = Util.getRandomInt(0, techCardsPool.length);
				const id = techCardsPool[i];
				const card = CARDS.find((x) => x.ID === id)!;
				shop.value.CardList.push(card);
			}
		}

		shop.value.ItemList = Util.sortItemList(shop.value.ItemList);
		shop.value.CardList = Util.sortCardList(shop.value.CardList);
	};

	return {
		shop,
		refreshShop,
	};
});

export default useShopStore;
