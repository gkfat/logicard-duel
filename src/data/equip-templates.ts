import { enumEffect } from '@/enums/effect';
import { enumEquip, enumEquipPosition } from '@/enums/equip';
import { enumRarity } from '@/enums/rarity';
import { EquipTemplate } from '@/types/core';

import { ImageDataList } from './images';

export const EquipTemplateList: EquipTemplate[] = [
    {
        type: enumEquip.Boxer,
        effect: enumEffect.Harm,
        name: '拳擊手套',
        description: '這軟趴趴的手套，對機器人有用嗎...',
        icon: ImageDataList.icon.boxer,
        position: enumEquipPosition.PrimaryHand,
        potentials: {
            [enumRarity.Normal]: {
                pointRange: [1, 5],
                priceRange: [30, 40],
            },
            [enumRarity.Rare]: {
                pointRange: [4, 8],
                priceRange: [60, 80],
            },
            [enumRarity.SR]: {
                pointRange: [10, 15],
                priceRange: [120, 150],
            },
        },
    },
    {
        type: enumEquip.Bat,
        effect: enumEffect.Harm,
        name: '棒球棍',
        description: '一根隨處可見的棒球棍。',
        icon: ImageDataList.icon.bat,
        position: enumEquipPosition.PrimaryHand,
        potentials: {
            [enumRarity.Normal]: {
                pointRange: [3, 10],
                priceRange: [60, 120],
            },
        },
    },
    {
        type: enumEquip.Gun,
        effect: enumEffect.Harm,
        name: '手槍',
        description: '哈利，你看！這東西比魔杖還好用呢！',
        icon: ImageDataList.icon.gun,
        position: enumEquipPosition.PrimaryHand,
        potentials: {
            [enumRarity.Normal]: {
                pointRange: [10, 20],
                priceRange: [300, 500],
            },
        },
    },
    {
        type: enumEquip.Cloth,
        effect: enumEffect.Defense,
        name: '布衣',
        description: '有穿總比沒穿好。',
        icon: ImageDataList.icon.cloth,
        position: enumEquipPosition.Body,
        potentials: {
            [enumRarity.Normal]: {
                pointRange: [1, 5],
                priceRange: [30, 40],
            },
        },
    },
    {
        type: enumEquip.BulletProof,
        effect: enumEffect.Defense,
        name: '防彈衣',
        description: '應該可以保護自己吧。',
        icon: ImageDataList.icon.bulletproof,
        position: enumEquipPosition.Body,
        potentials: {
            [enumRarity.Normal]: {
                pointRange: [3, 10],
                priceRange: [60, 120],
            },
        },
    },
    {
        type: enumEquip.Armor,
        effect: enumEffect.Defense,
        name: '盔甲',
        description: '這不是原本在博物館裡的東西嗎...',
        icon: ImageDataList.icon.armor,
        position: enumEquipPosition.Body,
        potentials: {
            [enumRarity.Normal]: {
                pointRange: [10, 20],
                priceRange: [300, 500],
            },
        },
    },
];
