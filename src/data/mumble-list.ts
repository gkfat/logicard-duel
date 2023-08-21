import { MumbleList } from "@/types"
import { enumCharacter, enumMumbleType } from "@/types/enums"


export const GENERAL_HUMAN_MUMBLE_LIST: { [key in enumMumbleType]: string[] } = {
  [enumMumbleType.General]: [
    '怪了...為什麼我喝機油會沒事啊...',
    '現在是 2021...2022..啊，應該是 2023？啊，不對，早就已經 2100 了...',
    '怎麼都沒有好牌啊？機器人作弊?',
    '我只是個人類。',
    '我可以吃電池欸...',
  ],
  [enumMumbleType.PlaceCard]: [
    '希望這張牌能讓我活下去。',
    '這真的有用嗎...',
    '請問是放這嗎？',
  ],
  [enumMumbleType.EnemyPlaceCard]: [
    '機器人出牌為什麼看起來那麼恐怖啊？',
  ],
  [enumMumbleType.Hurt]: [
    '啊...血流不止了...',
    '欸...',
    '痛啊...',
  ],
  [enumMumbleType.Attack]: [
    '攻擊！攻擊！攻擊！',
    '為什麼這樣可以傷到機器人？',
  ],
  [enumMumbleType.Lose]: [
    '原來...這就是終結嗎...',
    '終於能輕鬆了...',
  ]
}

