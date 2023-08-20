import { reactive, ref } from 'vue'
import { createStore, createLogger, Module } from 'vuex'
import { StoreAction } from '@/store/storeActions';

const switchModule: Module<any, any> = {
  state: {
    spinnerOpen: false,
    rankOpen: false,
    backpackOpen: false,
    shopOpen: false,
  },
  getters: {
    isSpinnerOpen: (state) => state.spinnerOpen,
    isRankOpen: (state) => state.rankOpen,
    isBackpackOpen: (state) => state.backpackOpen,
    isShopOpen: (state) => state.shopOpen,
  },
  actions: {
   /** 開關 Spinner */
    async switchSpinner(content, payload: boolean) {
      content.commit(StoreAction.switch.switchSpinner, payload);
    },
    /** 開關 Rank */
    async switchRank(content) {
      content.commit(StoreAction.switch.switchRank);
    },
    /** 開關 Backpack */
    async switchBackpack(content) {
      content.commit(StoreAction.switch.switchBackpack);
    },
    /** 開關 Shop */
    async switchShop(content) {
      content.commit(StoreAction.switch.switchShop);
    },
  },
  mutations: {
    /** 開關 Spinner */
    switchSpinner(state, target: boolean) {
      state.spinnerOpen = target;
    },
    /** 開關 Rank */
    switchRank(state) {
      state.backpackOpen = false;
      state.shopOpen = false;
      state.rankOpen = !state.rankOpen;
    },
    /** 開關 Backpack */
    switchBackpack(state) {
      state.shopOpen = false;
      state.rankOpen = false;
      state.backpackOpen = !state.backpackOpen;
    },
    /** 開關 Shop */
    switchShop(state) {
      state.rankOpen = false;
      state.backpackOpen = false;
      state.shopOpen = !state.shopOpen;
    },
  }
}

export default switchModule;