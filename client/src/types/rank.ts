import { Player } from './player';

export interface Rank {
    id?: number;
    /**
     * 紀錄時間
     * ISO 8601 datet format
     */
    end_date: string;
    player_name: string;
    player: Player;
    last_words: string;
}
