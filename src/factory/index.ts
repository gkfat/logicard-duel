import { CardTemplateList } from '@/data/card-templates';
import { CharacterTemplateList } from '@/data/character-templates';
import { EquipTemplateList } from '@/data/equip-templates';
import { enumCard } from '@/enums/card';
import { enumCharacter } from '@/enums/character';
import {
    enumEquip,
    enumEquipPosition,
} from '@/enums/equip';
import {
    enumRarity,
    RarityValue,
} from '@/enums/rarity';
import {
    Card,
    Equip,
} from '@/types/core';
import { Player } from '@/types/player';
import { getRandomInt } from '@/utils/common';
import { createDate } from '@/utils/time';

class Factory {
    private currentIndex = {
        card: 0,
        equip: 0,
        player: 0,
    };

    /**
     * 稀有度池
     * 依照稀有度權重比例塞入稀有度值, 抽籤時隨機數抽取一個 index, 以該 index 為稀有度
     */
    private rarityPools: RarityValue[] = [];

    /**
     * 初始化稀有度池
     */
    private initRarityPools() {
        const rarityWeights: { [key in RarityValue]: number } = {
            [enumRarity.None]: 0,
            [enumRarity.Normal]: 50,
            [enumRarity.Rare]: 30,
            [enumRarity.SR]: 15,
            [enumRarity.SSR]: 5,
        };

        Object.keys(rarityWeights).forEach((rarity) => {
            const weights = rarityWeights[rarity as RarityValue];

            for(let i = 0; i < weights; i ++) {
                this.rarityPools.push(rarity as RarityValue);
            }
        });
    }

    constructor() {
        this.initRarityPools();
    }

    /**
     * 產生稀有度
     */
    private randomRarity(range: RarityValue[]): enumRarity {
        // 淺拷貝並篩掉 range 以外的 raritys
        const filterdPool = this.rarityPools.slice().filter((rarity) => range.includes(rarity));
        const getIndex = getRandomInt([0, filterdPool.length - 1]);
        const rarity = filterdPool[getIndex];

        return rarity;
    }

    /**
     * 產生自動滾動 Id
     */
    private getAutoIncrementId(type: 'card' | 'equip' | 'player') {
        const index = this.currentIndex[type];

        this.currentIndex[type] += 1;

        return index + 1;
    }

    /**
     * 產生裝備
     */
    public createEquip(equipType: enumEquip) {
        const findTemplate = EquipTemplateList.find(
            (v) => v.type === equipType,
        )!;

        const {
            potentials, position,
        } = findTemplate;

        // 產生稀有度
        const rarity = this.randomRarity(
            Object.keys(potentials) as RarityValue[],
        );

        const {
            pointRange, priceRange,
        } = potentials[rarity]!;

        const instace: Equip = {
            id: this.getAutoIncrementId('equip'),
            createdAt: createDate().toDate(),
            info: {
                point: getRandomInt(pointRange),
                price: getRandomInt(priceRange),
                rarity,
            },
            template: findTemplate,
            position,
            is_equiped: false,
        };

        return instace;
    }

    /**
     * 產生卡牌
     */
    public createCard(cardType: enumCard) {
        const findTemplate = CardTemplateList.find((v) => v.type === cardType)!;

        const { potentials } = findTemplate;

        // 產生稀有度
        const rarity = this.randomRarity(
            Object.keys(potentials) as RarityValue[],
        );

        const {
            pointRange, priceRange,
        } = potentials[rarity]!;

        const instace: Card = {
            id: this.getAutoIncrementId('card'),
            createdAt: createDate().toDate(),
            info: {
                point: getRandomInt(pointRange),
                price: getRandomInt(priceRange),
                rarity,
            },
            template: findTemplate,
        };

        return instace;
    }

    /**
     * 產生玩家實體
     */
    public createPlayer(character: enumCharacter) {
        const findTemplate = CharacterTemplateList.find(
            (v) => v.type === character,
        )!;

        const {
            init: {
                healthRange,
                attackRange,
                defenseRange,
                equips,
                cards,
                coin,
            },
        } = findTemplate;

        const health = getRandomInt(healthRange);

        const instace: Player = {
            id: this.getAutoIncrementId('player'),
            createdAt: createDate().toDate(),
            character: { ...findTemplate },
            status: {
                level: 1,
                exp: 0,
                expToNextLevel: 100,
                health,
                maxHealth: health,
                attack: getRandomInt(attackRange),
                defense: getRandomInt(defenseRange),
            },
            equipment: {
                [enumEquipPosition.PrimaryHand]: null,
                [enumEquipPosition.SecondaryHand]: null,
                [enumEquipPosition.Head]: null,
                [enumEquipPosition.Body]: null,
                [enumEquipPosition.Pants]: null,
                [enumEquipPosition.Shoes]: null,
            },
            backpack: {
                equips: equips.map((equipType) => this.createEquip(equipType)),
                cards: cards.map((cardType) => this.createCard(cardType)),
                coin,
            },
            records: [],
        };

        Object.values(enumEquipPosition).forEach((position) => {
            const findEquip = instace.backpack.equips.find(
                (v) => v.position === position,
            );

            if (findEquip) {
                findEquip.is_equiped = true;
                instace.equipment[findEquip.position] = findEquip;
            }
        });

        return instace;
    }
}

export default new Factory();
