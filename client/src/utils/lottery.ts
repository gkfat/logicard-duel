import { getRandomInt } from './common';

/**
 * 抽籤, 回傳中或不中
 */
export const drawLots = () => {
    /** 50% 機率 */
    const isPositive = getRandomInt([1, 10]) > 5;

    return isPositive;
};

