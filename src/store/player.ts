import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { Character, Player } from '@/types';
import { enumMumbleType } from '@/types/enums';
import { CharacterDataList } from '@/data';
import Util from '@/service/util';
import Sound from '@/service/sounds';

const usePlayerStore = defineStore('player', () => {
	const player = reactive({
		ExtraAttack: 0,
		ExtraDefense: 0,
		Record: {
			SurvivalTime: 0,
			DefeatBots: 0,
			TotalDamage: 0,
			TotalHeal: 0,
		},
		CardDataList: [],
		ItemList: [],
		Character: null,
		CurrentAttack: 0,
		CurrentDefense: 0,
		CurrentHealth: 0,
		Coin: 0,
		WeaponIndex: null,
		ArmorIndex: null,
		CreatedTime: null,
	} as Player);
	const enemy = reactive({
		ExtraAttack: 0,
		ExtraDefense: 0,
		Record: {
			SurvivalTime: 0,
			DefeatBots: 0,
			TotalDamage: 0,
			TotalHeal: 0,
		},
		CardDataList: [],
		ItemList: [],
		Character: null,
		CurrentAttack: 0,
		CurrentDefense: 0,
		CurrentHealth: 0,
		Coin: 0,
		WeaponIndex: null,
		ArmorIndex: null,
		CreatedTime: null,
	} as Player);

	// 喃喃自語
	const playerMumbling = ref(false);
	const enemyMumbling = ref(false);
	const playerMumbleString = ref('');
	const enemyMumbleString = ref('');

	/** 選擇角色 */
	const selectCharacter = (character: Character) => {
		const newCharacter = { ...character };
		player.Character = newCharacter;
		player.CurrentHealth = newCharacter.Health;
		player.CurrentAttack = newCharacter.Attack;
		player.CurrentDefense = newCharacter.Defense;
		player.CreatedTime = new Date().getTime();
		player.Coin = newCharacter.Coin;
	};

	/** 產生敵人 */
	const generateEnemy = (id?: number) => {
		const characters = CharacterDataList.filter((c) => c.Type === 'B');
		const i = id ? characters.findIndex((c) => c.ID === id) : Util.getRandomInt(0, characters.length - 1);
		const newCharacter = { ...characters[i] };
		enemy.Character = newCharacter;
		enemy.CurrentHealth = newCharacter.Health;
		enemy.CurrentAttack = newCharacter.Attack;
		enemy.CurrentDefense = newCharacter.Defense;
		enemy.CreatedTime = new Date().getTime();
		enemy.CardDataList = newCharacter.InitCardList!;
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
	const mumble = async (who: 'player' | 'enemy', type: enumMumbleType, delay: number) => {
		const targetPlayer = who === 'player' ? player : enemy;
		const mumbleList = targetPlayer.Character!.MumbleList[type];
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
				await Sound.playSound(Sound.sounds.effect.pop);
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
				await Sound.playSound(Sound.sounds.effect.pop);
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
			if (player.CurrentHealth - point < 0) {
				player.CurrentHealth = 0;
			} else {
				player.CurrentHealth -= point;
			}
			break;
		case 'enemy':
			if (enemy.CurrentHealth - point < 0) {
				enemy.CurrentHealth = 0;
			} else {
				enemy.CurrentHealth -= point;
			}
			break;
		default:
			break;
		}
	};

	/** 補血 */
	const heal = (who: 'player' | 'enemy', point: number) => {
		if (who === 'player') {
			const characterHealth = player.Character!.Health;
			const healResult = player.CurrentHealth + point;
			if (healResult > characterHealth) {
				player.CurrentHealth = characterHealth;
				player.Record.TotalHeal = characterHealth - healResult;
			} else {
				player.CurrentHealth = healResult;
				player.Record.TotalHeal += point;
			}
		} else if (who === 'enemy') {
			const characterHealth = enemy.Character!.Health;
			const healResult = enemy.CurrentHealth + point;
			if (healResult > characterHealth) {
				enemy.CurrentHealth = characterHealth;
			} else {
				enemy.CurrentHealth = healResult;
			}
		}
	};

	/** 更新玩家資訊 */
	const updatePlayer = (who: 'player' | 'enemy', updatedPlayer: Player) => {
		if (who === 'player') {
			player.ExtraAttack = updatedPlayer.ExtraAttack;
			player.ExtraDefense = updatedPlayer.ExtraDefense;
			player.Coin = updatedPlayer.Coin;
			player.ItemList = updatedPlayer.ItemList;
			player.WeaponIndex = updatedPlayer.WeaponIndex;
			player.ArmorIndex = updatedPlayer.ArmorIndex;
			player.CardDataList = Util.sortCardList(updatedPlayer.CardDataList);
		} else if (who === 'enemy') {
			enemy.ExtraAttack = updatedPlayer.ExtraAttack;
			enemy.ExtraDefense = updatedPlayer.ExtraDefense;
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

export default usePlayerStore;
