<template>
  <div id="battle-start" v-if="enemy.Character">
    <Dialog :dialogs="dialogs"></Dialog>
    <div class="enemy">
      <PlayerStatus :player="enemy"></PlayerStatus>
      <p class="m-0">{{ enemy.Character.Description }}</p>
    </div>
    <button type="button" class="system-btn w-100" @click="startBattle()">戰鬥</button>
  </div>
</template>

<script setup name="BattleStart" lang="ts">
import { StoreAction } from '@/store/storeActions';
import type { Player } from '@/types';
import { enumGameState, enumDialog } from '@/types/enums';
import { computed, onMounted, ref, watch } from 'vue';
import Dialog from './Dialog.vue';
import PlayerStatus from './PlayerStatus.vue';
import Card from './Card.vue';
import { useStore } from 'vuex';
import { DIALOGS } from '@/data/index';

const store = useStore();
const enemy = computed(() => store.getters.enemy as Player);
const dialogs = DIALOGS[enumDialog.BattleStart];

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
@/types