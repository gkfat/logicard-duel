<template>
  <div id="rest">
    <div class="campfire"></div>
    <DialogComponent :dialogs="dialogs"></DialogComponent>
    <button type="button"
            class="system-btn w-100 my-3"
            :class="{ 'system-btn-disabled' : recoverCountdown }"
            @click="rest()">
            <span v-if="!recoverCountdown">冒著被發現的風險休息回血</span>
            <span v-if="recoverCountdown">回血中...</span>
    </button>
    <button type="button" class="system-btn w-100 mb-3" @click="battleStart()">尋找下一個 GKBot</button>
    <button type="button" class="system-btn w-100" @click="openShop()">去商店瞧瞧</button>
  </div>
</template>

<script setup name="RestComponent" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { Player, enumGameState, enumDialog } from '@/types/general';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import PlayerStatusComponent from './PlayerStatusComponent.vue';
import DialogComponent from './DialogComponent.vue';
import { DIALOGS } from '@/data/index';
import { useStore } from 'vuex';
import { Sound } from '@/service/sounds';
import Util from '@/service/util';

const store = useStore();
const player = computed(() => store.getters.player as Player);
const box30 = Util.makeLotteryBox(30);
const recoverCountdown = ref(null as number | null);
const sounds = computed(() => store.getters.sounds);

const dialogs = DIALOGS[enumDialog.Rest];
const rest = async () => {
  await Sound.playSound(sounds.value.click);
  if (!recoverCountdown.value) {
    recoverCountdown.value = setInterval(() => {
      if (Util.lottery(box30)) {
        clearInterval(recoverCountdown.value!);
        store.dispatch(StoreAction.changeGameState, enumGameState.BattleStart);
      } else {
        if (player.value.CurrentHealth < player.value.Character.Health) {
          store.dispatch(StoreAction.heal, { who: 'player', point: 1 });
        }
      }
    }, 10000);
  }
}
const battleStart = async () => {
  await Sound.playSound(sounds.value.click);
  store.dispatch(StoreAction.changeGameState, enumGameState.BattleStart);
}
// 打開商店
const openShop = async () => {
  await Sound.playSound(sounds.value.click);
  store.dispatch(StoreAction.switchShop);
}
</script>

<style lang="scss" scoped>

#rest {
  .campfire {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('~@/assets/images/rest.gif');
    background-size: cover;
    background-position-y: 70%;
    background-repeat: no-repeat;
    z-index: -1;
  }
}
.system-btn {
  margin-top: auto;
}
.player {
  width: 300px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
</style>
