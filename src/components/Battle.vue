<template>
  <div id="battle" class="d-flex flex-column justify-content-end align-items-center">
    <!-- Enemy -->
    <div class="enemy">
      <div class="cards-container mb-1">
        <Card v-for="(item, i) in enemy.CardList" :sm="true" :is-card-back="true" :item="item"></Card>
      </div>
      <PlayerStatus :player="enemy"></PlayerStatus>
    </div>

    <!-- Table -->
    <div class="card-table">
      <div class="card-table-inner">
        <div class="card-table-platform">

          <!-- 用過的牌堆 -->
          <div class="used-card-list rounded">
            <Card v-for="item of table.usedCardList" :sm="true" :item="item"></Card>
          </div>
          <!-- 系統提示 -->
          <p class="system-text">
            <!-- 局規則 -->
            <template v-if="rule < 0">【抽籤中...】</template>
            <template v-if="rule === 0">【比小】</template>
            <template v-if="rule === 1">【比大】</template>
            <span class="me-1"></span>
            <!-- 局狀態 -->
            <template v-if="roundState === enumRoundState.Start">回合開始</template>
            <template v-if="roundState === enumRoundState.Counting">{{ countDownRemainSec }} 秒</template>
            <template v-if="roundState === enumRoundState.Duel">決勝！</template>
            <!-- 局結果 -->
            <template v-if="roundState >= enumRoundState.Settle">
              <template v-if="table.result === enumBattleResult.PlayerWin">你贏了</template>
              <template v-if="table.result === enumBattleResult.PlayerLose">你輸了</template>
              <template v-if="table.result === enumBattleResult.Draw">平手</template>
            </template>
          </p>
          <!-- Enemy Cards -->
          <div class="enemy-cards">
            <Card
              v-if="table.enemyCards[0]"
              :klass="tossCard ? 'enemy-toss-card' : ''"
              :is-card-back="!openCard"
              :item="table.enemyCards[0]">
            </Card>
            <div class="card-placeholder card-placeholder-logicard" v-if="!table.enemyCards[0]"></div>
            <Card
              v-if="table.enemyCards[1]"
              :klass="tossCard ? 'enemy-toss-card' : ''"
              :is-card-back="!openCard"
              :item="table.enemyCards[1]">
            </Card>
            <div class="card-placeholder card-placeholder-techcard" v-if="!table.enemyCards[1]"></div>
          </div>
          <!-- Player Cards -->
          <div class="player-cards">
            <div type="button" v-if="table.playerCards[0]" @click="getCardFromTable('player', 0)">
              <Card
                :klass="tossCard ? 'player-toss-card' : ''"
                :item="table.playerCards[0]">
              </Card>
            </div>
            <div class="card-placeholder card-placeholder-logicard" v-if="!table.playerCards[0]"></div>
            <div type="button" v-if="table.playerCards[1]" @click="getCardFromTable('player', 1)">
              <Card
                :klass="tossCard ? 'player-toss-card' : ''"
                :item="table.playerCards[1]">
              </Card>
            </div>
            <div class="card-placeholder card-placeholder-techcard" v-if="!table.playerCards[1]"></div>
          </div>

        </div>
      </div>
    </div>

    <!-- Player -->
    <div class="player">
      <div class="cards-container">
        <div v-for="(item, i) in player.CardList" type="button" @click="placeCardOnTable(player.Character, item, i)">
          <Card
            :style="calcCardRotate(i)"
            :item="item">
          </Card>
        </div>
      </div>
      <PlayerStatus :is-main="true" :player="player"></PlayerStatus>
    </div>

  </div>
</template>

<script setup name="Battle" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { Item, Player } from '@/types';
import { enumGameState, enumItemType, enumRoundState, enumBattleResult, enumMumbleType } from '@/types/enums';
import Card from './Card.vue';
import PlayerStatus from './PlayerStatus.vue';
import Util from '@/service/util';
import Sound from '@/service/sounds';
import { CARDS } from '@/data';

const store = useStore();
const player = computed(() => store.getters.player as Player);
const enemy = computed(() => store.getters.enemy as Player);

