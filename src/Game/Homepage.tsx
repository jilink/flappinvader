import React, { FC, useEffect, useState } from "react";
import { PlayerId } from "rune-games-sdk";
import useSound, { SoundKey } from "../hooks/useSounds";
import AnimatedBat from "/images/giphy.webp";
type Props = {
  id?: PlayerId;
};
const Homepage: FC<Props> = ({ id }) => {
  const [wait, setWait] = useState(false);
  const { play: playMusic, stop: stopMusic } = useSound({
    key: SoundKey.MUSIC,
  });

  useEffect(() => {
    playMusic();
    return () => {
      stopMusic();
    };
  }, [playMusic, stopMusic]);
  const handleStart = () => {
    Rune.actions.startGame({ id: id || "" });
    setWait(true);
  };
  return (
    <main className="homepage_main">
      <img className="animated_bat" src={AnimatedBat} />
      <div>
        <h1 className="homepage_title">Flapp'invader</h1>
      </div>
      <div>
        {!wait ? (
          <button onClick={handleStart} className="homepage_btn">
            Start
          </button>
        ) : (
          <h2 className="homepage_waiting_title">
            Waiting for your teammates...
          </h2>
        )}
      </div>
      <img className="animated_bat second" src={AnimatedBat} />
    </main>
  );
};

export default Homepage;
