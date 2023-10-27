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
        <main className="homepage_main">
          <div className="homepage_title">
            <h1>Flapp'invader</h1>
          </div>
          <div>
            <button onClick={handleStart}>Start</button>
          </div>
        </main>
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
