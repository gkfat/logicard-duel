<template>
    <div>h2</div>
</template>
<script lang="ts" setup>
const table = ref({
    /** -1: 未開始 0: 比小 1: 比大 */
    rule: -1,
    enemyCards: [null, null] as Array<Game.Item | null>,
    playerCards: [null, null] as Array<Game.Item | null>,
    result: enumBattleResult.Init,
    usedCardList: [] as Game.Item[],
} as Game.RoundRecord);

const tableHistory = ref([] as Game.RoundRecord[]);

const box50 = Util.makeLotteryBox(50); // 機率 50% 的箱子
const box30 = Util.makeLotteryBox(30); // 機率 30% 的箱子

// 設定卡牌弧形排列
const calcCardRotate = (i: number, leng: number) => {
    const middleIndex = Math.floor(leng / 2);
    /** 偏差值 */
    const deviation = i - middleIndex;
    const deg = deviation * 1.5 * 7;
    const y = Math.abs(deviation) * Math.abs(deviation) * 5;
    return `transform: rotate(${deg}deg) translateY(${y}px)`;
};

const tossCard = ref(false);
const playerMumbling = computed(() => playerStore.playerMumbling);
const enemyMumbling = computed(() => playerStore.enemyMumbling);
// 開啟喃喃自語定時器
const startMumbleInterval = () => {
    const mumbleInterval = setInterval(() => {
        // 只有在 counting 階段可以喃喃自語
        if (
            roundState.value === enumRoundState.Counting &&
            countDownRemainSec.value > 0
        ) {
            // player mumble
            if (!playerMumbling.value) {
                playerStore.mumble(
                    'player',
                    enumMumbleType.General,
                    Util.getRandomInt(0, countDownRemainSec.value / 2) * 1000
                );
            }
            // enemy mumble
            if (!enemyMumbling.value) {
                playerStore.mumble(
                    'enemy',
                    enumMumbleType.General,
                    Util.getRandomInt(0, countDownRemainSec.value / 2) * 1000
                );
            }
        } else {
            clearInterval(mumbleInterval);
        }
    }, 5000);
};

// 放一張牌上桌
const placeCardOnTable = async (
    character: Game.Character,
    item: Game.Item,
    i: number
) => {
    let pos = 0;
    switch (item.ItemType) {
        case enumItemType.LogiCard:
            pos = 0;
            break;
        case enumItemType.Attack:
        case enumItemType.Defense:
        case enumItemType.Heal:
            pos = 1;
            break;
        default:
            break;
    }

    const findPlayerCard = table.value.playerCards[pos];
    const findEnemyCard = table.value.enemyCards[pos];
    const allowTime =
        [enumRoundState.Counting].includes(roundState.value) &&
        countDownRemainSec.value > 0;
    switch (character.Type) {
        case 'P': // 玩家
            if (!findPlayerCard && allowTime) {
                await soundStore.playSound(soundEffects.placeCard);
                player.value.CardDataList.splice(i, 1);
                table.value.playerCards[pos] = item;
                playerStore.mumble('player', enumMumbleType.PlaceCard, 0);
                if (Util.lottery(box50)) {
                    playerStore.mumble(
                        'enemy',
                        enumMumbleType.EnemyPlaceCard,
                        0
                    );
                }
            }
            break;
        case 'B': // 機器人
            if (!findEnemyCard && allowTime) {
                await soundStore.playSound(soundEffects.placeCard);
                enemy.value.CardDataList.splice(i, 1);
                table.value.enemyCards[pos] = item;
                if (Util.lottery(box50)) {
                    playerStore.mumble('enemy', enumMumbleType.PlaceCard, 0);
                }
                if (Util.lottery(box50)) {
                    playerStore.mumble(
                        'player',
                        enumMumbleType.EnemyPlaceCard,
                        0
                    );
                }
            }
            break;
        default:
            break;
    }
};

