import moment from 'moment';

import { Item } from '@/types';
import {
    enumItemType,
    enumRarity,
} from '@/types/enums';

export default class Util {


    /** 取得 0 或 1 */
    static getZeroOrOne() {
        return Math.random() < 0.5 ? 0 : 1;
    }

    /** 製作抽獎箱，輸入權重 */
    static makeLotteryBox(weight: number): boolean[] {
        const box: boolean[] = [];
        for (let i = 0; i < 100; i += 1) {
            if (i < weight) {
                box.push(true);
            } else {
                box.push(false);
            }
        }
        return box;
    }

    /** 抽獎（帶入抽獎箱，回傳中獎與否） */
    static lottery(box: boolean[]): boolean {
        const randomIndex = Math.floor(Math.random() * 100);
        return box[randomIndex];
    }

    /** 製作抽獎池，回傳獎品 ID pool */
    static makePool(allItems: Item[]): number[] {
        const items = allItems.filter((item) => item.Rarity !== enumRarity.None);
        const pool: number[] = [];
        items.forEach((item) => {
            const sameRarityItems = items.filter((_item) => _item.Rarity === item.Rarity);
            const odd = Math.floor(item.Rarity / sameRarityItems.length);
            for (let i = 0; i < odd; i += 1) {
                pool.push(item.ID);
            }
        });
        return pool;
    }

    /** 計算日期差異，回傳小時 */
    static diffDay(time1: number, time2: number): number {
        const diffTime = Math.abs(time1 - time2);
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        return diffHours;
    }

    /** 取得目前日期 */
    static getCurrentDate(): string {
        return moment().locale('zh').format('YYYY-MM-DD HH:mm');
    }

    /** Sleep 效果 */
    static async sleep(ms: number): Promise<void> {
        await new Promise<void>((resolve) => {
            setTimeout(() => resolve(), ms);
        });
    }

    /** 排序物品 */
    static sortItemList(itemList: Item[]): Item[] {
        if (itemList.length > 0) {
            return itemList.sort(
                (a, b) => (a.Point - b.Point) || (b.Rarity - a.Rarity) || (a.ID - b.ID),
            );
        }
        return [];
    }

    /** 排序卡牌 */
    static sortCardList(cardList: Item[]): Item[] {
        if (cardList.length > 0) {
            const logiCards = cardList.filter((card) => card.ItemType === enumItemType.LogiCard);
            const techCards = cardList.filter((card) => card.ItemType !== enumItemType.LogiCard);
            return [...this.sortItemList(logiCards), ...this.sortItemList(techCards)];
        }
        return [];
    }

    static getRarityType(rarity: enumRarity): string {
        const i = Object.values(enumRarity).indexOf(rarity);
        return Object.keys(enumRarity)[i];
    }
}
