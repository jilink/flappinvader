import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer";
import type { Game, Ghost, Pumpkin, Pumpkins, UpdatePumpkin } from "./types";

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
  minPlayers: 2,
  maxPlayers: 4,
  setup: (allPlayerIds): Game => {
    const pumpkins: Pumpkin[] = {};
    for (const [index, playerId] of allPlayerIds.entries()) {
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
        color: index,
      };
    }
    const ghosts: Ghost[] = [
      { x: 355, y: 0, isAlive: true, position: "top" },
      { x: 355, y: 1, isAlive: true, position: "top" },
      { x: 355, y: 2, isAlive: true, position: "top" },
      { x: 355, y: 3, isAlive: true, position: "top" },
      { x: 355, y: 4, isAlive: true, position: "top" },
      { x: 355, y: 5, isAlive: true, position: "top" },
    ];
    return { pumpkins, ghosts };
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
      if (pumpkin.y >= pumpkin.maxHeight) {
        // game over
        continue;
      }
      // can't jump any higher
      if (pumpkin.y <= 0) {
        pumpkin.y = 1;
        pumpkin.velocity = 0;
        continue;
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

      //MOVE GHOSTS
      game.ghosts = game.ghosts.map((ghost) => ({
        ...ghost,
        x: ghost.x - 1,
      }));

      // If all ghost are killed or a ghost column passed over the screen, generate another column
      if (game.ghosts.some((ghost) => ghost.x === 0) || game.ghosts.every((ghost) => !ghost.isAlive)) {
        const ghostStartYPosition = getRandomPosition()

        game.ghosts = game.ghosts.map((ghost) => ({
          ...ghost,
          x: 355,
          position: ghostStartYPosition,
        }));
      }
    }
  },
  updatesPerSecond: 30,

});

// additionnal functions

// CANDIES

const canShoot = (pumpkin: Pumpkin) => {
  return (
    (pumpkin?.candy?.x || -1) > pumpkin.maxWidth ||
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
function getRandomPosition() {
  const positions = ["top", "middle", "bottom"];
  const randomIndex = Math.floor(Math.random() * positions.length);
  return positions[randomIndex];
}