import { enumBattleResult } from '../enums/game';

export namespace Game {

    export interface Record {
        SurvivalTime: number;
        DefeatBots: number;
        TotalDamage: number;
        TotalHeal: number;
    }

    export interface RoundRecord {
        /** -1: 未開始 0: 比小 1: 比大 */
        rule: number;
        enemyCards: [Item | null, Item | null];
        playerCards: [Item | null, Item | null];
        result: enumBattleResult;
        usedCardList: Item[];
    }
}
