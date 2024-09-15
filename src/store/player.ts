import { ref } from 'vue';

import { defineStore } from 'pinia';

import { CharacterDataList } from '@/data';
import Util from '@/service/util';
import { Game } from '@/types';
import { CharacterTemplate } from '@/types/character';
import { enumMumbleType } from '@/types/enums';
import { Player } from '@/types/player';
import { createDate } from '@/utils/time';

import { getRandomInt } from '../utils/common';
import { useShareStore } from './share';
import { useSoundStore } from './sound';

export const usePlayerStore = defineStore('player', () => {
    const soundStore = useSoundStore();
    const shareStore = useShareStore();
    const currentPlayer = ref<Player>();

    // 喃喃自語
    const isMumbling = ref(false);
    const mumbleContent = ref('');

    /** 選擇角色 */
    const selectCharacter = (character: CharacterTemplate) => {
        const { healthRange, attackRange, defenseRange, equips, cards, coin } =
            character.init;

        currentPlayer.value = {
            id: 0,
            createdAt: createDate().toDate(),
            character: { ...character },
            status: {
                health: getRandomInt(healthRange),
                attack: getRandomInt(attackRange),
                defense: getRandomInt(defenseRange),
            },
            equipment: {
                primaryHand: null,
                secondaryHand: null,
                body: null,
                head: null,
                pants: null,
                boots: null,
            },
            backpack: {
                equips: character.init.equips,
                cards: character.init.cards,
                coin,
            },
        };
    };

    /** 產生敵人 */
    const generateEnemy = (id?: number) => {
        const characters = CharacterDataList.filter((c) => c.Type === 'B');
        const i = id
            ? characters.findIndex((c) => c.ID === id)
            : Util.getRandomInt(0, characters.length - 1);
        const newCharacter = { ...characters[i] };
        enemy.value.Character = newCharacter;
        enemy.value.CurrentHealth = newCharacter.Health;
        enemy.value.CurrentAttack = newCharacter.Attack;
        enemy.value.CurrentDefense = newCharacter.Defense;
        enemy.value.CreatedTime = new Date().getTime();
        enemy.value.CardDataList = newCharacter.InitCardList!;
    };

    /** private */
    const clearMumble = (who: 'player' | 'enemy') => {
        if (who === 'player') {
            playerMumbling.value = false;
            playerMumbleString.value = '';
        } else {
            enemyMumbling.value = false;
            enemyMumbleString.value = '';
        }
    };

    /** 玩家喃喃自語 */
    const mumble = async (
        who: 'player' | 'enemy',
        type: enumMumbleType,
        delay: number
    ) => {
        const targetPlayer = who === 'player' ? player : enemy;
        const mumbleList = targetPlayer.value.Character!.MumbleList[type];
        const randomIndex = Util.getRandomInt(0, mumbleList.length);
        const mumbleString = mumbleList[randomIndex];

        switch (who) {
            case 'player':
                if (delay === 0) {
                    clearMumble('player');
                }
                if (mumbleList.length > 0 && !playerMumbling.value) {
                    playerMumbling.value = true;
                    await Util.sleep(delay);
                    await soundStore.playSound(soundStore.sounds.effect.pop);
                    playerMumbleString.value = mumbleString;
                    // 5 秒後關閉
                    await Util.sleep(5000);
                    clearMumble('player');
                }
                break;
            case 'enemy':
                if (delay === 0) {
                    clearMumble('enemy');
                }
                if (mumbleList.length > 0 && !enemyMumbling.value) {
                    enemyMumbling.value = true;
                    await Util.sleep(delay);
                    await soundStore.playSound(soundStore.sounds.effect.pop);
                    enemyMumbleString.value = mumbleString;
                    // 5 秒後關閉
                    await Util.sleep(5000);
                    clearMumble('enemy');
                }
                break;
            default:
                break;
        }
    };

    /** 扣血 */
    const deduction = (who: 'player' | 'enemy', point: number) => {
        switch (who) {
            case 'player':
                if (player.value.CurrentHealth - point < 0) {
                    player.value.CurrentHealth = 0;
                } else {
                    player.value.CurrentHealth -= point;
                }
                break;
            case 'enemy':
                if (enemy.value.CurrentHealth - point < 0) {
                    enemy.value.CurrentHealth = 0;
                } else {
                    enemy.value.CurrentHealth -= point;
                }
                break;
            default:
                break;
        }
    };

    /** 補血 */
    const heal = (who: 'player' | 'enemy', point: number) => {
        if (who === 'player') {
            const characterHealth = player.value.Character!.Health;
            const healResult = player.value.CurrentHealth + point;
            if (healResult > characterHealth) {
                player.value.CurrentHealth = characterHealth;
                player.value.Record.TotalHeal = characterHealth - healResult;
            } else {
                player.value.CurrentHealth = healResult;
                player.value.Record.TotalHeal += point;
            }
        } else if (who === 'enemy') {
            const characterHealth = enemy.value.Character!.Health;
            const healResult = enemy.value.CurrentHealth + point;
            if (healResult > characterHealth) {
                enemy.value.CurrentHealth = characterHealth;
            } else {
                enemy.value.CurrentHealth = healResult;
            }
        }
    };

    /** 更新玩家資訊 */
    const updatePlayer = (
        who: 'player' | 'enemy',
        updatedPlayer: Game.Player
    ) => {
        if (who === 'player') {
            player.value.ExtraAttack = updatedPlayer.ExtraAttack;
            player.value.ExtraDefense = updatedPlayer.ExtraDefense;
            player.value.Coin = updatedPlayer.Coin;
            player.value.ItemList = updatedPlayer.ItemList;
            player.value.WeaponIndex = updatedPlayer.WeaponIndex;
            player.value.ArmorIndex = updatedPlayer.ArmorIndex;
            player.value.CardDataList = Util.sortCardList(
                updatedPlayer.CardDataList
            );
        } else if (who === 'enemy') {
            enemy.value.ExtraAttack = updatedPlayer.ExtraAttack;
            enemy.value.ExtraDefense = updatedPlayer.ExtraDefense;
        }
    };

    return {
        player,
        enemy,
        playerMumbling,
        playerMumbleString,
        enemyMumbling,
        enemyMumbleString,
        selectCharacter,
        generateEnemy,
        deduction,
        mumble,
        heal,
        updatePlayer,
    };
});
