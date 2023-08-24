import { Character, Item } from '@/types';

// Icons
import github from '@/assets/icons/github.png';
import mail from '@/assets/icons/mail.png';
import rank from '@/assets/icons/rank.png';
import backapck from '@/assets/icons/backpack.png';
import logoLogicard from '@/assets/icons/logo-logicard.png';
import attack from '@/assets/icons/attack.png';
import defense from '@/assets/icons/defense.png';
import heal from '@/assets/icons/heal.png';
import cardbackLogicard from '@/assets/icons/cardback-logicard.png';
import cardbackTech from '@/assets/icons/cardback-tech.png';
import coin from '@/assets/icons/coin.png';
import boxer from '@/assets/icons/boxer.png';
import bat from '@/assets/icons/bat.png';
import gun from '@/assets/icons/gun.png';
import cloth from '@/assets/icons/cloth.png';
import bulletproof from '@/assets/icons/bulletproof.png';
import armor from '@/assets/icons/armor.png';
import player from '@/assets/icons/player.png';
import shop from '@/assets/icons/shop.png';

// Gif
import rest from '@/assets/gifs/rest.gif';

// Avatar
import man from '@/assets/avatars/man.png';
import fat from '@/assets/avatars/fat.png';
import broker from '@/assets/avatars/broker.png';
import grandma from '@/assets/avatars/grandma.png';
import artist from '@/assets/avatars/artist.png';
import gkbotWorker from '@/assets/avatars/gkbot-worker.png';
import gkbotAttack from '@/assets/avatars/gkbot-attack.png';
import gkbotDefense from '@/assets/avatars/gkbot-defense.png';
import gkbotPerform from '@/assets/avatars/gkbot-perform.png';
import {
	enumDialog, enumItemType, enumItem, enumCard, enumCharacter, enumRarity,
} from '../types/enums';
import { MUMBLE_LIST } from './mumble-list';

export const ShopLimit = {
	Item: 10,
	Card: 10,
};

export const IMAGES = {
	avatar: {
		man,
		fat,
		broker,
		grandma,
		artist,
		gkbotWorker,
		gkbotPerform,
		gkbotDefense,
		gkbotAttack,
	},
	icon: {
		github,
		mail,
		rank,
		backapck,
		logoLogicard,
		attack,
		defense,
		heal,
		cardbackLogicard,
		cardbackTech,
		coin,
		bat,
		boxer,
		gun,
		cloth,
		armor,
		bulletproof,
		player,
		shop,
	},
	gifs: {
		rest,
	},
};

