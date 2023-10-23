import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer";
import { Game, Pumpkins, UpdatePumpkin } from "./types";

// how hight the pumpkin jumps
const JUMP_STRENGTH = 10;
const CANDY_SPEED = 5;
const CANDY_ROTATION_SPEED = 0.1;

type GameActions = {
  updatePumpkin: (params: {
    id: PlayerId;
    updatePumpkin: UpdatePumpkin;
  }) => void;
  jumpPumpkin: (params: { id: PlayerId }) => void;
};

declare global {
  const Rune: RuneClient<Game, GameActions>;
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
        y: 0,
        velocity: 0,
        gravity: 0.6,
        rotation: 0,
        maxHeight: 0,
        maxWidth: 0,
        candy: {
          x: -100,
          y: -100,
          rotation: 0,
        },
      };
    }
    return { pumpkins };
  },
  actions: {
    updatePumpkin: ({ id, updatePumpkin }, { game }) => {
      game.pumpkins = {
        ...game.pumpkins,
        [id]: { ...game.pumpkins[id], ...updatePumpkin },
      };
    },
    jumpPumpkin: ({ id }, { game }) => {
      //shoot a candy at jumb
      shootCandy(id, game);
      game.pumpkins = {
        ...game.pumpkins,
        [id]: { ...game.pumpkins[id], velocity: -JUMP_STRENGTH },
      };
    },
  },
  update: ({ game }: { game: Game }) => {
    // MOVE PUMPKINS
    for (const pumpkinId of Object.keys(game.pumpkins)) {
      const pumpkin = game.pumpkins[pumpkinId];
      if (pumpkin.y >= pumpkin.maxHeight) {
        // game over
        return;
      }
      // Appliquer la gravité
      const tmpVelocity = pumpkin.velocity + pumpkin.gravity;

      // Mettre à jour la position Y de la citrouille en fonction de la vélocité
      pumpkin.y = pumpkin.y + tmpVelocity;
      pumpkin.rotation = Math.min(2, tmpVelocity / 10);

      pumpkin.velocity = tmpVelocity;

    // MOVE PUMPKIN CANDIES
    moveCandy(pumpkinId, game)
    }

  },
  updatesPerSecond: 30,
});

// additionnal functions

// CANDIES

const shootCandy = (id: PlayerId, game: Game) => {
  game.pumpkins = {
    ...game.pumpkins,
    [id]: {
      ...game.pumpkins[id],
      candy: { x: game.pumpkins[id].x, y: game.pumpkins[id].y, rotation: 0 },
    },
  };
};

const moveCandy = (id: PlayerId, game: Game) => {
  game.pumpkins = {
    ...game.pumpkins,
    [id]: {
      ...game.pumpkins[id],
      candy: {
        ...game.pumpkins[id].candy,
        x: (game.pumpkins[id].candy?.x || 0) + CANDY_SPEED,
        rotation:
          (game.pumpkins[id].candy?.rotation || 0) + CANDY_ROTATION_SPEED,
      },
    },
  };
};