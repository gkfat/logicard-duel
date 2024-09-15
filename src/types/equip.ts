import { enumEffect } from '@/enums/effect';
import { enumEquip } from '@/enums/equip';
import { enumRarity } from '@/enums/rarity';

export interface EquipTemplate {
    type: enumEquip;
    /** 點數範圍 */
    pointRange: [number, number];
    effect: enumEffect;
    name: string;
    description: string;
    /** 價值範圍 */
    priceRange: [number, number];
    icon: string;
    rarity: enumRarity;
}


export interface Equip {
    id: number;
    createdAt: Date;
    info: {
        type: enumEquip;
        point: number;
        effect: enumEffect;
        name: string;
        description: string;
        price: number;
        icon: string;
        rarity: enumRarity;
    };
}
