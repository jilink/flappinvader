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
  startGame: (params: { id: PlayerId }) => void;
};

declare global {
  const Rune: RuneClient<Game, GameActions>;
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4,
  setup: (allPlayerIds): Game => {
    const pumpkins: Pumpkins = {};
    for (const [index, playerId] of allPlayerIds.entries()) {
      pumpkins[playerId] = {
        isAlive: true,
        isShooting: false,
        id: playerId,
        x: CANVA_WIDTH / 5,
        y: CANVA_HEIGHT / 2,
        score: 0,
        velocity: 0,
        gravity: 0.6,
        rotation: 0,
        candy: {
          x: -100,
          y: -100,
          rotation: 0,
        },
        color: index,
        gameStarted: false,
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
    const gameStarted = false;
    return {
      pumpkins,
      ghosts,
      CANVA_WIDTH,
      CANVA_HEIGHT,
      PUMPKIN_SIZE,
      CANDY_SIZE,
      GHOST_SIZE,
      gameStarted,
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
      // PUMPKIN IS DEAD
      if (!game.pumpkins[id].isAlive) return;
      //shoot a candy at jumb
      if (canShoot(game.pumpkins[id])) {
        game.pumpkins[id].isShooting = true;
        shootCandy(id, game);
      }
      game.pumpkins = {
        ...game.pumpkins,
        [id]: { ...game.pumpkins[id], velocity: -JUMP_STRENGTH },
      };
    },

    startGame: ({ id }, { game }) => {
      game.pumpkins[id].gameStarted = true;
      if (
        Object.keys(game.pumpkins).some(
          (id) => game.pumpkins[id].gameStarted !== true
        )
      ) {
        return;
      }

      game.gameStarted = true;
    },
  },
  update: ({ game }: { game: Game }) => {
    if (!game.gameStarted) {
      return;
    }

    // MOVE PUMPKINS
    for (const pumpkinId of Object.keys(game.pumpkins)) {
      const pumpkin = game.pumpkins[pumpkinId];
      // UPDATE SCORE
      updateScore(pumpkinId, game, 0.1);

      // MOVE PUMPKINS
      if (pumpkin.y >= CANVA_HEIGHT) {
        gameOver(pumpkinId, game);
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
      } else {
        pumpkin.isShooting = false;
      }
      ghostCollidedPumpkin(pumpkinId, game);
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
        isAlive: true,
      }));
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
  (game.pumpkins[id] = {
    ...game.pumpkins[id],
    candy: {
      ...game.pumpkins[id].candy,
      y: game.pumpkins[id].candy?.y || -100,
      x: (game.pumpkins[id].candy?.x || 0) + CANDY_SPEED,
      rotation: (game.pumpkins[id].candy?.rotation || 0) + CANDY_ROTATION_SPEED,
    },
  }),
    candyCollidedGhost(id, game);
};

// GHOSTS

function getRandomPosition() {
  const positions = ["top", "middle", "bottom"];
  const randomIndex = Math.floor(Math.random() * positions.length);
  return positions[randomIndex];
}

// COLLISIONS

const collides = (
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

const candyCollidedGhost = (id: PlayerId, game: Game) => {
  const candy = game.pumpkins[id].candy;

  for (const ghost of game.ghosts) {
    if (
      candy &&
      ghost.isAlive &&
      collides(ghost.x, ghost.y, GHOST_SIZE, candy.x, candy.y, CANDY_SIZE)
    ) {
      // Killed ghost with candy
      updateScore(id, game, 5);
      ghost.isAlive = false;
      game.pumpkins[id].candy = { ...candy, x: -100, y: -100, rotation: 0 };
    }
  }
};

const ghostCollidedPumpkin = (id: PlayerId, game: Game) => {
  const pumpkin = game.pumpkins[id];
  for (const ghost of game.ghosts) {
    if (
      pumpkin &&
      ghost.isAlive &&
      collides(ghost.x, ghost.y, GHOST_SIZE, pumpkin.x, pumpkin.y, PUMPKIN_SIZE)
    ) {
      gameOver(id, game);
    }
  }
};

// SCORE

const updateScore = (id: PlayerId, game: Game, points: number) => {
  const pumpkin = game.pumpkins[id];
  // PUMPKIN IS DEAD
  if (!pumpkin.isAlive) return;
  pumpkin.score = pumpkin.score + points;
};

// GAME OVER

const gameOver = (id: PlayerId, game: Game) => {
  game.pumpkins[id] = {
    ...game.pumpkins[id],
    isAlive: false,
    candy: {
      ...game.pumpkins[id].candy,
      y: -100,
      x: -100,
      rotation: 0,
    },
  };
  // EVERYBODY IS DEAD
  if (Object.keys(game.pumpkins).some((id) => game.pumpkins[id].isAlive))
    return;
  // mapping scores
  const players: { [key: string]: number } = {};
  for (const id in game.pumpkins) {
    if (game.pumpkins.hasOwnProperty(id)) {
      players[id] = Math.floor(game.pumpkins[id].score);
    }
  }

  Rune.gameOver({
    players,
  });
};
