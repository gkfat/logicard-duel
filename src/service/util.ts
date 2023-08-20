import moment from 'moment';
import { Item } from '@/types';
import { enumItemType } from '@/types/enums';

export default class Util {
  /** 取得範圍內的任一整數 */
  static getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  
  /** 取得 0 或 1 */
  static getZeroOrOne() {
    return Math.random() < 0.5 ? 0 : 1;
  };

  /** 製作抽獎箱，輸入權重 */
  static makeLotteryBox(weight: number): boolean[] {
    const box: boolean[] = [];
    for (let i = 0; i < 100; i ++) {
      i < weight ? box.push(true) : box.push(false);
    }
    return box;
  }

  /** 抽獎（帶入抽獎箱，回傳中獎與否） */
  static lottery(box: boolean[]): boolean {
    const randomIndex = Math.floor(Math.random() * 100);
    return box[randomIndex];
  }

  /** 計算日期差異，回傳小時 */
  static diffDay(time1: number, time2: number): number {
    const diffTime = Math.abs(time1 - time2);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    return diffHours;
  }

  /** 取得目前日期 */
  static getCurrentDate(): string {
    return moment().format('YYYY-MM-DD HH:mm');
  }

  /** Sleep 效果 */
  static async sleep(ms: number): Promise<void> {
    await new Promise<void>(async (resolve, reject) => {
      setTimeout(() => resolve(), ms);
    })
  }

  /** 排序卡牌 */
  static sortCardList(cardList: Item[]): Item[] {
    const logiCards = cardList
                        .filter(c => c.ItemType === enumItemType.LogiCard)
                        .sort((a, b) => a.Point - b.Point);
    const techCards = cardList
                        .filter(c => c.ItemType !== enumItemType.LogiCard)
                        .sort((a, b) => a.Point - b.Point);
    return [...logiCards, ...techCards];
  }

  static getItemType(itemType: enumItemType): string {
    switch (itemType) {
      case enumItemType.Attack: return '技術牌（攻擊）';
      case enumItemType.Defense: return '技術牌（防禦）';
      case enumItemType.Heal: return '技術牌（治療）';
      case enumItemType.Weapon: return '武器';
      case enumItemType.Armor: return '防具';
      default: return '';
    }
  }

}