<template>
  <div id="choose-character">
    <Dialog :dialogs="dialogs[dialogIndex]" />
    <template v-if="!dialogEnd">
      <button type="button" class="w-100 system-btn system-btn-skip" @click="dialogNextToEnd()">跳過</button>
      <button type="button" class="w-100 system-btn" @click="dialogNext()">繼續</button>
    </template>
    <template v-if="dialogEnd">
      <Carousel :items-to-show="1" :wrap-around="true" @slide-end="selectCharacter">
        <Slide v-for="(player, i) in mockPlayerList" :key="i">
          <div
            type="button"
            class="character-choose rounded p-3"
            :class="{ 'carousel__slide--active': selectedCharacter === i }">
            <PlayerStatus :player="player" />
            <p class="m-0">{{ player.Character!.Description }}</p>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
      <button type="button" class="w-100 system-btn" @click="confirmCharacter()">決定</button>
    </template>
  </div>
</template>

<script setup name="ChooseCharacter" lang="ts">
import { computed, ref, reactive } from 'vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import type { Player } from '@/types';
import { enumGameState, enumDialog } from '@/types/enums';
import { CHARACTER_LIST, DIALOGS } from '@/data';
import Sound from '@/service/sounds';
import Util from '@/service/util';
import { useGameStateStore, usePlayerStore, useSwitchToggleStore } from '@/store';

const playerStore = usePlayerStore();
const switchToggleStore = useSwitchToggleStore();
const gameStateStore = useGameStateStore();

const dialogs = DIALOGS[enumDialog.GameStart];
const dialogEndIndex = dialogs.length - 1;
const dialogIndex = ref(0);
const dialogEnd = computed(() => dialogIndex.value === dialogEndIndex);

const dialogNext = async () => {
	if (dialogIndex.value < dialogEndIndex) {
		await Sound.playSound(Sound.sounds.effect.click);
		dialogIndex.value += 1;
	}
};

const dialogNextToEnd = async () => {
	await Sound.playSound(Sound.sounds.effect.click);
	dialogIndex.value = dialogEndIndex;
};

// 選擇角色
const characterList = CHARACTER_LIST.filter((c) => c.Type === 'P');
const mockPlayerList = characterList.map((c) => reactive({
	Character: c,
	CurrentHealth: c.Health,
	CurrentAttack: c.Attack,
	CurrentDefense: c.Defense,
	ExtraAttack: 0,
	ExtraDefense: 0,
	Coin: c.Coin,
}) as Player);

const selectedCharacter = ref(0);
const selectCharacter = (data: { currentSlideIndex: number; }) => {
	selectedCharacter.value = data.currentSlideIndex;
};

const confirmCharacter = async () => {
	await Sound.playSound(Sound.sounds.effect.click);
	const character = characterList[selectedCharacter.value];
	playerStore.selectCharacter(character);
	switchToggleStore.switchSpinner(true);
	await Util.sleep(300);
	gameStateStore.changeGameState(enumGameState.BattleStart);
	switchToggleStore.switchSpinner(false);
};
</script>

<style lang="scss" scoped>
#choose-character {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .character-choose {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    p {
      width: 90%;
      text-align: left;
    }
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
