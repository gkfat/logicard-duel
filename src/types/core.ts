import { enumCard } from '@/enums/card';
import { enumEffect } from '@/enums/effect';
import {
    enumEquip,
    enumEquipPosition,
} from '@/enums/equip';
import { enumRarity } from '@/enums/rarity';

interface BaseTemplate {
    name: string;
    description: string;
    icon: string;
    /**
     * 可能的數值
     */
    potentials: {
        [key in enumRarity]?: {
            pointRange: [number, number];
            priceRange: [number, number];
        };
    };
}

interface BaseInstance {
    id: number;
    createdAt: Date;
    info: {
        point: number;
        price: number;
        rarity: enumRarity;
    };
}

/** 卡牌模板 */
export interface CardTemplate extends BaseTemplate {
    type: enumCard;
    effect: enumEffect.Harm | enumEffect.Defense;
}

/** 卡牌實體 */
export interface Card extends BaseInstance {
    template: CardTemplate;
}

/** 裝備模板 */
export interface EquipTemplate extends BaseTemplate {
    type: enumEquip;
    position: enumEquipPosition;
    effect: enumEffect.Harm | enumEffect.Defense;
}

/** 裝備實體 */
export interface Equip extends BaseInstance {
    template: EquipTemplate;
    position: enumEquipPosition;
    /** 是否已裝備 */
    is_equiped: boolean;
}
