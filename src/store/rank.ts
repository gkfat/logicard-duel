import { ref } from 'vue';

import { defineStore } from 'pinia';

import apiService from '@/api';
import { Rank } from '@/types/rank';
import { humanReadable } from '@/utils/time';

export const useRankStore = defineStore('rank', () => {
    const rankData = ref<Rank[]>([]);

    /** 獲取排行榜資料 */
    const getRankData = async () => {
        const data = await apiService.getData();

        rankData.value = data.map((_data) => {
            const {
                id,
                created_at,
                player_data,
                player_name,
                last_words,
            }= _data;

            return {
                id,
                endDate: humanReadable(created_at),
                playerName: player_name,
                player: JSON.parse(player_data),
                lastWords: last_words,
            };
        });
    };

    /** 更新排行榜資料 */
    const updateRankData = async (req: Rank) => {
        await apiService.updateData(req);
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