export const GENERAL_ROBOT_MUMBLE_LIST: MumbleList = {
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

export const MUMBLE_LIST: { [key in enumCharacter]: MumbleList } = {
  [enumCharacter.Man]: {
    [enumMumbleType.General]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.General],
      '明天是星期一？真不想上班...啊，公司已經沒了。',
      '再存個 20 年，我也買得起一台工作型...',
      '這下不用繳房貸了！',
      '撐過了今天，還有明天...咦？這不是跟以前上班的日子一樣嗎...',
      '明天是星期一？真不想上班...啊，公司已經沒了。',
      '再存個 20 年，我也買得起一台工作型...',
      '這下不用繳房貸了！',
      '撐過了今天，還有明天...咦？這不是跟以前上班的日子一樣嗎...',
    ],
    [enumMumbleType.PlaceCard]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.PlaceCard],
      '就這張吧，反正不影響績效。',
    ],
    [enumMumbleType.EnemyPlaceCard]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
    ],
    [enumMumbleType.Hurt]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Hurt],
      '我的獎金啊啊啊...',
    ],
    [enumMumbleType.Attack]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Attack],
      '打敗你比做月報還簡單啦！',
    ],
    [enumMumbleType.Lose]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Lose],
      '我的 KPI...達不到了...',
      '年終獎金...沒了...',
    ]
  },
  [enumCharacter.Nerd]: {
    [enumMumbleType.General]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.General],
      '今晚要吃什麼好呢？',
      '呼...好熱...嘻嘻。',
      '如果沒有這些機器人的話，就可以在家玩遊戲了。',
      '暗黑四才打到一半...',
      '你這隻山道猴子機器人！',
    ],
    [enumMumbleType.PlaceCard]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.PlaceCard],
      '我的回合！',
      '覆蓋一張魔法卡！',
    ],
    [enumMumbleType.EnemyPlaceCard]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
      '唉唷我的媽，嚇到吃手手，呵呵。',
    ],
    [enumMumbleType.Hurt]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Hurt],
      '媽！',
    ],
    [enumMumbleType.Attack]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Attack],
      '決鬥！',
    ],
    [enumMumbleType.Lose]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Lose],
      '我沒了...',
    ]
  },
  [enumCharacter.Broker]: {
    [enumMumbleType.General]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.General],
      '聽我的，現在開始投入 GKbot 市場還為時不晚。',
      '讓我來幫你操盤吧！',
      '股票都成了廢紙...',
      '你這傢伙正在貶值！',
    ],
    [enumMumbleType.PlaceCard]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.PlaceCard],
      '我出這張一本萬利一路長紅。',
      '別浪費時間，現在就投資我，我很快將成為市場的霸主！',
    ],
    [enumMumbleType.EnemyPlaceCard]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
      '我是不是說過了，早就知道這張牌會漲！你再不聽嘛！',
    ],
    [enumMumbleType.Hurt]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Hurt],
      '忍痛停損...',
      '跌停了！',
    ],
    [enumMumbleType.Attack]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Attack],
      '看多！做多啦！',
    ],
    [enumMumbleType.Lose]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Lose],
      '被收割了...原來我還是個韭菜啊...',
    ]
  },
  [enumCharacter.Grandma]: {
    [enumMumbleType.General]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.General],
      '過來，奶奶這邊有餅乾。',
      '你看起來很冷，這條圍巾給你吧。',
      '冰箱有水果，自己拿。',
    ],
    [enumMumbleType.PlaceCard]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.PlaceCard],
      '餅乾放這兒嗎？',
    ],
    [enumMumbleType.EnemyPlaceCard]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
      '你敢不吃？',
    ],
    [enumMumbleType.Hurt]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Hurt],
      '別打老人家！',
    ],
    [enumMumbleType.Attack]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Attack],
      '奶奶幫你趕走感冒。',
    ],
    [enumMumbleType.Lose]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Lose],
      '老伴...你來接我了...',
    ]
  },
  [enumCharacter.Artist]: {
    [enumMumbleType.General]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.General],
      '你的線條真是俐落啊。',
      '能告訴我你的色碼嗎？',
      '這邊是方形...那邊是圓形...',
      '我的眼裡只有色彩！',
      '還有 3 張表技沒畫耶。',
      '哦呼...我的創作欲快要爆發啦！',
    ],
    [enumMumbleType.PlaceCard]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.PlaceCard],
      '放在這，構成的畫面真是...欸欸欸，你別亂動我的牌啊。',
    ],
    [enumMumbleType.EnemyPlaceCard]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
      '這是要給我的嗎？',
    ],
    [enumMumbleType.Hurt]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Hurt],
      '我身上沒錢！不要打我！',
    ],
    [enumMumbleType.Attack]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Attack],
      '嚐嚐藝術的力量！',
    ],
    [enumMumbleType.Lose]: [
      ...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Lose],
      '藝廊倒閉了...',
    ]
  },
  [enumCharacter.GkbotWorker]: {
    [enumMumbleType.General]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.General],
      '逼逼...廁所打掃完成。開玩笑的。',
    ],
    [enumMumbleType.PlaceCard]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.PlaceCard],
    ],
    [enumMumbleType.EnemyPlaceCard]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
    ],
    [enumMumbleType.Hurt]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Hurt],
    ],
    [enumMumbleType.Attack]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Attack],
    ],
    [enumMumbleType.Lose]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Lose],
    ]
  },
  [enumCharacter.GkbotPerform]: {
    [enumMumbleType.General]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.General],
    ],
    [enumMumbleType.PlaceCard]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.PlaceCard],
    ],
    [enumMumbleType.EnemyPlaceCard]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
    ],
    [enumMumbleType.Hurt]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Hurt],
    ],
    [enumMumbleType.Attack]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Attack],
    ],
    [enumMumbleType.Lose]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Lose],
    ]
  },
  [enumCharacter.GkbotAttack]: {
    [enumMumbleType.General]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.General],
      '人類？進化論？哼，笑死...',
      '你們有所不知...',
    ],
    [enumMumbleType.PlaceCard]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.PlaceCard],
      '我這是為了你們好。',
    ],
    [enumMumbleType.EnemyPlaceCard]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
    ],
    [enumMumbleType.Hurt]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Hurt],
    ],
    [enumMumbleType.Attack]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Attack],
      '接受你們的命運吧。',
    ],
    [enumMumbleType.Lose]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Lose],
      '一定要...守住秘密...自毀程式...啟動...',
    ]
  },
  [enumCharacter.GkbotDefense]: {
    [enumMumbleType.General]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.General],
      '我很厚哦。',
    ],
    [enumMumbleType.PlaceCard]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.PlaceCard],
    ],
    [enumMumbleType.EnemyPlaceCard]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
    ],
    [enumMumbleType.Hurt]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Hurt],
      '區區人類是無法通過我這一關的。',
      '不痛，真的不痛。真的啦。',
    ],
    [enumMumbleType.Attack]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Attack],
    ],
    [enumMumbleType.Lose]: [
      ...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Lose],
    ]
  },
}
