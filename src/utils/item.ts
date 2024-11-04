import BigNumber from 'bignumber.js';

import {
    Card,
    Equip,
} from '@/types/core';

/** 取得售價 (6 折) */
export const getSalePrice = (item: Card | Equip) => {
    const { price } = item.info;

    return Number(BigNumber(price).times(0.6).toFixed(0));
};
