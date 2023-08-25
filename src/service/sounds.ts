/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import click from '@/assets/sounds/click.wav';
import pop from '@/assets/sounds/pop.wav';
import countdown from '@/assets/sounds/countdown.wav';
import placeCard from '@/assets/sounds/placeCard.wav';
import coin from '@/assets/sounds/coin.mp3';
import robotHurt from '@/assets/sounds/robotHurt.wav';
import ouch from '@/assets/sounds/ouch.wav';
import huh from '@/assets/sounds/huh.wav';
import bell from '@/assets/sounds/bell.wav';
import equip from '@/assets/sounds/equip.wav';
import heal from '@/assets/sounds/heal.wav';
import win from '@/assets/sounds/win.wav';
// BGM
import battle from '@/assets/sounds/battle.mp3';
import rest from '@/assets/sounds/rest.mp3';
import prologue from '@/assets/sounds/prologue.mp3';
import end from '@/assets/sounds/end.mp3';

class SoundService {
	sounds: {
		effect: { [key: string]: HTMLAudioElement };
		bgm: { [key: string]: HTMLAudioElement };
  } = {
			effect: {
				click: new Audio(click),
				pop: new Audio(pop),
				countdown: new Audio(countdown),
				placeCard: new Audio(placeCard),
				coin: new Audio(coin),
				robotHurt: new Audio(robotHurt),
				ouch: new Audio(ouch),
				huh: new Audio(huh),
				bell: new Audio(bell),
				equip: new Audio(equip),
				heal: new Audio(heal),
				win: new Audio(win),
			},
			bgm: {
				battle: new Audio(battle),
				rest: new Audio(rest),
				prologue: new Audio(prologue),
				end: new Audio(end),
			},
		};

	totalAssets = 0;

	loadedAssets: string[] = [];

	nowPlaying: HTMLAudioElement = this.sounds.bgm.prologue;

	/** 靜音模式 */
	muteMode = false;

	// 開始載入素材
	async loadAssets() {
		console.log('Start loading assets');
		const soundEffectKeys = Object.keys(this.sounds.effect);
		const soundBgmKeys = Object.keys(this.sounds.bgm);
		this.totalAssets = soundEffectKeys.length + soundBgmKeys.length;

		// 載入所有音效
		for (const key of soundEffectKeys) {
			const audio = this.sounds.effect[key];
			audio.addEventListener('canplaythrough', () => {
				if (this.loadedAssets.indexOf(key) === -1) {
					this.loadedAssets.push(key);
					console.log(`canplaythrough: ${key}, process: ${this.loadedAssets.length}/${this.totalAssets}`);
				}
				// 全部下載完
				// eslint-disable-next-line consistent-return
				return new Promise<void>((resolve) => {
					if (this.loadedAssets.length === this.totalAssets) {
						// eslint-disable-next-line no-promise-executor-return
						return resolve();
					}
				});
			});
			audio.load();
		}

		// 載入所有 BGM
		for (const key of soundBgmKeys) {
			const audio = this.sounds.bgm[key];
			audio.addEventListener('canplaythrough', () => {
				if (this.loadedAssets.indexOf(key) === -1) {
					this.loadedAssets.push(key);
					console.log(`canplaythrough: ${key}, process: ${this.loadedAssets.length}/${this.totalAssets}`);
				}
				// 全部下載完
				// eslint-disable-next-line consistent-return
				return new Promise<void>((resolve) => {
					if (this.loadedAssets.length === this.totalAssets) {
						// eslint-disable-next-line no-promise-executor-return
						return resolve();
					}
				});
			});
			audio.load();
		}
	}

	async playSound(audio: HTMLAudioElement) {
		if (!this.muteMode) {
			audio.currentTime = 0;
			audio.volume = 1;
			await audio.play();
		}
	}

	async playBGM(audio: HTMLAudioElement) {
		this.pause(this.nowPlaying);
		this.nowPlaying = audio;
		if (!this.muteMode) {
			audio.currentTime = 0;
			audio.volume = 0.5;
			audio.loop = true;
			await audio.play();
		}
	}

	async pause(audio: HTMLAudioElement) {
		audio.pause();
	}

	async pauseAllSounds() {
		Object.values(this.sounds.effect).forEach((audio) => this.pause(audio));
		Object.values(this.sounds.bgm).forEach((audio) => this.pause(audio));
		this.pause(this.nowPlaying);
	}

	async resume(audio: HTMLAudioElement) {
		await audio.play();
	}
}

export default new SoundService();
