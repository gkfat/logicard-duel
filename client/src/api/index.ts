import axios, { type AxiosError } from 'axios';

import { Rank } from '@/types/rank';

const errorHandler = async (error: AxiosError) => {
    if (error.isAxiosError) {
        console.error('axios error: \n', error);
    }

    return Promise.reject(error);
};

axios.interceptors.response.use((response) => response, errorHandler);

const baseURL = 'https://logicard-duel-server.gkgkdesign.workers.dev';

const getRanks = async () => {
    try {
        const { data } = await axios({
            baseURL,
            method: 'GET',
            url: '/ranks',
        });

        return data as Rank[];
    } catch (err) {
        console.error(err);
    }

    return [];
};

const createRank = async (data: Rank) => {
    try {
        const res = await axios({
            baseURL,
            method: 'POST',
            url: '/ranks/create',
            data,
        });

        return res;
    } catch (err) {
        console.error(err);
    }
};

export default {
    getRanks,
    createRank,
};
