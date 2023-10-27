import React, { FC, useContext, useEffect, useState } from "react";
import { PlayerId } from "rune-games-sdk";
import useSound from "../hooks/useSounds";

type Props = {
  id: PlayerId;
};
const Homepage: FC<Props> = ({ id }) => {
  const [wait, setWait] = useState(false);
  const { play: playMusic, stop: stopMusic } = useSound({ key: "MUSIC" });

  useEffect(() => {
    playMusic();
    return () => {
      stopMusic();
    };
  }, []);
  const handleStart = () => {
    Rune.actions.startGame({ id });
    setWait(true);
  };
  return (
    <>
      <img
        className="animated_bat"
        src="https://media1.giphy.com/media/0xR7MUO0hJfWtco7C6/giphy.gif"
      />

      <main className="homepage_main">
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
      </main>
      <img
        className="animated_bat second"
        src="https://media1.giphy.com/media/0xR7MUO0hJfWtco7C6/giphy.gif"
      />
    </>
  );
};

const WaitingPage = () => {
  return <div>WaitingPage</div>;
};

export default Homepage;
