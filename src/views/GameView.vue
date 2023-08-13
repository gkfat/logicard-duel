<template>
  <div id="game">
    <!-- Game Init -->
    <template v-if="gameState === enumGameState.Init">
      <DialogComponent :dialogs="dialogs.opening"></DialogComponent>
      <div class="social">
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
      <button type="button" class="w-100 system-btn" @click="start()">開始冒險</button>
    </template>

    <ChooseCharacterComponent v-if="gameState === enumGameState.ChooseCharacter"></ChooseCharacterComponent>
    <RestComponent v-if="gameState === enumGameState.Rest"></RestComponent>
    <BattleStartComponent v-if="gameState === enumGameState.BattleStart"></BattleStartComponent>
    <BattleComponent v-if="gameState === enumGameState.Battle"></BattleComponent>
    <BattleEndComponent v-if="gameState === enumGameState.BattleEnd"></BattleEndComponent>

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
      <button type="button" class="w-100 system-btn" @click="restart()">成佛</button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { StoreAction } from '@/store/storeActions';
import { enumOperation, Player, enumSheetName, enumGameState, enumDialog } from '@/types/general';
import {  DIALOGS } from '@/data/index';
import RestComponent from '@/components/RestComponent.vue';
import ChooseCharacterComponent from '@/components/ChooseCharacterComponent.vue';
import BattleStartComponent from '@/components/BattleStartComponent.vue';
import BattleComponent from '@/components/BattleComponent.vue';
import BattleEndComponent from '@/components/BattleEndComponent.vue';
import DialogComponent from '@/components/DialogComponent.vue';
import Sound from '@/service/sounds';
import Util from '@/service/util';

const store = useStore();
const gameState = computed(() => store.getters.gameState as enumGameState);
const player = computed(() => store.getters.player as Player);

const dialogs = {
  opening: DIALOGS[enumDialog.Opening],
  gameEnd: DIALOGS[enumDialog.GameEnd],
}

const openGithub = async () => {
  await Sound.playSound(Sound.sounds.click);
  window.open('https://github.com/gkfat/logicard-duel/', '_blank');
}

const openMail = async () => {
  await Sound.playSound(Sound.sounds.click);
  window.open('mailto:gkgkdesign@gmail.com', '_blank');
}

// 打開排行榜
const openRank = async () => {
  await Sound.playSound(Sound.sounds.click);
  store.dispatch(StoreAction.switch.switchRank);
}

const start = async () => {
  await Sound.playSound(Sound.sounds.click);
  await store.dispatch(StoreAction.switch.switchSpinner, true);
  checkCanStart();
}

const assetsLoadFinish = computed(() => Sound.loadedAssets >= Sound.totalAssets);
const checkCanStart = async () => {
  if (assetsLoadFinish.value) {
    console.log('Assets loaded finished');
    await store.dispatch(StoreAction.general.changeGameState, enumGameState.ChooseCharacter);
    store.dispatch(StoreAction.switch.switchSpinner, false);
  } else {
    checkCanStart();
  }
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
  await store.dispatch(StoreAction.switch.switchSpinner, true);
  await store.dispatch(StoreAction.general.updateData, {
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
    store.dispatch(StoreAction.switch.switchSpinner, false);
    setTimeout(() => window.location.reload(), 1000);
  }
})
watch(gameState, async () => {
  switch (gameState.value) {
    case enumGameState.ChooseCharacter:
      await Sound.playBGM(Sound.sounds.prologue);
      break;
    case enumGameState.BattleStart:
      Sound.stop(Sound.sounds.rest);
      Sound.stop(Sound.sounds.prologue);
      await Sound.playBGM(Sound.sounds.battle);
      break;
    case enumGameState.Rest:
      Sound.stop(Sound.sounds.battle);
      await Sound.playBGM(Sound.sounds.rest);
      break;
    case enumGameState.GameEnd:
      Sound.stop(Sound.sounds.battle);
      await Sound.playBGM(Sound.sounds.end);
      break;
  }
})

</script>

<style lang="scss" scoped>
#game {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: 10px;
  @media screen and (min-width: 768px) {
    width: 80%;
  }
}

.social {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
</style>