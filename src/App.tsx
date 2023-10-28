import type { PlayerId, Players } from "rune-games-sdk";
import type { Game } from "./types.ts";

import { useEffect, useState } from "react";
import { Canvas } from "./Game/Canvas.tsx";
import GameComponent from "./Game/Game.tsx";
import GameContext from "./context/game-context.tsx";
import Homepage from "./Game/Homepage.tsx";

function App() {
  const [game, setGame] = useState<Game>();
  const [myId, setMyId] = useState<PlayerId |undefined>();
  const [players, setPlayers] = useState<Players>();

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, players, yourPlayerId }) => {
        setGame(game);
        setMyId(yourPlayerId);
        setPlayers(players);
      },
    });
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {game.gameStarted ? (
        <Canvas id={myId}>
          <GameContext.Provider
            value={{
              game,
              players,
              myId,
              me: players?.[myId || 0],
              mePumpkin: game.pumpkins?.[myId || 0],
              ghosts: game.ghosts,
            }}
          >
            <GameComponent />
          </GameContext.Provider>
        </Canvas>
      ) : (
        <Homepage id={myId} />
      )}{" "}
    </>
  );
}

export default App;
