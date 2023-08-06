<template>
  <div id="game">
    <!-- Game Init -->
    <template v-if="gameState === enumGameState.Init">
      <DialogComponent :dialogs="dialogs.opening"></DialogComponent>
      <div class="social mb-3">
        <a type="button" class="system-btn social-item" @click="openGithub()">
          <img class="img-fluid" :src="require(`@/assets/images/github.png`)">
        </a>
        <a type="button" class="system-btn social-item" @click="openMail()">
          <img class="img-fluid" :src="require(`@/assets/images/mail.png`)">
        </a>
        <div type="button" class="system-btn social-item" @click="openRank()">
          <img class="img-fluid" :src="require(`@/assets/images/rank.png`)">
        </div>
      </div>
      <button type="button" class="w-100 system-btn mb-3" @click="start()">開始冒險</button>
    </template>

    <!-- Choose Character -->
    <template v-if="gameState === enumGameState.ChooseCharacter">
      <DialogComponent :dialogs="dialogs.gameStart[dialogIndex]"></DialogComponent>
      <template v-if="!dialogEnd">
        <button type="button" class="w-100 system-btn system-btn-skip system-btn-light mb-3" @click="dialogNextToEnd()">跳過</button>
        <button type="button" class="w-100 system-btn mb-3" @click="dialogNext()">繼續</button>
      </template>
      <template v-if="dialogEnd">
        <div class="choose-character mb-3">
          <Carousel :items-to-show="1" :wrap-around="true" @slide-end="selectCharacter">
            <Slide v-for="(player, i) in mockPlayerList" :key="i">
              <div type="button" class="character rounded p-3"
                  :class="{ 'carousel__slide--active': selectedCharacter === i }">
                  <PlayerStatusComponent :player="player"></PlayerStatusComponent>
                  <p class="m-0 mb-1">初始道具：</p>
                  <div class="items-container px-3 d-flex">
                    <CardComponent v-for="item in player.Character.InitItemList" :sm="true" :item="item"></CardComponent>
                  </div>
              </div>
            </Slide>
            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div>
        <button type="button" class="w-100 system-btn mb-3" @click="confirmCharacter()">決定</button>
      </template>
    </template>

    <template v-if="gameState >= enumGameState.Rest && gameState < enumGameState.BattleEnd">
      <RestComponent v-if="gameState === enumGameState.Rest"></RestComponent>
      <BattleStartComponent v-if="gameState === enumGameState.BattleStart"></BattleStartComponent>
      <BattleComponent v-if="gameState === enumGameState.Battle"></BattleComponent>
      <PlayerStatusComponent :is-main="true" :player="player"></PlayerStatusComponent>
    </template>

    <template v-if="gameState === enumGameState.BattleEnd">
      <BattleEndComponent></BattleEndComponent>
    </template>

    <template v-if="gameState === enumGameState.GameEnd">
      <DialogComponent :dialogs="dialogs.gameEnd"></DialogComponent>
      <table class="table flex-grow-1">
        <tr><td>使用角色</td><td class="text">{{ player.Character.Name }}</td></tr>
        <tr><td>總攻擊量</td><td class="text">{{ player.Record.TotalDamage }}</td></tr>
        <tr><td>總治療量</td><td class="text">{{ player.Record.TotalHeal }}</td></tr>
        <tr><td>擊殺 GKBot 數量</td><td class="text">{{ player.Record.DefeatBots }}</td></tr>
        <tr><td>存活時間</td><td class="text">{{ player.Record.SurvivalTime }} 小時</td></tr>
      </table>
      <input type="text" class="form-control mb-3 " placeholder="寫點什麼吧...(上限 20 字)" v-model="lastWords">
      <button type="button" class="w-100 system-btn mb-3" @click="restart()">成佛</button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Ref, reactive, ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import api from '@/service/api';
import { StoreAction } from '@/store/storeActions';
import { Character, enumOperation, Player, enumSheetName, enumGameState, enumMumbleType, enumDialog } from '@/types/general';
import { CHARACTER_LIST, CHARACTER_MUMBLE_LIST, DIALOGS } from '@/data/index';
import RestComponent from '@/components/RestComponent.vue';
import BattleStartComponent from '@/components/BattleStartComponent.vue';
import BattleComponent from '@/components/BattleComponent.vue';
import BattleEndComponent from '@/components/BattleEndComponent.vue';
import CardComponent from '@/components/CardComponent.vue';
import DialogComponent from '@/components/DialogComponent.vue';
import PlayerStatusComponent from '@/components/PlayerStatusComponent.vue';
import { Sound } from '@/service/sounds';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import Util from '@/service/util';

const store = useStore();
const gameState = computed(() => store.getters.gameState as enumGameState);
const player = computed(() => store.getters.player as Player);
const sounds = computed(() => store.getters.sounds);

const dialogs = {
  opening: DIALOGS[enumDialog.Opening],
  gameStart: DIALOGS[enumDialog.GameStart],
  gameEnd: DIALOGS[enumDialog.GameEnd],
}

