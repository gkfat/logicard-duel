import { enumCard } from '@/enums/card';
import { enumEffect } from '@/enums/effect';
import { enumRarity } from '@/enums/rarity';

export interface CardTemplate {
    type: enumCard;
    pointRange: [number, number];
    effect: enumEffect;
    name: string;
    description: string;
    price: number;
    icon: string;
    rarity: enumRarity;
}

export interface Card {
    id: number;
    createdAt: Date;
    template: CardTemplate;
    info: {
        type: enumCard;
        point: number;
        price: number;
    };
}
