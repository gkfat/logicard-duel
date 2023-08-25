import { ref } from 'vue';
import { defineStore } from 'pinia';
import { enumGameState } from '@/types/enums';

const useGameStateStore = defineStore('gameState', () => {
	const gameState = ref(enumGameState.Init);

	/** 改變遊戲狀態 */
	const changeGameState = (newState: enumGameState) => {
		gameState.value = newState;
	};

	return {
		gameState,
		changeGameState,
	};
});

export default useGameStateStore;
