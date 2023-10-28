import { sounds } from "../sounds/sounds";

const useSound = ({ key }: { key: string }) => {
  const sound = sounds[key];
  return { play: () => sound.play(), stop: () => sound.stop() };
};

export default useSound;
