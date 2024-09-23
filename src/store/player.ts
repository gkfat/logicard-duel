import { ref } from 'vue';

import { defineStore } from 'pinia';

import { useSoundEffect } from '@/composable/useSoundEffect';
import { enumCharacter } from '@/enums/character';
import { enumEquipPosition } from '@/enums/equip';
import { enumMumbleType } from '@/enums/mumble';
import factory from '@/factory';
import { Card, Equip } from '@/types/core';
import { Player } from '@/types/player';
import { getRandomInt, sleep } from '@/utils/common';
import { drawLots } from '@/utils/lottery';

import { useAppStore } from './app';

export const usePlayerStore = defineStore('player', () => {
    const appStore = useAppStore();
    const { soundPlaceCard, soundEquip, soundPop } = useSoundEffect();
    const currentPlayer = ref<Player>();

    /** 手牌 */
    const handCards = ref<Card[]>([]);
    /** 桌牌 */
    const tableCard = ref<Card>();

    /** 喃喃自語 */
    const keepMumbling = ref(false);
    const mumbleContent = ref('');

    /** 選擇角色 */
    const selectCharacter = (characterType: enumCharacter) => {
        currentPlayer.value = factory.createPlayer(characterType);
    };

    const clearMumble = () => {
        mumbleContent.value = '';
    };

    /** 產生一句喃喃自語 */
    async function randomMumble(
        mumbleType: enumMumbleType,
        force: boolean = false
    ) {
        // 決定是否要喃喃自語
        const isGoingToMumble = force || drawLots();

        if (isGoingToMumble) {
            // 如果有前一句就延遲一下後再說話
            if (mumbleContent.value.length) {
                await sleep(1000);
            }

            const mumbleList =
                currentPlayer.value!.character.mumbleList[mumbleType];

            if (mumbleList.length > 0) {
                soundPop();

                const randomIndex = getRandomInt([0, mumbleList.length - 1]);
                mumbleContent.value = mumbleList[randomIndex];

                // 5 秒後關閉
                await sleep(5000);
                clearMumble();
            }
        }

        // 循環
        if (keepMumbling.value) {
            const randomSeconds = getRandomInt([3, 8]);
            await sleep(randomSeconds * 1000);

            randomMumble(mumbleType);
        }
    }

    /** 喃喃自語循環 */
    async function startMumble() {
        keepMumbling.value = true;

        randomMumble(enumMumbleType.General);
    }

    function stopMumble() {
        keepMumbling.value = false;
        clearMumble();
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

    /** 脫掉裝備 */
    function removeEquipment(position: enumEquipPosition) {
        if (currentPlayer.value) {
            const getCurrentEquipment = currentPlayer.value.equipment[position];

            if (getCurrentEquipment) {
                soundEquip();

                // 脫下現有裝備
                getCurrentEquipment.is_equiped = false;
            }
        }
    }

    /** 更換裝備 */
    function changeEquipment(equip: Equip) {
        if (currentPlayer.value) {
            const findEquip = currentPlayer.value.backpack.equips.find(
                (v) => v.id === equip.id
            );

            if (findEquip) {
                removeEquipment(equip.position);

                // 穿上新裝備
                findEquip.is_equiped = true;
                currentPlayer.value.equipment[equip.position] = findEquip;
            }
        }
    }

    /** 抽牌 */
    async function drawCard() {
        const getCards: Card[] = [];

        Array.from({ length: appStore.ENV.handCardMaxLimit }).forEach(() => {
            const { cards } = currentPlayer.value!.backpack;
            const randomIndex = getRandomInt([0, cards.length - 1]);

            const getCard = cards[randomIndex];

            const unReachedLimit =
                getCards.length + handCards.value.length <
                appStore.ENV.handCardMaxLimit;

            if (getCard && unReachedLimit) {
                getCards.push(getCard);
                cards.splice(randomIndex, 1);
            }
        });

        for (const card of getCards) {
            await soundPlaceCard();
            handCards.value.push(card);
            await sleep(300);
        }
    }

    /** 出牌 */
    async function placeCard(card: Card) {
        // 若桌上有牌，先收回
        if (tableCard.value !== undefined) {
            const _card = { ...tableCard.value };

            handCards.value.push(_card);

            tableCard.value = undefined;
        }

        if (tableCard.value === undefined) {
            await soundPlaceCard();

            handCards.value = handCards.value.filter((v) => v.id !== card.id);

            tableCard.value = { ...card };
        }
    }

    /** 收回牌 */
    async function recallCard() {
        if (tableCard.value !== undefined) {
            await soundPlaceCard();

            const card = { ...tableCard.value };

            handCards.value.push(card);

            tableCard.value = undefined;
        }
    }

    return {
        currentPlayer,
        selectCharacter,

        mumbleContent,
        randomMumble,
        startMumble,
        stopMumble,

        decreaseHealth,
        increaseHealth,
        changeEquipment,
        removeEquipment,

        handCards,
        tableCard,
        drawCard,
        placeCard,
        recallCard,
    };
});
