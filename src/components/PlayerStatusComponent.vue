<template>
  <!-- 小型顯示 -->
  <template v-if="!isMain">
    <div class="profile-sm">
      <div class="avatar">
        <div class="mumble">
          <MumbleComponent :who="'enemy'" :show-triangle="'down'"></MumbleComponent>
        </div>
        <img :src="require(`@/assets/avatars/${player.Character.Avatar}`)">
      </div>
  
      <div class="status">
        <div class="d-flex align-items-center">
          <p class="name h6 m-0 me-1">{{ player.Character.Name }}</p>
          <div class="health">
            <div class="health-inner" :style="{ width: healthPercent + '%' }"></div>
            <p class="health-text m-0">{{ player.CurrentHealth }} / {{ player.Character.Health }}</p>
            <!-- 扣血動畫 -->
            <p v-if="healthChange !== 0" class="health-change m-0 flow-up">{{ healthChange }}</p>
          </div>
        </div>
  
        <p class="w-100 m-0 d-flex align-items-center">
          <IconComponent :icon="`images/itemtype1`"></IconComponent>
          <span class="status-text">{{ player.CurrentAttack }}</span>
          <span v-if="player.ExtraAttack > 0" class="status-text">（+ {{ player.ExtraAttack }}）</span>
          <IconComponent :icon="`images/itemtype2`"></IconComponent>
          <span class="status-text">{{ player.CurrentDefense }}</span>
          <span v-if="player.ExtraDefense > 0" class="status-text">（+ {{ player.ExtraDefense }}）</span>
          <!-- 金幣 -->
          <div class="coin m-0 d-flex justify-content-between align-items-center" v-if="player.Character.Type === 'P'">
            <IconComponent :icon="`images/screw`"></IconComponent>
            <span class="status-text m-1">{{ player.Coin }}</span>
            <!-- 獲得螺絲釘動畫 -->
            <p v-if="coinChange !== 0" class="coin-change m-0 flow-up">+{{ coinChange }}</p>
          </div>
        </p>
      </div>
    </div>
  </template>

  <!-- 主狀態 -->
  <template v-if="isMain">
    <div class="profile-main">
      <div class="profile-main-inner">
        
        <div class="avatar">
          <div class="mumble">
            <MumbleComponent :who="'player'" :show-triangle="'down'"></MumbleComponent>
          </div>
          <img :src="require(`@/assets/avatars/${player.Character.Avatar}`)">
        </div>
  
        <div class="status">
          <div class="d-flex align-items-center">
            <p class="name h6 m-0 me-1">{{ player.Character.Name }}</p>
            <div class="health">
              <div class="health-inner" :style="{ width: healthPercent + '%' }"></div>
              <p class="health-text m-0">{{ player.CurrentHealth }} / {{ player.Character.Health }}</p>
              <!-- 扣血動畫 -->
              <p v-if="healthChange !== 0" class="health-change m-0 flow-up">{{ healthChange }}</p>
            </div>
          </div>
    
          <p class="w-100 m-0 d-flex align-items-center">
            <IconComponent :icon="`images/itemtype1`"></IconComponent>
            <span class="status-text">{{ player.CurrentAttack }}</span>
            <span v-if="player.ExtraAttack" class="status-text">（+ {{ player.ExtraAttack }}）</span>
            <IconComponent :icon="`images/itemtype2`"></IconComponent>
            <span class="status-text">{{ player.CurrentDefense }}</span>
            <span v-if="player.ExtraDefense" class="status-text">（+ {{ player.ExtraDefense }}）</span>
            <!-- 金幣 -->
            <div class="coin m-0 d-flex justify-content-between align-items-center" v-if="player.Character.Type === 'P'">
              <IconComponent :icon="`images/screw`"></IconComponent>
              <span class="status-text">{{ player.Coin }}</span>
              <!-- 獲得螺絲釘動畫 -->
              <p v-if="coinChange !== 0" class="coin-change m-0 flow-up">+{{ coinChange }}</p>
            </div>
          </p>
        </div>

      </div>
    </div>
  </template>

</template>

