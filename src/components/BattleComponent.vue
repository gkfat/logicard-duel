<template>
  <div id="battle" class="d-flex flex-column justify-content-end align-items-center">
    <!-- Enemy -->
    <div class="enemy">
      <div class="items-container mb-3">
        <CardComponent v-for="(item, i) in enemy.ItemList" :sm="true" :is-card-back="true" :item="item"></CardComponent>
      </div>
      <PlayerStatusComponent :player="enemy"></PlayerStatusComponent>
    </div>

    <!-- Table -->
    <div class="card-table">
      <!-- 用過的牌堆 -->
      <div class="used-card-list rounded">
        <CardComponent v-for="item of table.usedCardList" :sm="true" :item="item"></CardComponent>
      </div>
      <!-- 系統提示 -->
      <p class="system-text">
        <!-- 局規則 -->
        <template v-if="deal === -1">【抽籤中...】</template>
        <template v-if="deal === 0">【比小】</template>
        <template v-if="deal === 1">【比大】</template>
        <span class="me-1"></span>
        <!-- 局狀態 -->
        <template v-if="roundState === enumRoundState.Start">回合開始</template>
        <template v-if="roundState === enumRoundState.Counting">{{ countDownRemainSec }} 秒</template>
        <template v-if="roundState === enumRoundState.Duel">決勝！</template>
        <template v-if="roundState >= enumRoundState.Settle">
          <template v-if="table.result === enumBattleResult.PlayerWin">你贏了</template>
          <template v-if="table.result === enumBattleResult.PlayerLose">你輸了</template>
          <template v-if="table.result === enumBattleResult.Draw">平手</template>
        </template>
      </p>
      <!-- Enemy Cards -->
      <div class="enemy-items" :class="{ 'item-glow': table.result === enumBattleResult.PlayerLose }">
        <CardComponent v-if="table.enemyItems[0]" :klass="tossCard ? 'enemy-toss-card' : ''" :is-card-back="!openCard" :item="table.enemyItems[0]"></CardComponent>
        <CardComponent v-if="table.enemyItems[1]" :klass="tossCard ? 'enemy-toss-card' : ''" :is-card-back="!openCard" :item="table.enemyItems[1]"></CardComponent>
      </div>
      <!-- Player Cards -->
      <div class="player-items" :class="{ 'item-glow': table.result === enumBattleResult.PlayerWin }">
        <div type="button" v-if="table.playerItems[0]" @click="getCardFromTable(player.Character, 0)">
          <CardComponent :klass="tossCard ? 'player-toss-card' : ''" :item="table.playerItems[0]"></CardComponent>
        </div>
        <div type="button" v-if="table.playerItems[1]" @click="getCardFromTable(player.Character, 1)">
          <CardComponent :klass="tossCard ? 'player-toss-card' : ''" :item="table.playerItems[1]"></CardComponent>
        </div>
      </div>
    </div>

    <!-- Player -->
    <div class="player">
      <div class="items-container">
        <div v-for="(item, i) in player.ItemList" type="button" @click="placeCardOnTable(player.Character, item, i)">
          <CardComponent :style="calcCardRotate(i)" :item="item"></CardComponent>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup name="BattleComponent" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { Item, Player, Character, enumGameState, enumItemType, enumRoundState, enumBattleResult, enumMumbleType } from '@/types/general';
import CardComponent from './CardComponent.vue';
import PlayerStatusComponent from './PlayerStatusComponent.vue';
import Util from '@/service/util';
import { Audios, Sound } from '@/service/sounds';

const store = useStore();
const gameState = computed(() => store.getters.gameState as enumGameState);
const player = computed(() => store.getters.player as Player);
const enemy = computed(() => store.getters.enemy as Player);

const openCard = ref(false);
const deal = ref(0);

const roundState = ref(enumRoundState.Start);
const table = reactive({
  enemyItems: [null, null] as Array<Item | null>,
  playerItems: [null, null] as Array<Item | null>,
  result: enumBattleResult.Init,
  usedCardList: [] as Item[]
})

