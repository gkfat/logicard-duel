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
    sleepSeconds,
} from '@/utils/common';
import { drawLots } from '@/utils/lottery';

import { useAppStore } from './app';
import { useBattleStore } from './battle';
import { usePlayerStore } from './player';

export const useOpponentStore = defineStore('opponent', () => {
    const appStore = useAppStore();
    const battleStore = useBattleStore();
    const playerStore = usePlayerStore();

    const {
        soundPlaceCard, soundPop, soundOpponentHurt, soundHeal, 
    } = useSoundEffect();

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
        const findEquips = currentOpponent.value!.backpack.equips.filter((v) => v.is_equiped);

        const findWeapons = findEquips.filter((v) => v.template.effect === enumEffect.Harm);
        const findArmors = findEquips.filter((v) => v.template.effect === enumEffect.Defense);

        const calcPoint = (equips: Equip[]) => equips.reduce((num, equip) => num + equip.info.point, 0);

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
    async function increaseHealth(point: number) {
        const {
            health, maxHealth, 
        } = currentOpponent.value!.status;

        // 不得超過血量上限
        const mutatedHealth = health + point > maxHealth ? maxHealth : health + point;

        await soundHeal();

        currentOpponent.value!.status.health = mutatedHealth;
    }

    /** 升級 */
    async function levelUp(opponent: Player) {
        const { status } = opponent;

        status.level += 1;
        status.maxHealth += 10;
        status.health = status.maxHealth;
        status.attack += 2;
        status.defense += 2;

        status.expToNextLevel *= 1.5;

        return opponent;
    }

    function getRandomLevel() {
        let result = 1;
        const playerLevel = playerStore.currentPlayer?.status.level ?? 1;

        if (playerLevel) {
            // 取玩家等級上下一級
            const [min, max] = [playerLevel - 1 < 1 ? 1 : playerLevel - 1, playerLevel + 1];

            result = getRandomInt([min, max]);
        }

        return result;
    }

    /** 補滿敵人池 */
    async function refillPool() {
        while (pool.value.length < 5) {
            const randomType = OpponentValues[getRandomInt([0, OpponentValues.length - 1])];

            let opponent = factory.createPlayer(randomType);

            // 依玩家當前等級調配敵人等級
            const randomLevel = getRandomLevel();

            if (randomLevel > 1) {
                for (let i = 1; i < randomLevel; i++) {
                    opponent = await levelUp(opponent);
                }
            }

            pool.value.push(opponent);
        }
    }

    /** 抽牌 */
    async function drawCard() {
        const { cards } = currentOpponent.value!.backpack;
        const reachedLimit = handCards.value.length >= appStore.ENV.handCardMaxLimit;

        if (cards.length > 0 && !reachedLimit) {
            const randomIndex = getRandomInt([0, cards.length - 1]);
            const getCard = cards[randomIndex];

            if (getCard) {
                await soundPlaceCard();
                handCards.value.push(getCard);
                cards.splice(randomIndex, 1);
                await sleepSeconds(0.3);
                await drawCard();
            }
        }
    }

    async function placeCard(card: Card) {
        // 若桌上有牌，先收回
        if (tableCard.value !== undefined) {
            const _card = { ...tableCard.value };

            handCards.value.push(_card);

            tableCard.value = undefined;
        }

        await soundPlaceCard();

        const findCardIndex = handCards.value.findIndex((v) => v.id === card.id);

        if (findCardIndex) {
            handCards.value.splice(findCardIndex, 1);
            tableCard.value = card;
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

    /** 將桌上手牌清理乾淨 */
    async function clearTableCards() {
        if (currentOpponent.value) {
            currentOpponent.value.backpack.cards = [...currentOpponent.value.backpack.cards, ...handCards.value];

            handCards.value = [];
        }
    }

    /** 敵人出牌邏輯 */
    async function logicPlaceCard() {
        const randomSeconds = getRandomInt([3, battleStore.remainSeconds]);
        await sleepSeconds(randomSeconds);

        // 若還有手牌就隨機出一張
        if (handCards.value.length > 0) {
            const randomCardIndex = getRandomInt([0, handCards.value.length - 1]);
            const getCard = handCards.value[randomCardIndex];

            placeCard(getCard);

            const shouldRePlaceCard = battleStore.remainSeconds > 3 && drawLots();

            if (shouldRePlaceCard) {
                await sleepSeconds(0.5);

                await recallCard();

                const randomThinkingSeconds = getRandomInt([0, battleStore.remainSeconds]);
                await sleepSeconds(randomThinkingSeconds);

                await logicPlaceCard();
            }
        }
    }

    const clearMumble = () => {
        mumbleContent.value = '';
    };

    /** 產生一句喃喃自語 */
    async function randomMumble(mumbleType: enumMumbleType, force = false) {
        // 決定是否要喃喃自語
        const isGoingToMumble = force || getRandomInt([1, 2]) === 1;

        if (isGoingToMumble) {
            // 如果有前一句就延遲一下後再說話
            if (mumbleContent.value.length) {
                await sleepSeconds(1);
            }

            const mumbleList = currentOpponent.value!.character.mumbleList[mumbleType];

            if (mumbleList.length > 0) {
                soundPop();

                const randomIndex = getRandomInt([0, mumbleList.length - 1]);
                mumbleContent.value = mumbleList[randomIndex];

                // 5 秒後關閉
                await sleepSeconds(5);
                clearMumble();
            }
        }

        // 循環
        if (keepMumbling.value) {
            const randomSeconds = getRandomInt([3, 8]);
            await sleepSeconds(randomSeconds);

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

    /** 收集戰利品卡牌 */
    async function collectCard(card: Card) {
        if (currentOpponent.value) {
            currentOpponent.value.backpack.cards.unshift(card);
        }
    }

    /** 收集戰利品裝備 */
    async function collectEquip(equip: Equip) {
        if (currentOpponent.value) {
            currentOpponent.value.backpack.equips.unshift(equip);
        }
    }

    /** 丟棄戰利品卡牌 */
    async function dropCard(card: Card) {
        if (currentOpponent.value) {
            const findIndex = currentOpponent.value.backpack.cards.findIndex((item) => item.id === card.id);

            if (findIndex !== -1) {
                currentOpponent.value.backpack.cards.splice(findIndex, 1);
            }
        }
    }

    /** 丟棄戰利品裝備 */
    async function dropEquip(equip: Equip) {
        if (currentOpponent.value) {
            const findIndex = currentOpponent.value.backpack.equips.findIndex((item) => item.id === equip.id);

            if (findIndex !== -1) {
                currentOpponent.value.backpack.equips.splice(findIndex, 1);
            }
        }
    }

    /** 清理目前的敵人 */
    async function clearOpponent() {
        if (currentOpponent.value) {
            const findIndex = pool.value.findIndex((v) => v.id === currentOpponent.value?.id);
            if (findIndex !== -1) {
                defeatedOpponents.value.push(currentOpponent.value);
                pool.value.splice(findIndex, 1);
                currentOpponent.value = undefined;
            }
        }
    }

    /** 初始化敵人池 */
    async function init() {
        // 初始化一定有工作型
        const workerTypeOpponent = factory.createPlayer(enumCharacter.GkbotWorker);
        pool.value.push(workerTypeOpponent);

        await refillPool();

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
        clearTableCards,
        logicPlaceCard,

        collectCard,
        collectEquip,
        dropCard,
        dropEquip,

        refillPool,
        init,
        clearOpponent,
    };
});
