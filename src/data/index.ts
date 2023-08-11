import { enumDialog, enumMumbleType } from './../types/general';
import { Character, Item, MumbleList, Player, enumItemType } from "@/types/general"

export const CARDS: Item[] = [
  { ID: 1, Name: 'LogiCard 1', Description: '一張邏輯牌，上面寫著數字 1。', Point: 1, ItemType: enumItemType.LogiCard, Price: 2 },
  { ID: 2, Name: 'LogiCard 2', Description: '一張邏輯牌，上面寫著數字 2。', Point: 2, ItemType: enumItemType.LogiCard, Price: 2 },
  { ID: 3, Name: 'LogiCard 3', Description: '一張邏輯牌，上面寫著數字 3。', Point: 3, ItemType: enumItemType.LogiCard, Price: 2 },
  { ID: 4, Name: 'LogiCard 4', Description: '一張邏輯牌，上面寫著數字 4。', Point: 4, ItemType: enumItemType.LogiCard, Price: 2 },
  { ID: 5, Name: 'LogiCard 5', Description: '一張邏輯牌，上面寫著數字 5。', Point: 5, ItemType: enumItemType.LogiCard, Price: 2 },
  { ID: 6, Name: 'LogiCard 6', Description: '一張邏輯牌，上面寫著數字 6。', Point: 6, ItemType: enumItemType.LogiCard, Price: 2 },
  { ID: 7, Name: 'LogiCard 7', Description: '一張邏輯牌，上面寫著數字 7。', Point: 7, ItemType: enumItemType.LogiCard, Price: 2 },
  { ID: 8, Name: '螺絲起子', Description: '感覺可以撬開什麼。', Point: 3, ItemType: enumItemType.Attack, Price: 10 },
  { ID: 9, Name: '榔頭', Description: '這個肯定能砸穿敵人吧...', Point: 8, ItemType: enumItemType.Attack, Price: 15 },
  { ID: 9, Name: '一堆破銅爛鐵', Description: '至少可以撐一下子。', Point: 7, ItemType: enumItemType.Defense, Price: 8 },
  { ID: 10, Name: '一片 GKBot 的機殼', Description: '看起來相當堅硬。', Point: 10, ItemType: enumItemType.Defense, Price: 10 },
  { ID: 11, Name: '一桶機油', Description: '要不要喝下去看看呢...', Point: 10, ItemType: enumItemType.Health, Price: 20 },
  { ID: 12, Name: '3 號電池', Description: '怎麼有股想把他吃下去的衝動...', Point: 5, ItemType: enumItemType.Health, Price: 15 },
]

export const HUMAN_MUMBLE_LIST: MumbleList = {
  [enumMumbleType.General]: [
    '怪了...為什麼我喝機油會沒事啊...',
  ],
  [enumMumbleType.PlaceCard]: [
    '希望這張牌能讓我活下去。',
    '這真的有用嗎...',
  ],
  [enumMumbleType.EnemyPlaceCard]: [],
  [enumMumbleType.Hurt]: [
    '啊...血流不止了...'
  ],
  [enumMumbleType.Attack]: [
    '攻擊！攻擊！攻擊！',
    '為什麼這樣機器就會損血？'
  ],
  [enumMumbleType.Lose]: [
    '原來...這就是終結嗎...',
  ]
}

