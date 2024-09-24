import {
    computed,
    ref,
} from 'vue';

import { defineStore } from 'pinia';

import { useSoundEffect } from '@/composable/useSoundEffect';
import {
    enumCharacter,
    OpponentValues,
} from '@/enums/character';
import { enumEffect } from '@/enums/effect';
import { enumMumbleType } from '@/enums/mumble';
import factory from '@/factory';
import {
    Card,
    Equip,
} from '@/types/core';
import { Player } from '@/types/player';
import {
    getRandomInt,
    sleep,
} from '@/utils/common';
import { drawLots } from '@/utils/lottery';

import { useAppStore } from './app';
import { useBattleStore } from './battle';

export const useOpponentStore = defineStore('opponent', () => {
    const appStore = useAppStore();
    const battleStore = useBattleStore();
    const { soundPlaceCard, soundPop, soundOpponentHurt } = useSoundEffect();

    /** 被擊敗的敵人 */
    const defeatedOpponents = ref<Player[]>([]);

    /** 敵人池 */
    const pool = ref<Player[]>([]);

    /** 目前敵人 */
    const currentOpponent = ref<Player>();

    /**
     * 額外狀態值(裝備)
     */
    const extraStatus = computed(() => {
        // 找到已裝備的裝備
        const findEquips = currentOpponent.value!.backpack.equips.filter(
            (v) => v.is_equiped
        );

        const findWeapons = findEquips.filter(
            (v) => v.template.effect === enumEffect.Harm
        );
        const findArmors = findEquips.filter(
            (v) => v.template.effect === enumEffect.Defense
        );

        const calcPoint = (equips: Equip[]) =>
            equips.reduce((num, equip) => num + equip.info.point, 0);

        return {
            attack: calcPoint(findWeapons),
            defense: calcPoint(findArmors),
        };
    });

    /** 喃喃自語 */
    const keepMumbling = ref(false);
    const mumbleContent = ref('');

    /** 敵人手牌 */
    const handCards = ref<Card[]>([]);
    /** 敵人桌牌 */
    const tableCard = ref<Card>();

    /** 扣血 */
    function decreaseHealth(point: number) {
        soundOpponentHurt();

        const { health } = currentOpponent.value!.status;

        // 若血量小於 0 就直接歸零
        const mutatedHealth = health - point < 0 ? 0 : health - point;

        currentOpponent.value!.status.health = mutatedHealth;
    }

    /** 補血 */
    function increaseHealth(point: number) {
        const { health, maxHealth } = currentOpponent.value!.status;

        // 不得超過血量上限
        const mutatedHealth =
            health + point > maxHealth ? maxHealth : health + point;

        currentOpponent.value!.status.health = mutatedHealth;
    }

    /** 補滿敵人池 */
    function refillPool() {
        while (pool.value.length < 3) {
            const randomType =
                OpponentValues[getRandomInt([0, OpponentValues.length - 1])];
            const opponent = factory.createPlayer(randomType);
            pool.value.push(opponent);
        }
    }

    /** 抽牌 */
    async function drawCard() {
        const getCards: Card[] = [];

        Array.from({ length: appStore.ENV.handCardMaxLimit }).forEach(() => {
            const { cards } = currentOpponent.value!.backpack;
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

    async function recallCard() {
        if (tableCard.value !== undefined) {
            await soundPlaceCard();

            const card = { ...tableCard.value };

            handCards.value.push(card);

            tableCard.value = undefined;
        }
    }

    /** 敵人出牌邏輯 */
    async function logicPlaceCard() {
        const randomSeconds = getRandomInt([3, battleStore.remainSeconds]);
        await sleep(randomSeconds);

        // 若還有手牌就隨機出一張
        if (handCards.value.length > 0) {
            const randomCardIndex = getRandomInt([0, handCards.value.length]);
            const getCard = handCards.value[randomCardIndex];

            placeCard(getCard);

            const shouldRePlaceCard =
                battleStore.remainSeconds > 3 && drawLots();
            if (shouldRePlaceCard) {
                await recallCard();

                await logicPlaceCard();
            }
        }
    }

    const clearMumble = () => {
        mumbleContent.value = '';
    };

    /** 產生一句喃喃自語 */
    async function randomMumble(
        mumbleType: enumMumbleType,
        force: boolean = false
    ) {
        // 決定是否要喃喃自語
        const isGoingToMumble = force || getRandomInt([1, 2]) === 1;

        if (isGoingToMumble) {
            // 如果有前一句就延遲一下後再說話
            if (mumbleContent.value.length) {
                await sleep(1000);
            }

            const mumbleList =
                currentOpponent.value!.character.mumbleList[mumbleType];

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

    /** 初始化敵人池 */
    function init() {
        // 初始化一定有工作型
        const workerTypeOpponent = factory.createPlayer(
            enumCharacter.GkbotWorker
        );
        pool.value.push(workerTypeOpponent);

        refillPool();

        console.log('opponents init');
    }

    return {
        pool,
        currentOpponent,
        extraStatus,
        defeatedOpponents,

        decreaseHealth,
        increaseHealth,

        mumbleContent,
        randomMumble,
        startMumble,
        stopMumble,

        handCards,
        tableCard,
        drawCard,
        placeCard,
        recallCard,
        logicPlaceCard,

        refillPool,
        init,
    };
});
