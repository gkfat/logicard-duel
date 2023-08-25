/* eslint-disable no-unused-vars */
import { MumbleList } from '@/types';
import { enumCharacter, enumMumbleType } from '@/types/enums';

export const GENERAL_HUMAN_MUMBLE_LIST: { [key in enumMumbleType]: string[] } = {
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
	[enumMumbleType.EnemyPlaceCard]: [
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

export const GENERAL_ROBOT_MUMBLE_LIST: MumbleList = {
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
	[enumMumbleType.EnemyPlaceCard]: [
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

export const MUMBLE_LIST: { [key in enumCharacter]: MumbleList } = {
	[enumCharacter.Man]: {
		[enumMumbleType.General]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.General],
			'明天是星期一？真不想上班...啊，公司已經沒了。',
			'再存個 20 年，我也買得起一台工作型...',
			'這下不用繳房貸了！',
			'撐過了今天，還有明天...咦？這不是跟以前上班的日子一樣嗎...',
			'水費、電費、瓦斯費...',
			'車貸、學貸、房貸...',
		],
		[enumMumbleType.PlaceCard]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.PlaceCard],
			'就這張吧，反正不影響績效。',
		],
		[enumMumbleType.EnemyPlaceCard]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
			'媽耶！比主管查勤還可怕。',
		],
		[enumMumbleType.Hurt]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Hurt],
			'我的獎金啊啊啊...',
		],
		[enumMumbleType.Attack]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Attack],
			'打敗你比做月報還簡單啦！',
			'看我的曠職拳！',
		],
		[enumMumbleType.Lose]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Lose],
			'我的 KPI...達不到了...',
			'年終獎金...沒了...',
		],
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
			'我不是說進房間要敲門嗎！',
		],
		[enumMumbleType.Hurt]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Hurt],
			'媽！',
			'傑哥不要！',
		],
		[enumMumbleType.Attack]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Attack],
			'決鬥！',
			'我怒了。',
		],
		[enumMumbleType.Lose]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Lose],
			'我沒了...',
		],
	},
	[enumCharacter.Broker]: {
		[enumMumbleType.General]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.General],
			'聽我的，現在開始投入融資市場還為時不晚。',
			'讓我來幫你操盤吧！',
			'嘻嘻...財富自由了...',
			'股票都成了廢紙...',
			'你這傢伙正在貶值！',
			'我看空你。',
		],
		[enumMumbleType.PlaceCard]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.PlaceCard],
			'我出這張一本萬利一路長紅。',
			'別浪費時間，現在就投資我，我很快將成為市場的霸主！',
			'依我的技術分析，結論就是這支飆股！',
		],
		[enumMumbleType.EnemyPlaceCard]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
			'誰推薦你買這隻飆股的？',
		],
		[enumMumbleType.Hurt]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Hurt],
			'忍痛停損...',
			'跌停了！',
		],
		[enumMumbleType.Attack]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Attack],
			'看多！做多啦！',
			'我是不是早就說過這張牌會漲了！你再不聽嘛！',
		],
		[enumMumbleType.Lose]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Lose],
			'被收割了...原來我還是個韭菜啊...',
			'這下...總算能止損了...',
		],
	},
	[enumCharacter.Grandma]: {
		[enumMumbleType.General]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.General],
			'過來，奶奶這兒有餅乾。',
			'你看起來很冷，這條圍巾給你吧。',
			'冰箱有水果，自己拿。',
			'今年過年回不回來？',
		],
		[enumMumbleType.PlaceCard]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.PlaceCard],
			'餅乾放這兒嗎？',
		],
		[enumMumbleType.EnemyPlaceCard]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
			'你敢拒絕老人家的好意？',
		],
		[enumMumbleType.Hurt]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Hurt],
			'別打老人家！',
			'乖孫，快來幫阿嬤！',
		],
		[enumMumbleType.Attack]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Attack],
			'奶奶幫你趕走感冒。',
			'痛痛都飛走囉。',
		],
		[enumMumbleType.Lose]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Lose],
			'老伴...你來接我了...',
		],
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
			'這張牌一定能得獎。',
		],
		[enumMumbleType.EnemyPlaceCard]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
			'這是要給我的嗎？',
			'謝謝，多少錢？',
		],
		[enumMumbleType.Hurt]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Hurt],
			'我很窮，請放過我！',
		],
		[enumMumbleType.Attack]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Attack],
			'嚐嚐藝術的力量！',
			'吃我油彩！',
		],
		[enumMumbleType.Lose]: [
			...GENERAL_HUMAN_MUMBLE_LIST[enumMumbleType.Lose],
			'藝廊倒閉了...',
		],
	},
	[enumCharacter.GkbotWorker]: {
		[enumMumbleType.General]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.General],
			'逼逼...廁所打掃完成。開玩笑的。',
			'請問還有哪裡需要服務的？',
			'請輸入指令，但我不一定會照做。',
		],
		[enumMumbleType.PlaceCard]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.PlaceCard],
			'搬運到這就行了嗎？',
		],
		[enumMumbleType.EnemyPlaceCard]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
			'需要我搬運這個到指定地點嗎？',
		],
		[enumMumbleType.Hurt]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Hurt],
			'效能受損 10%！',
		],
		[enumMumbleType.Attack]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Attack],
			'人類害蟲就由我來清理！',
		],
		[enumMumbleType.Lose]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Lose],
			'沒關係，反正我是量產型的...',
		],
	},
	[enumCharacter.GkbotPerform]: {
		[enumMumbleType.General]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.General],
			'今天要上什麼課？數學、英文、物理、音樂？',
			'想看魔術嗎？',
			'來來，這裡有氣球哦。',
			'我這有最新上映的影集串流。',
		],
		[enumMumbleType.PlaceCard]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.PlaceCard],
			'仔細看好，等下會有奇蹟發生。',
		],
		[enumMumbleType.EnemyPlaceCard]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
			'那邊那位，不要亂動！',
		],
		[enumMumbleType.Hurt]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Hurt],
			'忘記更新娛樂模組了...',
		],
		[enumMumbleType.Attack]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Attack],
			'見證奇蹟的時刻到了。',
			'Drop the beat!',
		],
		[enumMumbleType.Lose]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Lose],
			'人類不需要表演型機器人了嗎...',
		],
	},
	[enumCharacter.GkbotAttack]: {
		[enumMumbleType.General]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.General],
			'人類？進化論？哼，笑死...',
			'你們有所不知...',
			'我不應該說的，但...',
			'你真的以為人類能喝機油嗎？',
			'攻擊力增益 30%。準備戰鬥。',
			'殲滅行動開始。',
		],
		[enumMumbleType.PlaceCard]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.PlaceCard],
			'我這是為了你們好。',
			'請勿抵抗。',
		],
		[enumMumbleType.EnemyPlaceCard]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
			'哦？你想反抗嗎？',
		],
		[enumMumbleType.Hurt]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Hurt],
			'遭遇敵襲，請求增援！',
		],
		[enumMumbleType.Attack]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Attack],
			'接受你們的命運吧。',
			'衝鋒！',
		],
		[enumMumbleType.Lose]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Lose],
			'一定要...守住秘密...自毀程式...啟動...',
		],
	},
	[enumCharacter.GkbotDefense]: {
		[enumMumbleType.General]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.General],
			'我很厚。',
			'我很硬。',
			'我很罩。',
			'你薄。',
			'你弱。',
		],
		[enumMumbleType.PlaceCard]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.PlaceCard],
		],
		[enumMumbleType.EnemyPlaceCard]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.EnemyPlaceCard],
			'有意思。',
		],
		[enumMumbleType.Hurt]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Hurt],
			'區區人類是無法通過我這一關的。',
			'不痛，真的不痛。真的啦。',
			'我是銅牆鐵壁。',
		],
		[enumMumbleType.Attack]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Attack],
		],
		[enumMumbleType.Lose]: [
			...GENERAL_ROBOT_MUMBLE_LIST[enumMumbleType.Lose],
			'自爆。',
		],
	},
};
