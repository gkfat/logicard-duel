/** 取得範圍內的任一整數 */
export const getRandomInt = (params: [number, number]) => {
    const [min, max] = params;
    return Math.floor(Math.random() * (max - min) + min);
};
