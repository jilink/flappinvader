import React from "react";
import { Pumpkins } from "./MovingElements/Pumpkin";
import Ghosts from "./MovingElements/Ghosts";

const Game = () => {
  return (
    <>
      <Ghosts />
      <Pumpkins />
    </>
  );
};

export default Game;
