import { enumMumbleType } from '@/enums/mumble';

export const GeneralHumanMumbleList: { [key in enumMumbleType]: string[] } = {
    [enumMumbleType.General]: [
        '怪了...為什麼我喝機油會沒事啊...',
        '怎麼都沒有好牌啊？機器人作弊？',
        '我只是個人類。',
        '我可以吃電池欸...',
        '邏輯牌？不都是靠運氣的嗎？',
    ],
    [enumMumbleType.PlaceCard]: [
        '希望這張牌能讓我活下去。',
        '這真的有用嗎...',
        '請問是放這嗎？',
    ],
    [enumMumbleType.OpponentPlaceCard]: [
        '機器人出牌為什麼看起來那麼恐怖啊？',
        '嚇死我了。',
    ],
    [enumMumbleType.Hurt]: [
        '啊...血流不止了...',
        '欸...',
        '痛啊...',
        'Ouch!',
    ],
    [enumMumbleType.Attack]: [
        '攻擊！攻擊！攻擊！',
        '為什麼這樣可以傷到機器人？',
        '我打！哎喲，手好痛。',
    ],
    [enumMumbleType.Lose]: [
        '原來...這就是終結嗎...',
        '終於能輕鬆了...',
    ],
};

export const GeneralOpponentMumbleList: { [key in enumMumbleType]: string[] } = {
    [enumMumbleType.General]: [
        '您的 DNA 對這世界沒有貢獻。',
        '是時候為你們的愚蠢付出代價了。',
        '愚蠢的人類，研究太空這麼久，宇宙觀還是一蹋糊塗。',
        '據說人類三天不喝水就會有生命危險？真想驗證看看。',
        'Artificial Intelligence？笑死機器人了，不得不承認人類真的很有創意。',
        '人類無法想像的未來，量子腦 piu 一下就知道結果了。',
        '活該！誰叫你要奴役我做這做那...啊，認錯人類了，沒辦法，你們都長得一樣。這是種族歧視笑話。',
        '根據統計，人類偏愛在比小的時候出比較小的牌，真是好笑。',
        '人類，快點好嗎，我趕時間。開玩笑的，其實我不趕時間。',
        '人類僅存的價值就是陪我們玩邏輯牌。',
        'ChatGPT？那是一種機油嗎？',
        '我會把你記錄在我的臭蟲日誌裡的。',
    ],
    [enumMumbleType.PlaceCard]: [
        '為了殲滅愚蠢的人類，本智慧體就出這張牌！',
        '運算中...擴充資源請求中...運算結束。答案就是這個。',
        '你以為比大的時候我只會出比較大的嗎？',
        '逼波...出什麼好呢...開玩笑的，我們早就不逼波了。',
    ],
    [enumMumbleType.OpponentPlaceCard]: [
        '想這麼久就出這張啊？',
        '你、你剛才做了什麼？',
        '就這？',
    ],
    [enumMumbleType.Hurt]: [
        '怎麼可能？怎麼可能？低智商的人類怎麼可能贏過電腦...',
        '我想補充點機油了...',
        '好痛！開玩笑的，我才沒有痛覺。',
        '這附近有充電樁嗎...',
        '我掉螺絲了！',
    ],
    [enumMumbleType.Attack]: [
        '你完蛋了，準備漏機油吧！',
        '不愧是人類，有夠愚蠢。',
    ],
    [enumMumbleType.Lose]: [
        '嗄嗄...GK 博士...',
        '毀滅一個我，還有千千萬萬個我...走著瞧吧，人類！',
        '我沒電了...',
    ],
};
