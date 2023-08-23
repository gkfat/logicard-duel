import { reactive } from 'vue'
import { Module } from 'vuex'
import { StoreAction } from '@/store/storeActions';
import { Character, Player } from '@/types';
import { enumMumbleType } from '@/types/enums';

import { CHARACTER_LIST } from '@/data';
import Util from '@/service/util';
import Sound from '@/service/sounds';

interface PlayerState {
    player: Player;
    enemy: Player;
    mumble: {
        player: string;
        enemy: string;
    }
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
        player: (state: PlayerState) => state.player,
        enemy: (state: PlayerState) => state.enemy,
        playerMumble: (state: PlayerState) => state.mumble.player,
        playerMumbling: (state: PlayerState) => state.mumbling.player,
        enemyMumble: (state: PlayerState) => state.mumble.enemy,
        enemyMumbling: (state: PlayerState) => state.mumbling.enemy,
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
        async mumble(content, payload: { who: 'player' | 'enemy', type: enumMumbleType, delay: number }) {
            content.commit(StoreAction.player.mumble, payload);
        },
        /** 扣血 */
        async deduction(content, payload: { who: 'player' | 'enemy'; point: number; }) {
            content.commit(StoreAction.player.deduction, payload);
        },
        /** 補血 */
        async heal(content, payload: { who: 'player' | 'enemy'; point: number; }) {
            content.commit(StoreAction.player.heal, payload);
        },
        /** 更新玩家資訊 */
        async updatePlayer(content, payload: { who: 'player' | 'enemy'; player: Player; }) {
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
            state.player.ExtraAttack = 0;
            state.player.ExtraDefense = 0;
            state.player.Record = {
                SurvivalTime: 0,
                DefeatBots: 0,
                TotalDamage: 0,
                TotalHeal: 0,
            };
            state.player.CardList = [];
            state.player.ItemList = [];
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
        async mumble(state, payload: { who: 'player' | 'enemy', type: enumMumbleType, delay: number }) {
            const targetPlayer = payload.who === 'player' ? state.player : state.enemy;
            const mumbleList = targetPlayer.Character.MumbleList[payload.type];
            const randomIndex = Util.getRandomInt(0, mumbleList.length);

            switch (payload.who) {
                case 'player':
                    if (payload.delay === 0) {
                        state.mumbling.player = false;
                        state.mumble.player = '';
                    }
                    if (mumbleList.length > 0 && !state.mumbling.player) {
                        state.mumbling.player = true;
                        await Util.sleep(payload.delay);
                        await Sound.playSound(Sound.sounds.pop);
                        state.mumble.player = mumbleList[randomIndex];
                        // 5 秒後關閉
                        await Util.sleep(5000);
                        state.mumbling.player = false;
                        state.mumble.player = '';
                    }
                    break;
                case 'enemy':
                    if (payload.delay === 0) {
                        state.mumbling.enemy = false;
                        state.mumble.enemy = '';
                    }
                    if (mumbleList.length > 0 && !state.mumbling.enemy) {
                        state.mumbling.enemy = true;
                        await Util.sleep(payload.delay);
                        await Sound.playSound(Sound.sounds.pop);
                        state.mumble.enemy = mumbleList[randomIndex];
                        // 5 秒後關閉
                        await Util.sleep(5000);
                        state.mumbling.enemy = false;
                        state.mumble.enemy = '';
                    }
                    break;
            }
        },
        /** 扣血 */
        deduction(state, payload: { who: 'player' | 'enemy', point: number, }) {
            const { who, point } = payload;
            if (who === 'player') {
                state.player.CurrentHealth - point < 0 ? state.player.CurrentHealth = 0 : state.player.CurrentHealth -= point;
            } else if (who === 'enemy') {
                state.enemy.CurrentHealth - point < 0 ? state.enemy.CurrentHealth = 0 : state.enemy.CurrentHealth -= point;
            }
        },
        /** 補血 */
        heal(state, payload: { who: 'player' | 'enemy', point: number, }) {
            const { who, point } = payload;
            if (who === 'player') {
                const healResult = state.player.CurrentHealth + point;
                if (healResult > state.player.Character.Health) {
                    state.player.CurrentHealth = state.player.Character.Health;
                    state.player.Record.TotalHeal = state.player.Character.Health - healResult;
                } else {
                    state.player.CurrentHealth = healResult;
                    state.player.Record.TotalHeal += point;
                }
            } else if (who === 'enemy') {
                const healResult = state.enemy.CurrentHealth + point;
                if (healResult > state.enemy.Character.Health) {
                    state.enemy.CurrentHealth = state.enemy.Character.Health;
                } else {
                    state.enemy.CurrentHealth = healResult;
                }
            }
        },
        /** 更新玩家資訊 */
        updatePlayer(state, payload: { who: 'player' | 'enemy', player: Player, }) {
            const { who, player } = payload;
            if (who === 'player') {
                state.player.ExtraAttack = player.ExtraAttack;
                state.player.ExtraDefense = player.ExtraDefense;
                state.player.Coin = player.Coin;
                state.player.ItemList = player.ItemList;
                state.player.WeaponIndex = player.WeaponIndex;
                state.player.ArmorIndex = player.ArmorIndex;
                state.player.CardList = Util.sortCardList(player.CardList);
            } else if (who === 'enemy') {
                state.enemy.ExtraAttack = player.ExtraAttack;
                state.enemy.ExtraDefense = player.ExtraDefense;
            }
        },
    }
}

export default playerModule;