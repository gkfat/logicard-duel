import axios from 'axios';

import { Rank } from '@/types/rank';

const sheetId =
    'AKfycbzIxhaykKSHsUxzgTFfsurMuv6o2oAtAqNkBqMnCkwbbWk6KXfKjvV8ZBCRAqjVv3j6cQ';

const googleAppScriptUrl = `https://script.google.com/macros/s/${sheetId}/exec`;
const sheetName = 'records_2024';
const baseUrl = `${googleAppScriptUrl}?Sheet=${sheetName}`;

/** 取得 sheet 資料 */
const getData = async (): Promise<string[][]> => {
    const url = [baseUrl, 'Operation=get'].join('&');

    return axios.get(url).then((res) => res.data);
};

/** 更新 sheet 資料 */
const updateData = async (data: Rank): Promise<any> => {
    const url = [
        baseUrl,
        'Operation=update',
        `playerName=${data.playerName}`,
        `player=${JSON.stringify(data.player)}`,
        `lastWords=${data.lastWords}`,
    ].join('&');

    return axios.get(url).then((res) => res);
};

export default {
    getData,
    updateData,
};