// 從桌上收回牌
const getCardFromTable = async (who: 'player' | 'enemy', pos: number) => {
    const allowTime = [enumRoundState.Counting, enumRoundState.Start].includes(
        roundState.value
    );
    const findPlayerCard = table.value.playerCards[pos]!;
    const findEnemyCard = table.value.enemyCards[pos]!;
    switch (who) {
        case 'player': // 玩家
            if (allowTime) {
                await soundStore.playSound(soundEffects.placeCard);
                player.value.CardDataList.push(findPlayerCard);
                table.value.playerCards[pos] = null;
                player.value.CardDataList = Util.sortCardList(
                    player.value.CardDataList
                );
            }
            break;
        case 'enemy': // 機器人
            if (allowTime) {
                await soundStore.playSound(soundEffects.placeCard);
                enemy.value.CardDataList.push(findEnemyCard);
                table.value.enemyCards[pos] = null;
                enemy.value.CardDataList = Util.sortCardList(
                    enemy.value.CardDataList
                );
            }
            break;
        default:
            break;
    }
};

// 敵人收回再出牌
const enemyPlaceCardAgain = async () => {
    let randomSec = Util.getRandomInt(0, (countDownRemainSec.value / 2) * 100);
    await Util.sleep(randomSec);
    getCardFromTable('enemy', 0);
    randomSec = Util.getRandomInt(0, (countDownRemainSec.value / 2) * 100);
    if (randomSec >= 1000) {
        await Util.sleep(randomSec);
    }

    await enemyPlaceCard([false]);
};

// 敵人出牌邏輯
const enemyPlaceCard = async (replaceCardOdd: boolean[]) => {
    let randomSec = Util.getRandomInt(
        100,
        (countDownRemainSec.value / 2) * 1000
    );
    await Util.sleep(randomSec);
    // 出邏輯牌
    const logicards = enemy.value.CardDataList.filter(
        (item) => item.ItemType === enumItemType.LogiCard
    );
    const half = Math.floor(logicards.length / 2);
    let index = 0;
    switch (table.value.rule) {
        case 0: // 比小
            index = Util.getRandomInt(0, half);
            break;
        case 1: // 比大
            index = Util.getRandomInt(half, logicards.length - 1);
            break;
        default:
            break;
    }

    await placeCardOnTable(
        enemy.value.Character!,
        enemy.value.CardDataList[index],
        index
    );

    // 技術牌
    randomSec = Util.getRandomInt(100, countDownRemainSec.value * 1000);
    await Util.sleep(randomSec);

    const findEenyLogicard = table.value.enemyCards[0];
    const findHealthCards = enemy.value.CardDataList.filter(
        (item) => item.ItemType === enumItemType.Heal
    );
    const findAttackCards = enemy.value.CardDataList.filter(
        (item) => item.ItemType === enumItemType.Attack
    );
    const findDefenseCards = enemy.value.CardDataList.filter(
        (item) => item.ItemType === enumItemType.Defense
    );
    const lowHealth =
        enemy.value.CurrentHealth <= enemy.value.Character!.Health * 0.3;

    // 若有補血牌，且機器人血量低於 30% 就用
    if (findHealthCards.length > 0 && lowHealth) {
        const i = enemy.value.CardDataList.indexOf(findHealthCards[0]);
        placeCardOnTable(enemy.value.Character!, findHealthCards[0], i);
    }

    // 若有攻擊牌，且有出過邏輯牌，則有 5 成機率出牌
    if (findAttackCards.length > 0 && findEenyLogicard && Util.lottery(box50)) {
        const i = enemy.value.CardDataList.indexOf(findAttackCards[0]);
        placeCardOnTable(enemy.value.Character!, findAttackCards[0], i);
    }

    // 若有防禦牌，則有 5 成機率出牌
    if (findDefenseCards.length > 0 && Util.lottery(box50)) {
        const i = enemy.value.CardDataList.indexOf(findDefenseCards[0]);
        placeCardOnTable(enemy.value.Character!, findDefenseCards[0], i);
    }

    // 30% 機率收回牌再出一次
    if (countDownRemainSec.value > 3 && Util.lottery(replaceCardOdd)) {
        await enemyPlaceCardAgain();
    }
};

