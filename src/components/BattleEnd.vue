<template>
  <div id="battle-end" class="d-flex flex-column justify-content-center">
    <Dialog :dialogs="dialogs" />

    <div>
      <p class="m-0 h6 w-100 text-center">戰利品</p>
      <p class="m-0 w-100 text-center">
        螺絲釘：{{ player.Coin }}｜物品：{{ player.ItemList.length + '／' + player.Character!.ItemLimit }}
      </p>
    </div>
    <div class="items-container d-flex justify-content-center flex-wrap flex-grow-1">
      <div v-for="(item, i) in lootBox" :key="i">
        <ItemComponent :item="item" />
      </div>
    </div>
    <!-- 沒有多餘空間 -->
    <button v-if="noSpace" type="button" class="system-btn w-100" @click="openBackpack()">整理背包</button>
    <button v-else type="button" class="system-btn w-100" @click="goRest()">休息</button>
  </div>
</template>

<script setup name="BattleEnd" lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { Item } from '@/types';
import { enumGameState, enumItemType, enumDialog } from '@/types/enums';
import Util from '@/service/util';
import Sound from '@/service/sounds';
import { DIALOGS, ITEMS } from '@/data';
import {
	useGameStateStore, usePlayerStore, useShopStore, useSwitchToggleStore,
} from '@/store';

const playerStore = usePlayerStore();
const shopStore = useShopStore();
const gameStateStore = useGameStateStore();
const switchToggleStore = useSwitchToggleStore();

const player = computed(() => playerStore.player);
const enemy = computed(() => playerStore.enemy);
const lootBox = reactive([] as Item[]);
const noSpace = computed(() => player.value.ItemList.length > player.value.Character!.ItemLimit);
const dialogs = DIALOGS[enumDialog.BattleEnd];
const box80 = Util.makeLotteryBox(80);
const box50 = Util.makeLotteryBox(50);
const box30 = Util.makeLotteryBox(30);

// 產生戰利品
const makeLoot = (type: 'equipment' | 'coin' | 'techCard') => {
	const enemyCharacter = enemy.value.Character!;
	const min = enemyCharacter.RewardCoin![0];
	const max = enemyCharacter.RewardCoin![1];
	const coin = ITEMS.find((item) => item.ItemType === enumItemType.Coin)!;
	const rewardItemIndex = Util.getRandomInt(0, enemyCharacter.RewardItemList!.length - 1);
	const lootRewardItem = enemyCharacter.RewardItemList![rewardItemIndex];
	const remainTechCardList = enemy.value.CardList.filter((c) => c.ItemType !== enumItemType.LogiCard);
	const techCardIndex = Util.getRandomInt(0, remainTechCardList.length - 1);
	const lootTechCard = remainTechCardList[techCardIndex];

	switch (type) {
	case 'coin':
		coin.Point = Util.getRandomInt(min, max);
		lootBox.push(coin);
		break;
	case 'equipment':
		lootBox.push(lootRewardItem);
		break;
	case 'techCard':
		if (remainTechCardList.length > 0) {
			lootBox.push(lootTechCard);
		}
		break;
	default:
		break;
	}
};

onMounted(() => {
	makeLoot('coin'); // 判斷獲得金幣

	if (Util.lottery(box80) && !noSpace.value) { // 80% 機率獲得一件戰利品
		makeLoot('equipment');
	}

	if (Util.lottery(box30) && !noSpace.value) { // 30% 機率獲得第二件戰利品
		makeLoot('equipment');
	}

	if (Util.lottery(box50)) { // 50% 機率獲得一張 Gkbot 剩餘的技術牌
		makeLoot('techCard');
	}

	const updatedPlayer = { ...player.value };
	lootBox.forEach((loot) => {
		switch (loot.ItemType) {
		case enumItemType.Coin:
			updatedPlayer.Coin += loot.Point;
			break;
		case enumItemType.Attack:
		case enumItemType.Defense:
		case enumItemType.Heal:
			updatedPlayer.CardList.push(loot);
			break;
		case enumItemType.Weapon:
		case enumItemType.Armor:
			updatedPlayer.ItemList.push(loot);
			break;
		default:
			break;
		}
	});

	// 更新玩家
	playerStore.updatePlayer('player', updatedPlayer);

	// 更新商店
	shopStore.refreshShop();
});

// 打開背包
const openBackpack = async () => {
	switchToggleStore.toggle('backpack');
};

const goRest = async () => {
	await Sound.playSound(Sound.sounds.effect.click);
	gameStateStore.changeGameState(enumGameState.Rest);
};
</script>

<style lang="scss" scoped>
#battle-end {
  height: 100%;
  gap: 15px;
}
.items-container {
  overflow-y: scroll;
  gap: 10px;
}
</style>