<script setup name="PlayerStatusComponent" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { Player, Character, enumGameState } from '@/types/general';
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import IconComponent from './IconComponent.vue';
import MumbleComponent from './MumbleComponent.vue';

const props = withDefaults(defineProps<{
  player: Player,
  isMain?: boolean
}>(), {
  isMain: false
});

const store = useStore();
const gameState = computed(() => store.getters.gameState);

const healthPercent = computed(() => (props.player.CurrentHealth / props.player.Character.Health) * 100);
// 生命值變化
const healthChange = ref(0);
const lastHealth = ref(0);
// 螺絲釘變化
const coinChange = ref(0);
const lastCoin = ref(0);

watch((props.player), () => {
  // 監聽生命值變化
  if (props.player.CurrentHealth !== lastHealth.value) {
    healthChange.value = props.player.CurrentHealth - lastHealth.value;
    setTimeout(() => {
      lastHealth.value = props.player.CurrentHealth;
      healthChange.value = 0;
    }, 1000)
  }
  // 監聽螺絲釘變化
  if (props.player.Coin !== lastCoin.value) {
    coinChange.value = props.player.Coin - lastCoin.value;
    setTimeout(() => {
      lastCoin.value = props.player.Coin;
      coinChange.value = 0;
    }, 1000)
  }
})

onMounted(() => {
  lastHealth.value = props.player.CurrentHealth;
  lastCoin.value = props.player.Coin;
});

</script>

<style lang="scss" scoped>
.profile-sm {
  width: 320px;
  border: 5px solid var(--green);
  background-color: var(--blue);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: stretch;
  color: var(--green);
  gap: 10px;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
  .status {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    white-space: nowrap;
    .name {
      white-space: nowrap;
    }
    &-text {
      color: var(--skin);
      margin-left: 5px;
    }
  }
  .avatar {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .health {
    width: 100%;
    padding: 12px;
    position: relative;
    border-radius: 10px;
    background-color: var(--red);
    &-inner {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--darkred);
      border-radius: 10px;
      transition: all 0.3s;
    }
    &-text {
      text-align: center;
      color: var(--skin);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    &-change {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 1.3rem;
      font-weight: bold;
      color: var(--darkred);
    }
  }

  .coin {
    position: relative;
    &-change {
      position: absolute;
      top: 0;
      left: 50px;
      font-size: 1.3rem;
      font-weight: bold;
      color: var(--skin);
    }
  }
}

.flow-up {
  animation-name: flowUp;
  animation-duration: 1s;
}

.mumble {
  position: absolute;
  left: 0;
  width: 240px;
  bottom: 98%;
}

.icon {
  margin: 0 5px;
}
.profile-main {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;
  max-height: 150px;
  background-color: rgba(35, 36, 47, 0.7);
  &-inner {
    display: flex;
    color: var(--green);
    gap: 10px;
    width: 60%;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 100%;
    }
  }
  .avatar {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid var(--green);
    border-radius: 10px;
    background-color: var(--blue);
    width: 50px;
    height: 50px;
    img {
      width: 80%;
      height: 80%;
    }
  }

  .status {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    white-space: nowrap;
    .name {
      white-space: nowrap;
    }
    &-text {
      color: var(--skin);
      margin-left: 5px;
    }
  }
  .health {
    width: 100%;
    padding: 12px;
    position: relative;
    border-radius: 10px;
    background-color: var(--red);
    &-inner {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--darkred);
      border-radius: 10px;
      transition: all 0.3s;
    }
    &-text {
      text-align: center;
      color: var(--skin);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    &-change {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 1.3rem;
      font-weight: bold;
      color: var(--darkred);
    }
  }
  .coin {
    position: relative;
    &-change {
      position: absolute;
      top: 0;
      left: 50px;
      font-size: 1.3rem;
      font-weight: bold;
      color: var(--skin);
    }
  }
}

@keyframes flowUp {
  0% {
    transform: none;
    opacity: 100;
  }
  50% {
    opacity: 80;
  }
  to {
    transform: translateY(-20px);
  }
}

</style>
