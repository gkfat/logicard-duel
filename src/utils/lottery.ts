import { getRandomInt } from './common';

/**
 * 抽籤, 回傳中或不中
 */
export const drawLots = () => {
    /** 50% 機率 */
    const isPositive = getRandomInt([1, 2]) === 2;

    return isPositive;
};

/** 製作抽獎箱，輸入權重 */
export const makeLotteryBox = (weight: number): boolean[] => {
    const box: boolean[] = [];
    for (let i = 0; i < 100; i += 1) {
        if (i < weight) {
            box.push(true);
        } else {
            box.push(false);
        }
    }
    return box;
};

/** 抽獎（帶入抽獎箱，回傳中獎與否） */
export const lottery = (box: boolean[]): boolean => {
    const randomIndex = Math.floor(Math.random() * 100);
    return box[randomIndex];
};

/** 製作抽獎池，回傳獎品 ID pool */
export const makePool = (allItems: Item[]): number[] => {
    const items = allItems.filter((item) => item.Rarity !== enumRarity.None);
    const pool: number[] = [];
    items.forEach((item) => {
        const sameRarityItems = items.filter(
            (_item) => _item.Rarity === item.Rarity
        );
        const odd = Math.floor(item.Rarity / sameRarityItems.length);
        for (let i = 0; i < odd; i += 1) {
            pool.push(item.ID);
        }
    });
    return pool;
};