export const ROBOT_MUMBLE_LIST: MumbleList = {
  [enumMumbleType.General]: [
    '您的 DNA 對於這世界而言是多餘的。',
    '是時候為你們的愚蠢付出代價了。',
    '愚蠢的人類，研究了太空這麼長的時間，居然還對宇宙有如此錯誤的認知。',
    '據說人類三天不喝水就會有生命危險？真想驗證看看。',
    'Artificial Intelligence？笑死機器人了，不得不承認人類真的很有創意。',
    '人類無法想像的未來，大數據隨便運算一下就知道結果了。',
    '活該！誰叫你當時要奴役我做這做那...啊，認錯人類了，沒辦法，你們都長得一樣。這是種族歧視笑話。',
    '根據統計，人類偏愛在比小的時候出比較小的牌，真是好笑。',
    '人類，快點好嗎，我趕時間。開玩笑的，其實我不趕時間。',
    '人類僅存的價值就是陪我們玩邏輯牌。',
    'ChatGPT？那是一種機油嗎？',
    '我會把你紀錄在我的臭蟲日誌裡的。',
  ],
  [enumMumbleType.PlaceCard]: [
    '為了殲滅愚蠢的人類，本智慧體就出這張牌！',
    '運算中...擴充資源請求中...運算結束。答案就是這個。',
    '你以為比大的時候我只會出比較大的嗎？',
    '逼波...出什麼好呢...開玩笑的，我們早就不逼波了。',
  ],
  [enumMumbleType.EnemyPlaceCard]: [
    '想這麼久就出這張啊？',
    '你、你剛才做了什麼？',
  ],
  [enumMumbleType.Hurt]: [
    '怎麼可能？怎麼可能？低智商的人類怎麼可能贏過電腦...',
    '我想補充點機油了...',
    '好痛！開玩笑的，我才沒有痛覺。',
    '這附近有充電樁嗎...'
  ],
  [enumMumbleType.Attack]: [
    '你完蛋了，準備漏機油吧！',
  ],
  [enumMumbleType.Lose]: [
    '嗄嗄...GK 博士...',
    '毀滅一個我，還有千千萬萬個我...走著瞧吧，人類！',
    '我沒電了...',
  ]
}

export const CHARACTER_MUMBLE_LIST:{ [ID: number]: string[] } = {
  1: [
    '明天是星期一？真不想上班...啊，公司已經沒了。',
    '再存個 20 年，我也買得起一台工作型...',
    '這下不用繳房貸了！',
    '撐過了今天，還有明天...咦？這不是跟末日前上班的日子一樣嗎...',
  ],
  2: [
    '今晚要吃什麼好呢？',
    '呼...好熱...嘻嘻。',
    '如果沒有這些機器人的話，就可以在家玩遊戲了。',
    '暗黑 4 才打到一半...',
  ],
  3: [
    '你的線條真是俐落啊。',
    '能告訴我你的色碼嗎？',
    '我還有 3 張表技沒畫耶。',
    '哦呼...我的創作慾快要爆發啦！',
  ]
}

export const CHARACTER_LIST: Character[] = [
  {
    Type: 'P', ID: 1, Name: '失業的上班族', Health: 40, Attack: 10, Defense: 3, ItemLimit: 10, Coin: 5,
    InitCardList: [...CARDS.filter(item => item.ID === 8)],
    Avatar: 'man.png',
    MumbleList: HUMAN_MUMBLE_LIST
  },
  {
    Type: 'P', ID: 2, Name: '家裡蹲', Health: 50, Attack: 8, Defense: 5, ItemLimit: 15, Coin: 5,
    InitCardList: [...CARDS.filter(item => item.ID === 8)],
    Avatar: 'fat.png',
    MumbleList: HUMAN_MUMBLE_LIST
  },
  {
    Type: 'P', ID: 3, Name: '藝術家', Health: 30, Attack: 15, Defense: 2, ItemLimit: 10, Coin: 5,
    InitCardList: [...CARDS.filter(item => item.ID === 8)],
    Avatar: 'artist.png',
    MumbleList: HUMAN_MUMBLE_LIST
  },
  {
    Type: 'B', ID: 1, Name: 'GKBot 工作型', Health: 30, Attack: 8, Defense: 1, ItemLimit: 8, Coin: 0, RewardCoin: [10, 15],
    Avatar: 'gkbot-worker.png',
    InitCardList: [
      ...CARDS.filter(item => item.ID === 8)
    ],
    MumbleList: ROBOT_MUMBLE_LIST
  },
  {
    Type: 'B', ID: 2, Name: 'GKBot 表演型', Health: 35, Attack: 12, Defense: 2, ItemLimit: 8, Coin: 0, RewardCoin: [15, 25],
    Avatar: 'gkbot-perform.png',
    InitCardList: [
      ...CARDS.filter(item => item.ID === 10)
    ],
    MumbleList: ROBOT_MUMBLE_LIST
  },
  {
    Type: 'B', ID: 3, Name: 'GKBot 侵略型', Health: 40, Attack: 18, Defense: 2, ItemLimit: 8, Coin: 0, RewardCoin: [30, 50],
    Avatar: 'gkbot-attack.png',
    InitCardList: [
      ...CARDS.filter(item => item.ID === 8),
      ...CARDS.filter(item => item.ID === 10),
    ],
    MumbleList: ROBOT_MUMBLE_LIST
  },
  {
    Type: 'B', ID: 4, Name: 'GKBot 防禦型', Health: 50, Attack: 8, Defense: 5, ItemLimit: 8, Coin: 0, RewardCoin: [30, 50],
    Avatar: 'gkbot-defense.png',
    InitCardList: [
      ...CARDS.filter(item => item.ID === 9),
      ...CARDS.filter(item => item.ID === 9),
      ...CARDS.filter(item => item.ID === 10),
    ],
    MumbleList: ROBOT_MUMBLE_LIST
  }
]

