import axios, { AxiosError } from 'axios';

import { Rank } from '@/types/rank';

const baseUrl =
    import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_API_URL
        : '/api';

const errorHandler = async(error: AxiosError) => {
    if (error.isAxiosError) {
        console.error('axios error: \n', error);
    }

    return Promise.reject(error);
};

axios.interceptors.response.use((response) => response, errorHandler);

/** 取得 sheet 資料 */
const getData = async(): Promise<{ data: string[][] }> => {
    return await axios({
        baseURL: baseUrl,
        method: 'get',
        timeout: 60000,
    });
};

/** 更新 sheet 資料 */
const updateData = async(data: Rank): Promise<{ data: string[][] }> => {
    const mutatedData: { [key: string]: string } = {};

    Object.keys(data).forEach((key) => {
        mutatedData[key] = JSON.stringify(data[key]);
    });

    return await axios({
        baseURL: baseUrl,
        method: 'post',
        timeout: 60000,
        data: mutatedData,
    });
};

export default {
    getData,
    updateData,
};
