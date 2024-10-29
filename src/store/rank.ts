import { ref } from 'vue';

import { defineStore } from 'pinia';

import apiService from '@/api';
import { Rank } from '@/types/rank';
import { humanReadable } from '@/utils/time';

export const useRankStore = defineStore('rank', () => {
    const rankData = ref<Rank[]>([]);

    /** 獲取排行榜資料 */
    const getRankData = async() => {
        const { data } = await apiService.getData();

        // 移除標題列
        data.splice(0, 1);

        rankData.value = data.map((_data) => {
            const [
                endDate,
                playerName,
                player,
                lastWords,
            ] = _data;

            return {
                endDate: humanReadable(JSON.parse(endDate)),
                playerName: JSON.parse(playerName),
                player: JSON.parse(player),
                lastWords: JSON.parse(lastWords),
            };
        });
    };

    /** 更新排行榜資料 */
    const updateRankData = async(req: Rank) => {
        try {
            const { data } = await apiService.updateData(req);
        } catch (e) {
            console.error(e);
        }
    };

    /** 初始化 */
    const init = async() => {
        await getRankData();
        console.log('rank init');
    };

    return {
        rankData,
        updateRankData,
        init,
    };
});