export const CARDS: Item[] = [
	{
		ID: enumCard.LogiCard1,
		Name: 'LogiCard 1',
		Description: '一張邏輯牌，上面寫著數字 1。',
		Point: 1,
		ItemType: enumItemType.LogiCard,
		Price: 2,
		Icon: IMAGES.icon.logoLogicard,
		Rarity: enumRarity.None,
	},
	{
		ID: enumCard.LogiCard2,
		Name: 'LogiCard 2',
		Description: '一張邏輯牌，上面寫著數字 2。',
		Point: 2,
		ItemType: enumItemType.LogiCard,
		Price: 2,
		Icon: IMAGES.icon.logoLogicard,
		Rarity: enumRarity.None,
	},
	{
		ID: enumCard.LogiCard3,
		Name: 'LogiCard 3',
		Description: '一張邏輯牌，上面寫著數字 3。',
		Point: 3,
		ItemType: enumItemType.LogiCard,
		Price: 2,
		Icon: IMAGES.icon.logoLogicard,
		Rarity: enumRarity.None,
	},
	{
		ID: enumCard.LogiCard4,
		Name: 'LogiCard 4',
		Description: '一張邏輯牌，上面寫著數字 4。',
		Point: 4,
		ItemType: enumItemType.LogiCard,
		Price: 2,
		Icon: IMAGES.icon.logoLogicard,
		Rarity: enumRarity.None,
	},
	{
		ID: enumCard.LogiCard5,
		Name: 'LogiCard 5',
		Description: '一張邏輯牌，上面寫著數字 5。',
		Point: 5,
		ItemType: enumItemType.LogiCard,
		Price: 2,
		Icon: IMAGES.icon.logoLogicard,
		Rarity: enumRarity.None,
	},
	{
		ID: enumCard.LogiCard6,
		Name: 'LogiCard 6',
		Description: '一張邏輯牌，上面寫著數字 6。',
		Point: 6,
		ItemType: enumItemType.LogiCard,
		Price: 2,
		Icon: IMAGES.icon.logoLogicard,
		Rarity: enumRarity.None,
	},
	{
		ID: enumCard.LogiCard7,
		Name: 'LogiCard 7',
		Description: '一張邏輯牌，上面寫著數字 7。',
		Point: 7,
		ItemType: enumItemType.LogiCard,
		Price: 2,
		Icon: IMAGES.icon.logoLogicard,
		Rarity: enumRarity.None,
	},
	{
		ID: enumCard.ScrewDriver,
		Name: '螺絲起子',
		Description: '感覺可以撬開什麼。',
		Point: 3,
		ItemType: enumItemType.Attack,
		Price: 10,
		Icon: IMAGES.icon.attack,
		Rarity: enumRarity.N,
	},
	{
		ID: enumCard.Hammer,
		Name: '榔頭',
		Description: '這個肯定能砸穿敵人吧...',
		Point: 8,
		ItemType: enumItemType.Attack,
		Price: 15,
		Icon: IMAGES.icon.attack,
		Rarity: enumRarity.R,
	},
	{
		ID: enumCard.ScrapMetal,
		Name: '破銅爛鐵',
		Description: '至少可以撐一下子。',
		Point: 7,
		ItemType: enumItemType.Defense,
		Price: 8,
		Icon: IMAGES.icon.defense,
		Rarity: enumRarity.N,
	},
	{
		ID: enumCard.GkbotShell,
		Name: 'GKBot 的機殼',
		Description: '看起來相當堅硬。',
		Point: 10,
		ItemType: enumItemType.Defense,
		Price: 10,
		Icon: IMAGES.icon.defense,
		Rarity: enumRarity.R,

	},
	{
		ID: enumCard.Battery,
		Name: '3 號電池',
		Description: '有股想把它吃下去的衝動...',
		Point: 5,
		ItemType: enumItemType.Heal,
		Price: 15,
		Icon: IMAGES.icon.heal,
		Rarity: enumRarity.SR,
	},
	{
		ID: enumCard.Oil,
		Name: '機油',
		Description: '要不要喝下去看看呢...',
		Point: 10,
		ItemType: enumItemType.Heal,
		Price: 20,
		Icon: IMAGES.icon.heal,
		Rarity: enumRarity.SR,
	},
];

export const ITEMS: Item[] = [
	{
		ID: enumItem.Coin,
		Name: '螺絲釘',
		Description: '世界變成這個樣子後，GKBot 的螺絲釘成了主要貨幣。',
		Point: 0,
		ItemType: enumItemType.Coin,
		Price: 0,
		Icon: IMAGES.icon.coin,
		Rarity: enumRarity.None,
	},
	{
		ID: enumItem.Boxer,
		Name: '拳擊手套',
		Description: '這軟趴趴的手套，對機器人有用嗎...',
		Point: 1,
		ItemType: enumItemType.Weapon,
		Price: 2,
		Icon: IMAGES.icon.boxer,
		Rarity: enumRarity.N,
	},
	{
		ID: enumItem.Bat,
		Name: '棒球棍',
		Description: '一根隨處可見的棒球棍。',
		Point: 3,
		ItemType: enumItemType.Weapon,
		Price: 5,
		Icon: IMAGES.icon.bat,
		Rarity: enumRarity.R,
	},
	{
		ID: enumItem.Gun,
		Name: '手槍',
		Description: '哈利，你看！這東西比魔杖還好用呢！',
		Point: 5,
		ItemType: enumItemType.Weapon,
		Price: 20,
		Icon: IMAGES.icon.gun,
		Rarity: enumRarity.SR,
	},
	{
		ID: enumItem.Cloth,
		Name: '布衣',
		Description: '有穿總比沒穿好。',
		Point: 1,
		ItemType: enumItemType.Armor,
		Price: 2,
		Icon: IMAGES.icon.cloth,
		Rarity: enumRarity.N,
	},
	{
		ID: enumItem.BulletProof,
		Name: '防彈衣',
		Description: '應該可以保護自己吧。',
		Point: 3,
		ItemType: enumItemType.Armor,
		Price: 5,
		Icon: IMAGES.icon.bulletproof,
		Rarity: enumRarity.R,
	},
	{
		ID: enumItem.Armor,
		Name: '盔甲',
		Description: '原本在博物館裡的東西...',
		Point: 5,
		ItemType: enumItemType.Armor,
		Price: 20,
		Icon: IMAGES.icon.armor,
		Rarity: enumRarity.SR,
	},
];

