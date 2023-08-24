import { enumItemType, enumMumbleType, enumRarity } from './enums';

export interface MumbleList {
    [enumMumbleType.General]: string[];
    [enumMumbleType.PlaceCard]: string[];
    [enumMumbleType.EnemyPlaceCard]: string[];
    [enumMumbleType.Hurt]: string[];
    [enumMumbleType.Attack]: string[];
    [enumMumbleType.Lose]: string[];
}

export interface Item {
    ID: number;
    ItemType: enumItemType;
    Point: number;
    Name: string;
    Description: string;
    Price: number;
    Icon: string;
    /** 稀有度 */
    Rarity: enumRarity;
}

export interface Record {
    SurvivalTime: number;
    DefeatBots: number;
    TotalDamage: number;
    TotalHeal: number;
}

export interface Character {
    Type: string;
    ID: number;
    Avatar: string;
    Name: string;
    Description: string;
    Health: number;
    Attack: number;
    Defense: number;
    ItemLimit: number;
    MumbleList: MumbleList;
    Coin: number;
    // 機器人才有
    InitCardList?: Item[];
    RewardCoin?: number[]; // 獎勵金幣範圍
    RewardItemList?: Item[];
}

export interface Shop {
	CardList: Item[];
	ItemList: Item[];
}

export interface Player {
    Character: Character;
    CurrentHealth: number;
    CurrentAttack: number;
    ExtraAttack: number;
    CurrentDefense: number;
    ExtraDefense: number;
    Record: Record;
    ItemList: Item[];
    CardList: Item[];
    WeaponIndex: number | null;
    ArmorIndex: number | null;
    Coin: number;
    CreatedTime: number;
}

export default Character;
