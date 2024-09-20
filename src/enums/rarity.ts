/* eslint-disable no-unused-vars */
/** 稀有度 */
export enum enumRarity {
    Normal = 'normal',
    Rare = 'rare',
    SR = 'sr',
    SSR = 'ssr',
}

export const RarityValues = Object.values(enumRarity);

export type RarityValue = (typeof enumRarity)[keyof typeof enumRarity];