import { createStore } from 'vuex';
import StoreAction from '@/store/storeActions';
import { Item, Shop } from '@/types';
import { enumOperation, enumSheetName, enumGameState } from '@/types/enums';
import api from '@/service/api';
import playerModule from './player';
import switchModule from './switchToggle';

export default createStore({
	state: {
		/** GameState */
		gameState: enumGameState.Init,
		rankList: [] as string[],
		shop: {
			CardList: [],
			ItemList: [],
		} as Shop,
		endUpdating: false,
	},
	getters: {
		gameState: (state) => state.gameState,
		rankList: (state) => state.rankList,
		shop: (state) => state.shop,
		endUpdating: (state) => state.endUpdating,
	},
	actions: {
		/** 改變遊戲狀態 */
		async changeGameState(content, gameState: enumGameState) {
			content.commit(StoreAction.general.changeGameState, gameState);
		},
		/** 更新商店 Item */
		async updateShop(content, payload: Item[]) {
			content.commit(StoreAction.general.updateShop, payload);
		},
		/** 獲取 API 資料 */
		async fetchData(content, payload: { sheetName: enumSheetName, operation: enumOperation }) {
			content.commit(StoreAction.general.fetchData, payload);
		},
		/** 更新 API 資料 */
		async updateData(content, payload: { sheetName: enumSheetName, operation: enumOperation, data: any }) {
			content.commit(StoreAction.general.updateData, payload);
		},
	},
	mutations: {
		/** 改變遊戲狀態 */
		changeGameState(state, gameState: enumGameState) {
			state.gameState = gameState;
		},
		/** 更新商店 Item */
		updateShop(state, payload: Shop) {
			state.shop = payload;
		},
		/** 獲取 API 資料 */
		fetchData(state, payload: { sheetName: enumSheetName, operation: enumOperation }) {
			switch (payload.sheetName) {
			case enumSheetName.Records:
				api.getData(payload.sheetName, payload.operation)
					.then((res) => { state.rankList = res.data; })
					.catch((err) => console.log(err));
				break;
			default:
				break;
			}
		},
		/** 更新 API 資料 */
		updateData(state, payload: { sheetName: enumSheetName, operation: enumOperation, data: any }) {
			api.updateData(payload.sheetName, payload.operation, payload.data)
				.then((res) => {
					if (res.status === 200) {
						state.endUpdating = true;
					}
				})
				.catch((err) => console.log(err));
		},
	},
	modules: {
		player: playerModule,
		switch: switchModule,
	},
});
