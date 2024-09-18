/* eslint-disable no-unused-vars */
export enum enumGameState {
    Init,
    ChooseCharacter,
    Rest,
    BattleStart,
    Battle,
    BattleEnd,
    GameEnd,
}

export enum enumRoundState {
    Start,
    Counting,
    Duel,
    Settle,
}

export enum enumBattleResult {
    Init,
    Draw,
    PlayerWin,
    PlayerLose,
}
