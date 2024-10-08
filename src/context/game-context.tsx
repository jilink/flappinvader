import type { Player, Players } from "rune-games-sdk";
import type { Game, Ghost, Pumpkin } from "../types";

import React from "react";

type GameContextType = {
  game?: Game;
  players?: Players;
  myId?: string;
  me?: Player;
  mePumpkin?: Pumpkin;
  meAlive?: boolean;
  ghosts?: Ghost[];
};

const GameContext = React.createContext<GameContextType>({});

export default GameContext;
