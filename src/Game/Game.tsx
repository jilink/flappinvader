import React from "react";
import { Pumpkins } from "./MovingElements/Pumpkin";
import Ghosts from "./MovingElements/Ghosts";
import Candy from "./MovingElements/Candy";

const Game = () => {
  return (
    <>
      <Ghosts />
      <Pumpkins />
      <Candy/>
    </>
  );
};

export default Game;
