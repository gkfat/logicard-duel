<template>
  <!-- 小型顯示 -->
  <template v-if="!isMain">
    <div class="profile-sm">
      <div class="avatar">
        <div class="mumble">
          <Mumble :who="'enemy'" :show-triangle="'down'"></Mumble>
        </div>
        <img :src="player.Character.Avatar">
      </div>
  
      <div class="status">
        <div class="d-flex align-items-center">
          <p class="name h6 m-0 me-1">{{ player.Character.Name }}</p>
          <div class="health">
            <div class="health-inner" :style="{ width: healthPercent + '%' }"></div>
            <p class="health-text m-0">{{ player.CurrentHealth }} / {{ player.Character.Health }}</p>
            <!-- 扣血動畫 -->
            <p
              v-if="gameState === enumGameState.Battle && healthChange !== 0"
              class="health-change m-0 flow-up">
              {{ healthChange }}
            </p>
          </div>
        </div>
  
        <!-- 屬性 -->
        <div class="attribue w-100">
          <Icon :url="IMAGES.icon.attack"></Icon>
          <p class="status-text m-0">{{ player.CurrentAttack }}</p>
          <p v-if="player.ExtraAttack" class="status-text status-text-extra m-0">(+ {{ player.ExtraAttack }})</p>
          <Icon :url="IMAGES.icon.defense"></Icon>
          <p class="status-text m-0">{{ player.CurrentDefense }}</p>
          <p v-if="player.ExtraDefense" class="status-text status-text-extra m-0">(+ {{ player.ExtraDefense }})</p>
        </div>

        <!-- 金幣 -->
        <div class="coin w-100 m-0 d-flex align-items-center" v-if="player.Character.Type === 'P'">
          <Icon :url="IMAGES.icon.coin"></Icon>
          <p class="status-text m-0">{{ player.Coin }}</p>
        </div>
      </div>
    </div>
  </template>

  <!-- 主狀態 -->
  <template v-if="isMain">
    <div class="profile-main">
      <div class="profile-main-inner">
        
        <div class="avatar">
          <div class="avatar-inner">
            <div class="mumble">
              <Mumble :who="'player'" :show-triangle="'down'"></Mumble>
            </div>
            <img :src="player.Character.Avatar">
          </div>
          <!-- 裝備 -->
          <div class="equipments w-100">
            <!-- Weapon -->
            <div class="equipment equipment-weapon">
              <ItemComponent
                v-if="player.WeaponIndex"
                :player-status="true"
                :item="player.ItemList[player.WeaponIndex - 1]">
              </ItemComponent>
            </div>
            <!-- Armor -->
            <div class="equipment equipment-armor">
              <ItemComponent
                v-if="player.ArmorIndex"
                :player-status="true"
                :item="player.ItemList[player.ArmorIndex - 1]">
              </ItemComponent>
            </div>
          </div>
        </div>
  
        <div class="status">
          <p class="name w-100 h6 m-0">{{ player.Character.Name }}</p>
          <div class="health w-100">
            <div class="health-inner" :style="{ width: healthPercent + '%' }"></div>
            <p class="health-text m-0">{{ player.CurrentHealth }} / {{ player.Character.Health }}</p>
            <!-- 扣血動畫 -->
            <p v-if="healthChange !== 0" class="health-change m-0 flow-up">{{ healthChange }}</p>
          </div>
          <!-- 屬性 -->
          <div class="attribue w-100">
            <Icon :url="IMAGES.icon.attack"></Icon>
            <p class="status-text m-0">{{ player.CurrentAttack }}</p>
            <p v-if="player.ExtraAttack" class="status-text status-text-extra m-0">(+ {{ player.ExtraAttack }})</p>
            <Icon :url="IMAGES.icon.defense"></Icon>
            <p class="status-text m-0">{{ player.CurrentDefense }}</p>
            <p v-if="player.ExtraDefense" class="status-text status-text-extra m-0">(+ {{ player.ExtraDefense }})</p>
          </div>
          <!-- 金幣 -->
          <div class="coin w-100 m-0 d-flex align-items-center" v-if="player.Character.Type === 'P'">
            <Icon :url="IMAGES.icon.coin"></Icon>
            <p class="status-text m-0">{{ player.Coin }}</p>
            <!-- 獲得螺絲釘動畫 -->
            <p v-if="coinChange !== 0" class="coin-change m-0 flow-up">+{{ coinChange }}</p>
          </div>
        </div>

      </div>
    </div>
  </template>
</template>

<script setup name="PlayerStatus" lang="ts">
import { Player } from '@/types';
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import ItemComponent from './ItemComponent.vue';
import Icon from './Icon.vue';
import Mumble from './Mumble.vue';
import Util from '@/service/util';
import { Tooltip } from 'bootstrap';
import { IMAGES } from '@/data';
import { enumGameState } from '@/types/enums';

const props = withDefaults(defineProps<{
  player: Player,
  isMain?: boolean
}>(), {
  isMain: false
});

const store = useStore();
const gameState = computed(() => store.getters.gameState as enumGameState);

const healthPercent = computed(() => (props.player.CurrentHealth / props.player.Character.Health) * 100);
// 生命值變化
const healthChange = ref(0);
const lastHealth = ref(0);
// 螺絲釘變化
const coinChange = ref(0);
const lastCoin = ref(0);

watch((props.player), async () => {
  // 監聽生命值變化
  if (props.player.CurrentHealth !== lastHealth.value) {
    healthChange.value = props.player.CurrentHealth - lastHealth.value;
    await Util.sleep(1000);
    lastHealth.value = props.player.CurrentHealth;
    healthChange.value = 0;
  }
  // 監聽螺絲釘變化
  if (props.player.Coin !== lastCoin.value) {
    coinChange.value = props.player.Coin - lastCoin.value;
    await Util.sleep(1000);
    lastCoin.value = props.player.Coin;
    coinChange.value = 0;
  }
})

onMounted(() => {
  lastHealth.value = props.player.CurrentHealth;
  lastCoin.value = props.player.Coin;
  new Tooltip(document.body, {
    selector: "[data-bs-toggle='tooltip']",
    delay: {
      show: 900,
      hide: 0
    },
    trigger: 'focus'
  })
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
}


// 玩家狀態 profile
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
    justify-content: space-between;
    align-items: stretch;
    color: var(--green);
    width: 60%;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 100%;
    }
  }
  .avatar {
    margin-right: 20px;
    &-inner {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      border: 3px solid var(--green);
      border-radius: 10px;
      background-color: var(--blue);
      width: 80px;
      min-width: 80px;
      height: 80px;
      margin-bottom: 5px;
      img {
        width: 80%;
        height: 80%;
      }
    }
    .equipments {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      
      .equipment {
        overflow: hidden;
        max-width: 40px;
        flex-grow: 1;
        height: 40px;
        background-color: var(--darkblue);
        border: 3px solid var(--green);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

// Share

.mumble {
  position: absolute;
  left: 0;
  width: 260px;
  bottom: 99%;
}
.status {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  .name {
    white-space: nowrap;
  }
  &-text {
    color: var(--skin);
    margin-left: 5px;
    // 額外提升屬性
    &-extra {
      font-weight: bold;
      color: var(--red);
      margin-right: 5px;
    }
  }
}
.attribue {
  display: flex;
  align-items: center;
  gap: 10px;
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
  display: flex;
  align-items: center;
  gap: 10px;
  &-change {
    position: absolute;
    top: 0;
    left: 50px;
    font-size: 1.3rem;
    font-weight: bold;
    color: var(--skin);
  }
}

.flow-up {
  animation-name: flowUp;
  animation-duration: 1s;
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