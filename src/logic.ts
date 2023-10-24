import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer";
import { Game, Pumpkin, Pumpkins, UpdatePumpkin } from "./types";

// Virtual? Canva dimensions
const CANVA_HEIGHT = 800
const CANVA_WIDTH = 350

// how hight the pumpkin jumps
const JUMP_STRENGTH = 10;

// Candy
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
    for (const [index, playerId] of allPlayerIds.entries()) {
      pumpkins[playerId] = {
        id: playerId,
        x: CANVA_WIDTH/5,
        y: CANVA_HEIGHT/2,
        velocity: 0,
        gravity: 0.6,
        rotation: 0,
        candy: {
          x: -100,
          y: -100,
          rotation: 0,
        },
        color: index
      };
    }
    return { pumpkins, CANVA_WIDTH, CANVA_HEIGHT };
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
      if (canShoot(game.pumpkins[id])) {
        shootCandy(id, game);
      }
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
      if (pumpkin.y >= CANVA_HEIGHT) {
        // game over
        continue;
      }
      // can't jump any higher
      if (pumpkin.y <=0)  {
         pumpkin.y = 1 
         pumpkin.velocity = 0
         continue
      }
      // Appliquer la gravité
      const tmpVelocity = pumpkin.velocity + pumpkin.gravity;

      // Mettre à jour la position Y de la citrouille en fonction de la vélocité
      pumpkin.y = pumpkin.y + tmpVelocity;
      pumpkin.rotation = Math.min(2, tmpVelocity / 10);

      pumpkin.velocity = tmpVelocity;

      // MOVE PUMPKIN CANDIES
      if (!canShoot(pumpkin)) {
        moveCandy(pumpkinId, game);
      }
    }
  },
  updatesPerSecond: 30,
});

// additionnal functions

// CANDIES

const canShoot = (pumpkin: Pumpkin) => {
  return (
    (pumpkin?.candy?.x || -1) > CANVA_WIDTH ||
    (pumpkin?.candy?.x || -1) < 0
  );
};

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
