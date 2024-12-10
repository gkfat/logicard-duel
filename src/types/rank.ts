import { Player } from './player';

export interface Rank {
    id: number;
    /**
     * 紀錄時間
     * ISO 8601 datet format
     */
    endDate: string;
    playerName: string;
    player: Player;
    lastWords: string;
}
