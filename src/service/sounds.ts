/* eslint-disable no-restricted-syntax */
const host = 'https://storage.cloud.google.com/logicard_duel/sounds';
const urls = {
    effect: {
        click: `${host}/click.wav`,
        pop: `${host}/pop.wav`,
        countdown: `${host}/countdown.wav`,
        placeCard: `${host}/placeCard.wav`,
        coin: `${host}/coin.mp3`,
        robotHurt: `${host}/robotHurt.wav`,
        ouch: `${host}/ouch.wav`,
        huh: `${host}/huh.wav`,
        bell: `${host}/bell.wav`,
        equip: `${host}/equip.wav`,
        heal: `${host}/heal.wav`,
        win: `${host}/win.wav`,
    },
    bgm: {
        battle: `${host}/battle.mp3`,
        rest: `${host}/rest.mp3`,
        prologue: `${host}/prologue.mp3`,
        end: `${host}/end.mp3`,
    },
};

class SoundService {
    sounds: {
        effect: { [key: string]: HTMLAudioElement };
        bgm: { [key: string]: HTMLAudioElement };
  } = {
            effect: {
                click: new Audio(urls.effect.click),
                pop: new Audio(urls.effect.pop),
                countdown: new Audio(urls.effect.countdown),
                placeCard: new Audio(urls.effect.placeCard),
                coin: new Audio(urls.effect.coin),
                robotHurt: new Audio(urls.effect.robotHurt),
                ouch: new Audio(urls.effect.ouch),
                huh: new Audio(urls.effect.huh),
                bell: new Audio(urls.effect.bell),
                equip: new Audio(urls.effect.equip),
                heal: new Audio(urls.effect.heal),
                win: new Audio(urls.effect.win),
            },
            bgm: {
                battle: new Audio(urls.bgm.battle),
                rest: new Audio(urls.bgm.rest),
                prologue: new Audio(urls.bgm.prologue),
                end: new Audio(urls.bgm.end),
            },
        };

    totalAssets = 0;

    loadedAssets: string[] = [];

    nowPlaying: HTMLAudioElement = this.sounds.bgm.prologue;

    /** 靜音模式 */
    muteMode = false;

    async assetLoaded(key: string) {
        await new Promise<void>((resolve) => {
            if (this.loadedAssets.indexOf(key) === -1) {
                this.loadedAssets.push(key);
            }
            if (this.loadedAssets.length === this.totalAssets) {
                resolve();
            }
        });
    }

    // 開始載入素材
    async loadAssets() {
        const soundEffectKeys = Object.keys(this.sounds.effect);
        const soundBgmKeys = Object.keys(this.sounds.bgm);
        this.totalAssets = soundEffectKeys.length + soundBgmKeys.length;

        // 載入所有音效
        for (const key of soundEffectKeys) {
            const audio = this.sounds.effect[key];
            audio.addEventListener('canplaythrough', () => this.assetLoaded(key));
            audio.load();
        }

        // 載入所有 BGM
        for (const key of soundBgmKeys) {
            const audio = this.sounds.bgm[key];
            audio.addEventListener('canplaythrough', () => this.assetLoaded(key));
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
