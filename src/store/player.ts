import { ref } from 'vue';

import { defineStore } from 'pinia';

import { enumCharacter } from '@/enums/character';
import { enumMumbleType } from '@/enums/mumble';
import factory from '@/factory';
import { Player } from '@/types/player';
import { getRandomInt, sleep } from '@/utils/common';

import { useSoundStore } from './sound';

export const usePlayerStore = defineStore('player', () => {
    const soundStore = useSoundStore();
    const currentPlayer = ref<Player>();

    // 喃喃自語
    const isMumbling = ref(false);
    const mumbleContent = ref('');

    /** 選擇角色 */
    const selectCharacter = (characterType: enumCharacter) => {
        currentPlayer.value = factory.createPlayer(characterType);
    };

    const clearMumble = () => {
        isMumbling.value = false;
        mumbleContent.value = '';
    };

    /** 玩家喃喃自語 */
    async function mumble(mumbleType: enumMumbleType, delay: number) {
        if (delay === 0) {
            clearMumble();
        }

        const mumbleList =
            currentPlayer.value!.character.mumbleList[mumbleType];

        if (mumbleList.length > 0 && !isMumbling.value) {
            await soundStore.playSound(soundStore.sounds.effect.pop);

            const randomIndex = getRandomInt([0, mumbleList.length - 1]);
            isMumbling.value = true;
            mumbleContent.value = mumbleList[randomIndex];

            // 5 秒後關閉
            await sleep(5000);

            clearMumble();
        }
    }

    /** 扣血 */
    function decreaseHealth(point: number) {
        const { health } = currentPlayer.value!.status;

        // 若血量小於 0 就直接歸零
        const mutatedHealth = health - point < 0 ? 0 : health - point;

        currentPlayer.value!.status.health = mutatedHealth;
    }

    /** 補血 */
    function increaseHealth(point: number) {
        const { health, maxHealth } = currentPlayer.value!.status;

        // 不得超過血量上限
        const mutatedHealth =
            health + point > maxHealth ? maxHealth : health + point;

        currentPlayer.value!.status.health = mutatedHealth;
    }

    return {
        currentPlayer,
        selectCharacter,
        isMumbling,
        mumbleContent,
        mumble,
        decreaseHealth,
        increaseHealth,
    };
});
