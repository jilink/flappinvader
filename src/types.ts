import type { PlayerId, Players } from "rune-games-sdk";

export type Game = {
  pumpkins: Pumpkins;
  CANVA_HEIGHT: number;
  CANVA_WIDTH: number;
  ghosts: Ghost[];
};

export type Candy = {
  x: number;
  y?: number;
  rotation: number;
};

export type Pumpkin = {
  id: PlayerId;
  x: number;
  y: number;
  velocity: number;
  gravity: number;
  rotation: number;
  color?: number;
  candy?: Candy;
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
