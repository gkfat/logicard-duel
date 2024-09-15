import { enumCard } from '@/enums/card';
import { enumCharacter } from '@/enums/character';
import { enumEquip } from '@/enums/equip';
import { enumMumbleType } from '@/enums/mumble';

export interface CharacterTemplate {
    type: enumCharacter;
    avatar: string;
    name: string;
    description: string;
    backpackLimit: number;
    mumbleList: {
        [enumMumbleType.General]: string[];
        [enumMumbleType.PlaceCard]: string[];
        [enumMumbleType.OpponentPlaceCard]: string[];
        [enumMumbleType.Hurt]: string[];
        [enumMumbleType.Attack]: string[];
        [enumMumbleType.Lose]: string[];
    };
    init: {
        healthRange: [number, number];
        attackRange: [number, number];
        defenseRange: [number, number];
        cards: enumCard[];
        equips: enumEquip[];
        coin: number;
    };
    rewards: {
        coinRange: [number, number];
        equips: enumEquip[];
    };
}
