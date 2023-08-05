<template>
  <div v-if="enemy.Character">
    <DialogComponent :dialogs="dialogs"></DialogComponent>
    <div class="enemy d-flex justify-content-center align-items-center flex-wrap">
      <PlayerStatusComponent :player="enemy"></PlayerStatusComponent>
      <p class="w-100 h5 text-center m-0 my-3">{{ countDownSec }} 秒後進入戰鬥</p>
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
const countDownSec = ref(3);

// Init
onMounted(() => {
  if (!enemy.value.Character) { // 若敵人是第一次初始化，就產生工作型 GKBot
    store.dispatch(StoreAction.generateEnemy, 1);
  } else {
    store.dispatch(StoreAction.generateEnemy);
  }
  const countDownTimer = setInterval(() => {
    if (countDownSec.value > 0) {
      countDownSec.value -= 1;
    } else {
      clearInterval(countDownTimer);
      setTimeout(() => store.dispatch(StoreAction.changeGameState, enumGameState.Battle), 500)
    }
  }, 1000);
})
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