const box50 = Util.makeLotteryBox(50); // 機率 50% 的箱子
const box30 = Util.makeLotteryBox(30); // 機率 30% 的箱子

// Init
onMounted(() => {
  table.usedCardList = [];
  resetExtraStatus();
  roundStart();
})

// 設定卡牌弧形排列
const calcCardRotate = (i: number) => {
  const middleIndex = Math.floor(player.value.ItemList.length / 2);
  const deg = (i - middleIndex) * 5.5;
  const y = Math.abs((i - middleIndex)) * Math.abs((i-middleIndex)) * 2;
  return `rotate(${deg}deg) translateY(${y}px)`;
}

const tossCard = ref(false);

// 開始回合
const roundStart = () => {
  if (table.enemyItems[0]) {
    table.usedCardList.push(table.enemyItems[0]);
  }
  if (table.enemyItems[1]) {
    table.usedCardList.push(table.enemyItems[1]);
  }
  if (table.playerItems[0]) {
    table.usedCardList.push(table.playerItems[0]);
  }
  if (table.playerItems[1]) {
    table.usedCardList.push(table.playerItems[1]);
  }
  table.enemyItems = [null, null];
  table.playerItems = [null, null];
  tossCard.value = false;

  openCard.value = false; // 重置開牌狀態
  roundState.value = enumRoundState.Start;
  table.result = enumBattleResult.Init;
  // 若有人沒牌就從用過的牌堆中補充 3 張
  const enemyLogiCards = enemy.value.ItemList.filter(item => item.ItemType === enumItemType.LogiCard);
  const playerLogiCards = player.value.ItemList.filter(item => item.ItemType === enumItemType.LogiCard);
  if (enemyLogiCards.length === 0) {
    dealCard('enemy');
  }
  if (playerLogiCards.length === 0) {
    dealCard('player');
  }
  clearInterval(countDownTimer.value!); // 清除計時器
  dealGame(); // 抽籤決定比大比小
}

// 雙方各補充 3 張牌堆中的牌
const dealCard = async (who: string) => {
  let index = 0;
  let item: Item;
  switch (who) {
    case 'enemy':
      for (let i = 0; i < 3; i++) {
        setTimeout(async () => {
          await Sound.playSound(Audios.placeCard);
          index = Util.getRandomInt(0, table.usedCardList.length - 1);
          item = table.usedCardList[index];
          enemy.value.ItemList.push(item);
          table.usedCardList.splice(index, 1);
        }, i * 300);
      }
      break;
    case 'player':
      for (let i = 0; i < 3; i++) {
        setTimeout(async () => {
          await Sound.playSound(Audios.placeCard);
          index = Util.getRandomInt(0, table.usedCardList.length - 1)
          item = table.usedCardList[index];
          player.value.ItemList.push(item);
          table.usedCardList.splice(index, 1);
          player.value.ItemList.sort((a, b) => a.ID - b.ID);
        }, i * 300);
      }
      break;
  }
}

// 抽籤
const dealGame = async () => {
  deal.value = -1;
  setTimeout(async () => {
    deal.value = Util.getZeroOrOne();
    await Sound.playSound(Audios.bell);
  }, 3000);
}

// 監看抽籤結果，決定敵人何時出牌
const countDownSec = 10;
const countDownTimer = ref(null as number | null);
const countDownRemainSec = ref(countDownSec);
watch(deal, async () => {
  if (deal.value !== -1) {
    startMumbleInterval(); // 開始喃喃自語定時器
    // 開始倒數計時
    countDownRemainSec.value = countDownSec;
    roundState.value = enumRoundState.Counting;
    countDownTimer.value = setInterval(async () => {
      if (countDownRemainSec.value > 0) {
        countDownRemainSec.value -= 1;
        if (countDownRemainSec.value === 3) {
          await Sound.playSound(Audios.countdown);
        }
      } else {
        openCard.value = true; // 開牌
        roundState.value = enumRoundState.Duel;
        setTimeout(() => draw(), 2000); // 判斷結果
        clearInterval(countDownTimer.value!);
      }
    }, 1000);
    setTimeout(() => enemyPlaceCard(), Util.getRandomInt(3, countDownSec / 2) * 1000); // 不定時出牌
  }
})

