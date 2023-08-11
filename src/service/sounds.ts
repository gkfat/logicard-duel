class SoundService {
  totalAssets: number = 0;
  loadedAssets: number = 0;
  sounds: {
    [key: string]: HTMLAudioElement
  } = {
    click: new Audio(require('@/assets/sounds/click.wav')),
    pop: new Audio(require('@/assets/sounds/pop.wav')),
    countdown: new Audio(require('@/assets/sounds/countdown.wav')),
    placeCard: new Audio(require('@/assets/sounds/placeCard.wav')),
    coinDrop: new Audio(require('@/assets/sounds/coin.mp3')),
    robotHurt: new Audio(require('@/assets/sounds/robotHurt.wav')),
    ouch: new Audio(require('@/assets/sounds/ouch.wav')),
    huh: new Audio(require('@/assets/sounds/huh.wav')),
    bell: new Audio(require('@/assets/sounds/bell.wav')),
    /** BGM */
    battle: new Audio(require('@/assets/sounds/battle.mp3')),
    rest: new Audio(require('@/assets/sounds/rest.mp3')),
    prologue: new Audio(require('@/assets/sounds/prologue.mp3')),
    end: new Audio(require('@/assets/sounds/end.mp3'))
  }

  // 開始載入素材
  loadAssets() {
    console.log('Start loading assets');
    const soundKeys = Object.keys(this.sounds);
    this.totalAssets = soundKeys.length;
    for (const key of soundKeys) {
      this.sounds[key].addEventListener('canplaythrough', () => {
        if (this.loadedAssets < this.totalAssets) {
          this.loadedAssets += 1;
          console.log(`loading process: ${this.loadedAssets}/${this.totalAssets}`);
        }
      });
    }
  }

  async playSound(audio: HTMLAudioElement) {
    audio.currentTime = 0;
    // audio.volume = 1;
    audio.volume = 0;
    await audio.play();
  }

  async playBGM(audio: HTMLAudioElement) {
    audio.currentTime = 0;
    // audio.volume = 0.5;
    audio.volume = 0;
    audio.loop = true;
    await audio.play();
  };

  stop(audio: HTMLAudioElement) {
    audio.pause();
  }

}

export default new SoundService();