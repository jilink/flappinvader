import type { PlayerId, Players } from "rune-games-sdk";

export type Game = {
  pumpkins: Pumpkins
};

export type Candy = {
  x: number;
  y?: number;
  rotation: number
}

export type Pumpkin = {
  id: PlayerId;
  x: number;
  y: number;
  velocity: number;
  gravity: number;
  rotation: number
  maxHeight: number
  maxWidth: number
  color?: string;
  candy?: Candy
}

export type Pumpkins = {
  [key: string]: Pumpkin;
}

export type UpdatePumpkin = {
  x?: number;
  y?: number;
  velocity?: number;
  gravity?: number;
  rotation?: number;
  maxHeight?: number
  maxWidth?: number
};