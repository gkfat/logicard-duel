import BigNumber from 'bignumber.js';

/**
 * 將輸入值加上千分號
 * @param digits - 小數點保留至第幾位，預設為 0
 */
export const thousands = (value: number | string, digits = 0) => new BigNumber(value).toFormat(digits);
