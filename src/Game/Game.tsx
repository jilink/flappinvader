import React from "react";
import { Pumpkins } from "./MovingElements/Pumpkin";
import Ghosts from "./MovingElements/Ghosts";
import Candy from "./MovingElements/Candy";

const Game = () => {
  const INIT_GHOSTS_Y_POSITION = {
    top: 14,
    middle: 2.5,
    bottom: 1.5,
  };
  const ghostIsHEre = true;

  return (
    <>
      <Ghosts />
      <Pumpkins />
      <Candy />
    </>
  );
};

export default Game;
