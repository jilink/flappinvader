import { Howl, Howler } from "howler";
Howler.volume(0.1);
export const sounds = {
  JUMP: new Howl({ src: ["sounds/jump.mp3"] }),
  DEAD: new Howl({ src: ["sounds/dead.mp3"] }),

  MUSIC: new Howl({ src: ["sounds/music.mp3"], loop:true }),
};