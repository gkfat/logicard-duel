/* eslint-disable no-unused-vars */
export enum enumGameState {
    Init,
    ChooseCharacter,
    Rest,
    ChooseOpponent,
    // BattleStart,
    Battle,
    BattleEnd,
    GameOver,
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
