import { Card } from './card';
import { CharacterTemplate } from './character';
import { Equip } from './equip';

export interface Player {
    id: number;
    createdAt: Date;
    character: CharacterTemplate;
    status: {
        health: number;
        attack: number;
        defense: number;
    };
    equipment: {
        primaryHand: Equip | null;
        secondaryHand: Equip | null;
        body: Equip | null;
        head: Equip | null;
        pants: Equip | null;
        boots: Equip | null;
    };
    backpack: {
        equips: Equip[];
        cards: Card[];
        coin: number;
    };
}
