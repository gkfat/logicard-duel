import { ref } from 'vue';

import { defineStore } from 'pinia';

import apiService from '@/api';
import { Rank } from '@/types/rank';

export const useRankStore = defineStore('rank', () => {
    const rankData = ref<Rank[]>([]);

    /** 獲取排行榜資料 */
    const getRankData = async () => {
        const data = await apiService.getData();

        console.log({ data });
    };

    /** 更新排行榜資料 */
    const updateRankData = async (data: Rank) => {
        await apiService.updateData(data);
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