const openCard = ref(false);
const rule = ref(-1);

const roundState = ref(enumRoundState.Start);
const table = ref({
  enemyCards: [null, null] as Array<Item | null>,
  playerCards: [null, null] as Array<Item | null>,
  result: enumBattleResult.Init,
  usedCardList: [] as Item[]
})

const box70 = Util.makeLotteryBox(70); // 機率 70% 的箱子
const box50 = Util.makeLotteryBox(50); // 機率 50% 的箱子
const box30 = Util.makeLotteryBox(30); // 機率 30% 的箱子

// Init
onMounted(async () => {
  table.value.usedCardList = [];
  resetExtraStatus();
  await dealCardsTo5();
  roundStart();
})

// 設定卡牌弧形排列
const calcCardRotate = (i: number) => {
  const middleIndex = Math.floor(player.value.CardList.length / 2);
  const deg = (i - middleIndex) * 5.5;
  const y = Math.abs((i - middleIndex)) * Math.abs((i-middleIndex)) * 2;
  return `rotate(${deg}deg) translateY(${y}px)`;
}

const tossCard = ref(false);

// 開始回合
const roundStart = async () => {
  openCard.value = false; // 重置開牌狀態
  rule.value = -1; // 重置規則
  table.value.result = enumBattleResult.Init;
  roundState.value = enumRoundState.Start;
  // 補足牌
  await dealCardsTo5();
  await dealGame(); // 抽籤決定比大比小
}

const countDownSec = 10;
const countDownRemainSec = ref(countDownSec);

// 抽籤
const dealGame = async () => {
  await Util.sleep(2500);
  rule.value = Util.getZeroOrOne();
  countDownRemainSec.value = JSON.parse(JSON.stringify(countDownSec));
  roundState.value = enumRoundState.Counting;
  startMumbleInterval(); // 開始喃喃自語定時器
  startCountdownInterval(); // 開始倒數計時器
  await Sound.playSound(Sound.sounds.bell);
  // 機器人不定時出牌
  const randomSec = Util.getRandomInt(3, countDownSec / 2) * 1000;
  await Util.sleep(randomSec);
  enemyPlaceCard();
}

// 開始倒數計時器
const startCountdownInterval = async () => {
  const countdownInterval = setInterval(async () => {
    if (countDownRemainSec.value > 0) {
        countDownRemainSec.value -= 1;
        if (countDownRemainSec.value === 3) {
          await Sound.playSound(Sound.sounds.countdown);
        }
      } else {
        clearInterval(countdownInterval);
        await draw();
      }
  }, 1000);
}

