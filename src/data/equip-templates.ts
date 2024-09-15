import { enumEffect } from '@/enums/effect';
import { enumEquip } from '@/enums/equip';
import { enumRarity } from '@/enums/rarity';
import { EquipTemplate } from '@/types/equip';

import { ImageDataList } from './images';

export const EquipTemplateList: EquipTemplate[] = [
    {
        type: enumEquip.Boxer,
        effect: enumEffect.Harm,
        name: '拳擊手套',
        description: '這軟趴趴的手套，對機器人有用嗎...',
        pointRange: [1, 5],
        priceRange: [30, 40],
        icon: ImageDataList.icon.boxer,
        rarity: enumRarity.N,
    },
    {
        type: enumEquip.Bat,
        effect: enumEffect.Harm,
        name: '棒球棍',
        description: '一根隨處可見的棒球棍。',
        pointRange: [3, 10],
        priceRange: [60, 120],
        icon: ImageDataList.icon.bat,
        rarity: enumRarity.R,
    },
    {
        type: enumEquip.Gun,
        effect: enumEffect.Harm,
        name: '手槍',
        description: '哈利，你看！這東西比魔杖還好用呢！',
        pointRange: [10, 20],
        priceRange: [300, 500],
        icon: ImageDataList.icon.gun,
        rarity: enumRarity.SR,
    },
    {
        type: enumEquip.Cloth,
        effect: enumEffect.Defense,
        name: '布衣',
        description: '有穿總比沒穿好。',
        pointRange: [1, 5],
        priceRange: [30, 40],
        icon: ImageDataList.icon.cloth,
        rarity: enumRarity.N,
    },
    {
        type: enumEquip.BulletProof,
        effect: enumEffect.Defense,
        name: '防彈衣',
        description: '應該可以保護自己吧。',
        pointRange: [3, 10],
        priceRange: [60, 120],
        icon: ImageDataList.icon.bulletproof,
        rarity: enumRarity.R,
    },
    {
        type: enumEquip.Armor,
        effect: enumEffect.Defense,
        name: '盔甲',
        description: '原本在博物館裡的東西...',
        pointRange: [10, 20],
        priceRange: [300, 500],
        icon: ImageDataList.icon.armor,
        rarity: enumRarity.SR,
    },
];
