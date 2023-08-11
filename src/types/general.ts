export enum enumDialog {
    Opening,
    GameStart,
    BattleStart,
    BattleEnd,
    Rest,
    Rank,
    Shop,
    Backpack,
    GameEnd
}

export enum enumGameState {
    Init,
    ChooseCharacter,
    Rest,
    BattleStart,
    Battle,
    BattleEnd,
    GameEnd
}

export enum enumBattleResult {
    Init,
    Draw,
    PlayerWin,
    PlayerLose
}

export enum enumRoundState {
    Start,
    Counting,
    Duel,
    Settle,
    SettleEnd
}

export enum enumMumbleType {
    General,
    PlaceCard,
    EnemyPlaceCard,
    Hurt,
    Attack,
    Lose
}

export interface MumbleList {
    [enumMumbleType.General]: string[];
    [enumMumbleType.PlaceCard]: string[];
    [enumMumbleType.EnemyPlaceCard]: string[];
    [enumMumbleType.Hurt]: string[];
    [enumMumbleType.Attack]: string[];
    [enumMumbleType.Lose]: string[];
  }

export interface Character {
    Type: string;
    ID: number;
    Avatar: string;
    Name: string;
    Health: number;
    Attack: number;
    Defense: number;
    ItemLimit: number;
    InitCardList: Item[];
    MumbleList: MumbleList;
    Coin: number;
    RewardCoin?: number[]; // 獎勵金幣範圍，機器人才有
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
    Weapon: Item | null;
    Armor: Item | null;
    Coin: number;
    CreatedTime: number;
}

export interface Item {
    ID: number;
    ItemType: enumItemType;
    Point: number;
    Name: string;
    Description: string;
    Price: number;
}

export interface Record {
    SurvivalTime: number;
    DefeatBots: number;
    TotalDamage: number;
    TotalHeal: number;
}

export enum enumItemType {
    LogiCard,
    Attack,
    Defense,
    Health,
    Weapon,
    Armor
}


/**
 * Google Sheet
 */
export enum enumOperation {
    Get = 'get',
    Update = 'update'
}

export enum enumSheetName {
    Records = 'records'
}