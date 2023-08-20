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

export enum enumItemType {
    LogiCard,
    Attack,
    Defense,
    Health,
    Coin,
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
