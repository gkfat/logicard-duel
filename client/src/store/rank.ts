import { ref } from 'vue';

import { defineStore } from 'pinia';

import apiService from '@/api';
import { Rank } from '@/types/rank';
import { humanReadable } from '@/utils/time';

export const useRankStore = defineStore('rank', () => {
    const rankData = ref<Rank[]>([]);

    /** 獲取排行榜資料 */
    const getRankData = async () => {
        const data = await apiService.getRanks();

        rankData.value = data
            .sort((a, b) => new Date(b.end_date).getTime() - new Date(a.end_date).getTime())
            .map((_data) => {
                const {
                    id,
                    end_date,
                    player,
                    player_name,
                    last_words,
                }= _data;

                return {
                    id,
                    end_date: humanReadable(end_date),
                    player_name: player_name,
                    player: JSON.parse(player),
                    last_words: last_words,
                };
            });
    };

    /** 更新排行榜資料 */
    const updateRankData = async (req: Rank) => {
        await apiService.createRank(req);
    };

    /** 初始化 */
    const init = async () => {
        await getRankData();
        console.log('rank init');
    };

    return {
        rankData,
        updateRankData,
        init,
    };
});
