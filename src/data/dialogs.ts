import { enumDialog } from '@/enums/dialog';

export const DialogDataList = {
    [enumDialog.Opening]: [
        '公元 5487 年，GK 公司生產的勞力機器人 GkBot 已經普及化，從家庭到娛樂藝術、軍事基地都普遍可見。',
        '某天，GkBot 突然開始攻擊人類。因為事情發生得猝不及防，地球減少了近 70 億人口，所剩不多的人類躲藏在各種隱蔽處。幾個月後，人類陸續發現 GkBot 體內建有一種神奇的卡牌，只要向 GkBot 發起挑戰，就能令它們取出那些卡牌來決鬥，透過決鬥，就有機會對它們造成損傷，甚至破壞！隨之而來的風險就是——必須拿自己的性命做賭注...',
        '頑強的人類啊！別放過絕望中的一線光明，拿起邏輯牌，奮鬥吧！',
    ],
    [enumDialog.GameStart]: [
        [
            '呼...呼...躲到這裡，應該安全了吧...？」自從隱蔽所遭到攻擊後，倖存的你逃了出來，經過幾天的躲藏，已疲憊不堪。',
        ],
        ['砰！轟然巨響。'],
        [
            '「發現人類！開始進行殲滅」機器人發出毫無起伏的聲音線，看來這是一台老舊的機型。',
        ],
        ['「完蛋了！快想想辦法...啊！背包裡好像還有一副邏輯牌...」'],
        ['我要求邏輯牌決鬥！'],
        ['「接受邏輯牌決鬥要求，請登錄人類姓名。」'],
        ['「我是...」'],
    ],
    [enumDialog.ChooseOpponent]: [
        '眼前有幾台機器人在四處搜索，你鼓起勇氣，朝著其中一台走去。',
    ],
    [enumDialog.BattleEnd]: [
        '你看著 GkBot 冒煙的軀殼，不禁感到一絲同情，但為了生存，你還是翻找著殘骸，看看有什麼能用的東西。',
    ],
    [enumDialog.Rest]: [
        '你找到一處隱蔽的避難所，躲在暗處稍事休息。外頭不時傳來 GkBot 四處肆虐的聲響。一直躲下去也不是辦法，休息夠了就出發吧。',
    ],
    [enumDialog.Rank]: [
        '你打開不知在哪撿到的平板，上面記載著一些因為 GkBot 遭到不測的人臨終前留下的資訊。你祈求自己不要成為上面的一員。',
    ],
    [enumDialog.Shop]: [
        '路邊有個老頭神秘兮兮地在向你招手，你猶豫地走了過去，老頭刷一聲打開大衣，嚇了你一大跳。「來來來，」他笑著說。「儘管看個夠。」',
    ],
    [enumDialog.Backpack]: ['你翻找著背包，想看看有什麼可以幫助活下去的東西。'],
    [enumDialog.GameOver]: [
        '你感到一陣暈眩，四周愈來愈暗...看來這就是終點了。臨死前你拿出了之前撿到的平板，試圖留下紀錄，以提供其他人類一點線索，希望能死得稍微有價值。',
    ],
    [enumDialog.Restart]: [
        '你來到一處不知名的地方，前方有一塊牌子，上頭寫著 "404"。你不確定那是什麼意思，但卻會心一笑。是時候離開這裡了。',
    ],
};
