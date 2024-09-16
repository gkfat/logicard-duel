/** 取得範圍內的任一整數 */
export const getRandomInt = (params: [number, number]) => {
    const [min, max] = params;
    return Math.floor(Math.random() * (max - min) + min);
};

/** 取得 0 或 1 */
export const getZeroOrOne = () => {
    return Math.random() < 0.5 ? 0 : 1;
};

/** Sleep 效果 */
export const sleep = async (ms: number): Promise<void> => {
    await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), ms);
    });
};
