import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer";
import type { Game, Ghost, Pumpkin, Pumpkins, UpdatePumpkin } from "./types";

// Virtual? Canva dimensions
const CANVA_HEIGHT = 800;
const CANVA_WIDTH = 350;

// Pumpkin
// how hight the pumpkin jumps
const PUMPKIN_SIZE = 40;
const JUMP_STRENGTH = 10;

// Candy
const CANDY_SPEED = 5;
const CANDY_ROTATION_SPEED = 0.1;
const CANDY_SIZE = 30;

// Ghosts
const NUM_GHOSTS = 6;
const INTER_GHOST_SPACING = 40;
let GHOST_SPEED_ACC_COUNT = 0;
let GHOST_SPEED = 1;
const GHOST_SIZE = 40;
const INIT_GHOSTS_Y_POSITION: Record<string, number> = {
  top: 0,
  middle: CANVA_HEIGHT / 3,
  bottom: CANVA_HEIGHT - CANVA_HEIGHT / 3,
};

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
        x: CANVA_WIDTH / 5,
        y: CANVA_HEIGHT / 2,
        velocity: 0,
        gravity: 0.6,
        rotation: 0,
        candy: {
          x: -100,
          y: -100,
          rotation: 0,
        },
        color: index,
      };
    }
    const ghosts: Ghost[] = [];
    const ghostStartYPosition = getRandomPosition();
    for (let i = 0; i < NUM_GHOSTS; i++) {
      ghosts.push({
        x: CANVA_WIDTH,
        y:
          i * INTER_GHOST_SPACING +
          INTER_GHOST_SPACING +
          INIT_GHOSTS_Y_POSITION[ghostStartYPosition],
        isAlive: true,
        position: ghostStartYPosition,
      });
    }
    return {
      pumpkins,
      ghosts,
      CANVA_WIDTH,
      CANVA_HEIGHT,
      PUMPKIN_SIZE,
      CANDY_SIZE,
      GHOST_SIZE,
    };
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
        x: ghost.x - GHOST_SPEED,
      }));

      // If all ghost are killed or a ghost column passed over the screen, generate another column
      if (
        game.ghosts.some((ghost) => ghost.x < INTER_GHOST_SPACING) ||
        game.ghosts.every((ghost) => !ghost.isAlive)
      ) {
        const ghostStartYPosition = getRandomPosition();

        game.ghosts = game.ghosts.map((ghost) => ({
          ...ghost,
          x: CANVA_WIDTH,
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
    (pumpkin?.candy?.x || -1) > CANVA_WIDTH || (pumpkin?.candy?.x || -1) < 0
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
  candyColidedGhost(id, game);
};

// GHOSTS

function getRandomPosition() {
  const positions = ["top", "middle", "bottom"];
  const randomIndex = Math.floor(Math.random() * positions.length);
  return positions[randomIndex];
}

// COLLISIONS

const colides = (
  x1: number,
  y1: number,
  size1: number,
  x2: number,
  y2: number,
  size2: number
) => {
  if (
    x1 + size1 / 2 > x2 - size2 / 2 &&
    x1 - size1 / 2 < x2 + size2 / 2 &&
    y1 + size1 / 2 > y2 - size2 / 2 &&
    y1 - size1 / 2 < y2 + size2 / 2
  ) {
    return true;
  }
  return false;
};

const candyColidedGhost = (id: PlayerId, game: Game) => {
  const candy = game.pumpkins[id].candy;

  for (const ghost of game.ghosts) {
    if (
      candy &&
      colides(ghost.x, ghost.y, GHOST_SIZE, candy.x, candy.y, CANDY_SIZE)
    ) {
      ghost.isAlive = false;
    }
  }
};
