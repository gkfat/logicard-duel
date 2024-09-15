import { ref } from 'vue';

import { defineStore } from 'pinia';

import api from '@/service/api';

/**
 * Google Sheet
 */
export enum enumOperation {
    Get = 'get',
    Update = 'update'
}

export enum enumSheetName {
    Records = 'records'
}

export const useRankStore = defineStore('rank', () => {
    const rankList = ref<{
        time: string | number;
        character: string | number;
        attack: string | number;
        heal: string | number;
        kill: string | number;
        live_time: string | number;
        comment: string | number;
    }[]>([]);

    /** 獲取 API 資料 */
    const fetchData = async (sheetName: enumSheetName, operation: enumOperation) => {
        const data = await api.getData(sheetName, operation);

        rankList.value = data
            .slice(1)
            .reverse()
            .map((d) => ({
                time: d[0],
                character: d[1],
                attack: d[2],
                heal: d[3],
                kill: d[4],
                live_time: d[5],
                comment: d[6],
            }));
    };

    /** 更新 API 資料 */
    const updateData = async (sheetName: enumSheetName, operation: enumOperation, data: any) => {
        await api.updateData(sheetName, operation, data);
    };

    /** 初始化 */
    const init = () => {

    }

    return {
        rankList,
        fetchData,
        updateData,
        init
    };
});
