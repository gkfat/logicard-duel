import { reactive, ref } from 'vue'
import { createStore, createLogger } from 'vuex'
import { StoreAction } from '@/store/storeActions';
import { Character, enumOperation, Player, enumSheetName, enumGameState, enumMumbleType, Item } from '@/types/general';
import { CHARACTER_LIST } from '@/data';
import Util from '@/service/util';
import api from '@/service/api';
import { Sound } from '@/service/sounds';

export default createStore({
  plugins: process.env.NEDE_ENV === 'development' ? [createLogger()] : [],
  state: {
    /** GameState */
    gameState: enumGameState.Init,
    /** Player */
    player: reactive({} as Player),
    /** Enemy */
    enemy: reactive({} as Player),
    /** Mumble */
    mumble: reactive({
      player: '',
      enemy: ''
    }),
    mumbling: reactive({
      player: false,
      enemy: false
    }),
    spinnerOpen: false,
    rankOpen: false,
    backpackOpen: false,
    shopOpen: false,
    rankList: [] as string[],
    shop: [] as Item[],
    endUpdating: false,
    sounds: reactive({} as {
      click: HTMLAudioElement,
      pop: HTMLAudioElement,
      countdown: HTMLAudioElement,
      placeCard: HTMLAudioElement,
      coinDrop: HTMLAudioElement,
      robotHurt: HTMLAudioElement,
      ouch: HTMLAudioElement,
      huh: HTMLAudioElement,
      bell: HTMLAudioElement,
      battle: HTMLAudioElement,
      rest: HTMLAudioElement,
      prologue: HTMLAudioElement,
      end: HTMLAudioElement,
    })
  },
  getters: {
    sounds: (state) => state.sounds,
    gameState: (state) => state.gameState,
    player: (state) => state.player,
    enemy: (state) => state.enemy,
    playerMumble: (state) => state.mumble.player,
    playerMumbling: (state) => state.mumbling.player,
    enemyMumble: (state) => state.mumble.enemy,
    enemyMumbling: (state) => state.mumbling.enemy,
    isSpinnerOpen: (state) => state.spinnerOpen,
    isRankOpen: (state) => state.rankOpen,
    isBackpackOpen: (state) => state.backpackOpen,
    isShopOpen: (state) => state.shopOpen,
    rankList: (state) => state.rankList,
    shop: (state) => state.shop,
    endUpdating: (state) => state.endUpdating,
  },
  actions: {
    /** 初始化音效 */
    async initSounds(content) {
      content.commit(StoreAction.initSounds);
    },
    /** 改變遊戲狀態 */
    async changeGameState(content, gameState: enumGameState) {
      content.commit(StoreAction.changeGameState, gameState);
    },
    /** 選擇角色 */
    async selectCharacter(content, payload: Character) {
      content.commit(StoreAction.selectCharacter, payload);
    },
    /** 產生敵人 */
    async generateEnemy(content, id?: number) {
      const characters = CHARACTER_LIST.filter(c => c.Type === 'B');
      const index = id ? characters.findIndex(c => c.ID === id) : Util.getRandomInt(0, characters.length - 1);
      const character = characters[index];
      content.commit(StoreAction.generateEnemy, character);
    },
    /** 喃喃自語 */
    async playerMumble(content, payload: { type: enumMumbleType, delay: number }) {
      content.commit(StoreAction.playerMumble, payload);
    },
    /** 喃喃自語 */
    async enemyMumble(content, payload: { type: enumMumbleType, delay: number }) {
      content.commit(StoreAction.enemyMumble, payload);
    },
    /** 開關 Spinner */
    async switchSpinner(content, payload: boolean) {
      content.commit(StoreAction.switchSpinner, payload);
    },
    /** 開關 Rank */
    async switchRank(content) {
      content.commit(StoreAction.switchRank);
    },
    /** 開關 Backpack */
    async switchBackpack(content) {
      content.commit(StoreAction.switchBackpack);
    },
    /** 開關 Shop */
    async switchShop(content) {
      content.commit(StoreAction.switchShop);
    },
    /** 扣血 */
    async deduction(content, payload: { who: string; point: number; }) {
      content.commit(StoreAction.deduction, payload);
    },
    /** 補血 */
    async heal(content, payload: { who: string; point: number; }) {
      content.commit(StoreAction.heal, payload);
    },
    /** 更新玩家資訊 */
    async updatePlayer(content, payload: { who: string; player: Player; }) {
      content.commit(StoreAction.updatePlayer, payload);
    },
    /** 更新商店 Item */
    async updateShop(content, payload: Item[]) {
      content.commit(StoreAction.updateShop, payload);
    },
    /** 獲取 API 資料 */
    async fetchData(content, payload: { sheetName: enumSheetName, operation: enumOperation }) {
      content.commit(StoreAction.fetchData, payload);
    },
    /** 更新 API 資料 */
    async updateData(content, payload: { sheetName: enumSheetName, operation: enumOperation, data: any }) {
      content.commit(StoreAction.updateData, payload);
    }
  },
  mutations: {
    /** 初始化音效 */
    initSounds(state) {
      state.sounds = {
        /** Sound Effect */
        click: new Audio(require('@/assets/sounds/click.wav')),
        pop: new Audio(require('@/assets/sounds/pop.wav')),
        countdown: new Audio(require('@/assets/sounds/countdown.wav')),
        placeCard: new Audio(require('@/assets/sounds/placeCard.wav')),
        coinDrop: new Audio(require('@/assets/sounds/coin.mp3')),
        robotHurt: new Audio(require('@/assets/sounds/robotHurt.wav')),
        ouch: new Audio(require('@/assets/sounds/ouch.wav')),
        huh: new Audio(require('@/assets/sounds/huh.wav')),
        bell: new Audio(require('@/assets/sounds/bell.wav')),
        /** BGM */
        battle: new Audio(require('@/assets/sounds/battle.mp3')),
        rest: new Audio(require('@/assets/sounds/rest.mp3')),
        prologue: new Audio(require('@/assets/sounds/prologue.mp3')),
        end: new Audio(require('@/assets/sounds/end.mp3'))
      }
    },
    /** 改變遊戲狀態 */
    changeGameState(state, gameState: enumGameState) {
      state.gameState = gameState;
    },
    /** 選擇角色 */
    selectCharacter(state, character: Character) {
      state.player.Character = JSON.parse(JSON.stringify(character));
      state.player.CurrentHealth = JSON.parse(JSON.stringify(character.Health));
      state.player.CurrentAttack = JSON.parse(JSON.stringify(character.Attack));
      state.player.CurrentDefense = JSON.parse(JSON.stringify(character.Defense));
      state.player.CreatedTime = new Date().getTime();
      state.player.Record = {
        SurvivalTime: 0,
        DefeatBots: 0,
        TotalDamage: 0,
        TotalHeal: 0,
      };
      state.player.ItemList = JSON.parse(JSON.stringify(character.InitItemList));
      state.player.Coin = character.Coin; // 初始螺絲釘
    },
    /** 產生敵人 */
    generateEnemy(state, character: Character) {
      state.enemy.Character = JSON.parse(JSON.stringify(character));
      state.enemy.CurrentHealth = JSON.parse(JSON.stringify(character.Health));
      state.enemy.CurrentAttack = JSON.parse(JSON.stringify(character.Attack));
      state.enemy.CurrentDefense = JSON.parse(JSON.stringify(character.Defense));
      state.enemy.ExtraAttack = 0;
      state.enemy.ExtraDefense = 0;
      state.enemy.CreatedTime = new Date().getTime();
      state.enemy.ItemList = JSON.parse(JSON.stringify(character.InitItemList));
    },
    /** 玩家喃喃自語 */
    playerMumble(state, payload: { type: enumMumbleType, delay: number }) {
      console.log(`[player mumble]`)
      const mumbleList = state.player.Character.MumbleList[payload.type];
      const randomIndex = Util.getRandomInt(0, mumbleList.length);
      if (mumbleList.length > 0 && !state.mumbling.player) {
        state.mumbling.player = true;
        setTimeout(async () => {
          await Sound.playSound(state.sounds.pop);
          state.mumble.player = mumbleList[randomIndex];
          // 5 秒後關閉
          setTimeout(() => {
            state.mumbling.player = false;
            state.mumble.player = '';
          }, 5000);
        }, payload.delay);
      } else {
        state.mumbling.player = false;
        state.mumble.player = '';
      }
    },
    /** 敵人喃喃自語 */
    enemyMumble(state, payload: { type: enumMumbleType, delay: number }) {
      console.log(`[enemy mumble]`)
      const mumbleList = state.enemy.Character.MumbleList[payload.type];
      const randomIndex = Util.getRandomInt(0, mumbleList.length);
      if (mumbleList.length > 0 && !state.mumbling.enemy) {
        state.mumbling.enemy = true;
        setTimeout(async () => {
          await Sound.playSound(state.sounds.pop);
          state.mumble.enemy = mumbleList[randomIndex];
          // 5 秒後關閉
          setTimeout(() => {
            state.mumbling.enemy = false;
            state.mumble.enemy = '';
          }, 5000);
        }, payload.delay)
      } else {
        state.mumbling.enemy = false;
        state.mumble.enemy = '';
      }
    },
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
    /** 扣血 */
    deduction(state, payload: { who: string; point: number; }) {
      const { who, point } = payload;
      if (who === 'player') {
        state.player.CurrentHealth - point < 0 ? state.player.CurrentHealth = 0 : state.player.CurrentHealth -= point;
      } else if (who === 'enemy') {
        state.enemy.CurrentHealth - point < 0 ? state.enemy.CurrentHealth = 0 : state.enemy.CurrentHealth -= point;
      }
    },
    /** 補血 */
    heal(state, payload: { who: string; point: number; }) {
      const { who, point } = payload;
      if (who === 'player') {
        state.player.CurrentHealth += point;
        state.player.Record.TotalHeal += point;
      } else if (who === 'enemy') {
        state.enemy.CurrentHealth += point;
      }
    },
    /** 更新玩家資訊 */
    updatePlayer(state, payload: { who: string; player: Player }) {
      const { who, player } = payload;
      if (who === 'player') {
        state.player.ExtraAttack = player.ExtraAttack;
        state.player.ExtraDefense = player.ExtraDefense;
        state.player.Coin = player.Coin;
        state.player.ItemList = player.ItemList.sort((a, b) => a.Point - b.Point);
      } else if (who === 'enemy') {
        state.enemy.ExtraAttack = player.ExtraAttack;
        state.enemy.ExtraDefense = player.ExtraDefense;
      }
    },
    /** 更新商店 Item */
    updateShop(state, payload: Item[]) {
      state.shop = payload.sort((a, b) => a.Point - b.Point);
    },
    /** 獲取 API 資料 */
    fetchData(state, payload: { sheetName: enumSheetName, operation: enumOperation }) {
      switch (payload.sheetName) {
          case enumSheetName.Records:
            api.getData(payload.sheetName, payload.operation)
                .then(res => state.rankList = res.data)
                .catch(err => console.log(err))
          break;
      }
    },
    /** 更新 API 資料 */
    updateData(state, payload: { sheetName: enumSheetName, operation: enumOperation, data: any }) {
      api.updateData(payload.sheetName, payload.operation, payload.data)
          .then(res => {
            if (res.status === 200) {
              state.endUpdating = true;
            }
          })
          .catch(err => console.log(err))
    },
  },
  modules: {
  }
})