export const CHARACTER_LIST: Character[] = [
	{
		Type: 'P',
		ID: enumCharacter.Man,
		Name: '失業的上班族',
		Health: 40,
		Attack: 100,
		Defense: 3,
		ItemLimit: 10,
		Coin: 5,
		Description: '沒什麼特別的，就是個平凡的上班族（aka you）。',
		Avatar: IMAGES.avatar.man,
		MumbleList: MUMBLE_LIST[enumCharacter.Man],
	},
	{
		Type: 'P',
		ID: enumCharacter.Nerd,
		Name: '家裡蹲',
		Health: 50,
		Attack: 8,
		Defense: 5,
		ItemLimit: 15,
		Coin: 5,
		Description: '因為體力不太好沒辦法背太多東西，很重。擁有比較厚的脂肪層，比較不容易受傷。',
		Avatar: IMAGES.avatar.fat,
		MumbleList: MUMBLE_LIST[enumCharacter.Nerd],
	},
	{
		Type: 'P',
		ID: enumCharacter.Broker,
		Name: '股票經紀人',
		Health: 35,
		Attack: 12,
		Defense: 4,
		ItemLimit: 10,
		Coin: 15,
		Description: '末日後依然堅持從事金融交易，深諳致富之道。',
		Avatar: IMAGES.avatar.broker,
		MumbleList: MUMBLE_LIST[enumCharacter.Broker],
	},
	{
		Type: 'P',
		ID: enumCharacter.Grandma,
		Name: '奶奶',
		Health: 20,
		Attack: 6,
		Defense: 1,
		ItemLimit: 20,
		Coin: 30,
		Description: '年事已高的外婆，口袋很深。',
		Avatar: IMAGES.avatar.grandma,
		MumbleList: MUMBLE_LIST[enumCharacter.Grandma],
	},
	{
		Type: 'P',
		ID: enumCharacter.Artist,
		Name: '藝術家',
		Health: 30,
		Attack: 15,
		Defense: 2,
		ItemLimit: 10,
		Coin: 5,
		Description: '穿著獨特的大衣，口袋很多。因為有低血糖，比較虛弱。',
		Avatar: IMAGES.avatar.artist,
		MumbleList: MUMBLE_LIST[enumCharacter.Artist],
	},
	{
		Type: 'B',
		ID: enumCharacter.GkbotWorker,
		Name: 'GKBot 工作型',
		Health: 30,
		Attack: 8,
		Defense: 1,
		ItemLimit: 8,
		Coin: 0,
		Avatar: IMAGES.avatar.gkbotWorker,
		Description: '被生產來做一些基本的事務，例如清潔、搬運、量產等。特色是平板的聲音線。',
		InitCardList: [
			...CARDS.filter((card) => card.ID === enumCard.ScrewDriver),
			...CARDS.filter((card) => card.ID === enumCard.Battery),
		],
		RewardCoin: [10, 15],
		RewardItemList: [
			...ITEMS.filter((item) => item.ID === enumItem.Boxer),
			...ITEMS.filter((item) => item.ID === enumItem.Cloth),
		],
		MumbleList: MUMBLE_LIST[enumCharacter.GkbotWorker],
	},
	{
		Type: 'B',
		ID: enumCharacter.GkbotPerform,
		Name: 'GKBot 表演型',
		Health: 35,
		Attack: 12,
		Defense: 2,
		ItemLimit: 8,
		Coin: 0,
		Avatar: IMAGES.avatar.gkbotPerform,
		Description: '被生產來與人互動，多作為看護或保姆，有安裝 DLC 的版本甚至能擔任教師。特色是能模擬人類的情感，有時會講笑話或唱歌。',
		InitCardList: [
			...CARDS.filter((card) => card.ID === enumCard.ScrewDriver),
			...CARDS.filter((card) => card.ID === enumCard.Battery),
			...CARDS.filter((card) => card.ID === enumCard.Oil),
		],
		RewardCoin: [20, 25],
		RewardItemList: [
			...ITEMS.filter((item) => item.ID === enumItem.Boxer),
			...ITEMS.filter((item) => item.ID === enumItem.Cloth),
			...ITEMS.filter((item) => item.ID === enumItem.Bat),
		],
		MumbleList: MUMBLE_LIST[enumCharacter.GkbotPerform],
	},
	{
		Type: 'B',
		ID: enumCharacter.GkbotAttack,
		Name: 'GKBot 侵略型',
		Health: 40,
		Attack: 18,
		Defense: 2,
		ItemLimit: 8,
		Coin: 0,
		Avatar: IMAGES.avatar.gkbotAttack,
		Description: '被生產來進行軍事行動的型號，行動敏捷，知曉一些秘密。',
		InitCardList: [
			...CARDS.filter((item) => item.ID === 8),
			...CARDS.filter((item) => item.ID === 10),
		],
		RewardCoin: [30, 50],
		RewardItemList: [
			...ITEMS.filter((item) => item.ID === enumItem.Boxer),
			...ITEMS.filter((item) => item.ID === enumItem.Cloth),
			...ITEMS.filter((item) => item.ID === enumItem.Bat),
			...ITEMS.filter((item) => item.ID === enumItem.Gun),
			...ITEMS.filter((item) => item.ID === enumItem.BulletProof),
		],
		MumbleList: MUMBLE_LIST[enumCharacter.GkbotAttack],
	},
	{
		Type: 'B',
		ID: enumCharacter.GkbotDefense,
		Name: 'GKBot 防禦型',
		Health: 50,
		Attack: 8,
		Defense: 5,
		ItemLimit: 8,
		Coin: 0,
		Avatar: IMAGES.avatar.gkbotDefense,
		Description: '外殼特別堅硬，能夠更有效地防禦攻擊，話很少。',
		InitCardList: [
			...CARDS.filter((item) => item.ID === 9),
			...CARDS.filter((item) => item.ID === 9),
			...CARDS.filter((item) => item.ID === 10),
		],
		RewardCoin: [30, 50],
		RewardItemList: [
			...ITEMS.filter((item) => item.ID === enumItem.Boxer),
			...ITEMS.filter((item) => item.ID === enumItem.Cloth),
			...ITEMS.filter((item) => item.ID === enumItem.Bat),
			...ITEMS.filter((item) => item.ID === enumItem.BulletProof),
			...ITEMS.filter((item) => item.ID === enumItem.Armor),
		],
		MumbleList: MUMBLE_LIST[enumCharacter.GkbotDefense],
	},
];

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
		'眼前出現了一台 GKBot，根據平板上的記載，好像是...',
	],
	[enumDialog.BattleEnd]: [
		'你看著 GKBot 冒著煙的軀殼，不禁感到一絲同情，但為了生存，你還是翻找著殘骸，看看有什麼能用的東西。',
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
	],
};