// 將用過的牌丟到垃圾桶
const tossCardToTrash = async () => {
    tossCard.value = true;
    await Util.sleep(200);
    if (table.value.enemyCards[0]) {
        table.value.usedCardList.push(table.value.enemyCards[0]);
    }
    if (table.value.enemyCards[1]) {
        table.value.usedCardList.push(table.value.enemyCards[1]);
    }
    if (table.value.playerCards[0]) {
        table.value.usedCardList.push(table.value.playerCards[0]);
    }
    if (table.value.playerCards[1]) {
        table.value.usedCardList.push(table.value.playerCards[1]);
    }
    await Util.sleep(2000);
    table.value.enemyCards = [null, null];
    table.value.playerCards = [null, null];
    tossCard.value = false;
};

// 記錄桌子歷史
const updateTableHistory = () => {
    tableHistory.value.unshift({ ...table.value });
};

// 抽籤
const dealGame = async () => {
    await Util.sleep(2500);
    table.value.rule = Util.getZeroOrOne();
    countDownRemainSec.value = JSON.parse(JSON.stringify(countDownSec));
    roundState.value = enumRoundState.Counting;
    startMumbleInterval(); // 開始喃喃自語定時器
    startCountdownInterval(); // 開始倒數計時器
    await soundStore.playSound(soundEffects.bell);
    // 機器人不定時出牌
    enemyPlaceCard(box30);
};