const playerMumbling = computed(() => store.getters.playerMumbling as boolean);
const enemyMumbling = computed(() => store.getters.enemyMumbling as boolean);
// 開啟喃喃自語定時器
const startMumbleInterval = () => {
  const mumbleInterval = setInterval(() => {
    if (countDownRemainSec.value > 0) {
      // player mumble
      if (!playerMumbling.value) {
        store.dispatch(StoreAction.playerMumble, {
          type: enumMumbleType.General,
          delay: Util.getRandomInt(0, countDownRemainSec.value / 2) * 1000
        });
      }

      // enemy mumble
      if (!enemyMumbling.value) {
        store.dispatch(StoreAction.enemyMumble, {
          type: enumMumbleType.General,
          delay: Util.getRandomInt(0, countDownRemainSec.value / 2) * 1000
        });
      }
    } else {
      clearInterval(mumbleInterval);
    }
  }, 5000);
}

// 敵人出牌邏輯
const enemyPlaceCard = () => {
  // 技術牌
  const findHealthCards = enemy.value.ItemList.filter(item => item.ItemType === enumItemType.Health);
  const findAttackCards = enemy.value.ItemList.filter(item => item.ItemType === enumItemType.Attack);
  const findDefenseCards = enemy.value.ItemList.filter(item => item.ItemType === enumItemType.Defense);
  if (findHealthCards.length > 0) { // 若有補血牌
    if (enemy.value.CurrentHealth <= (enemy.value.Character.Health * 0.3)) { // 若機器人血量低於 30% 就用
      const index = enemy.value.ItemList.indexOf(findHealthCards[0]);
      placeCardOnTable(enemy.value.Character, findHealthCards[0], index);
    }
  }
  if (findAttackCards.length > 0 && Util.lottery(box50)) { // 若有攻擊牌，則有 5 成機率出牌
    const index = enemy.value.ItemList.indexOf(findAttackCards[0]);
    placeCardOnTable(enemy.value.Character, findAttackCards[0], index);
  }
  if (findDefenseCards.length > 0 && Util.lottery(box50)) { // 若有防禦牌，則有 5 成機率出牌
    const index = enemy.value.ItemList.indexOf(findDefenseCards[0]);
    placeCardOnTable(enemy.value.Character, findDefenseCards[0], index);
  }
  const items = enemy.value.ItemList
                    .filter(item => item.ItemType === enumItemType.LogiCard)
                    .sort((a, b) => a.Point - b.Point);
  const half = Math.floor(items.length / 2);
  let index = 0;
  switch (deal.value) {
    case 0: // 比小
      index = Util.getRandomInt(0, half);
      break;
    case 1: // 比大
      index = Util.getRandomInt(half, items.length - 1);
      break;
  }
  placeCardOnTable(enemy.value.Character, enemy.value.ItemList[index], index);
}

// 放一張牌上桌
const placeCardOnTable = async (character: Character, item: Item, i: number) => {
  let pos = 0;
  switch (item.ItemType) {
    case enumItemType.LogiCard:
      pos = 0;
      break;
    case enumItemType.Attack:
    case enumItemType.Defense:
    case enumItemType.Health:
      pos = 1;
      break;
  }
  switch (character.Type) {
    case 'P': // 玩家
      const findCard = table.playerItems[pos];
      const allowTime = roundState.value === enumRoundState.Counting || roundState.value === enumRoundState.Start;
      if (!findCard && allowTime) {
        await Sound.playSound(Audios.placeCard);
        player.value.ItemList.splice(i, 1);
        table.playerItems[pos] = item;
        store.dispatch(StoreAction.playerMumble, { type: enumMumbleType.PlaceCard, delay: 0 });
        if (!enemyMumbling.value && Util.lottery(box50)) {
          store.dispatch(StoreAction.enemyMumble, { type: enumMumbleType.EnemyPlaceCard, delay: 0 });
        }
      }
      player.value.ItemList.sort((a, b) => a.ID - b.ID);
      break;
    case 'B': // 機器人
      enemy.value.ItemList.splice(i, 1);
      table.enemyItems[pos] = item;
      if (Util.lottery(box50)) {
        store.dispatch(StoreAction.enemyMumble, { type: enumMumbleType.PlaceCard, delay: 0 });
      }
      break;
  }
}

