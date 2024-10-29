/** 取得範圍內的任一整數 */
export const getRandomInt = (params: [number, number]) => {
    const [min, max] = params;
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/** 取得 0 或 1 */
export const getZeroOrOne = () => {
    return Math.random() < 0.5 ? 0 : 1;
};

/** Sleep 效果 */
export const sleepSeconds = async(second: number): Promise<void> => {
    await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), second * 1000);
    });
};

/** 範圍轉為字串 */
export const rangeToText = (range: [number, number]) => {
    const [min, max] = range;

    return `${min} ~ ${max}`;
};
