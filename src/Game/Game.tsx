import React from "react";
import Pumpkin from "./MovingElements/Pumpkin";
import Ghosts from "./MovingElements/Ghosts";
import Candy from "./MovingElements/Candy";

const Game = () => {
  return (
    <>
      <Ghosts />
      <Pumpkin />
      <Candy/>
    </>
  );
};

export default Game;
