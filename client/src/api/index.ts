import axios, { type AxiosError } from 'axios';

import { db } from '@/types/database';
import { Rank } from '@/types/rank';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const errorHandler = async (error: AxiosError) => {
    if (error.isAxiosError) {
        console.error('axios error: \n', error);
    }

    return Promise.reject(error);
};

axios.interceptors.response.use((response) => response, errorHandler);

/** 取得 sheet 資料 */
const getData = async () => {
    const client = createClient<db.Record>(SUPABASE_URL, SUPABASE_KEY);

    try {
        const { data } = await client.from('records').select('*');

        return data as db.Record[];
    } catch (err) {
        console.error(err);
    }

    return [];
};

/** 更新 sheet 資料 */
const updateData = async (data: Rank) => {
    const client = createClient<db.Record>(SUPABASE_URL, SUPABASE_KEY);

    try {
        const res = await client.from('records').insert({
            player_name: data.playerName,
            player_data: JSON.stringify(data.player),
            last_words: data.lastWords,
        });

        return res;
    } catch (err) {
        console.error(err);
    }
};

export default {
    getData,
    updateData,
};
