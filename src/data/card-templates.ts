import { enumCard } from '@/enums/card';
import { enumEffect } from '@/enums/effect';
import { enumRarity } from '@/enums/rarity';
import { CardTemplate } from '@/types/core';

import { ImageDataList } from './images';

export const CardTemplateList: CardTemplate[] = [
    {
        type: enumCard.LogiCardAttack,
        effect: enumEffect.Harm,
        name: 'LogiCard',
        description: '一張攻擊型邏輯牌。',
        icon: ImageDataList.icon.logoLogicard,
        potentials: {
            [enumRarity.Normal]: {
                pointRange: [1, 3],
                priceRange: [2, 8],
            },
            [enumRarity.Rare]: {
                pointRange: [3, 7],
                priceRange: [10, 15],
            },
        },
    },
    {
        type: enumCard.LogiCardDefense,
        effect: enumEffect.Defense,
        name: 'LogiCard',
        description: '一張防禦型邏輯牌。',
        icon: ImageDataList.icon.logoLogicard,
        potentials: {
            [enumRarity.Normal]: {
                pointRange: [1, 3],
                priceRange: [2, 8],
            },
            [enumRarity.Rare]: {
                pointRange: [3, 7],
                priceRange: [10, 15],
            },
        },
    },
    {
        type: enumCard.ScrewDriver,
        effect: enumEffect.Harm,
        name: '螺絲起子',
        description: '食指變形成螺絲起子了，感覺可以撬開什麼。',
        icon: ImageDataList.icon.attack,
        potentials: {
            [enumRarity.Normal]: {
                pointRange: [3, 5],
                priceRange: [20, 30],
            },
            [enumRarity.Rare]: {
                pointRange: [5, 9],
                priceRange: [30, 50],
            },
        },
    },
    {
        type: enumCard.Hammer,
        effect: enumEffect.Harm,
        name: '榔頭手',
        description: '右手變成榔頭了，這個肯定能砸穿敵人吧...',
        icon: ImageDataList.icon.attack,
        potentials: {
            [enumRarity.Normal]: {
                pointRange: [8, 13],
                priceRange: [35, 50],
            },
            [enumRarity.Rare]: {
                pointRange: [10, 15],
                priceRange: [60, 80],
            },
        },
    },
    {
        type: enumCard.ScrapMetal,
        effect: enumEffect.Defense,
        name: '破銅爛鐵',
        description: '皮膚變成破銅爛鐵的硬度，至少可以撐一下子。',
        icon: ImageDataList.icon.defense,
        potentials: {
            [enumRarity.Normal]: {
                pointRange: [7, 10],
                priceRange: [20, 30],
            },
            [enumRarity.Rare]: {
                pointRange: [9, 12],
                priceRange: [40, 55],
            },
        },
    },
    {
        type: enumCard.GkbotShell,
        effect: enumEffect.Defense,
        name: 'GKBot 的機殼',
        description: '皮膚變成 GKBot 的機殼，摸起來相當堅硬。',
        icon: ImageDataList.icon.defense,
        potentials: {
            [enumRarity.Normal]: {
                pointRange: [10, 15],
                priceRange: [35, 50],
            },
            [enumRarity.Rare]: {
                pointRange: [14, 20],
                priceRange: [70, 95],
            },
        },
    },
    // FIXME: item system
    // {
    //     type: enumCard.Battery,
    //     effect: enumEffect.Heal,
    //     name: '3 號電池',
    //     description: '有股想把它吃下去的衝動...',
    //     pointRange: [5, 10],
    //     priceRange: [50, 80],
    //     icon: ImageDataList.icon.heal,
    //     rarityRange: enumRarity.SR,
    // },
    // {
    //     type: enumCard.Oil,
    //     effect: enumEffect.Heal,
    //     name: '機油',
    //     description: '要不要喝下去看看呢...',
    //     pointRange: [10, 18],
    //     priceRange: [100, 150],
    //     icon: ImageDataList.icon.heal,
    //     rarityRange: enumRarity.SR,
    // },
];
