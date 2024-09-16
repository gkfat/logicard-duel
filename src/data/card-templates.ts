import { enumCard } from '@/enums/card';
import { enumEffect } from '@/enums/effect';
import { enumRarity } from '@/enums/rarity';
import { CardTemplate } from '@/types/core';

import { ImageDataList } from './images';

export const CardTemplateList: CardTemplate[] = [
    {
        type: enumCard.LogiCard1,
        effect: enumEffect.Harm,
        name: 'LogiCard 1',
        description: '一張邏輯牌，上面寫著數字 1。',
        icon: ImageDataList.icon.logoLogicard,
        potentials: {
            [enumRarity.None]: {
                pointRange: [1, 1],
                priceRange: [2, 2],
            },
        },
    },
    {
        type: enumCard.LogiCard2,
        effect: enumEffect.Harm,
        name: 'LogiCard 2',
        description: '一張邏輯牌，上面寫著數字 2。',
        icon: ImageDataList.icon.logoLogicard,
        potentials: {
            [enumRarity.None]: {
                pointRange: [2, 2],
                priceRange: [2, 2],
            },
        },
    },
    {
        type: enumCard.LogiCard3,
        effect: enumEffect.Harm,
        name: 'LogiCard 3',
        description: '一張邏輯牌，上面寫著數字 3。',
        icon: ImageDataList.icon.logoLogicard,
        potentials: {
            [enumRarity.None]: {
                pointRange: [3, 3],
                priceRange: [2, 2],
            },
        },
    },
    {
        type: enumCard.LogiCard4,
        effect: enumEffect.Harm,
        name: 'LogiCard 4',
        description: '一張邏輯牌，上面寫著數字 4。',
        icon: ImageDataList.icon.logoLogicard,
        potentials: {
            [enumRarity.None]: {
                pointRange: [4, 4],
                priceRange: [2, 2],
            },
        },
    },
    {
        type: enumCard.LogiCard5,
        effect: enumEffect.Harm,
        name: 'LogiCard 5',
        description: '一張邏輯牌，上面寫著數字 5。',
        icon: ImageDataList.icon.logoLogicard,
        potentials: {
            [enumRarity.None]: {
                pointRange: [5, 5],
                priceRange: [2, 2],
            },
        },
    },
    {
        type: enumCard.LogiCard6,
        effect: enumEffect.Harm,
        name: 'LogiCard 6',
        description: '一張邏輯牌，上面寫著數字 6。',
        icon: ImageDataList.icon.logoLogicard,
        potentials: {
            [enumRarity.None]: {
                pointRange: [6, 6],
                priceRange: [2, 2],
            },
        },
    },
    {
        type: enumCard.LogiCard7,
        effect: enumEffect.Harm,
        name: 'LogiCard 7',
        description: '一張邏輯牌，上面寫著數字 7。',
        icon: ImageDataList.icon.logoLogicard,
        potentials: {
            [enumRarity.None]: {
                pointRange: [7, 7],
                priceRange: [2, 2],
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
