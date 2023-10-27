import { Howl, Howler } from "howler";
Howler.volume(0.1);
export const sounds = {
  JUMP: new Howl({ src: ["sounds/jump.mp3"] }),
};