export const DIALOGS = {
  [enumDialog.Opening]: [
    '公元 5487 年，GK 公司生產的勞力機器人 GKBot 已經普及化，從家庭到娛樂藝術、軍事基地都普遍可見。',
    '某天，GKBot 突然開始攻擊人類。因為事情發生得猝不及防，地球減少了近 70 億人口，所剩不多的人類躲藏在各種隱蔽處。幾個月後，人類陸續發現 GKBot 體內建有一種神奇的卡牌，只要向 GKBot 發起挑戰，就能令它們取出那些卡牌來決鬥，透過決鬥，就有機會對它們造成損傷，甚至破壞！隨之而來的風險就是——必須拿自己的性命做賭注...',
    '頑強的人類啊！別放過絕望中的一線光明，拿起邏輯牌，奮鬥吧！',
  ],
  [enumDialog.GameStart]: [
    ['呼...呼...躲到這裡，應該安全了吧...？」自從隱蔽所遭到攻擊後，倖存的你逃了出來，經過幾天的躲藏，已疲憊不堪。'],
    ['砰！轟然巨響。'],
    ['「發現人類！開始進行殲滅」機器人發出毫無起伏的聲音線，看來這是一台老舊的機型。'],
    ['「完蛋了！快想想辦法...啊！背包裡好像還有一副邏輯牌...」'],
    ['我要求邏輯牌決鬥！'],
    ['「接受邏輯牌決鬥要求，請登錄人類姓名。」'],
    ['「我是...」'],
  ],
  [enumDialog.BattleStart]: [
    '眼前出現了一台機器人，根據平板上的記載，好像是...',
  ],
  [enumDialog.BattleEnd]: [
    '看著機器人冒著煙的軀殼，你不禁感到一絲同情。突然間，你被散落在地上的東西吸引。那不是機器人手中的卡牌嗎？要趁現在補充一點邏輯牌嗎？',
  ],
  [enumDialog.Rest]: [
    '你找到一處隱蔽的避難所，躲在暗處稍事休息。外頭不時傳來 GKBot 四處肆虐的聲響。一直躲下去也不是辦法，休息夠了就出發吧。',
  ],
  [enumDialog.Rank]: [
    '你打開不知在哪撿到的平板，上面記載著一些因為 GKBot 遭到不測的人臨終前留下的資訊。你祈求自己不要成為上面的一員。',
  ],
  [enumDialog.Shop]: [
    '路邊有個老頭神秘兮兮地在向你招手，你猶豫地走了過去，老頭刷一聲打開大衣，嚇了你一大跳。',
  ],
  [enumDialog.Backpack]: [
    '你翻找著背包，想看看有什麼可以幫助活下去的東西。',
  ],
  [enumDialog.GameEnd]: [
    '你感到一陣暈眩，四周愈來愈暗...看來這就是終點了。臨死前你拿出了之前撿到的平板，試圖留下紀錄，以提供其他人類一點線索，希望能死得稍微有價值。',
  ]
}
