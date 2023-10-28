import type { PlayerId } from "rune-games-sdk";

export type Game = {
  pumpkins: Pumpkins;
  CANVA_HEIGHT: number;
  CANVA_WIDTH: number;
  PUMPKIN_SIZE: number;
  CANDY_SIZE: number;
  GHOST_SIZE: number;
  ghosts: Ghost[];
  gameStarted: boolean;
  ghost_speed: number;
};

export type Candy = {
  x: number;
  y: number;
  rotation: number;
};

export type Pumpkin = {
  isShooting: boolean;
  isAlive: boolean;
  id: PlayerId;
  x: number;
  y: number;
  score: number;
  velocity: number;
  gravity: number;
  rotation: number;
  color?: number;
  candy?: Candy;
  gameStarted?: boolean;
};

export type Pumpkins = {
  [key: string]: Pumpkin;
};

export type UpdatePumpkin = {
  x?: number;
  y?: number;
  velocity?: number;
  gravity?: number;
  rotation?: number;
};
export type Ghost = {
  x: number;
  y: number;
  isAlive: boolean;
  position: string;
};
