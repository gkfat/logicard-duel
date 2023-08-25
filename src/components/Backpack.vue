<template>
  <div
    id="backpack"
    class="frame"
    :class="{ 'frame-show': switchToggleStore.backpackOpen }"
    v-if="player && player.Character && player.ItemList && player.CardList">
    <Dialog :dialogs="dialogs" />
    <p class="w-100 text-center m-0">
      螺絲釘：{{ player.Coin }}｜物品：{{ player.ItemList.length + '／' + player.Character!.ItemLimit }}
    </p>
    <div class="nav-container">
      <button type="button" class="nav-btn" :class="{ 'nav-btn-active': displayType === 0 }" @click="toggleDisplayType(0)">裝備</button>
      <button type="button" class="nav-btn" :class="{ 'nav-btn-active': displayType === 1 }" @click="toggleDisplayType(1)">技術牌</button>
    </div>
    <div class="items-container" v-if="displayType === 0">
      <template v-if="player.ItemList.length === 0">
        <p class="reminder-text">背包目前沒有裝備。</p>
      </template>
      <template v-else>
        <div v-for="(item, i) in player.ItemList" :key="i">
          <ItemComponent
            :equiped="isEquiped(i)"
            :backpack="true"
            :item="item"
            :index="i"
          />
        </div>
      </template>
    </div>
    <div class="items-container" v-if="displayType === 1">
      <template v-if="player.CardList.length === 0">
        <p class="reminder-text">背包目前沒有技術牌。</p>
      </template>
      <template v-else>
        <div v-for="(item, i) in player.CardList" :key="i">
          <ItemComponent
            :backpack="true"
            :item="item"
          />
        </div>
      </template>
    </div>
    <button type="button" class="w-100 system-btn" @click="closeBackpack()">關上背包</button>
  </div>
</template>

<script setup name="Backpack" lang="ts">
import { computed, ref } from 'vue';
import { enumDialog } from '@/types/enums';
import Sound from '@/service/sounds';
import { DIALOGS } from '@/data';
import { usePlayerStore, useSwitchToggleStore } from '@/store';

const playerStore = usePlayerStore();
const switchToggleStore = useSwitchToggleStore();

const dialogs = DIALOGS[enumDialog.Backpack];
const player = computed(() => playerStore.player);
const displayType = ref(0);

const toggleDisplayType = async (type: number) => {
	await Sound.playSound(Sound.sounds.effect.click);
	displayType.value = type;
};

const isEquiped = (i: number) => {
	if (player.value.WeaponIndex && player.value.WeaponIndex - 1 === i) {
		return true;
	} if (player.value.ArmorIndex && player.value.ArmorIndex - 1 === i) {
		return true;
	}
	return false;
};

// 關上背包
const closeBackpack = async () => {
	switchToggleStore.toggle('backpack');
};
</script>

<style lang="scss" scoped>
#backpack {
	height: 90%;
}
.items-container {
	height: 100%;
	gap: 10px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	flex-grow: 1;
	overflow-y: scroll;
}
</style>
