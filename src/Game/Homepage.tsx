import React, { FC, useState } from "react";
import { PlayerId } from "rune-games-sdk";
type Props = {
  id: PlayerId;
};
const Homepage: FC<Props> = ({ id }) => {
  const [wait, setWait] = useState(false);
  const handleStart = () => {
    Rune.actions.startGame({ id });
    setWait(true);
  };
  return (
    <>
      {!wait ? (
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
              <button onClick={handleStart} className="homepage_btn">
                Start
              </button>
            </div>
          </main>
          <img
            className="animated_bat second"
            src="https://media1.giphy.com/media/0xR7MUO0hJfWtco7C6/giphy.gif"
          />
        </>
      ) : (
        <WaitingPage />
      )}
    </>
  );
};

const WaitingPage = () => {
  return <div>WaitingPage</div>;
};

export default Homepage;