const openGithub = async () => {
  await Sound.playSound(sounds.value.click);
  window.open('https://github.com/gkfat/logicard-duel/', '_blank');
}

const openMail = async () => {
  await Sound.playSound(sounds.value.click);
  window.open('mailto:gkgkdesign@gmail.com', '_blank');
}

// 打開排行榜
const openRank = async () => {
  await Sound.playSound(sounds.value.click);
  store.dispatch(StoreAction.switchRank);
}

const start = async () => {
  await Sound.playSound(sounds.value.click);
  await store.dispatch(StoreAction.switchSpinner, true);
  await store.dispatch(StoreAction.changeGameState, enumGameState.ChooseCharacter);
  setTimeout(() => store.dispatch(StoreAction.switchSpinner, false), 300);
}

/**
 * 玩家留下紀錄
 */
const lastWords = ref('');
watch(lastWords, () => {
  lastWords.value = lastWords.value.trim();
  if (lastWords.value.length > 20) {
    lastWords.value = lastWords.value.substring(0, 20);
  }
})
const endUpdating = computed(() => store.getters.endUpdating as boolean);
const restart = async () => {
  await store.dispatch(StoreAction.switchSpinner, true);
  await store.dispatch(StoreAction.updateData, {
    sheetName: enumSheetName.Records,
    operation: enumOperation.Update,
    data: {
      EndTime: Util.getCurrentDate(),
      Character: player.value.Character.Name,
      TotalDamage: player.value.Record.TotalDamage,
      TotalHeal: player.value.Record.TotalHeal,
      DefeatBots: player.value.Record.DefeatBots,
      SurvivalTime: player.value.Record.SurvivalTime + ' 小時',
      LastWords: lastWords.value
    }
  })
}
watch(endUpdating, () => {
  if (endUpdating.value) {
    store.dispatch(StoreAction.switchSpinner, false);
    setTimeout(() => window.location.reload(), 1000);
  }
})
watch(gameState, async () => {
  switch (gameState.value) {
    case enumGameState.ChooseCharacter:
      await Sound.playBGM(sounds.value.prologue);
      break;
    case enumGameState.BattleStart:
      Sound.stop(sounds.value.rest);
      Sound.stop(sounds.value.prologue);
      await Sound.playBGM(sounds.value.battle);
      break;
    case enumGameState.Rest:
      Sound.stop(sounds.value.battle);
      await Sound.playBGM(sounds.value.rest);
      break;
    case enumGameState.GameEnd:
      Sound.stop(sounds.value.battle);
      await Sound.playBGM(sounds.value.end);
      break;
  }
})

// Dialog
const gameStartDialogsLength = dialogs.gameStart.length - 1;
const dialogEnd = computed(() => dialogIndex.value === gameStartDialogsLength);
const dialogIndex = ref(0);
const dialogNext = async () => {
  if (dialogIndex.value < gameStartDialogsLength) {
    await Sound.playSound(sounds.value.click);
    dialogIndex.value += 1;
  }
}
const dialogNextToEnd = async () => {
  await Sound.playSound(sounds.value.click);
  dialogIndex.value = gameStartDialogsLength;
}

// 選擇角色
const characterList = CHARACTER_LIST.filter(c => c.Type === 'P');
const mockPlayerList = characterList.map(c => {
  return reactive({
    Character: c,
    CurrentHealth: c.Health,
    CurrentAttack: c.Attack,
    CurrentDefense: c.Defense,
    ExtraAttack: 0,
    ExtraDefense: 0,
    Coin: c.Coin
  }) as Player
});
const selectedCharacter = ref(0);
const selectCharacter = (data: any) => selectedCharacter.value = data.currentSlideIndex;
const confirmCharacter = async () => {
  await Sound.playSound(sounds.value.click);
  const character = characterList[selectedCharacter.value];
  // 加入此角色的喃喃自語
  for (const mumble of CHARACTER_MUMBLE_LIST[character.ID]) {
    character.MumbleList[enumMumbleType.General].push(mumble);
  }
  await store.dispatch(StoreAction.selectCharacter, character);
  await store.dispatch(StoreAction.switchSpinner, true);
  await store.dispatch(StoreAction.changeGameState, enumGameState.BattleStart);
  setTimeout(() => store.dispatch(StoreAction.switchSpinner, false), 300);
}

</script>

<style lang="scss" scoped>
#game {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  margin: 0 auto;
  @media screen and (min-width: 768px) {
    width: 80%;
  }
}

.social {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  &-item {
    width: 60px;
    height: 60px;
  }
}
.table {
  .text {
    color: var(--darkblue);
  }
}

.choose-character {
  .items-container {
    flex-wrap: nowrap;
  }
}

/** Carousel */
.carousel__slide {
  padding: 5px;
}
.carousel__viewport {
  perspective: 2000px;
}
.carousel__track {
  transform-style: preserve-3d;
}
.carousel__slide--sliding {
  transition: 0.5s;
}
.carousel__slide--active {
  background-color: var(--green);
  color: var(--white);
  border-radius: 10px;
}
</style>