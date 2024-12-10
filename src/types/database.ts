export namespace db {
    export interface Record {
        id: number;
        created_at: string;
        player_name: string;
        player_data: string;
        last_words: string;
    }
}