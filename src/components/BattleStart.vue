<template>
  <div id="battle-start" v-if="enemy.Character">
    <Dialog :dialogs="dialogs" />
    <div class="enemy">
      <PlayerStatus :player="enemy" />
      <p class="m-0 w-100">{{ enemy.Character.Description }}</p>
    </div>
    <button type="button" class="system-btn w-100" @click="startBattle()">
      {{ $t('button.battle') }}
    </button>
  </div>
</template>

<script setup name="BattleStart" lang="ts">
import { computed, onMounted } from 'vue';
import { enumGameState, enumDialog, enumCharacter } from '@/types/enums';
import { DialogDataList } from '@/data/index';
import Sound from '@/service/sounds';
import { useGameStateStore, usePlayerStore } from '@/store';

const playerStore = usePlayerStore();
const gameStateStore = useGameStateStore();
const enemy = computed(() => playerStore.enemy);
const dialogs = DialogDataList[enumDialog.BattleStart];

// Init
onMounted(() => {
	if (!enemy.value.Character) { // 若敵人是第一次初始化，就產生工作型 GKBot
		playerStore.generateEnemy(enumCharacter.GkbotWorker);
	} else {
		playerStore.generateEnemy();
	}
});

const startBattle = async () => {
	await Sound.playSound(Sound.sounds.effect.click);
	gameStateStore.changeGameState(enumGameState.Battle);
};

// 選擇要帶入的技術牌

</script>

<style lang="scss" scoped>
#battle-start {
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
  .enemy {
    align-self: center;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    p {
      text-align: left;
    }
  }
}
</style>
