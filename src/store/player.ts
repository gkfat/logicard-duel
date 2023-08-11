import { reactive, ref } from 'vue'
import { createStore, createLogger, Module } from 'vuex'
import { StoreAction } from '@/store/storeActions';
import { Character, enumOperation, Player, enumSheetName, enumGameState, enumMumbleType, Item } from '@/types/general';
import { CHARACTER_LIST } from '@/data';
import Util from '@/service/util';
import api from '@/service/api';
import Sound from '@/service/sounds';

interface PlayerState {
  player: Player;
  enemy: Player;
  mumble: {
    player: string;
    enemy: string;
  };
  mumbling: {
    player: boolean;
    enemy: boolean;
  }
}

const playerModule: Module<PlayerState, any> = {
  state: {
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
  },
  getters: {
    player: (state) => state.player,
    enemy: (state) => state.enemy,
    playerMumble: (state) => state.mumble.player,
    playerMumbling: (state) => state.mumbling.player,
    enemyMumble: (state) => state.mumble.enemy,
    enemyMumbling: (state) => state.mumbling.enemy,
  },
  actions: {
    /** 選擇角色 */
    async selectCharacter(content, payload: Character) {
      content.commit(StoreAction.player.selectCharacter, payload);
    },
    /** 產生敵人 */
    async generateEnemy(content, id?: number) {
      const characters = CHARACTER_LIST.filter(c => c.Type === 'B');
      const index = id ? characters.findIndex(c => c.ID === id) : Util.getRandomInt(0, characters.length - 1);
      const character = characters[index];
      content.commit(StoreAction.player.generateEnemy, character);
    },
    /** 喃喃自語 */
    async playerMumble(content, payload: { type: enumMumbleType, delay: number }) {
      content.commit(StoreAction.player.playerMumble, payload);
    },
    /** 喃喃自語 */
    async enemyMumble(content, payload: { type: enumMumbleType, delay: number }) {
      content.commit(StoreAction.player.enemyMumble, payload);
    },
    /** 扣血 */
    async deduction(content, payload: { who: string; point: number; }) {
      content.commit(StoreAction.player.deduction, payload);
    },
    /** 補血 */
    async heal(content, payload: { who: string; point: number; }) {
      content.commit(StoreAction.player.heal, payload);
    },
    /** 更新玩家資訊 */
    async updatePlayer(content, payload: { who: string; player: Player; }) {
      content.commit(StoreAction.player.updatePlayer, payload);
    },
  },
  mutations: {
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
      state.player.CardList = JSON.parse(JSON.stringify(character.InitCardList));
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
      state.enemy.CardList = JSON.parse(JSON.stringify(character.InitCardList));
    },
    /** 玩家喃喃自語 */
    playerMumble(state, payload: { type: enumMumbleType, delay: number }) {
      const mumbleList = state.player.Character.MumbleList[payload.type];
      const randomIndex = Util.getRandomInt(0, mumbleList.length);
      if (mumbleList.length > 0 && !state.mumbling.player) {
        state.mumbling.player = true;
        setTimeout(async () => {
          await Sound.playSound(Sound.sounds.pop);
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
      const mumbleList = state.enemy.Character.MumbleList[payload.type];
      const randomIndex = Util.getRandomInt(0, mumbleList.length);
      if (mumbleList.length > 0 && !state.mumbling.enemy) {
        state.mumbling.enemy = true;
        setTimeout(async () => {
          await Sound.playSound(Sound.sounds.pop);
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
        state.player.CardList = player.CardList.sort((a, b) => a.Point - b.Point);
      } else if (who === 'enemy') {
        state.enemy.ExtraAttack = player.ExtraAttack;
        state.enemy.ExtraDefense = player.ExtraDefense;
      }
    },
  }
}

export default playerModule;