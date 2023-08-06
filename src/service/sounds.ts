export const Sound = {
  playSound: async (audio: HTMLAudioElement) => {
    audio.currentTime = 0;
    audio.volume = 1;
    await audio.play();
  },
  playBGM: async (audio: HTMLAudioElement) => {
    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.loop = true;
    await audio.play();
  },
  stop: (audio: HTMLAudioElement) => {
    audio.pause();
  }
}