const playerMumbling = computed(() => store.getters.playerMumbling as boolean);
const enemyMumbling = computed(() => store.getters.enemyMumbling as boolean);
// 開啟喃喃自語定時器
const startMumbleInterval = () => {
  const mumbleInterval = setInterval(() => {
    // 只有在 counting 階段可以喃喃自語
    if (roundState.value === enumRoundState.Counting && countDownRemainSec.value > 0) {
      // player mumble
      if (!playerMumbling.value) {
        store.dispatch(StoreAction.player.mumble, {
          who: 'player',
          type: enumMumbleType.General,
          delay: Util.getRandomInt(0, countDownRemainSec.value / 2) * 1000
        });
      }
      // enemy mumble
      if (!enemyMumbling.value) {
        store.dispatch(StoreAction.player.mumble, {
          who: 'enemy',
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
  const findHealthCards = enemy.value.CardList.filter(item => item.ItemType === enumItemType.Heal);
  const findAttackCards = enemy.value.CardList.filter(item => item.ItemType === enumItemType.Attack);
  const findDefenseCards = enemy.value.CardList.filter(item => item.ItemType === enumItemType.Defense);
  if (findHealthCards.length > 0) { // 若有補血牌
    if (enemy.value.CurrentHealth <= (enemy.value.Character.Health * 0.3)) { // 若機器人血量低於 30% 就用
      const index = enemy.value.CardList.indexOf(findHealthCards[0]);
      placeCardOnTable(enemy.value.Character, findHealthCards[0], index);
    }
  }
  if (findAttackCards.length > 0 && Util.lottery(box50)) { // 若有攻擊牌，則有 5 成機率出牌
    const index = enemy.value.CardList.indexOf(findAttackCards[0]);
    placeCardOnTable(enemy.value.Character, findAttackCards[0], index);
  }
  if (findDefenseCards.length > 0 && Util.lottery(box50)) { // 若有防禦牌，則有 5 成機率出牌
    const index = enemy.value.CardList.indexOf(findDefenseCards[0]);
    placeCardOnTable(enemy.value.Character, findDefenseCards[0], index);
  }
  const logicards = enemy.value.CardList.filter(item => item.ItemType === enumItemType.LogiCard);
  const half = Math.floor(logicards.length / 2);
  let index = 0;
  switch (rule.value) {
    case 0: // 比小
      index = Util.getRandomInt(0, half);
      break;
    case 1: // 比大
      index = Util.getRandomInt(half, logicards.length - 1);
      break;
  }
  placeCardOnTable(enemy.value.Character, enemy.value.CardList[index], index);
}

// 放一張牌上桌
const placeCardOnTable = async (character: any, item: Item, i: number) => {
  let pos = 0;
  switch (item.ItemType) {
    case enumItemType.LogiCard:
      pos = 0;
      break;
    case enumItemType.Attack:
    case enumItemType.Defense:
    case enumItemType.Heal:
      pos = 1;
      break;
  }
  switch (character.Type) {
    case 'P': // 玩家
      const findCard = table.value.playerCards[pos];
      const allowTime = [enumRoundState.Counting].includes(roundState.value);
      if (!findCard && allowTime) {
        await Sound.playSound(Sound.sounds.placeCard);
        player.value.CardList.splice(i, 1);
        table.value.playerCards[pos] = item;
        store.dispatch(StoreAction.player.mumble, { who: 'player', type: enumMumbleType.PlaceCard, delay: 0 });
        if (Util.lottery(box50)) {
          store.dispatch(StoreAction.player.mumble, { who: 'enemy', type: enumMumbleType.EnemyPlaceCard, delay: 0 });
        }
      }
      player.value.CardList = Util.sortCardList(player.value.CardList);
      break;
    case 'B': // 機器人
      await Sound.playSound(Sound.sounds.placeCard);
      enemy.value.CardList.splice(i, 1);
      table.value.enemyCards[pos] = item;
      if (Util.lottery(box50)) {
        store.dispatch(StoreAction.player.mumble, { who: 'enemy', type: enumMumbleType.PlaceCard, delay: 0 });
      }
      if (Util.lottery(box50)) {
        store.dispatch(StoreAction.player.mumble, { who: 'player', type: enumMumbleType.EnemyPlaceCard, delay: 0 });
      }
      break;
  }
}

// 從桌上收回牌
const getCardFromTable = async (who: 'player' | 'enemy', i: number) => {
  switch (who) {
    case 'player': // 玩家
      const findCard = table.value.playerCards[i]!;
      const allowTime = [enumRoundState.Counting, enumRoundState.Start].includes(roundState.value);
      if (allowTime) {
        await Sound.playSound(Sound.sounds.placeCard);
        player.value.CardList.push(findCard);
        table.value.playerCards[i] = null;
        player.value.CardList = Util.sortCardList(player.value.CardList);
      }
      break;
    case 'enemy': // 機器人
      const findEnemyCard = table.value.enemyCards[i]!;
      enemy.value.CardList.push(findEnemyCard);
      table.value.enemyCards[i] = null;
      break;
  }
}

// 開牌，計算輸贏並執行扣血
const draw = async () => {
  openCard.value = true; // 開牌
  roundState.value = enumRoundState.Duel;
  // 取得雙方點數
  const enemyLogiCard = table.value.enemyCards[0] ? table.value.enemyCards[0].Point : null;
  const enemyTechCard = table.value.enemyCards[1] ? table.value.enemyCards[1] : null;
  const playerLogiCard = table.value.playerCards[0] ? table.value.playerCards[0].Point : null;
  const playerTechCard = table.value.playerCards[1] ? table.value.playerCards[1] : null;
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
        enemy.value.ExtraAttack += enemyTechCard.Point;
        break;
      case enumItemType.Defense:
        enemyDefense += enemyTechCard.Point;
        enemy.value.ExtraDefense += enemyTechCard.Point;
        break;
      case enumItemType.Heal:
        await Util.sleep(1000);
        await Sound.playSound(Sound.sounds.heal);
        store.dispatch(StoreAction.player.heal, { who: 'enemy', point: enemyTechCard.Point });
      break;
    }
  }
  if (playerTechCard) {
    switch (playerTechCard.ItemType) {
      case enumItemType.Attack:
        playerAttack += playerTechCard.Point;
        player.value.ExtraAttack += playerTechCard.Point;
        break;
      case enumItemType.Defense:
        playerDefense += playerTechCard.Point;
        player.value.ExtraDefense += playerTechCard.Point;
        break;
      case enumItemType.Heal:
        await Util.sleep(1000);
        await Sound.playSound(Sound.sounds.heal);
        store.dispatch(StoreAction.player.heal, { who: 'player', point: playerTechCard.Point });
      break;
    }
  }
  // 更新玩家／敵人攻擊力
  store.dispatch(StoreAction.player.updatePlayer, { who: 'player', player: player.value });
  store.dispatch(StoreAction.player.updatePlayer, { who: 'enemy', player: enemy.value });
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
    switch (rule.value) {
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
  table.value.result = result;
  roundState.value = enumRoundState.Settle;

  // 依結果判斷扣血
  if (result === enumBattleResult.PlayerWin) {
    // 更新玩家紀錄
    player.value.Record.TotalDamage += enemyDeduction;
    // 30% 機率獲得 1 螺絲釘
    if (Util.lottery(box30)) {
      player.value.Coin += 1;
    }
    store.dispatch(StoreAction.player.updatePlayer, { who: 'player', player: player.value });
    await Util.sleep(2000);
    await Sound.playSound(Sound.sounds.robotHurt);
    store.dispatch(StoreAction.player.deduction, { who: 'enemy', point: enemyDeduction });
    store.dispatch(StoreAction.player.mumble, { who: 'player', type: enumMumbleType.Attack, delay: 0 });
    // 機器人喃喃自語
    if (enemy.value.CurrentHealth === 0) {
      store.dispatch(StoreAction.player.mumble, { who: 'enemy', type: enumMumbleType.Lose, delay: 0 });
    } else {
      store.dispatch(StoreAction.player.mumble, { who: 'enemy', type: enumMumbleType.Hurt, delay: 0 });
    }
  } else if (result === enumBattleResult.PlayerLose) {
    await Util.sleep(2000);
    await Sound.playSound(Sound.sounds.ouch);
    store.dispatch(StoreAction.player.deduction, { who: 'player', point: playerDeduction });
    store.dispatch(StoreAction.player.mumble, { who: 'enemy', type: enumMumbleType.Attack, delay: 0 });
    // 玩家喃喃自語
    if (player.value.CurrentHealth === 0) {
      store.dispatch(StoreAction.player.mumble, { who: 'player', type: enumMumbleType.Lose, delay: 0 });
    } else {
      store.dispatch(StoreAction.player.mumble, { who: 'player', type: enumMumbleType.Hurt, delay: 0 });
    }
  } else {
    await Util.sleep(1000);
    await Sound.playSound(Sound.sounds.huh);
  }

  await Util.sleep(1000);
  roundState.value = enumRoundState.SettleEnd;
  await tossCardToTrash();
  resetExtraStatus();
  if (enemy.value.CurrentHealth === 0) { // 若敵人死亡就進到戰利品
    player.value.Record.DefeatBots += 1;
    player.value.CardList = player.value.CardList.filter(c => c.ItemType !== enumItemType.LogiCard);
    await Sound.playSound(Sound.sounds.win);
    store.dispatch(StoreAction.player.updatePlayer, { who: 'player', player: player.value });
    store.dispatch(StoreAction.general.changeGameState, enumGameState.BattleEnd);
  } else if (player.value.CurrentHealth === 0) { // 若玩家死亡就進到 game end
    player.value.Record.SurvivalTime = Util.diffDay(new Date().getTime(), player.value.CreatedTime);
    store.dispatch(StoreAction.player.updatePlayer, { who: 'player', player: player.value });
    store.dispatch(StoreAction.general.changeGameState, enumGameState.GameEnd);
  } else { // 若無人死亡就重啟 roundStart
    await roundStart();
  }
}

// 將用過的牌丟到垃圾桶
const tossCardToTrash = async () => {
  tossCard.value = true;
  await Util.sleep(200);
  if (table.value.enemyCards[0]) {
    table.value.usedCardList.push(table.value.enemyCards[0]);
  }
  if (table.value.enemyCards[1]) {
    table.value.usedCardList.push(table.value.enemyCards[1]);
  }
  if (table.value.playerCards[0]) {
    table.value.usedCardList.push(table.value.playerCards[0]);
  }
  if (table.value.playerCards[1]) {
    table.value.usedCardList.push(table.value.playerCards[1]);
  }
  await Util.sleep(2000);
  table.value.enemyCards = [null, null];
  table.value.playerCards = [null, null];
  tossCard.value = false;
}


// 戰鬥開始時雙方各發 5 張數字牌
const dealCardsTo5 = async () => {
  for (let i = 0; i < 4; i++) {
    await Util.sleep(300);
    const enemyCardLength = enemy.value.CardList.filter(c => c.ItemType === enumItemType.LogiCard).length;
    const playerCardLength =
      player.value.CardList.filter(c => c.ItemType === enumItemType.LogiCard).length +
      (table.value.playerCards[0] ? 1 : 0);
    if (enemyCardLength < 5) {
      dealCard('enemy');
    }
    if (playerCardLength < 5) {
      dealCard('player');
    }
  }
}

// 雙方各補充 3 張牌堆中的牌
const dealCard = async (who: string) => {
  const point = Util.getRandomInt(1, 8);
  const card = CARDS.filter(c => c.Point === point)[0];
  switch (who) {
    case 'player':
      await Sound.playSound(Sound.sounds.placeCard);
      player.value.CardList.push(card);
      player.value.CardList = Util.sortCardList(player.value.CardList);
      break;
    case 'enemy':
      await Sound.playSound(Sound.sounds.placeCard);
      enemy.value.CardList.push(card);
      enemy.value.CardList = Util.sortCardList(enemy.value.CardList);
      break;
  }
}

// 重置額外數值
const resetExtraStatus = () => {
  const playerTechCard = table.value.playerCards[1];
  if (playerTechCard) {
    switch (playerTechCard.ItemType) {
      case enumItemType.Attack:
        player.value.ExtraAttack -= playerTechCard.Point;
        break;
      case enumItemType.Defense:
        player.value.ExtraDefense -= playerTechCard.Point;
        break;
    }
  }
  enemy.value.ExtraAttack = 0;
  enemy.value.ExtraDefense = 0;
  store.dispatch(StoreAction.player.updatePlayer, { who: 'player', player: player.value });
  store.dispatch(StoreAction.player.updatePlayer, { who: 'enemy', player: enemy.value });
}
</script>

<style lang="scss" scoped>
#battle {
  gap: 15px;
}
.enemy, .player {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}
.cards-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.card-table {
  width: 100%;
  margin: 0 auto;
  max-width: 330px;
  min-height: 140px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  // perspective: 600px;

  &-inner {
    width: 100%;
    height: 100%;
    position: relative;
    // transform-style: preserve-3d;
  }
  &-platform {
    width: 100%;
    height: 100%;
    background-color: var(--green);
    position: absolute;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 10px;
    padding: 10px;
    top: 0;
    // transform-origin: bottom;
    // transform: rotateX(30deg);
    border-radius: 20px;
    border: 8px solid var(--blue);
  }

  .card-placeholder {
    height: 80px;
    width: 100%;
    max-width: 60px;
    border-radius: 5px;
    &-logicard {
      border: 2px dashed var(--blue);
    }
    &-techcard {
      border: 2px dashed var(--skin);
    }
  }

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
  .enemy-cards, .player-cards {
    z-index: 1;
    width: 48%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
}
</style>