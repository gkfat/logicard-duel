import {
    computed,
    ref,
} from 'vue';

import { defineStore } from 'pinia';

import { useSoundEffect } from '@/composable/useSoundEffect';
import { enumCharacter } from '@/enums/character';
import { enumEffect } from '@/enums/effect';
import { enumEquipPosition } from '@/enums/equip';
import { enumMumbleType } from '@/enums/mumble';
import factory from '@/factory';
import {
    Card,
    Equip,
} from '@/types/core';
import {
    GameRecord,
    Player,
} from '@/types/player';
import {
    getRandomInt,
    sleepSeconds,
} from '@/utils/common';
import { getSalePrice } from '@/utils/item';
import { drawLots } from '@/utils/lottery';
import { createDate } from '@/utils/time';

import { useAppStore } from './app';

export const usePlayerStore = defineStore('player', () => {
    const appStore = useAppStore();
    const { soundPlaceCard, soundEquip, soundPop, soundPlayerHurt, soundCoin } =
        useSoundEffect();

    const currentPlayer = ref<Player>();

    /**
     * 額外狀態值(裝備)
     */
    const extraStatus = computed(() => {
        // 找到已裝備的裝備
        const findEquips = currentPlayer.value!.backpack.equips.filter(
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
                await sleepSeconds(1);
            }

            const mumbleList =
                currentPlayer.value!.character.mumbleList[mumbleType];

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
        if (!force && keepMumbling.value) {
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

    /** 扣血 */
    function decreaseHealth(point: number) {
        soundPlayerHurt();

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

                currentPlayer.value.equipment[position] = null;
            }
        }
    }

    /** 更換裝備 */
    function changeEquipment(equip: Equip) {
        if (currentPlayer.value) {
            const getCurrentEquipment =
                currentPlayer.value.equipment[equip.position];
            const findEquip = currentPlayer.value.backpack.equips.find(
                (v) => v.id === equip.id
            );

            if (findEquip) {
                if (getCurrentEquipment) {
                    removeEquipment(equip.position);
                }

                soundEquip();

                // 穿上新裝備
                findEquip.is_equiped = true;
                currentPlayer.value.equipment[equip.position] = findEquip;
            }
        }
    }

    /** 抽牌 */
    async function drawCard() {
        const { cards } = currentPlayer.value!.backpack;
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

    /** 將桌上手牌清理乾淨 */
    async function clearTableCards() {
        if (currentPlayer.value) {
            currentPlayer.value.backpack.cards = [
                ...currentPlayer.value.backpack.cards,
                ...handCards.value,
            ];

            handCards.value = [];
        }
    }

    /** 收集戰利品鏍絲釘 */
    async function collectCoin(amount: number) {
        if (currentPlayer.value) {
            currentPlayer.value.backpack.coin += amount;
        }
    }

    /** 收集戰利品卡牌 */
    async function collectCard(card: Card) {
        if (currentPlayer.value) {
            await soundEquip();
            currentPlayer.value.backpack.cards.unshift(card);
        }
    }

    /** 收集戰利品裝備 */
    async function collectEquip(equip: Equip) {
        if (currentPlayer.value) {
            await soundEquip();
            equip.is_equiped = false;
            currentPlayer.value.backpack.equips.unshift(equip);
        }
    }

    /** 丟棄戰利品卡牌 */
    async function dropCard(card: Card) {
        if (currentPlayer.value) {
            const findIndex = currentPlayer.value?.backpack.cards.findIndex((v) => v.id === card.id);

            if (findIndex !== -1) {
                await soundPlaceCard();
                currentPlayer.value.backpack.cards.splice(findIndex, 1);
            }
        }
    }

    /** 丟棄戰利品裝備 */
    async function dropEquip(equip: Equip) {
        if (currentPlayer.value) {
            const findIndex = currentPlayer.value?.backpack.equips.findIndex((v) => v.id === equip.id);

            if (findIndex !== -1) {
                await soundEquip();
                currentPlayer.value.backpack.equips.splice(findIndex, 1);
            }
        }
    }

    /** 買入裝備 */
    async function buyEquip(item: Equip) {
        const { price } = item.info;

        if (currentPlayer.value) {
            await soundCoin();
            currentPlayer.value.backpack.coin -= price;
            currentPlayer.value.backpack.equips.push(item);
        }
    }

    /** 買入卡牌 */
    async function buyCard(item: Card) {
        const { price } = item.info;

        if (currentPlayer.value) {
            await soundCoin();
            currentPlayer.value.backpack.coin -= price;
            currentPlayer.value.backpack.cards.push(item);
        }
    }

    /** 賣出道具 */
    async function sellItem(type: 'card' | 'equip', item: Card | Equip) {
        const price = getSalePrice(item);
        const { id } = item;

        if (currentPlayer.value) {
            const pool =
                type === 'equip'
                    ? currentPlayer.value.backpack.equips
                    : currentPlayer.value.backpack.cards;

            const findIndex = pool.findIndex(
                (v) => v.id === id
            );

            pool.splice(findIndex, 1);
            await soundCoin();
            currentPlayer.value.backpack.coin += price;
        }
    }

    /** 新增一筆紀錄 */
    async function createRecord(opponent: Player) {
        if (currentPlayer.value) {
            const newRecord: GameRecord = {
                id: currentPlayer.value.records.length + 1,
                opponent,
                battleStartAt: createDate().toDate(),
                battleEndAt: null,
                cardsUsed: 0,
                harm: 0,
                damaged: 0,
                defense: 0,
                heal: 0,
            };
            currentPlayer.value.records.push(newRecord);
        }
    }

    return {
        currentPlayer,
        extraStatus,
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
        clearTableCards,
        sellItem,

        createRecord,

        buyCard,
        buyEquip,

        collectCoin,
        collectCard,
        collectEquip,
        dropCard,
        dropEquip,
    };
});
