import { ref } from 'vue';

import { defineStore } from 'pinia';

import api from '@/service/api';
import {
    enumOperation,
    enumSheetName,
} from '@/types/enums';

const useRankStore = defineStore('rank', () => {
    const rankList = ref([] as string[][]);

    /** 獲取 API 資料 */
    const fetchData = async (sheetName: enumSheetName, operation: enumOperation) => {
        switch (sheetName) {
        case enumSheetName.Records:
            rankList.value = await api.getData(sheetName, operation);
            break;
        default:
            break;
        }
    };

    /** 更新 API 資料 */
    const updateData = async (sheetName: enumSheetName, operation: enumOperation, data: any) => {
        await api.updateData(sheetName, operation, data);
    };

    return {
        rankList,
        fetchData,
        updateData,
    };
});

export default useRankStore;
