import { sounds } from "../sounds/sounds";

export enum SoundKey {
  JUMP = "JUMP",
  DEAD = "DEAD",
  GHOST_DEAD = "GHOST_DEAD",
  MUSIC = "MUSIC",
}
const useSound = ({ key }: { key: SoundKey }) => {
  const sound = sounds[key];
  return { play: () => sound.play(), stop: () => sound.stop() };
};

export default useSound;
