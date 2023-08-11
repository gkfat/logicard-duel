<template>
  <div v-if="enemy.Character">
    <DialogComponent :dialogs="dialogs"></DialogComponent>
    <div class="enemy d-flex justify-content-center align-items-center flex-wrap">
      <PlayerStatusComponent :player="enemy"></PlayerStatusComponent>
      <p>選擇技術牌</p>
      <button type="button" class="system-btn my-3" @click="startBattle()">戰鬥</button>
    </div>
  </div>
</template>

<script setup name="BattleStartComponent" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { Player, enumGameState, enumDialog } from '@/types/general';
import { computed, onMounted, ref, watch } from 'vue';
import DialogComponent from './DialogComponent.vue';
import PlayerStatusComponent from './PlayerStatusComponent.vue';
import { useStore } from 'vuex';
import { DIALOGS } from '@/data/index';

const dialogs = DIALOGS[enumDialog.BattleStart];
const store = useStore();
const enemy = computed(() => store.getters.enemy as Player);

// Init
onMounted(() => {
  if (!enemy.value.Character) { // 若敵人是第一次初始化，就產生工作型 GKBot
    store.dispatch(StoreAction.player.generateEnemy, 1);
  } else {
    store.dispatch(StoreAction.player.generateEnemy);
  }
})

const startBattle = () => {
  store.dispatch(StoreAction.general.changeGameState, enumGameState.Battle);
}

// 選擇要帶入的技術牌

</script>

<style lang="scss" scoped>
.enemy {
  width: 300px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
</style>
