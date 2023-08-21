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
    Heal,
    Coin,
    Weapon,
    Armor
}

export enum enumItem {
    Coin,
    Boxer,
    Bat,
    Gun,
    Cloth,
    BulletProof,
    Armor,
}

export enum enumCard {
    LogiCard1,
    LogiCard2,
    LogiCard3,
    LogiCard4,
    LogiCard5,
    LogiCard6,
    LogiCard7,
    ScrewDriver,
    Hammer,
    ScrapMetal,
    GkbotShell,
    Oil,
    Battery,
}

export enum enumCharacter {
    Man,
    Nerd,
    Broker,
    Grandma,
    Artist,
    GkbotWorker,
    GkbotAttack,
    GkbotPerform,
    GkbotDefense,
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