// 開牌，計算輸贏並執行扣血
const draw = async () => {
    openCard.value = true; // 開牌
    roundState.value = enumRoundState.Duel;
    // 取得雙方點數
    const enemyLogiCard = table.value.enemyCards[0];
    const playerLogiCard = table.value.playerCards[0];
    // 取得雙方技術牌
    const enemyTechCard = table.value.enemyCards[1];
    const playerTechCard = table.value.playerCards[1];

    // 如果有技術牌
    if (enemyTechCard) {
        switch (enemyTechCard.ItemType) {
            case enumItemType.Attack: // 增加額外攻擊力
                enemy.value.ExtraAttack += enemyTechCard.Point;
                break;
            case enumItemType.Defense: // 增加額外防禦力
                enemy.value.ExtraDefense += enemyTechCard.Point;
                break;
            case enumItemType.Heal: // 觸發補血
                await Util.sleep(1000);
                await soundStore.playSound(soundEffects.heal);
                playerStore.heal('enemy', enemyTechCard.Point);
                break;
            default:
                break;
        }
    }
    if (playerTechCard) {
        switch (playerTechCard.ItemType) {
            case enumItemType.Attack: // 增加額外攻擊力
                player.value.ExtraAttack += playerTechCard.Point;
                break;
            case enumItemType.Defense: // 增加額外防禦力
                player.value.ExtraDefense += playerTechCard.Point;
                break;
            case enumItemType.Heal: // 觸發補血
                await Util.sleep(1000);
                await soundStore.playSound(soundEffects.heal);
                playerStore.heal('player', playerTechCard.Point);
                break;
            default:
                break;
        }
    }
    // 更新 store 攻擊力
    playerStore.updatePlayer('player', player.value);
    playerStore.updatePlayer('enemy', enemy.value);

    // 計算總攻擊力、防禦力
    const enemyTotalAttack =
        enemy.value.CurrentAttack + enemy.value.ExtraAttack;
    const enemyTotalDefense =
        enemy.value.CurrentDefense + enemy.value.ExtraDefense;
    const playerTotalAttack =
        player.value.CurrentAttack + player.value.ExtraAttack;
    const playerTotalDefense =
        player.value.CurrentDefense + player.value.ExtraDefense;

    // 計算雙方扣血量
    const enemyDeduction =
        playerTotalAttack - enemyTotalDefense > 0
            ? playerTotalAttack - enemyTotalDefense
            : 0;
    const playerDeduction =
        enemyTotalAttack - playerTotalDefense > 0
            ? enemyTotalAttack - playerTotalDefense
            : 0;
    let result = enumBattleResult.Draw;
    // 若有人沒出牌就判輸
    if (!enemyLogiCard && playerLogiCard) {
        result = enumBattleResult.PlayerWin;
    } else if (enemyLogiCard && !playerLogiCard) {
        result = enumBattleResult.PlayerLose;
    } else if (enemyLogiCard && playerLogiCard) {
        // 都有出牌，比較大小判斷結果
        switch (table.value.rule) {
            case 0: // 比小
                if (enemyLogiCard.Point < playerLogiCard.Point) {
                    result = enumBattleResult.PlayerLose;
                } else if (enemyLogiCard.Point > playerLogiCard.Point) {
                    result = enumBattleResult.PlayerWin;
                }
                break;
            case 1: // 比大
                if (enemyLogiCard.Point > playerLogiCard.Point) {
                    result = enumBattleResult.PlayerLose;
                } else if (enemyLogiCard.Point < playerLogiCard.Point) {
                    result = enumBattleResult.PlayerWin;
                }
                break;
            default:
                break;
        }
    }

    // 桌面顯示局結果
    table.value.result = result;
    roundState.value = enumRoundState.Settle;
    await Util.sleep(2000);

    // 依結果判斷扣血
    switch (result) {
        case enumBattleResult.PlayerWin:
            await soundStore.playSound(soundEffects.robotHurt);
            playerStore.deduction('enemy', enemyDeduction);
            playerStore.mumble('player', enumMumbleType.Attack, 0);

            // 更新玩家紀錄
            player.value.Record.TotalDamage += enemyDeduction;
            // 30% 機率獲得 1 螺絲釘
            if (Util.lottery(box30)) {
                player.value.Coin += 1;
            }
            playerStore.updatePlayer('player', player.value);

            // 機器人喃喃自語
            if (enemy.value.CurrentHealth === 0) {
                playerStore.mumble('enemy', enumMumbleType.Lose, 0);
            } else {
                playerStore.mumble('enemy', enumMumbleType.Hurt, 0);
            }
            break;
        case enumBattleResult.PlayerLose:
            await soundStore.playSound(soundEffects.ouch);
            playerStore.deduction('player', playerDeduction);
            playerStore.mumble('enemy', enumMumbleType.Attack, 0);

            // 玩家喃喃自語
            if (player.value.CurrentHealth === 0) {
                playerStore.mumble('player', enumMumbleType.Lose, 0);
            } else {
                playerStore.mumble('player', enumMumbleType.Hurt, 0);
            }
            break;
        default:
            await soundStore.playSound(soundEffects.huh);
            break;
    }

    // 紀錄局歷史
    updateTableHistory();

    // 牌丟到垃圾桶
    await Util.sleep(1000);
    await tossCardToTrash();

    // 重置額外數值
    resetExtraStatus();

    if (enemy.value.CurrentHealth === 0) {
        // 若敵人死亡就進到戰利品
        await soundStore.playSound(soundEffects.win);
        player.value.Record.DefeatBots += 1;
        player.value.CardDataList = player.value.CardDataList.filter(
            (c) => c.ItemType !== enumItemType.LogiCard
        );
        playerStore.updatePlayer('player', player.value);
        appStore.changeGameState(enumGameState.BattleEnd);
    } else if (player.value.CurrentHealth === 0) {
        // 若玩家死亡就進到 game end
        const now = new Date().getTime();
        player.value.Record.SurvivalTime = Util.diffDay(
            now,
            player.value.CreatedTime!
        );
        playerStore.updatePlayer('player', player.value);
        appStore.changeGameState(enumGameState.GameOver);
    } else {
        // 若無人死亡就重啟 roundStart
        await roundStart();
    }
};
</script>
