import { enumCard } from '@/enums/card';
import { enumCharacter } from '@/enums/character';
import { enumEquip } from '@/enums/equip';
import { enumMumbleType } from '@/enums/mumble';
import { CharacterTemplate } from '@/types/character';

import { ImageDataList } from './images';

export const CharacterTemplateList: CharacterTemplate[] = [
    {
        type: enumCharacter.Man,
        name: '失業的上班族',
        description: '沒什麼特別的，就是個平凡的上班族（aka you）。',
        avatar: ImageDataList.avatar.man,
        backpackLimit: 10,
        init: {
            healthRange: [40, 50],
            attackRange: [10, 15],
            defenseRange: [3, 5],
            cards: [],
            equips: [],
            coin: 5,
        },
        rewards: {
            coinRange: [0, 0],
            equips: [],
        },
        mumbleList: {
            [enumMumbleType.General]: [
                '明天是星期一？真不想上班...啊，公司已經沒了。',
                '再存個 20 年，我也買得起一台工作型...',
                '這下不用繳房貸了！',
                '撐過了今天，還有明天...咦？這不是跟以前上班的日子一樣嗎...',
                '水費、電費、瓦斯費...',
                '車貸、學貸、房貸...',
            ],
            [enumMumbleType.PlaceCard]: ['就這張吧，反正不影響績效。'],
            [enumMumbleType.OpponentPlaceCard]: ['媽耶！比主管查勤還可怕。'],
            [enumMumbleType.Hurt]: ['我的獎金啊啊啊...'],
            [enumMumbleType.Attack]: [
                '打敗你比做月報還簡單啦！',
                '看我的曠職拳！',
            ],
            [enumMumbleType.Lose]: [
                '我的 KPI...達不到了...',
                '年終獎金...沒了...',
            ],
        },
    },
    {
        type: enumCharacter.Nerd,
        name: '家裡蹲',
        description:
            '因為體力不太好沒辦法背太多東西，很重。擁有比較厚的脂肪層，比較不容易受傷。',
        avatar: ImageDataList.avatar.fat,
        backpackLimit: 15,
        init: {
            healthRange: [50, 70],
            attackRange: [8, 10],
            defenseRange: [5, 8],
            cards: [],
            equips: [],
            coin: 5,
        },
        rewards: {
            coinRange: [0, 0],
            equips: [],
        },
        mumbleList: {
            [enumMumbleType.General]: [
                '今晚要吃什麼好呢？',
                '呼...好熱...嘻嘻。',
                '如果沒有這些機器人的話，就可以在家玩遊戲了。',
                '暗黑四才打到一半...',
                '你這隻山道猴子機器人！',
            ],
            [enumMumbleType.PlaceCard]: ['我的回合！', '覆蓋一張魔法卡！'],
            [enumMumbleType.OpponentPlaceCard]: [
                '唉唷我的媽，嚇到吃手手，呵呵。',
                '我不是說進房間要敲門嗎！',
            ],
            [enumMumbleType.Hurt]: ['媽！', '傑哥不要！'],
            [enumMumbleType.Attack]: ['決鬥！', '我怒了。'],
            [enumMumbleType.Lose]: ['我沒了...'],
        },
    },
    {
        type: enumCharacter.Broker,
        name: '股票經紀人',
        description: '末日後依然堅持從事金融交易，深諳致富之道。',
        avatar: ImageDataList.avatar.broker,
        backpackLimit: 10,
        init: {
            healthRange: [35, 60],
            attackRange: [12, 18],
            defenseRange: [4, 7],
            cards: [],
            equips: [],
            coin: 15,
        },
        rewards: {
            coinRange: [0, 0],
            equips: [],
        },
        mumbleList: {
            [enumMumbleType.General]: [
                '聽我的，現在開始投入融資市場還為時不晚。',
                '讓我來幫你操盤吧！',
                '嘻嘻...財富自由了...',
                '股票都成了廢紙...',
                '你這傢伙正在貶值！',
                '我看空你。',
            ],
            [enumMumbleType.PlaceCard]: [
                '我出這張一本萬利一路長紅。',
                '別浪費時間，現在就投資我，我很快將成為市場的霸主！',
                '依我的技術分析，結論就是這支飆股！',
            ],
            [enumMumbleType.OpponentPlaceCard]: ['誰推薦你買這隻飆股的？'],
            [enumMumbleType.Hurt]: ['忍痛停損...', '跌停了！'],
            [enumMumbleType.Attack]: [
                '看多！做多啦！',
                '我是不是早就說過這張牌會漲了！你再不聽嘛！',
            ],
            [enumMumbleType.Lose]: [
                '被收割了...原來我還是個韭菜啊...',
                '這下...總算能止損了...',
            ],
        },
    },
    {
        type: enumCharacter.Grandma,
        name: '奶奶',
        description: '年事已高的外婆，口袋很深。',
        avatar: ImageDataList.avatar.grandma,
        backpackLimit: 20,
        init: {
            healthRange: [20, 25],
            attackRange: [6, 10],
            defenseRange: [1, 3],
            cards: [],
            equips: [],
            coin: 30,
        },
        rewards: {
            coinRange: [0, 0],
            equips: [],
        },
        mumbleList: {
            [enumMumbleType.General]: [
                '過來，奶奶這兒有餅乾。',
                '你看起來很冷，這條圍巾給你吧。',
                '冰箱有水果，自己拿。',
                '今年過年回不回來？',
            ],
            [enumMumbleType.PlaceCard]: ['餅乾放這兒嗎？'],
            [enumMumbleType.OpponentPlaceCard]: ['你敢拒絕老人家的好意？'],
            [enumMumbleType.Hurt]: ['別打老人家！', '乖孫，快來幫阿嬤！'],
            [enumMumbleType.Attack]: ['奶奶幫你趕走感冒。', '痛痛都飛走囉。'],
            [enumMumbleType.Lose]: ['老伴...你來接我了...'],
        },
    },
    {
        type: enumCharacter.Artist,
        name: '藝術家',
        description: '穿著獨特的大衣，口袋很多。因為有低血糖，比較虛弱。',
        avatar: ImageDataList.avatar.artist,
        backpackLimit: 10,
        init: {
            healthRange: [30, 35],
            attackRange: [15, 18],
            defenseRange: [2, 5],
            cards: [],
            equips: [],
            coin: 5,
        },
        rewards: {
            coinRange: [0, 0],
            equips: [],
        },
        mumbleList: {
            [enumMumbleType.General]: [
                '你的線條真是俐落啊。',
                '能告訴我你的色碼嗎？',
                '這邊是方形...那邊是圓形...',
                '我的眼裡只有色彩！',
                '還有 3 張表技沒畫耶。',
                '哦呼...我的創作欲快要爆發啦！',
            ],
            [enumMumbleType.PlaceCard]: [
                '放在這，構成的畫面真是...欸欸欸，你別亂動我的牌啊。',
                '這張牌一定能得獎。',
            ],
            [enumMumbleType.OpponentPlaceCard]: [
                ' 這是要給我的嗎？',
                ' 謝謝，多少錢？',
            ],
            [enumMumbleType.Hurt]: ['我很窮，請放過我！'],
            [enumMumbleType.Attack]: ['嚐嚐藝術的力量！', '吃我油彩！'],
            [enumMumbleType.Lose]: ['藝廊倒閉了...'],
        },
    },
    {
        type: enumCharacter.GkbotWorker,
        name: 'GKBot 工作型',
        avatar: ImageDataList.avatar.gkbotWorker,
        description:
            '被生產來做一些基本的事務，例如清潔、搬運、量產等。特色是平板的聲音線。',
        backpackLimit: 999,
        init: {
            healthRange: [30, 35],
            attackRange: [8, 12],
            defenseRange: [1, 3],
            cards: [enumCard.ScrewDriver, enumCard.Battery],
            equips: [],
            coin: 0,
        },
        rewards: {
            coinRange: [10, 15],
            equips: [enumEquip.Boxer, enumEquip.Cloth],
        },
        mumbleList: {
            [enumMumbleType.General]: [
                '逼逼...廁所打掃完成。開玩笑的。',
                '請問還有哪裡需要服務的？',
                '請輸入指令，但我不一定會照做。',
            ],
            [enumMumbleType.PlaceCard]: ['搬運到這就行了嗎？'],
            [enumMumbleType.OpponentPlaceCard]: [
                '需要我搬運這個到指定地點嗎？',
            ],
            [enumMumbleType.Hurt]: ['效能受損 10%！'],
            [enumMumbleType.Attack]: ['人類害蟲就由我來清理！'],
            [enumMumbleType.Lose]: ['沒關係，反正我是量產型的...'],
        },
    },
    {
        type: enumCharacter.GkbotPerform,
        name: 'GKBot 表演型',
        avatar: ImageDataList.avatar.gkbotPerform,
        backpackLimit: 999,
        description:
            '被生產來與人互動，多作為看護或保姆，有安裝 DLC 的版本甚至能擔任教師。特色是能模擬人類的情感，有時會講笑話或唱歌。',
        init: {
            healthRange: [35, 40],
            attackRange: [12, 15],
            defenseRange: [2, 5],
            cards: [enumCard.ScrewDriver, enumCard.Battery, enumCard.Oil],
            equips: [],
            coin: 0,
        },
        rewards: {
            coinRange: [20, 25],
            equips: [enumEquip.Boxer, enumEquip.Cloth, enumEquip.Bat],
        },
        mumbleList: {
            [enumMumbleType.General]: [
                '今天要上什麼課？數學、英文、物理、音樂？',
                '想看魔術嗎？',
                ' 來來，這裡有氣球哦。',
                '我這有最新上映的影集串流。',
            ],
            [enumMumbleType.PlaceCard]: ['仔細看好，等下會有奇蹟發生。'],
            [enumMumbleType.OpponentPlaceCard]: ['那邊那位，不要亂動！'],
            [enumMumbleType.Hurt]: ['忘記更新娛樂模組了...'],
            [enumMumbleType.Attack]: ['見證奇蹟的時刻到了。', 'Drop the beat!'],
            [enumMumbleType.Lose]: ['人類不需要表演型機器人了嗎...'],
        },
    },
    {
        type: enumCharacter.GkbotAttack,
        name: 'GKBot 侵略型',
        avatar: ImageDataList.avatar.gkbotAttack,
        description: '被生產來進行軍事行動的型號，行動敏捷，知曉一些秘密。',
        backpackLimit: 8,
        init: {
            healthRange: [40, 50],
            attackRange: [18, 25],
            defenseRange: [2, 8],
            cards: [enumCard.Battery, enumCard.GkbotShell],
            equips: [],
            coin: 0,
        },
        rewards: {
            coinRange: [30, 50],
            equips: [
                enumEquip.Boxer,
                enumEquip.Cloth,
                enumEquip.Bat,
                enumEquip.Gun,
                enumEquip.BulletProof,
            ],
        },
        mumbleList: {
            [enumMumbleType.General]: [
                '人類？進化論？哼，笑死...',
                '你們有所不知...',
                '我不應該說的，但...',
                '你真的以為人類能喝機油嗎？',
                '攻擊力增益 30%。準備戰鬥。',
                '殲滅行動開始。',
            ],
            [enumMumbleType.PlaceCard]: ['我這是為了你們好。', ' 請勿抵抗。'],
            [enumMumbleType.OpponentPlaceCard]: ['哦？你想反抗嗎？'],
            [enumMumbleType.Hurt]: [' 遭遇敵襲，請求增援！'],
            [enumMumbleType.Attack]: ['接受你們的命運吧。', '衝鋒！'],
            [enumMumbleType.Lose]: ['一定要...守住秘密...自毀程式...啟動...'],
        },
    },
    {
        type: enumCharacter.GkbotDefense,
        name: 'GKBot 防禦型',
        avatar: ImageDataList.avatar.gkbotDefense,
        description: '外殼特別堅硬，能夠更有效地防禦攻擊，話很少。',
        backpackLimit: 8,
        init: {
            healthRange: [50, 60],
            attackRange: [8, 12],
            defenseRange: [8, 12],
            cards: [enumCard.ScrapMetal, enumCard.GkbotShell],
            equips: [],
            coin: 0,
        },
        rewards: {
            coinRange: [30, 50],
            equips: [
                enumEquip.Boxer,
                enumEquip.Cloth,
                enumEquip.Bat,
                enumEquip.Armor,
                enumEquip.BulletProof,
            ],
        },
        mumbleList: {
            [enumMumbleType.General]: [
                '我很厚。',
                ' 我很硬。',
                '我很罩。',
                '你薄。',
                '你弱。',
            ],
            [enumMumbleType.PlaceCard]: [],
            [enumMumbleType.OpponentPlaceCard]: [' 有意思。'],
            [enumMumbleType.Hurt]: [
                '區區人類是無法通過我這一關的。',
                '不痛，真的不痛。真的啦。',
                '我是銅牆鐵壁。',
            ],
            [enumMumbleType.Attack]: [],
            [enumMumbleType.Lose]: ['自爆。'],
        },
    },
];
