import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer"
import { Game, Pumpkins, UpdatePumpkin } from "./types"

type GameActions = {
  updatePumpkin: (params: {id: PlayerId, updatePumpkin: UpdatePumpkin}) => void
}

declare global {
  const Rune: RuneClient<Game, GameActions>
}


Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
  setup: (allPlayerIds): Game => {
    const pumpkins: Pumpkins = {};
    for (const playerId of allPlayerIds) {
      pumpkins[playerId] = {
        id: playerId,
        x: 0,
        y:0,
        velocity: 0,
        gravity: 0.6,
        rotation: 0,
        maxHeight: 0,
      }
    } 
    return { pumpkins }
  },
  actions: {
    updatePumpkin: ({id, updatePumpkin}, {game}) =>{
      game.pumpkins = {...game.pumpkins, [id]: {...game.pumpkins[id], ...updatePumpkin}}
    },
  },
    "update": ({ game }: { game: Game }) => {
      for (const pumpkinId of Object.keys(game.pumpkins)) {
        const pumpkin = game.pumpkins[pumpkinId]
      if (pumpkin.y >= pumpkin.maxHeight) {
        // game over
        return
      }
      // Appliquer la gravité
      const tmpVelocity = pumpkin.velocity + pumpkin.gravity;

      // Mettre à jour la position Y de la citrouille en fonction de la vélocité
      pumpkin.y=pumpkin.y + tmpVelocity;
      pumpkin.rotation = Math.min(2, tmpVelocity / 10)

      pumpkin.velocity = tmpVelocity;
    };
      
    },
    updatesPerSecond: 30

})