// 從桌上收回牌
const getCardFromTable = async (character: Character, i: number) => {
  switch (character.Type) {
    case 'P': // 玩家
      const findCard = table.playerItems[i]!;
      const allowTime = roundState.value === enumRoundState.Counting || roundState.value === enumRoundState.Start;
      if (allowTime) {
        await Sound.playSound(Audios.placeCard);
        player.value.ItemList.push(findCard);
        table.playerItems[i] = null;
        player.value.ItemList.sort((a, b) => a.ID - b.ID);
      }
      break;
    case 'B': // 機器人
      const findEnemyCard = table.enemyItems[i]!;
      enemy.value.ItemList.push(findEnemyCard);
      table.enemyItems[i] = null;
      break;
  }
}

// 開牌，計算輸贏並執行扣血
const draw = async () => {
  // 取得雙方點數
  const enemyLogiCard = table.enemyItems[0] ? table.enemyItems[0].Point : null;
  const enemyTechCard = table.enemyItems[1] ? table.enemyItems[1] : null;
  const playerLogiCard = table.playerItems[0] ? table.playerItems[0].Point : null;
  const playerTechCard = table.playerItems[1] ? table.playerItems[1] : null;
  // 計算攻擊力、防禦力
  let enemyAttack = enemy.value.CurrentAttack;
  let enemyDefense = enemy.value.CurrentDefense;
  let playerAttack = player.value.CurrentAttack;
  let playerDefense = player.value.CurrentDefense;

  // 如果有技術牌
  if (enemyTechCard) {
    switch (enemyTechCard.ItemType) {
      case enumItemType.Attack:
        enemyAttack += enemyTechCard.Point;
        enemy.value.ExtraAttack = enemyTechCard.Point;
        break;
      case enumItemType.Defense:
        enemyDefense += enemyTechCard.Point;
        enemy.value.ExtraDefense = enemyTechCard.Point;
        break;
      case enumItemType.Health: 
        store.dispatch(StoreAction.heal, { who: 'enemy', point: enemyTechCard.Point })
      break;
    }
  }
  if (playerTechCard) {
    switch (playerTechCard.ItemType) {
      case enumItemType.Attack:
        playerAttack += playerTechCard.Point;
        player.value.ExtraAttack = playerTechCard.Point;
        break;
      case enumItemType.Defense:
        playerDefense += playerTechCard.Point;
        player.value.ExtraDefense = playerTechCard.Point;
        break;
      case enumItemType.Health:
        store.dispatch(StoreAction.heal, { who: 'player', point: playerTechCard.Point })
      break;
    }
  }
  // 更新玩家／敵人攻擊力
  store.dispatch(StoreAction.updatePlayer, { who: 'player', player: player.value });
  store.dispatch(StoreAction.updatePlayer, { who: 'enemy', player: enemy.value });
  const enemyDeduction = playerAttack - enemyDefense > 0 ? playerAttack - enemyDefense : 0;
  const playerDeduction = enemyAttack - playerDefense > 0 ? enemyAttack - playerDefense : 0;
  let result = enumBattleResult.Draw;
  // 若有人沒出牌就判輸
  if (!enemyLogiCard && playerLogiCard) {
    result = enumBattleResult.PlayerWin;
  } else if (enemyLogiCard && !playerLogiCard) {
    result = enumBattleResult.PlayerLose;
  } else if (enemyLogiCard && playerLogiCard) { // 都有出牌
    // 比較大小判斷結果
    switch (deal.value) {
      case 0: // 比小
        if (enemyLogiCard < playerLogiCard) {
          result = enumBattleResult.PlayerLose;
        } else if (enemyLogiCard > playerLogiCard) {
          result = enumBattleResult.PlayerWin;
        }
        break;
      case 1: // 比大
        if (enemyLogiCard > playerLogiCard) {
          result = enumBattleResult.PlayerLose;
        } else if (enemyLogiCard < playerLogiCard) {
          result = enumBattleResult.PlayerWin;
        }
        break;
    }
  }
  table.result = result;
  roundState.value = enumRoundState.Settle;

  // 依結果判斷扣血
  if (result === enumBattleResult.PlayerWin) {
    // 更新玩家紀錄
    player.value.Record.TotalDamage += enemyDeduction;
    // 30% 機率獲得 1 螺絲釘
    if (Util.lottery(box30)) {
      player.value.Coin += 1;
    }
    store.dispatch(StoreAction.updatePlayer, { who: 'player', player: player.value });
    setTimeout(async () => {
      await Sound.playSound(Audios.robotHurt);
      store.dispatch(StoreAction.deduction, { who: 'enemy', point: enemyDeduction });
    }, 1000);
    if (enemy.value.CurrentHealth === 0) {
      store.dispatch(StoreAction.enemyMumble, { type: enumMumbleType.Lose, delay: 0 });
    } else {
      store.dispatch(StoreAction.enemyMumble, { type: enumMumbleType.Hurt, delay: 0 });
    }
  } else if (result === enumBattleResult.PlayerLose) {
    setTimeout(async () => {
      await Sound.playSound(Audios.ouch);
      store.dispatch(StoreAction.deduction, { who: 'player', point: playerDeduction });
    }, 1000);
    store.dispatch(StoreAction.enemyMumble, { type: enumMumbleType.Attack, delay: 0 });
  } else {
    await Sound.playSound(Audios.huh);
  }

  roundState.value = enumRoundState.SettleEnd;
  setTimeout(() => tossCard.value = true, 2500);
  setTimeout(() => {
    if (enemy.value.CurrentHealth === 0) { // 若敵人死亡就進到戰利品
      player.value.Record.DefeatBots += 1;
      store.dispatch(StoreAction.updatePlayer, { who: 'player', player: player.value });
      store.dispatch(StoreAction.changeGameState, enumGameState.BattleEnd);
    } else if (player.value.CurrentHealth === 0) { // 若玩家死亡就進到 game end
      player.value.Record.SurvivalTime = Util.diffDay(new Date().getTime(), player.value.CreatedTime);
      store.dispatch(StoreAction.updatePlayer, { who: 'player', player: player.value });
      store.dispatch(StoreAction.changeGameState, enumGameState.GameEnd);
    } else { // 若無人死亡就重啟 roundStart
      resetExtraStatus();
      roundStart();
    }
  }, 3000)
}

// 重置額外數值
const resetExtraStatus = () => {
  player.value.ExtraAttack = 0;
  player.value.ExtraDefense = 0;
  enemy.value.ExtraAttack = 0;
  enemy.value.ExtraDefense = 0;
  store.dispatch(StoreAction.updatePlayer, { who: 'player', player: player.value });
  store.dispatch(StoreAction.updatePlayer, { who: 'enemy', player: enemy.value });
}
</script>

<style lang="scss" scoped>
#battle {
  height: 100%;
  gap: 20px;
  padding-bottom: 160px;
}
.enemy, .player {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  .items-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
.card-table {
  position: relative;
  width: 330px;
  min-height: 130px;
  padding: 10px;
  background-color: var(--green);
  box-sizing: border-box;
  border: 8px solid var(--blue);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 15px;

  .used-card-list {
    position: absolute;
    top: -40px;
    right: -20px;
    width: 60px;
    height: 75px;
    background-color: var(--blue);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }
  .enemy-items, .player-items {
    z-index: 1;
    width: 130px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
}
</style>
